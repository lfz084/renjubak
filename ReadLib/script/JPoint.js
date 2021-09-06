(function(global, factory) {
    (global = global || self, factory(global));
}(this, (function(exports) {
    'use strict';
    //console.log(exports);
    class JPoint {
        constructor(x, y) {
            this.x = parseInt(x);
            this.y = parseInt(y);
        }
    }
    
    exports.JPoint = JPoint;
})))