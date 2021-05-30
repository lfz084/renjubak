"use strict";
const elemClick = (() => {

    let seting = false;

    function listClick(elem, depth) {
        const CHILD_NODES = elem.childNodes;
        const UL_LIST_STYLE = ["none", "disc", "circle", "square", "disc", "circle", "square"];
        const OL_LIST_STYLE = ["none", "decimal", "decimal-leading-zero", "lower-alpha", "upper-alpha", "lower-roman", "upper-roman"];
        for (let i in CHILD_NODES) {
            const NODE_TYPE = CHILD_NODES[i].nodeType;
            const NODE_NAME = CHILD_NODES[i].nodeName;
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
                CHILD_NODES[i].nodeValue = ISTOHIDE ?
                    TOSHOW_TXT :
                    ISTOSHOW ?
                    TOHIDE_TXT : CHILD_NODES[i].nodeValue;
            }
        }
    }
    return (elem, depth, fast) => {
        if (!fast && seting) return;
        seting = true;
        const NODE_NAME = elem.nodeName;
        if (NODE_NAME == "UL" || NODE_NAME == "OL") {
            listClick(elem, depth);
        }
        setTimeout(() => { seting = false; }, 500);
    }

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
            }
        }
    }

    function mapLI(elem, depth) {
        const ELEM_NAME = elem.nodeName;
        if (
            ELEM_NAME == "UL" ||
            ELEM_NAME == "OL" ||
            ELEM_NAME == "A"
        ) {
            elem.onclick = () => { // if not ListClick to cancel 
                elemClick(elem, depth);
            }
        }
        if (ELEM_NAME == "UL" || ELEM_NAME == "OL") {
            elem.style.color = "#555";
        }
        const CHILD_NODES = elem.childNodes;
        for (let i in CHILD_NODES) {
            if (CHILD_NODES[i]) {
                const NODE_NAME = CHILD_NODES[i].nodeName;
                if (NODE_NAME == "LI") {
                    CHILD_NODES[i].style.fontWeight = "bold";
                    mapLI(CHILD_NODES[i], depth);
                }
                else if (NODE_NAME == "UL" || NODE_NAME == "OL") {
                    mapLI(CHILD_NODES[i], ELEM_NAME == NODE_NAME ? depth + 1 : depth);
                }
                else if (NODE_NAME == "A" ||
                    NODE_NAME == "IMG" ||
                    NODE_NAME == "MARK" ||
                    NODE_NAME == "PS"
                ) {
                    mapLI(CHILD_NODES[i], depth);
                }
            }
        }
        if (ELEM_NAME == "UL" || ELEM_NAME == "OL") {
            elemClick(elem, depth, true);
        }
    }
}