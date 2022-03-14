if (self.SCRIPT_VERSIONS) self.SCRIPT_VERSIONS["worker"] = "v1202.12";
(function(global, factory) {
    (global = global || self, factory(global));
}(this, (function(exports) {
    'use strict';
    //console.log(exports);

    if ("importScripts" in self)
        self.importScripts('emoji.js', `EvaluatorJScript.js`, `EvaluatorWebassembly.js`, `Evaluator.js`);

    const MSG_RESOLVE = { cmd: "resolve" };
    const COMMAND = {
        findVCF: function({ arr, color, maxVCF, maxDepth, maxNode }) {
            findVCF(arr, color, maxVCF, maxDepth, maxNode);
            post({cmd: "vcfInfo", param: {vcfInfo: vcfInfo}})
            post(MSG_RESOLVE);
        }
    };

    function onmessage(e) {
        /*let i = 0,
            timer = setInterval(() => {
                if (i++ < 30) post({ cmd: "log", param: i });
                else post(MSG_RESOLVE);
            }, 1000);*/

        if (typeof COMMAND[e.data.cmd] == "function") COMMAND[e.data.cmd](e.data.param);
        else throw new Error("Worker onmessage Error");
    }

    function post({ cmd, param }) {
        postMessage({ cmd: cmd, param: param });
    }
    
    exports.onmessage = onmessage;
    exports.post = post;
})))
