(function(global, factory) {
    (global = global || self, factory(global));
}(this, (function(exports) {
    'use strict';
    //console.log(exports);
    class Point {
        constructor(x, y) {
            this.x = parseInt(x);
            this.y = parseInt(y);
        }
    }
    
    const NullPoint = new Point(0, 0);
    const Center = new Point(8, 8);
    
    const MajorProgramVersion = 3;
    const MinorProgramVersion = 6;
    
    const BugFixProgramVersion = 0;
    
    const Year = 2006;
    const Month = 7;
    const Day = 16;
    
    const Version = (Year * 100 + Month) * 100 + Day;
    
    let strEmpty = "";
    
    const XY_6_6 = 6 + 5 * 16;
    const XY_7_6 = 7 + 5 * 16;
    const XY_8_6 = 8 + 5 * 16;
    const XY_9_6 = 9 + 5 * 16;
    const XY_10_6 = 10 + 5 * 16;
    
    const XY_6_7 = 6 + 6 * 16;
    const XY_7_7 = 7 + 6 * 16;
    const XY_8_7 = 8 + 6 * 16;
    const XY_9_7 = 9 + 6 * 16;
    const XY_10_7 = 10 + 6 * 16;
    
    const XY_6_8 = 6 + 7 * 16;
    const XY_7_8 = 7 + 7 * 16;
    const XY_8_8 = 8 + 7 * 16;
    const XY_9_8 = 9 + 7 * 16;
    const XY_10_8 = 10 + 7 * 16;
    
    const XY_6_9 = 6 + 8 * 16;
    const XY_7_9 = 7 + 8 * 16;
    const XY_8_9 = 8 + 8 * 16;
    const XY_9_9 = 9 + 8 * 16;
    const XY_10_9 = 10 + 8 * 16;
    
    const XY_6_10 = 6 + 9 * 16;
    const XY_7_10 = 7 + 9 * 16;
    const XY_8_10 = 8 + 9 * 16;
    const XY_9_10 = 9 + 9 * 16;
    const XY_10_10 = 10 + 9 * 16;
    
    class CRenLibDoc {
        constructor() {
            this.m_MoveList = new MoveList();
            
        }
    }
})))