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

        Get(node) {
            function Get_Node(node) {
                node.setPos(new Point(0, 0));
                node.clearInformation();

                let data = new Uint8Array(2);

                let success = Get_Byte(data);

                if (success) {
                    node.setPosInfo(data);
                    if (node.isExtension()) {
                        success = Get_Byte(data);
                        node.setExtendedInfo(data);
                    }
                }
                return success;
            }

            function Get_Byte(data) {
                data[0] = 0;
                data[1] = 0;
                if (this.m_indexStart >= this.m_indexEnd) {
                    //...
                }
                data[0] = this.m_buffer[this.m_indexStart++];
                data[1] = this.m_buffer[this.m_indexStart++];
                return true;
            }
            
            if (node && node.length){
                if(node.length == 1){
                    return Get_Node(node)
                }
                else{
                    return Get_Byte(node)
                }
            }
        }
        checkVersion(){
            let VersionOk = false;
            let header = new Uint8Array(HEADER_SIZE);
            header = [0xFF, "R".charCodeAt(), "e".charCodeAt(), "n".charCodeAt(), "L".charCodeAt(), "i".charCodeAt(), "b".charCodeAt(), 0xFF]
            let buf = new Uint8Array(HEADER_SIZE);
        }
        
    }
})))