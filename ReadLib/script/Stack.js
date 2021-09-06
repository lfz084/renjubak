(function(global, factory) {
    (global = global || self, factory(global));
}(this, (function(exports) {
    'use strict';
    //console.log(exports);
    class Item {
        constructor(nMove, pMove) {
            this.nMove = nMove;
            this.pMove = pMove;
        }
    }

    const SIZE = 225;

    class Stack {
        constructor() {
            this.m_nIndex = 0;
            this.NullItem = new Item(0, null);
            this.m_Stack = [];
            for (let i = 0; i < SIZE; i++) {
                this.m_Stack[i] = this.NullItem;
            }
        }
    }

    Stack.prototype.isEmpty = function() {
        return this.m_nIndex == 0;
    }

    Stack.prototype.push = function(nMove = 0, pMove = null) {
        if (this.m_nIndex >= SIZE)
            throw `Stack.push Error: Stack.m_nIndex >=SIZE`;
        this.m_Stack[this.m_nIndex].nMove = nMove;
        this.m_Stack[this.m_nIndex].pMove = pMove;
        this.m_nIndex++;
    }

    Stack.prototype.pop = function(nMove = 0, pMove = null) {
        if (this.m_nIndex <= 0)
            throw `Stack.pop Error: Stack.m_nIndex <= 0`;
        if (typeof nMove == "object")
            nMove[0] = this.m_Stack[this.m_nIndex].nMove;
        if (typeof pMove == "object")
            pMove[0] = this.m_Stack[this.m_nIndex].pMove;
    }
    
    exports.Stack = Stack;
})))
/*
let s = new Stack();
*/