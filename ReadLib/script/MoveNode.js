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

    const BOARD_TEXT = 0x000100;

    const DOWN = 0x000080;
    const RIGHT = 0x000040;
    const OLD_COMMENT = 0x000020;
    const MARK = 0x000010;
    const COMMENT = 0x000008;
    const START = 0x000004;
    const NO_MOVE = 0x000002;
    const EXTENSION = 0x000001;

    const MASK = 0xFFFF3F;
    const NullPoint = new Point(0, 0);

    function isValid(Pos) {
        return (Pos.x == NullPoint.x && Pos.y == NullPoint.y) ||
            (Pos.x >= 1 && Pos.x <= 15 && Pos.y >= 1 && Pos.y <= 15);
    }

    function bit_is_one(bit_value, value) {
        return ((value & bit_value) != 0);
    }

    function set_bit(bit_value, value) {
        value |= bit_value;
        return value;
    }

    function clear_bit(bit_value, value) {
        value &= ~bit_value;
        return value;
    }

    function PosToPoint(pos) {
        if (pos == 0) {
            return new Point(0, 0);
        }
        else {
            return new Point(pos % 16, pos / 16 + 1)
        }
    }

    function PointToPos(point) {
        if (isValidPoint(point)){
            return 16 * (point.y-1) + point.x;
        }
        else{
            return 0;
        }
    }
    
    function isValidPoint(point) {
        return point.x >= 1 && point.x <= 15 && point.y >= 1 && point.y <= 15;
    }



    class MoveNode {
        constructor(mPos) {
            let name = typeof mPos=="object" ? mPos.constructor.name : undefined;
            if (name == "Point") {
                this.mPos = mPos;
                this.mInfo = 0;
                if (!isValid(mPos))
                    throw `MoveNode Error: mPos error`;
            }
            else if (name == "MoveNode") {
                this.mPos = mPos.mPos;
                this.mInfo = mPos.mInfo;
                if (!isValid(mPos))
                    throw `MoveNode Error: mPos error`;
            }
            else {
                this.mPos = NullPoint;
                this.mInfo = 0;
            }
            
            this.mMatch = 0;

            this.mOneLineComment = "";
            this.mMultiLineComment = "";
            this.mBoardText = "";

            this.mDown = 0;
            this.mRight = 0;
        }
    }

    MoveNode.prototype.checkExtension = function() {
        this.setIsExtension((this.mInfo & 0xFFFF00) != 0);
    }

    MoveNode.prototype.isValue = function(bitValue) {
        return bit_is_one(bitValue, (this.mInfo));
    }

    MoveNode.prototype.setValue = function(value, bitValue) {
        if (value) {
            this.mInfo = set_bit(bitValue, this.mInfo);
        }
        else {
            this.mInfo = clear_bit(bitValue, this.mInfo);
        }
    }

    MoveNode.prototype.setPos = function(pos) {
        this.mPos = pos;
        this.setIsMove(true);
    }

    MoveNode.prototype.getPos = function() {
        return this.mPos;
    }

    MoveNode.prototype.setPosInfo = function(pos, info) {
        this.mPos = PosToPoint(pos);
        this.mInfo = (this.mInfo & 0xFFFF00) | info;
    }

    MoveNode.prototype.getPosInfo = function() {
        return {
            pos: PointToPos(this.mPos),
            info: this.mInfo & 0xFF
        };
    }
    
    MoveNode.prototype.setExtendedInfo = function(info2, info1) {
        this.mInfo &= 0xFF;
        this.mInfo |= ((info2 << 8) | info1) << 8;
    }
    
    MoveNode.prototype.getExtendedInfo = function() {
        return {
            info2: (this.mInfo >> 16) & 0xFF,
            info1: (this.mInfo >> 8) & 0xFF
        }
    }
    
    MoveNode.prototype.clearInformation = function() {
        this.mInfo = 0;
    }
    
    MoveNode.prototype.isInformation = function() {
        return (this.mInfo & MASK) != 0;
    }
    
    MoveNode.prototype.isDown = function() {
        return this.isValue(DOWN);
    }
    
    MoveNode.prototype.setIsDown = function(value) {
        this.setIsValue(value, DOWN);
    }
    
    MoveNode.prototype.isRight = function() {
        return this.isValue(RIGHT);
    }
    
    MoveNode.prototype.setIsRight = function(value) {
        this.setIsValue(value, RIGHT);
    }
    
    MoveNode.prototype.isOldComment = function() {
        return this.isValue(OLD_COMMENT);
    }
    
    MoveNode.prototype.isNewComment = function() {
        return this.isValue(COMMENT);
    }
    
    MoveNode.prototype.setIsNewComment = function(value) {
        this.setIsValue(value, COMMENT);
        this.setIsValue(false, OLD_COMMENT);
    }
    
    MoveNode.prototype.isMark = function() {
        return this.isValue(MARK);
    }
    
    MoveNode.prototype.setIsMark = function(value) {
        this.setIsValue(value, MARK);
    }
    
    MoveNode.prototype.isStart = function() {
        return this.isValue(START);
    }
    
    MoveNode.prototype.setIsStart = function(value) {
        this.setIsValue(value, START);
    }
    
    MoveNode.prototype.isMove = function() {
        return !this.isValue(NO_MOVE);
    }

    exports.Point = Point;
    exports.MoveNode = MoveNode;
    
    let n = new MoveNode();
    n.setPosInfo(1,256*55)
    let {info2, info1, info} = n.getExtendedInfo();
    
    console.log(info1)

})))