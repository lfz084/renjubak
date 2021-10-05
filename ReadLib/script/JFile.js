if (self.SCRIPT_VERSIONS) self.SCRIPT_VERSIONS["JFile"] = "v1006.00";
(function(global, factory) {
    (global = global || self, factory(global));
}(this, (function(exports) {
    'use strict';
    //console.log(exports);

    //const UINT_MAX = 4294967295;

    class JFile {
        constructor() {
            this.m_begin = 0;
            this.m_current = 0;
            this.m_end = 0;
            //this.m_mode = UINT_MAX;
            this.m_buffer = [];
            this.m_fileName = "";

            //event
            this.onRead = undefined;
        }
    }

    JFile.prototype.open = function(buffer, fileName = "") {
        this.m_begin = 0;
        this.m_current = 0;
        this.m_end = buffer.byteLength;
        this.m_buffer = new Uint8Array(buffer);
        this.m_fileName = fileName;
        return this.m_end;
    };

    JFile.prototype.close = function() {
        this.m_begin = 0;
        this.m_current = 0;
        this.m_end = 0;
        this.m_buffer = [];
        this.m_fileName = "";
    };

    JFile.prototype.read = function(lpBuf, nCount) {
        const BUF_LEN = lpBuf.length;
        let i;
        for (i = 0; i < BUF_LEN; i++) {
            //console.log([this.m_current, this.m_end])
            if (i >= nCount || this.m_current >= this.m_end) break;
            lpBuf[i] = this.m_buffer[this.m_current++];
        }
        //console.log(`lpBuf = [${lpBuf}]`)
        typeof this.onRead == "function" ?
            this.onRead({ current: this.m_current, end: this.m_end }) :
            this.onRead = undefined;
        return i;
    };
    
    JFile.prototype.seek = function(current) {
        if (current < 0 || current >= this.m_end)
            throw new Error("JFile seek() error")
        this.m_current = current;
    };

    JFile.prototype.seekToBegin = function() {
        this.m_begin = this.m_current;
    };

    JFile.prototype.write = function() {

    };

    JFile.prototype.getFilePath = function() {

    };

    JFile.prototype.getFileName = function() {
        return this.m_fileName;
    };
    
    
    
    
    //-----------------------------------------
    
    


    exports.JFile = JFile;
})))