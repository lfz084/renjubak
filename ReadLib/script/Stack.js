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
            for (let i=0; i<SIZE; i++){
                this.m_Stack[i] = this.NullItem;
            }
        }
    }
    
    Stack.prototype.isEmpty = function(){
        return this.m_nIndex==0;
    }
    
    Stack.prototype.push = function(nMove, pMove) {
        function push_np(){
            
        }
        function push_n() {
        
        }
        function push_p() {
        
        }
    }
})))
