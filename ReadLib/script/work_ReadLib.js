"use strict"
if (self.SCRIPT_VERSIONS) self.SCRIPT_VERSIONS["work_ReadLib"] = "v1031.01";

if (self.importScripts){
    self.importScripts(
        "../../script/IntervalPost.js",
        "../../script/RenjuTree.js",
        "./UNICODE2GBK.js",
        "./JFile.js",
        "./JPoint.js",
        "./LibraryFile.js",
        "./MoveList.js",
        "./MoveNode.js",
        "./Stack.js"
    );
    if(0 && WebAssembly && typeof WebAssembly.instantiate == "function"){
        self.importScripts("./RenLibDoc_wasm.js");
    }
    else{
        self.importScripts("./RenLibDoc.js");
    }
}
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


let renLibDoc = new CRenLibDoc();

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
             let rt = renLibDoc.addLibrary(buf);
             return rt;
        })
        .then(function(){
            post("finish");
            return Promise.resolve();
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

function setCenterPos(point) {  
    renLibDoc.setCenterPos(point);
}

function setBufferScale(scl){ // WebAssembly only
    typeof renLibDoc.setBufferScale == "function" &&
        renLibDoc.setBufferScale(scl);
}

let bf = [];
const CMD = {
    openLib: openLib,
    showBranchs: showBranchs,
    setCenterPos: setCenterPos,
    setBufferScale: setBufferScale
}
onmessage = function(e) {
    if (e.data) {
        let cmd = e.data.cmd,
            param = e.data.parameter;
        typeof CMD[cmd] == "function" && CMD[cmd](param);
    }
}