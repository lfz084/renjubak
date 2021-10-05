"use strict"
if (self.SCRIPT_VERSIONS) self.SCRIPT_VERSIONS["work_ReadLib"] = "v1006.00";

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

/*
cmd = [alert | log | warn | info | error | addBranch | addBranchArray | createTree | addTree | loading | finish ...]
*/

function post(cmd, param) {
    if (typeof cmd == "object" && cmd.constructor.name == "Error")
        postMessage(cmd)
    else
        postMessage({ "cmd": cmd, "parameter": param })
}


let renLibDoc = new CRenLibDoc(),
    m_libfile = new LibraryFile();

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

function openLib(file) {
    getArrBuf(file)
        .then(function(buf) {
            return new Promise(function(resolve, reject) {
                if (m_libfile.open(buf)) {
                    if (renLibDoc.addLibrary(m_libfile)) {
                        post("finish");
                        resolve()
                    }
                    else
                        reject(new Error("addLibrary Error"))
                    m_libfile.close();
                }
                else
                    reject(new Error("m_libfile Open Error"))
            })
        })
        .then(function() {
            return new Promise(function(resolve, reject) {
                try {
                    let path = renLibDoc.getAutoMove();
                    if (path.length) {
                        post("autoMove", path);
                    }
                    else {
                        let position = [];
                        for (let i = 0; i < 15; i++) {
                            position[i] = [];
                            for (let j = 0; j < 15; j++) {
                                position[i][j] = 0;
                            }
                        }
                        showBranchs({ path: [], position: position })
                    }
                    resolve()
                }
                catch (err) {
                    reject(err)
                }
            })
        })
        .catch(function(err) {
            postMessage(err)
        })
}

function showBranchs(param) {
    let rt = renLibDoc.getBranchNodes(param.path);
    rt.position = param.position;
    post("showBranchs", rt);
}

function setCenterPos(point){
    renLibDoc.setCenterPos(point);
}

let bf = [];
const CMD = {
    openLib: openLib,
    showBranchs: showBranchs,
    setCenterPos: setCenterPos
}
onmessage = function(e) {
    if (e.data) {
        let cmd = e.data.cmd,
            param = e.data.parameter;
        typeof CMD[cmd] == "function" && CMD[cmd](param);
    }
}