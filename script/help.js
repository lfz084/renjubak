"use strict";
const setLI = (() => {
    let seting = false;
    return (elem, depth, fast) => {
        if (!fast && seting) return;
        seting = true;
        const CHILD_NODES = elem.childNodes;
        const UL_LIST_STYLE = ["none", "disc", "circle", "square", "disc", "circle", "square"];
        const OL_LIST_STYLE = ["none", "decimal", "decimal-leading-zero", "lower-alpha", "upper-alpha", "lower-roman", "upper-roman"];
        for (let i in CHILD_NODES) {
            const NODE_TYPE = CHILD_NODES[i].nodeType;
            const NODE_NAME = CHILD_NODES[i].nodeName;
            if (CHILD_NODES[i]) {
                if (NODE_TYPE == 1) {
                    let value = CHILD_NODES[i].style.display == "none" ?
                        NODE_NAME == "LI" ? "list-item" : "block" :
                        "none";
                    CHILD_NODES[i].style.display = value;
                    if (NODE_NAME == "LI") {
                        CHILD_NODES[i].style.listStyle = elem.nodeName == "UL" ?
                            UL_LIST_STYLE[depth % UL_LIST_STYLE.length] : OL_LIST_STYLE[depth % OL_LIST_STYLE.length];
                    }
                }
                else if (NODE_TYPE == 3) {
                    const TOHIDE_TXT = "...";
                    const TOSHOW_TXT = "( · · ·  ☛ 点 我  · · · )";
                    const NODE_VALUE = CHILD_NODES[i].nodeValue;
                    const ISTOHIDE = NODE_VALUE.indexOf(TOHIDE_TXT) == 0;
                    const ISTOSHOW = NODE_VALUE.indexOf(TOSHOW_TXT) == 0;
                    //console.log(`___${NODE_VALUE}__`)
                    CHILD_NODES[i].nodeValue = ISTOHIDE ?
                        TOSHOW_TXT :
                        ISTOSHOW ?
                        TOHIDE_TXT : CHILD_NODES[i].nodeValue;

                }
            }
        }
        setTimeout(() => { seting = false; }, 500);
    };
})();
document.body.onload = function() {
    mapUL(document.body);

    function mapUL(elem, depth = 0) {
        const CHILD_NODES = elem.childNodes;
        for (let i in CHILD_NODES) {
            if (CHILD_NODES[i]) {
                const NODE_NAME = CHILD_NODES[i].nodeName;
                if (NODE_NAME == "UL" || NODE_NAME == "OL") {
                    mapLI(CHILD_NODES[i], depth + 1);
                }
                else if (NODE_NAME == "A" || NODE_NAME=="IMG") {
                    mapLI(CHILD_NODES[i], depth);
                }
            }
        }
    }

    function mapLI(elem, depth) {
        elem.onclick = () => { // elem.nodeName == ["UL" || "OL" || "A"], if == "A" to cancel 
            setLI(elem, depth);
        }

        const CHILD_NODES = elem.childNodes;
        for (let i in CHILD_NODES) {
            if (CHILD_NODES[i]) {
                const NODE_NAME = CHILD_NODES[i].nodeName;
                if (NODE_NAME == "UL" || NODE_NAME == "OL") {
                    mapLI(CHILD_NODES[i], elem.nodeName == NODE_NAME ? depth + 1 : depth);
                }
                else if (NODE_NAME == "A" || NODE_NAME== "IMG") {
                    mapLI(CHILD_NODES[i], depth);
                }
            }
        }
        if (elem.nodeName == "UL" || elem.nodeName == "OL") {
            setLI(elem, depth, true);
        }
    }
}