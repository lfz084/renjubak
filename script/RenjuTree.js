(function(global, factory) {
    (global = global || self, factory(global));
}(this, (function(exports) {
    'use strict';
    //console.log(exports);
    
    function getPath(node) {
        let path = [];
        while (node.parentNode) {
            node = node.parentNode;
            path.push(node.idx)
        }
        path.pop()
        return path;
    }
    
    function setParentNode(parentNode, childNode) {
        childNode.parentNode = parentNode;
    }
    
    function getChildNode(node, idx) {
        //alert(`node=${node}, ${node.childNode.constructor.name}`)
        for (let i = node.childNode.length - 1; i >= 0; i--) {
            if (node.childNode[i].idx == idx)
                return node.childNode[i];
        }
    }
    
    function pushChildNode(parentNode, childNode) {
        parentNode.childNode.push(childNode);
        setParentNode(parentNode, childNode);
    }
    
    function popChildNode(parentNode) {
        let rt = parentNode.childNode[parentNode.childNode.length -1];
        parentNode.childNode.length--;
        return rt;
    }

    function addBranch(tree, branch) {
        pushChildNode(getVariant(tree, branch.path), branch.node)
    }

    function addBranchArray(tree, arrStack) {
        for (let i = arrStack.length - 1; i >= 0; i--) {
            //alert(`addBranchArray, i=${i}`)
            addBranch(tree, arrStack[i])
        }
    }

    function getVariant(node, path) {
        for (let i = path.length-1; i >= 0; i--) {
            node = getChildNode(node, path[i])
        }
        if (node)
            return node
        else
            throw new Error("nd is not RenjuNode")
    }



    class RenjuNode {
        constructor(idx = `-1`, parentNode, childNode = []) {
            if (typeof idx == "object") {
                let object = idx;
                this.parentNode = object.parentNode;
                this.childNode = object.childNode || [];
                //this.defaultChildNode = object.defaultChildNode || [];
                this.idx = object.idx || -1;
                this.txt = object.txt || "";
                //this.txtColor = object.txtColor || "black";
                this.innerHTML = object.innerHTML || "";
            }
            else {
                this.parentNode = parentNode;
                this.childNode = childNode;
                //this.defaultChildNode = [];
                this.idx = idx;
                this.txt = "";
                //this.txtColor = "black";
                this.innerHTML = "";
            }
        }
    }

    RenjuNode.prototype.getPath = function() {
        return getPath(this)
    }

    RenjuNode.prototype.setParentNode = function(parentNode) {
        setParentNode(parentNode, this);
    }

    RenjuNode.prototype.pushChildNode = function(childNode) {
        pushChildNode(this, childNode)
    }

    RenjuNode.prototype.popChildNode = function() {
        return popChildNode(this)
    }

    RenjuNode.prototype.getChildNode = function(idx) {
        return getChildNode(this, idx)
    }



    class RenjuBranch {
        constructor(path, node) {
            this.path = path;
            this.node = node;
        }
    }



    class RenjuTree {
        constructor(firstColor = "black", keyMap = new Map()) {
            if (typeof firstColor == "object") {
                let object = firstColor;
                this.childNode = object.childNode || [];
                this.firstColor = object.firstColor || "black";
                this.idx = object.idx || -1;
                this.txt = object.txt || "";
                this.txtColor = object.txtColor || "black";
                this.innerHTML = object.innerHTML || "";
                this.keyMap = object.keyMap || new Map();
                this.autoColor = object.autoColor;
                this.moveNodes = [];
                this.moveNodesIndex = -1;
            }
            else {
                this.childNode = [];
                this.firstColor = firstColor;
                this.idx = -1;
                this.txt = "";
                this.txtColor = "black";
                this.innerHTML = "";
                this.keyMap = keyMap;
                this.autoColor;
                this.moveNodes = [];
                this.moveNodesIndex = -1;
            }
        }
    }

    RenjuTree.prototype.pushChildNode = function(childNode) {
        pushChildNode(this, childNode)
    }

    RenjuTree.prototype.popChildNode = function() {
        return popChildNode(this)
    }

    RenjuTree.prototype.getChildNode = function(idx) {
        return getChildNode(this, idx)
    }

    RenjuTree.prototype.addBranch = function(branch) {
        addBranch(this, branch)
    }

    RenjuTree.prototype.addBranchArray = function(arrStack) {
        addBranchArray(this, arrStack)
    }

    RenjuTree.prototype.getVariant = function(path) {
        return getVariant(this, path)
    }


    exports.RenjuNode = RenjuNode;
    exports.RenjuBranch = RenjuBranch;
    exports.RenjuTree = RenjuTree;
})))