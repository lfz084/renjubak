"use strict"
if (self.SCRIPT_VERSIONS) self.SCRIPT_VERSIONS["work_ReadLib"] = "v0912.06";
/*
if (self.importScripts)
    self.importScripts(
        "../../script/IntervalPost.js",
        "../../script/RenjuTree.js",
        "./UNICODE2GBK.js",
        "./JFile.js",
        "./JPoint.js",
        "./LibraryFile.js",
        "./MoveList.js",
        "./MoveNode.js",
        "./Stack.js",
        "./RenLibDoc.js"
        )
else
    throw new Error("self.importScripts is undefined")
*/
/*
cmd = [alert | log | warn | info | error | addBranch | addBranchArray | createTree | addTree | loading | finish ...]
*/

function post(cmd, param) {
    if(typeof cmd == "object" && cmd.constructor.name=="Error")
        postMessage(cmd)
    else
        postMessage({ "cmd": cmd, "parameter": param })
}

/*
let renLibDoc = new CRenLibDoc(),
    m_libfile = new LibraryFile();
*/
/*
function getArrBuf(file) {
    return new Promise(function(resolve, reject) {
        let fr = new FileReader();
        fr.onload = function() {
            resolve(fr.result)
        };
        fr.onerror = function(err) {
            reject(err)
        };
        fr.readAsArrayBuffer(file)
    });
}
*/
/*
onmessage = function(e) {
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
                    reject(new Error("m_libfile Open Error"))
            })
        })
        .then(function() {
            return new Promise(function(resolve, reject) {
                try{
                    post("addTree",renLibDoc.toRenjuTree());
                    resolve()
                }
                catch(err){
                    reject(err)
                }
            })
        })
        .then(function() {
            post("finish")
        })
        .catch(function(err) {
            postMessage(err)
        })
        
}
*/