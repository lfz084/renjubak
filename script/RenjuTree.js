if (self.SCRIPT_VERSIONS) self.SCRIPT_VERSIONS["RenjuTree"] = "v1202.12";
(function(global, factory) {
    (global = global || self, factory(global));
}(this, (function(exports) {
    'use strict';
    //console.log(exports);
    //--------------------- Position ---------------------

    const NORMALIZE_TABLE = [[{}]];
    const TRANSPOSE_TABLE = [[{}]];

    for (let idx = 0; idx < 226; idx++) {
        NORMALIZE_TABLE[idx] = [];
        TRANSPOSE_TABLE[idx] = [];
        for (let nMatch = 0; nMatch < 8; nMatch++) {
            NORMALIZE_TABLE[idx][nMatch] = {};
            TRANSPOSE_TABLE[idx][nMatch] = {};
            for (let size = 6; size < 16; size++) {
                NORMALIZE_TABLE[idx][nMatch][size] = Point2Idx(normalizeCoord(Idx2Point(idx), nMatch, { x: (size + 1) / 2, y: (size + 1) / 2 }));
                TRANSPOSE_TABLE[idx][nMatch][size] = Point2Idx(transposeCoord(Idx2Point(idx), nMatch, { x: (size + 1) / 2, y: (size + 1) / 2 }));
            }
        }
    }
    // movePoint = {x: [1-15], y: [1-15]} , idx: [0-224]
    // passMove = {x: 1, y:16}, idx: 225
    function Point2Idx(point) {
        return point.x - 1 + (point.y - 1) * 15;
    }

    function Idx2Point(idx) {
        let x = idx % 15,
            y = ~~(idx / 15);
        return { x: x + 1, y: y + 1 }
    }

    function rotate90(point, centerPos) {
        let x = centerPos.x - point.x,
            y = centerPos.y - point.y;
        if (point.x == 1 && point.y == 16) return point;
        return { x: centerPos.x + y, y: centerPos.y - x }
    }

    function rotate180(point, centerPos) {
        let x = centerPos.x - point.x,
            y = centerPos.y - point.y;
        if (point.x == 1 && point.y == 16) return point;
        return { x: centerPos.x + x, y: centerPos.y + y }
    }

    function rotate270(point, centerPos) {
        let x = centerPos.x - point.x,
            y = centerPos.y - point.y;
        if (point.x == 1 && point.y == 16) return point;
        return { x: centerPos.x - y, y: centerPos.y + x }
    }

    function reflectX(point, centerPos) {
        if (point.x == 1 && point.y == 16) return point;
        return { x: point.x, y: centerPos.y * 2 - point.y }
    }

    function normalizeCoord(point, nMatch, centerPos) {
        switch (nMatch) {
            case 0:
            case 4:
                break;
            case 1:
            case 5:
                point = rotate270(point, centerPos);
                break;
            case 2:
            case 6:
                point = rotate180(point, centerPos);
                break;
            case 3:
            case 7:
                point = rotate90(point, centerPos);
                break;
        }
        if (nMatch > 3) point = reflectX(point, centerPos);
        return point;
    }

    function transposeCoord(point, nMatch, centerPos) {
        if (nMatch > 3) point = reflectX(point, centerPos);
        switch (nMatch) {
            case 0:
            case 4:
                break;
            case 1:
            case 5:
                point = rotate90(point, centerPos);
                break;
            case 2:
            case 6:
                point = rotate180(point, centerPos);
                break;
            case 3:
            case 7:
                point = rotate270(point, centerPos);
                break;
        }
        return point;
    }

    function normalizeIdx(idx, nMatch, size) {
        return NORMALIZE_TABLE[idx][nMatch][size];
    }

    function normalizePath(path, nMatch, size) {
        return path.map(idx => NORMALIZE_TABLE[idx][nMatch][size]);
    }

    function transposeIdx(idx, nMatch, size) {
        return TRANSPOSE_TABLE[idx][nMatch][size];
    }

    function transposePath(path, nMatch, size) {
        return path.map(idx => TRANSPOSE_TABLE[idx][nMatch][size]);
    }

    class Position {
        constructor(path) {
            this.position = new Array(225);
            this.positionB = new Array(225);
            this.movesCount = 0;
            path.map((idx, i) => idx >= 0 && idx <= 224 && (this.position[idx] = (i & 1) + 1));
        }
    }

    Position.prototype.reset = function() {
        this.positionB = new Array(225);
        this.movesCount = 0;
    }

    Position.prototype.getEmptyIdx = function(path) {
        path.find(idx => idx < 225 && !this.positionB[idx]);
    }

    Position.prototype.move = function(idx, color) {
        //console.log(`move ${idxToName(idx)}, ${color}\nthis.position[idx]: ${this.position[idx]}\nthis.positionB[idx]: ${this.positionB[idx]}`)
        if (this.position[idx] == color && !this.positionB[idx]) {
            this.positionB[idx] = color;
            return ++this.movesCount;
        }
        else {
            return 0;
        }
    }

    Position.prototype.back = function(idx) {
        if (this.positionB[idx]) {
            this.positionB[idx] = 0;
            return this.movesCount--;
        }
        else {
            return 0;
        }
        //console.log(`back ${idxToName(idx)}\nthis.positionB[idx]: ${this.positionB[idx]}`);
    }

    //--------------------- NodeBuffer ---------------------

    const NODE_SIZE = 24;

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
    }
    */
    //---------------------- Branch -------------------

    class Branchs {
        constructor() {
            this.branchs = [];
            this.branchsInfo = 0;
            this.boardTXT = "";
        }
    }

    class Branch {
        constructor(node) {
            this.idx = node.idx;
            this.boardTXT = node.boardTXT;
            this.comment = node.comment;
            this.color = node.color || "black";
            this.path = [];
            this.nMatch = 0;
        }
    }

    //------------------------ Node ---------------------

    const DEFAULT_BOARD_TXT = ["", "●", "○", "◐"];
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
            else
                this.nodeBuf.setUint32(this.pointer + 4, 0);
        }
        set right(node) {
            if (node && node.constructor.name == "Node")
                this.nodeBuf.setUint32(this.pointer + 8, node.pointer);
            else
                this.nodeBuf.setUint32(this.pointer + 8, 0);
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

        constructor(nodeBuffer, commentBuffer, pointer, idx, boardTXT) {
            this.nodeBuf = nodeBuffer;
            this.commentBuf = commentBuffer;
            this.pointer = pointer;
            idx != undefined && (this.idx = idx);
            boardTXT && (this.boardTXT = boardTXT);
        }
    }

    Node.prototype.free = function() {
        let pointer = this.nodeBuf.getUint32(this.pointer + 16);
        this.nodeBuf.free(this.pointer);
        pointer && (this.commentBuf.free(pointer));
    }

    Node.prototype.isEqual = function(node) {
        return Node.isEqual(this, node);
    }

    Node.prototype.isChild = function(childNode) {
        let cNode = this.down;
        while (cNode) {
            if (cNode.isEqual(childNode)) return true;
            cNode = cNode.right;
        }
        return false;
    }

    Node.prototype.isParent = function(parentNode) {
        return parentNode.isChild(this);
    }

    Node.prototype.getChild = function(idx) {
        let cNode = this.down;
        while (cNode) {
            if (cNode.idx === idx) return cNode;
            cNode = cNode.right;
        }
    }

    Node.prototype.getChilds = function(moves) {
        let nodes = [];
        if (!Array.isArray(moves)) { //all childNode
            let node = this.down;
            while (node) {
                nodes.push(node);
                node = node.right;
            }
        }
        else { //
            nodes = moves.map(idx => this.getChild(idx)).filter(node => !!node);
        }
        return nodes;
    }

    Node.prototype.addChild = function(childNode) {
        if (childNode.nodeBuf != this.nodeBuf) throw new Error(`Node.addChild Error: childNode.nodeBuf != this.nodeBuf`);
        let leftNode = this.down,
            rightNode,
            cIdx = childNode.idx;
        if (leftNode) {
            if (cIdx < leftNode.idx) {
                this.down = childNode;
                childNode.right = leftNode;
                return;
            }
            rightNode = leftNode.right;
            while (rightNode) {
                if (cIdx < rightNode.idx) {
                    childNode.right = rightNode;
                    leftNode.right = childNode;
                    return;
                }
                leftNode = rightNode;
                rightNode = leftNode.right
            }

            leftNode.right = childNode;
            return;
        }
        else {
            this.down = childNode;
        }
    }

    Node.prototype.addChilds = function(childNodes) {
        childNodes.map(node => this.addChild(node));
    }

    Node.prototype.removeChild = function(childNode) {
        let leftNode = this.down,
            rightNode = leftNode ? leftNode.right : undefined;
        if (leftNode.isEqual(childNode)) {
            this.down = rightNode;
            childNode.right = null;
        }
        else {
            while (rightNode) {
                if (rightNode.isEqual(childNode)) {
                    leftNode.right = childNode.right;
                    childNode.right = null;
                    return;
                }
                leftNode = rightNode;
                rightNode = rightNode.right;
            }
        }
    }

    Node.prototype.removeChilds = function(childNodes) {
        childNodes.map(node => this.removeChild(node));
    }

    Node.prototype.map = function(callback) {
        let current = this,
            right,
            down,
            stack = [];
        typeof callback != "function" && (callback = () => {});
        while (current) {
            right = current.right;
            down = current.down;

            callback(current);

            if (right) stack.push(right);

            if (down) {
                current = down;
            }
            else {
                if (stack.length) current = stack.pop();
                else current = undefined;
            }
        }
    }

    //------------------------ Tree ---------------------

    class Tree {
        constructor(initPages = 1, maxPages = 64, centerPos = { x: 8, y: 8 }) {
            this.nodeBuf = new NodeBuffer(initPages, maxPages);
            this.commentBuf = new CommentBuffer(initPages, maxPages);
            this.root = this.newNode();
            this.centerPos = centerPos;
            this.size = centerPos.x * 2 - 1;
            this.nMatch = 0;
        }
    }

    Tree.prototype.normalizeIdx = function(idx, nMatch = this.nMatch) {
        return normalizeIdx(idx, nMatch, this.size);
    }

    Tree.prototype.normalizePath = function(path, nMatch = this.nMatch) {
        return normalizePath(path, nMatch, this.size);
    }

    Tree.prototype.transposeIdx = function(idx, nMatch = this.nMatch) {
        return transposeIdx(idx, nMatch, this.size);
    }

    Tree.prototype.transposePath = function(path, nMatch = this.nMatch) {
        return transposePath(path, nMatch, this.size);
    }

    Tree.prototype.newNode = function(idx, boardTXT) {
        let pointer = this.nodeBuf.alloc();
        if (pointer) {
            this.nodeBuf.resetObj(pointer); // set Obj buf = {0};
            this.nodeBuf.setUint16(pointer, 0xe101); // v = 1, idx = 225
            return new Node(this.nodeBuf, this.commentBuf, pointer, idx, boardTXT);
        }
        else
            return null;
    }

    Tree.prototype.copyNode = function(sourceNode, targetNode = this.newNode()) {
        targetNode.idx = sourceNode.idx;
        targetNode.level = sourceNode.level;
        targetNode.boardTXT = sourceNode.boardTXT;
        targetNode.comment = sourceNode.comment;
        return targetNode;
    }

    Tree.prototype.cle = function() {
        this.nodeBuf.clePages();
        this.commentBuf.clePages();
        this.root = this.newNode();
    }

    Tree.prototype.addChild = function(parNode, childNode) {
        if (parNode.nodeBuf != this.nodeBuf) throw new Error(`Tree.addChild Error: parNode.nodeBuf != this.nodeBuf`);
        let leftNode = parNode.down,
            rightNode,
            cIdx = childNode.idx;
        if (leftNode) {
            let idx = leftNode.idx;
            if (cIdx < idx) {
                let nNode = this.copyNode(childNode);
                parNode.down = nNode;
                nNode.right = leftNode;
                return nNode;
            }
            else if (cIdx == idx) {
                this.copyNode(childNode, leftNode);
                return leftNode;
            }

            rightNode = leftNode.right;
            while (rightNode) {
                let idx = rightNode.idx;
                if (cIdx < idx) {
                    let nNode = this.copyNode(childNode);
                    leftNode.right = nNode;
                    nNode.right = rightNode;
                    return nNode;
                }
                else if (cIdx == idx) {
                    this.copyNode(childNode, rightNode);
                    return rightNode;
                }
                leftNode = rightNode;
                rightNode = rightNode.right
            }

            let nNode = this.copyNode(childNode);
            leftNode.right = nNode;
            return nNode;
        }
        else {
            let nNode = this.copyNode(childNode);
            parNode.down = nNode;
            return nNode;
        }
    }

    //parNode.nodeBuf == this.nodeBuf
    Tree.prototype.addChilds = function(parNode, childNodes) {
        childNodes.map(node => this.addChild(parNode, node));
    }

    Tree.prototype.addRight = function(leftNode, rightNode) {
        if (leftNode.nodeBuf != this.nodeBuf) throw new Error(`Tree.addRight Error: leftNode.nodeBuf != this.nodeBuf`);
        let current = leftNode.right,
            rIdx = rightNode.idx;
    
        while (current) {
            let idx = current.idx;
            if (rIdx < idx) {
                let nNode = this.copyNode(rightNode);
                leftNode.right = nNode;
                nNode.right = current;
                return nNode;
            }
            else if (rIdx == idx) {
                this.copyNode(rightNode, current);
                return current;
            }
            leftNode = current;
            current = current.right;
        }
        
        let nNode = this.copyNode(rightNode);
        leftNode.right = nNode;
        return nNode;
    }

    Tree.prototype.removeNode = function(parNode, node) {
        parNode.removeChild(node);
    }

    Tree.prototype.removeNodes = function(parNode, nodes) {
        parNode.removeChilds(nodes);
    }

    Tree.prototype.findNode = function(parentNode, idx) {
        return parentNode.getChild(idx);
    }

    Tree.prototype.seek = function(path) {
        let current = this.root,
            i = 0;
        while (current && i < path.length) {
            current = this.findNode(current, path[i++]);
        }
        return current;
    }

    Tree.prototype.removeBranch = function(path) {
        let idx,
            parNode,
            cNode,
            rightNode,
            downNode,
            stack = [];
        if (path.length == 0) {
            this.cle();
        }
        else {
            idx = path.pop();
            parNode = this.seek(path);
            parNode && (cNode = parNode.getChild(idx));
            if (cNode) {
                parNode.removeChild(cNode);
                cNode.free();
                //console.log(idxToName(cNode.idx));
                cNode = cNode.down;
                cNode && cNode.map(node => node.free());
            }
        }
    }

    Tree.prototype.insertBranch = function(target, branchRoot) {
        let braCur = branchRoot.down,
            braDown,
            braRight,
            braStack = [],
            tagCur = Array.isArray(target) ? this.createPath(target) : target,
            tagStack = [],
            isDown = true;

        while (braCur) {
            if (isDown) tagCur = this.addChild(tagCur, braCur);
            else tagCur = this.addRight(tagCur, braCur);

            braDown = braCur.down;
            braRight = braCur.right;
            if (braRight) {
                tagStack.push(tagCur);
                braStack.push(braRight);
            }

            if (braDown) {
                braCur = braDown;
                isDown = true;
            }
            else {
                if (braStack.length) {
                    tagCur = tagStack.pop();
                    braCur = braStack.pop();
                    isDown = false;
                }
                else {
                    braCur = undefined;
                }
            }
        }
    }

    Tree.prototype.mergeTree = function(...trees) {
        trees.map(tree => {
            this.nodeBuf != tree.nodeBuf && this.insertBranch([], tree.root);
        })
    }

    Tree.prototype.copyBranch = function(node) {}

    Tree.prototype.copyTree = function(node) {}

    Tree.prototype.positionNodes = function(path, maxMatch = 0) {
        let nodes = [],
            movesLen = 0;

        path.map(idx => idx < 225 && movesLen++);

        for (let nMatch = 0; nMatch <= maxMatch; nMatch++) {
            let moveList = [],
                stack = [],
                downNode,
                rightNode,
                current = this.root.down,
                tPath = transposePath(path, nMatch, this.size),
                position = new Position(tPath);

            while (current) {
                let isBack = false,
                    idx = current.idx;

                rightNode = current.right;
                downNode = current.down;
                if (rightNode) stack.push({ node: rightNode, len: moveList.length });
                moveList.push(idx);

                let color = (moveList.length - 1 & 1) + 1,
                    rt = position.move(idx, color);

                if (rt || idx == 225) {
                    if (rt == movesLen) {
                        nodes.push(current);
                        isBack = true;
                    }
                    else {
                        if (downNode) current = downNode;
                        else isBack = true;
                    }
                }
                else {
                    isBack = true;
                }

                if (isBack) {
                    if (stack.length) {
                        let st = stack.pop();
                        current = st.node;
                        for (let i = moveList.length; i > st.len; i--) {
                            let idx = moveList.pop();
                            position.back(idx);
                        }
                    }
                    else {
                        current = null;
                        for (let i = moveList.length; i > 0; i--) {
                            let idx = moveList.pop();
                            position.back(idx);
                        }
                    }
                }
            }
        }
        return nodes;
    }


    Tree.prototype.getBranchNodes = function(path) {
        function checkPath(shortPath, longPath) {
            return !shortPath.find((idx, i) => idx != longPath[i]);
        }

        function createBranch({ node, idx, path, nMatch, color, indexOf, boardTXT }) {
            let branch = new Branch(node);
            branch.idx = idx;
            branch.path = path;
            branch.nMatch = nMatch;
            branch.color = color;
            branch.indexOf = indexOf || path.length;
            branch.boardTXT = boardTXT || branch.boardTXT;
            return branch;
        }

        function addBranch(branch) {
            let current = nodes[branch.idx],
                branchsInfo = (branch.indexOf + 1 & 1) + 1; //last move color

            if (undefined == current) {
                current = nodes[branch.idx] = new Branchs();
            }

            if (0 == (current.branchsInfo & branchsInfo) || branch.color == "black") {
                current.branchsInfo |= branchsInfo;
                current.branchs[branchsInfo - 1] = branch;
                3 == current.branchsInfo && (current.boardTXT = DEFAULT_BOARD_TXT[3]);
            }
        }

        function addChildBranchs(current, currentPath, nMatch) {
            let childNodes = current.getChilds(),
                passNode,
                color = this.nMatch == nMatch ? checkPath(path, currentPath) ? "black" : "#556B2F" : "#008000";

            childNodes.length && childNodes[childNodes.length - 1].idx == 225 && (passNode = childNodes.pop());
            childNodes.map(cur => {
                let idx = normalizeIdx(cur.idx, nMatch, this.size),
                    path = currentPath.concat([idx]),
                    branch = createBranch({
                        node: cur,
                        idx: idx,
                        path: path,
                        nMatch: nMatch,
                        color: color
                    });
                addBranch(branch);
                //console.log(`this.nMatch: ${this.nMatch}\nnMatch: ${nMatch}\n`);
            });
            passNode && passNode.getChilds().map(cur => {
                let idx = normalizeIdx(cur.idx, nMatch, this.size),
                    path = currentPath.concat([225, idx]),
                    branch = createBranch({
                        node: cur,
                        idx: idx,
                        path: path,
                        nMatch: nMatch,
                        color: color
                    });
                addBranch(branch);
            });
        }

        let nodes = new Array(226),
            movesLen = path.filter(idx => idx < 225).length;

        for (let nMatch = 0; nMatch < 8; nMatch++) {
            let moveList = [],
                stack = [],
                downNode,
                rightNode,
                current = this.root,
                tPath = transposePath(path, nMatch, this.size),
                position = new Position(tPath),
                jointNode = null;

            //console.log(`RenjuTree getBranchNodes: [${movesToName(path)}]>>> [${movesToName(tPath)}]`);
            if (tPath.length == 0) {
                addChildBranchs.call(this, current, [], nMatch);
                continue;
            }
            else {
                current = current.down;
            }

            while (current) {
                let isBack = false,
                    idx = current.idx;

                rightNode = current.right;
                downNode = current.down;
                rightNode && stack.push({ node: rightNode, len: moveList.length });
                moveList.push(idx);

                let color = (moveList.length - 1 & 1) + 1,
                    rt = position.move(idx, color);
                //console.warn(`${idxToName(idx)} rt: ${rt}`)
                if (rt || idx == 225) {
                    if (rt == movesLen) {
                        let currentPath = normalizePath(moveList.slice(0), nMatch, this.size);
                        if (jointNode) {
                            let branch = createBranch({
                                node: jointNode.node,
                                indexOf: jointNode.len,
                                boardTXT: DEFAULT_BOARD_TXT[(jointNode.len - 1 & 1) + 1],
                                idx: normalizeIdx(jointNode.node.idx, nMatch, this.size),
                                path: currentPath,
                                nMatch: nMatch,
                                color: "#685D8B"//"#483D8B"
                            });
                            addBranch(branch);
                            //console.log(`red: [${movesToName(branch.path)}]`);
                        }
                        else {
                            addChildBranchs.call(this, current, currentPath, nMatch);
                        }
                        isBack = true;
                        //console.warn(`[${movesToName(moveList)}]`);
                    }
                    else {
                        if (downNode) current = downNode;
                        else isBack = true;
                    }
                }
                else if (!jointNode) {
                    jointNode = { node: current, len: moveList.length };
                    if (downNode) current = downNode;
                    else isBack = true;
                }
                else {
                    isBack = true;
                }

                if (isBack) {
                    let len;
                    if (stack.length) {
                        let st = stack.pop();
                        current = st.node;
                        len = st.len;
                    }
                    else {
                        current = null;
                        len = 0;
                    }
                    for (let i = moveList.length; i > len; i--) {
                        position.back(moveList.pop());
                    }
                    if (jointNode && jointNode.len > moveList.length) jointNode = null;
                }
            }
        }

        nodes = nodes.filter(cur => !!cur);
        //console.log(`nMatch: ${nodes.map(cur => (cur.branchs[0] && cur.branchs[0].nMatch) || (cur.branchs[1] && cur.branchs[1].nMatch))}`)
        //console.log(`[${movesToName(nodes.map(cur => (cur.branchs[0] && cur.branchs[0].idx) || (cur.branchs[1] && cur.branchs[1].idx)))}]`)
        return nodes;
    }

    Tree.prototype.createPath = function(path, nodeInfo) {
        //console.log(`createPath: [${path}]`);
        let preNode = this.root,
            downNode = this.root,
            i = 0;
        while (i < path.length) {
            downNode = this.findNode(preNode, path[i]);
            if (!downNode) {
                downNode = this.newNode();
                downNode.idx = path[i];
                if (typeof nodeInfo === "object") {
                    downNode.level = nodeInfo.level;
                    downNode.boardTXT = nodeInfo.boardTXT;
                    downNode.comment = nodeInfo.comment;
                }
                else
                    downNode.boardTXT = DEFAULT_BOARD_TXT[(i & 1) + 1];
                preNode.addChild(downNode);
            }
            preNode = downNode;
            i++;
        }
        return downNode;
    }

    Tree.prototype.createPathVCF = function(preNode, path) {
        let downNode = preNode,
            i = 0;
        while (i < path.length) {
            downNode = this.findNode(preNode, path[i]);
            if (!downNode) {
                downNode = this.newNode();
                downNode.idx = path[i];
                downNode.boardTXT = i & 1 ? "L" : "W";
                preNode.addChild(downNode);
            }
            preNode = downNode;
            i++;
        }
        return downNode;
    }

    Tree.prototype.createNodes = function(moves, nodeInfo) {
        let nodes = [];
        moves.map((idx, i) => {
            nodes[i] = this.newNode();
            if (nodes[i]) {
                nodes[i].idx = idx;
                if (typeof nodeInfo === "object") {
                    nodes[i].level = nodeInfo.level;
                    nodes[i].boardTXT = nodeInfo.boardTXT;
                    nodes[i].comment = nodeInfo.comment;
                }
            }
        })
        return nodes;
    }

    Tree.prototype.map = function(callback) {
        this.root.map(callback);
    }

    //----------------------- exports -------------------------

    exports.RenjuNode = Node;
    exports.RenjuTree = Tree;

})))
