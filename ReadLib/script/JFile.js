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
        }
    }

    JFile.prototype.open = function(buffer, fileName = "") {
        this.m_begin = 0;
        this.m_current = 0;
        this.m_end = buffer.byteLength;
        this.m_buffer = new DataView(buffer);
        this.m_fileName = fileName;
        return this.m_end;
    }

    JFile.prototype.close = function() {
        this.m_begin = 0;
        this.m_current = 0;
        this.m_end = 0;
        this.m_buffer = [];
        this.m_fileName = "";
    }

    JFile.prototype.read = function(lpBuf, nCount) {
        const BUF_LEN = lpBuf.length;
        let i;
        for (i = 0; i < BUF_LEN; i++) {
            //console.log([this.m_current, this.m_end])
            if (i >= nCount || this.m_current >= this.m_end) break;
            lpBuf[i] = this.m_buffer.getUint8(this.m_current++);
        }
        //console.log(`lpBuf = [${lpBuf}]`)
        return i;
    }

    JFile.prototype.seekToBegin = function() {
        this.m_begin = this.m_current;
    }

    JFile.prototype.write = function() {

    }

    JFile.prototype.getFilePath = function() {

    }

    JFile.prototype.getFileName = function() {
        return this.m_fileName;
    }

    exports.JFile = JFile;
})))