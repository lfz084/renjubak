if (self.SCRIPT_VERSIONS) self.SCRIPT_VERSIONS["RenjuTree"] = "v1202.07";
(function(global, factory) {
    (global = global || self, factory(global));
}(this, (function(exports) {
    'use strict';
    //console.log(exports);

    //--------------------- NodeBuffer ---------------------

    const NODE_SIZE = 2400;

    class NodeBuffer extends TypeBuffer {
        constructor(initPages = 1, maxPages = 64) {
            super(NODE_SIZE, initPages, maxPages);
        }
    }

    //-------------------- CommentBuffer ---------------------

    const COMMENT_SIZE = 1024;

    class CommentBuffer extends TypeBuffer {
        constructor(initPages = 1, maxPages = 64) {
            super(COMMENT_SIZE, initPages, maxPages);
        }
    }

    //----------------------- Comment ---------------------
    /*
    class Comment {
        get comment() {
            
        }
        set comment(str) {
            
        }
        constructor(commentBuffer, pointer) {
            this.commentBuf = commentBuffer;
            this.pointer = pointer;
        }
    }
    
    Comment.prototype.free = function() {
        this.commentBuf.free(this.pointer);
    };
    */
    //------------------------ Node ---------------------

    //byte v = 1; 
    //byte idx;
    //DWORD level;
    //UINT down;
    //UINT right;
    //UINT boardTXT;
    //UINT pointer comment;
    class Node {
        static isEqual(node1, node2) {
            return node1.pointer == node2.pointer && node1.nodeBuf == node2.nodeBuf;
        }

        get idx() {
            return this.nodeBuf.getUint8(this.pointer + 1);
        }
        get level() {
            return this.nodeBuf.getUint16(this.pointer + 2);
        }
        get down() {
            let pointer = this.nodeBuf.getUint32(this.pointer + 4);
            if (pointer) {
                return new Node(this.nodeBuf, this.commentBuf, pointer);
            }
        }
        get right() {
            let pointer = this.nodeBuf.getUint32(this.pointer + 8);
            if (pointer) {
                return new Node(this.nodeBuf, this.commentBuf, pointer);
            }
        }
        get boardTXT() {
            let buf = [];
            this.nodeBuf.readMemory(buf, this.pointer + 12, 4);
            buf.push(0, 0);
            return Buffer2String(buf);
        }
        get comment() {
            let pointer = this.nodeBuf.getUint32(this.pointer + 16),
                buf = [];
            if (pointer) {
                this.commentBuf.readMemory(buf, pointer + 4, COMMENT_SIZE - 4);
                buf.push(0, 0);
                return Buffer2String(buf);
            }
            else
                return "";
        }

        set idx(value) {
            this.nodeBuf.setUint8(this.pointer + 1, value);
        }
        set level(value) {
            this.nodeBuf.setUint16(this.pointer + 2, value);
        }
        set down(node) {
            if (node && node.constructor.name == "Node")
                this.nodeBuf.setUint32(this.pointer + 4, node.pointer);
        }
        set right(node) {
            if (node && node.constructor.name == "Node")
                this.nodeBuf.setUint32(this.pointer + 8, node.pointer);
        }
        set boardTXT(str) {
            if (str) {
                let buf = String2Buffer(str).slice(0, 4);
                this.nodeBuf.writeMemory(buf, this.pointer + 12, buf.length);
            }
        }
        set comment(str) {
            if (str) {
                let pointer = this.nodeBuf.getUint32(this.pointer + 16),
                    buf = String2Buffer(str).slice(0, COMMENT_SIZE - 4);
                if (0 == pointer) {
                    pointer = this.commentBuf.alloc();
                    this.commentBuf.setUint8(pointer, 1);
                    this.nodeBuf.setUint32(this.pointer + 16, pointer);
                }
                pointer && this.commentBuf.writeMemory(buf, pointer + 4, buf.length);
            }
        }

        constructor(nodeBuffer, commentBuffer, pointer) {
            this.nodeBuf = nodeBuffer;
            this.commentBuf = commentBuffer;
            this.pointer = pointer;
        }
    }

    Node.prototype.free = function() {
        this.nodeBuf.free(this.pointer);
        this.commentBuf.free(this.nodeBuf.getUint32(this.pointer + 16));
    };

    Node.prototype.isEqual = function(node) {
        return Node.isEqual(this, node);
    };

    //------------------------ Tree ---------------------

    class Tree {
        constructor(initPages = 1, maxPages = 64) {
            this.nodeBuf = new NodeBuffer(initPages, maxPages);
            this.commentBuf = new CommentBuffer(initPages, maxPages);
            this.root = this.newNode();
        }
    }

    Tree.prototype.newNode = function() {
        let pointer = this.nodeBuf.alloc();
        if (pointer) {
            this.nodeBuf.resetObj(pointer); // set Obj buf = {0};
            this.nodeBuf.setUint16(pointer, 0xe101); // v = 1, idx = 225
            return new Node(this.nodeBuf, this.commentBuf, pointer);
        }
        else
            return null;
    };

    Tree.prototype.copyNode = function(sourceNode, targetNode = this.newNode()) {
        targetNode.idx = sourceNode.idx;
        targetNode.level = sourceNode.level;
        targetNode.boardTXT = sourceNode.boardTXT;
        targetNode.comment = sourceNode.comment;
        return targetNode;
    };

    Tree.prototype.addNode = function(parNode, newNode) {
        let leftNode = parNode.down,
            rightNode;
        if (leftNode) {
            if (newNode.idx < leftNode.idx) {
                parNode.down = newNode;
                newNode.right = leftNode;
                return;
            }
            rightNode = leftNode.right;
            while (rightNode) {
                if (newNode.idx < rightNode.idx) {
                    newNode.right = rightNode;
                    leftNode.right = newNode;
                    return;
                }
                leftNode = rightNode;
                rightNode = leftNode.right
            }
            
            newNode.right = rightNode;
            leftNode.right = newNode;
            return;
        }
        else {
            parNode.down = newNode;
        }
    };

    Tree.prototype.removeNode = function(node) {
        node.free();
    };

    Tree.prototype.findNode = function(parNode, idx) {
        let node = parNode.down;
        while (node) {
            if (node.idx == idx) return node;
            node = node.right;
        }
    };

    Tree.prototype.seek = function(path) {
        let current = this.root,
            i = 0;
        while (current && i < path.length) {
            current = this.findNode(current, path[i++]);
        }
        return current;
    };

    Tree.prototype.Path2Node = function(path) {
        let node = this.root,
            i = 0;
        node = this.findNode(node, path[i++]);
        while (node) {
            if (i == path.length) return node;
            node = this.findNode(node, path[i++]);
        }
    };

    Tree.prototype.removeBranch = function(path) {
        let stack = [];
    };

    Tree.prototype.copyBranch = function(node) {

    };

    Tree.prototype.getBranchNodes = function(path) {
        let stack = [],
            nodes = [],
            current = this.seek(path),
            nextNode = current && current.down;

        while (nextNode) {
            nodes.push(nextNode);
            //console.log(`idx: ${nextNode.idx}, boardTXT: ${nextNode.boardTXT}`)
            nextNode = nextNode.right;
        }

        nextNode = nodes[nodes.length - 1];
        if (nextNode && nextNode.idx == 225) {
            nextNode = nextNode.down;
            while (nextNode) {
                //console.info(`idx: ${nextNode.idx}, boardTXT: ${nextNode.boardTXT}`)
                nextNode.path = path.concat([225]);
                nodes.push(nextNode);
                nextNode = nextNode.right;
            }
        }

        return nodes;
    };

    Tree.prototype.createPath = function(path) {
        //console.log(`createPath: [${path}]`);
        let preNode = this.root,
            downNode = this.root,
            i = 0;
        while (i < path.length) {
            downNode = this.findNode(preNode, path[i]);
            if (!downNode) {
                downNode = this.newNode();
                downNode.idx = path[i];
                downNode.boardTXT = i & 1 ? EMOJI_ROUND : EMOJI_ROUND_BLACK;
                this.addNode(preNode, downNode);
            }
            preNode = downNode;
            i++;
        }
        return downNode;
    };

    exports.RenjuNode = Node;
    exports.RenjuTree = Tree;
})))
