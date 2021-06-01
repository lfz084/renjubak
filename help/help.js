"use strict";

const elemClick = (() => {

    let seting = false;

    function listClick(elem, depth) {

        if (getFirstChildNode(elem, undefined, 1).style.display == "none") {
            focusElement(elem);
            showList(elem, depth);
        }
        else {
            hideList(elem, depth);
            focusElement(elem);
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


const focusElement = (() => {
    let busy = false;
    let focusDiv = document.createElement("div");

    let s = focusDiv.style;
    s.position = "relative";
    s.top = "0px";
    s.width = "750px";
    s.height = "100px";
    return (elem) => {
        if (busy) return;
        busy = true;
        if (elem && elem.childNodes) {
            focusDiv.setAttribute("class", "hideFocus");
            elem.insertBefore(focusDiv, elem.childNodes[0]);
            setTimeout(() => {
                focusDiv.parentNode.removeChild(focusDiv);
            }, 700);
        }
        setTimeout(() => {
            busy = false;
        }, 1000);
    }

})();



function showList(elem, depth) {

    console.log("showlist-" + depth);
    if (!elem) return;
    const CHILD_NODES = elem.childNodes;
    const UL_LIST_STYLE = ["none", "disc", "circle", "square", "disc", "circle", "square"];
    const OL_LIST_STYLE = ["none", "decimal", "decimal-leading-zero", "lower-alpha", "upper-alpha", "lower-roman", "upper-roman"];
    for (let i in CHILD_NODES) {
        const NODE_TYPE = CHILD_NODES[i].nodeType;
        const NODE_NAME = CHILD_NODES[i].nodeName;
        if (NODE_TYPE == 1) {
            let value = NODE_NAME == "LI" ? "list-item" : "block";
            CHILD_NODES[i].style.display = value;
            if (NODE_NAME == "LI") {
                CHILD_NODES[i].style.listStyle = elem.nodeName == "UL" ?
                    UL_LIST_STYLE[depth % UL_LIST_STYLE.length] : OL_LIST_STYLE[depth % OL_LIST_STYLE.length];
            }
        }
        else if (NODE_TYPE == 3) {
            const TOHIDE_TXT = "⇦ ... . . . .";
            const TOSHOW_TXT = ". . . . ... ➪ 点  我";
            const NODE_VALUE = CHILD_NODES[i].nodeValue;
            const ISTOSHOW = NODE_VALUE.indexOf(TOSHOW_TXT) == 0;
            CHILD_NODES[i].nodeValue = ISTOSHOW ?
                TOHIDE_TXT : CHILD_NODES[i].nodeValue;
        }
    }
}



function hideList(elem, depth) {

    console.log("hide")
    if (!elem) return;
    const CHILD_NODES = elem.childNodes;
    for (let i in CHILD_NODES) {
        const NODE_TYPE = CHILD_NODES[i].nodeType;
        const NODE_NAME = CHILD_NODES[i].nodeName;
        if (NODE_TYPE == 1) {
            CHILD_NODES[i].style.display = "none";
        }
        else if (NODE_TYPE == 3) {
            const TOHIDE_TXT = "⇦ ... . . . .";
            const TOSHOW_TXT = ". . . . ... ➪ 点  我";
            const NODE_VALUE = CHILD_NODES[i].nodeValue;
            const ISTOHIDE = NODE_VALUE.indexOf(TOHIDE_TXT) == 0;
            CHILD_NODES[i].nodeValue = ISTOHIDE ?
                TOSHOW_TXT : CHILD_NODES[i].nodeValue;
        }
    }
}



function getFirstChildNode(parentNode, nodeNameList = ["###defoult###defoult###"], nodeType = "defoult") {

    const CHILD_NODES = parentNode.childNodes;
    for (let i in CHILD_NODES) {
        if (CHILD_NODES[i]) {
            const NODE_NAME = CHILD_NODES[i].nodeName;
            const NODE_TYPE = CHILD_NODES[i].nodeType;
            if (nodeNameList.indexOf(NODE_NAME) + 1 || NODE_TYPE === nodeType) {
                return CHILD_NODES[i];
            }
        }
    }
}



const hashControl = (() => {
    let busy = false;
    return () => {
        if (busy) return;
        busy = true;
        const HASH = window.location.hash;
        console.log(HASH)
        if (HASH != "#1" && HASH) {

            const ID = HASH.slice(1);
            const ELEM = document.getElementById(ID);
            const FIRST_LIST = getFirstChildNode(ELEM, ["UL", "OL"]);

            let node = getFirstChildNode(FIRST_LIST, ["LI"]);
            if (node && node.style.display == "none") {
                elemClick(node.parentNode, 1, true);
            }
            ELEM.setAttribute("id", "1");
            window.location.hash = "#1";
            ELEM.setAttribute("id", ID);
            focusElement(FIRST_LIST);
        }
        setTimeout(() => {
            busy = false;
        }, 1000);
    };
})();



window.onhashchange = function() {
    hashControl();
}

document.body.onload = function() {

    setView();
    mapUL(document.body);
    window.onhashchange();

    function mapUL(elem, depth = 0) {
        const CHILD_NODES = elem.childNodes;
        for (let i in CHILD_NODES) {
            if (CHILD_NODES[i]) {
                const NODE_NAME = CHILD_NODES[i].nodeName;
                if (["OL", "UL", "H4"].indexOf(NODE_NAME) + 1) {
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

        const CHILD_NODES = elem.childNodes;
        for (let i in CHILD_NODES) {
            if (CHILD_NODES[i]) {
                const NODE_NAME = CHILD_NODES[i].nodeName;
                if (NODE_NAME == "LI") {
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
                else if (i == 0 && NODE_NAME == "#text") {
                    const TOHIDE_TXT = "...";
                    const NEW_TOSHOW_TXT = "⇦ ... . . . .";
                    const NODE_VALUE = CHILD_NODES[i].nodeValue;
                    const ISTOHIDE = NODE_VALUE.indexOf(TOHIDE_TXT) == 0;
                    CHILD_NODES[i].nodeValue = ISTOHIDE ? NEW_TOSHOW_TXT : NODE_VALUE;
                }
            }
        }
        if (ELEM_NAME == "UL" || ELEM_NAME == "OL") {
            elemClick(elem, depth, true);
        }
    }
}

function setView(width = 800) {
    const ELEM_LIST = document.getElementsByName("viewport");
    const VIEW = ELEM_LIST ? ELEM_LIST[0] : document.createElement("meta");
    let dw = document.documentElement.clientWidth;
    let dh = document.documentElement.clientHeight;
    let sw = window.screen.width;
    let sh = window.screen.height;
    let max = sw > sh ? sw : sh;
    let min = sw < sh ? sw : sh;
    let scale = (dw > dh ? max : min) / width;
    document.head.appendChild(VIEW);
    VIEW.setAttribute("content", `width=${width}, initial-scale=${scale}, minimum-scale=${scale}, maximum-scale =${scale}, user-scalable=${"no"}`);
}