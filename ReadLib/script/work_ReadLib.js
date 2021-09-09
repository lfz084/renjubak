"use strict"
if (self.importScripts)
    self.importScripts(
        "./UNICODE2GBK.js",
        //"./GB2312-UTF8.js",
        //"./UTF8-UTF16.js",
        "./JFile.js",
        "./JPoint.js",
        "./LibraryFile.js",
        "./MoveList.js",
        "./MoveNode.js",
        "./Stack.js",
        "./RenLibDoc.js")
else
    throw new Error("self.importScripts is undefined")


self.post = function (cmd, param) {
    postMessage({ "cmd": cmd, "parameter": param });
}


let renLibDoc = new CRenLibDoc(),
    m_libfile = new LibraryFile();
    
    m_libfile.onRead = e =>{
        if(e.current % (1024 * 128) == 20)
            postMessage(`${e.current}/${e.end}`)
    }
    
function getArrBuf(file) {
    return new Promise((resolve, reject) => {
        let fr = new FileReader();
        fr.onload = () => {
            resolve(fr.result);
        }
        fr.onerror = err => {
            reject(err)
        }
        fr.readAsArrayBuffer(file);
    });
}


onmessage = function(e) {
    //postMessage(e.data)
    let file = e.data;
    
    getArrBuf(file)
        .then(buf => {
            return new Promise((resolve, rejice) => {
                try {
                    if (m_libfile.open(buf)){
                        renLibDoc.addLibrary(m_libfile)
                    }
                    else
                        throw new Error("m_libfile Open Error")
                    resolve()
                }
                catch (err) {
                    rejice(err.message)
                }
            })
        })
        .then(() => {
            postMessage("finish")
        })
        .catch(err => {
            postMessage(err)
        })
}