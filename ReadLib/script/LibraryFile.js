(function(global, factory) {
    (global = global || self, factory(global));
}(this, (function(exports) {
    'use strict';
    //console.log(exports);
    const BUFFERSIZE = 1024;
    
    const HEADER_SIZE = 20;
    
    const MAJOR_FILE_VERSION_INDEX = 8;
    const MINOR_FILE_VERSION_INDEX = 9;
    
    const MAJOR_FILE_VERSION = 3;
    const MINOR_FILE_VERSION = 4;
    
    const MAJOR_FILE_VERSION_H8 = 3;
    const MINOR_FILE_VERSION_OLD = 0;
    
    const CENTER = 0x78;
    
    const UINT_MAX = 4294967295;

    class LibraryFile {
        constructor() {
            this.cFile = undefined;
            this.m_buffer = new ArrayBuffer(BUFFERSIZE);
            this.m_indexStart = 0;
            this.m_indexEnd = 0;
            this.m_mode = UINT_MAX;
            this.m_Version;
            this.m_MajorFileVersion = 0;
            this.m_MinorFileVersion = 0;
        }
    }
})))