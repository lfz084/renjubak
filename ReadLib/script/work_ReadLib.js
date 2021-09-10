"use strict"
if (self.importScripts)
    self.importScripts(
        "./UNICODE2GBK.js",
        //"./GB2312-UTF8.js",
        "./JFile.js",
        "./JPoint.js",
        "./LibraryFile.js",
        "./MoveList.js",
        "./MoveNode.js",
        "./Stack.js",
        "./RenLibDoc.js",
        "../../script/RenjuTree.js")
else
    throw new Error("self.importScripts is undefined")


self.post = function(cmd, param) {
    postMessage({ "cmd": cmd, "parameter": param });
}


let renLibDoc = new CRenLibDoc(),
    m_libfile = new LibraryFile();

m_libfile.onRead = function(e) {
    if (e.current % (1024 * 128) == 20)
        postMessage(`${e.current}/${e.end}`)
}

function getArrBuf(file) {
    return new Promise(function(resolve, reject) {
        let fr = new FileReader();
        fr.onload = function() {
            resolve(fr.result);
        }
        fr.onerror = function(err) {
            reject(err)
        }
        fr.readAsArrayBuffer(file);
    });
}


onmessage = function(e) {
    //postMessage(e.data)
    let file = e.data;

    getArrBuf(file)
        .then(function(buf) {
            return new Promise(function(resolve, reject) {
                if (m_libfile.open(buf)) {
                    if (renLibDoc.addLibrary(m_libfile))
                        resolve()
                    else
                        reject(new Error("addLibrary Error"))
                }
                else
                    throw new Error("m_libfile Open Error")
            })
        })
        .then(function() {
            postMessage("finish")
            postMessage({ cmd: "addTree", parameter: renLibDoc.toRenjuTree() });
        })
        .catch(function(err) {
            postMessage(err)
        })
}