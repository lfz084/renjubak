"use strict";

const elemClick = (() => {

    let busy = false;

    return (elem, depth, fast) => {

        if (!fast && busy) return;
        busy = !fast;
        const NODE_NAME = elem.nodeName;
        if (NODE_NAME == "UL" || NODE_NAME == "OL") {
            listClick(elem, depth, fast);
        }
        if (busy) setTimeout(() => {
            busy = false;
        }, 1000);
    }

})();


const listClick = (() => {

    let busy = false;
    return (elem, depth, fast) => {

        if (!fast && busy) return;
        busy = !fast;
        if (getFirstChildNode(elem, undefined, 1).style.display == "none") {
            showList(elem, depth);
            if (!fast) {
                scrollToElement(getTopNode(elem));
                focusElement(elem);
            }
        }
        else {
            hideList(elem, depth);
            if (!fast) {
                focusElement(elem);
                setFocus();
            }
        }
        if (busy) setTimeout(() => {
            busy = false;
        }, 1000);
    }
})();


const focusElement = (() => {
    let busy = false;
    let focusDiv = document.createElement("div");
    let focusDiv1 = document.createElement("div");
    let s = focusDiv.style;
    let s1 = focusDiv1.style;
    s.position = s1.position = "relative";
    s.top = s1.top = "0px";
    //s.width = s1.width = "750px";
    //s.height = s1.height = "100px";
    return (elem) => {
        if (busy) return;
        busy = true;
        if (elem && elem.childNodes) {
            //alert("focus")
            focusDiv.setAttribute("class", "hideFocus");
            focusDiv1.setAttribute("class", "hideFocus");
            elem.insertBefore(focusDiv, elem.childNodes[0]);
            elem.appendChild(focusDiv1);
            setTimeout(() => {
                focusDiv.parentNode.removeChild(focusDiv);
                focusDiv1.parentNode.removeChild(focusDiv1);
            }, 700);
        }
        setTimeout(() => {
            busy = false;
        }, 1000);
    }

})();


const scrollToElement = (() => {

    let busy = false;

    return (elem, fast) => {

        if (!fast && busy) return;
        busy = !fast;
        if (elem && elem.nodeType == 1) {
            const ID = elem.getAttribute("id");
            elem.setAttribute("id", "1");
            //linkTo("#1");
            window.location.hash = "#1";
            elem.setAttribute("id", ID);
            window.location.hash = "#0";
            console.log(`scrollHeight = ${elem.scrollHeight}`)
            const p = getAbsolutePos(elem);
            console.log(`x=${p.x}, p.y=${p.y}`)
            setFocus(elem);
        }
        if (busy) setTimeout(() => {
            busy = false;
        }, 1000);
    };
})();



const setFocus = (() => {
    let busy = false;
    let focusH = document.createElement("H4");
    return (elem) => {
        if (busy) return;
        busy = true;
        if (elem && elem.nodeType == 1) {
            focusH.setAttribute("class", "cancelFocus");
            focusH = elem;
            focusH.setAttribute("class", "focus");
        }
        else {
            const firstUL = getFirstChildNode(focusH, ["UL", "OL"]);
            const firstLI = getFirstChildNode(firstUL, ["LI"]);
            if (firstLI && firstLI.style.display == "none") {
                focusH.setAttribute("class", "cancelFocus");
            }
        }
        setTimeout(() => {
            busy = false;
        }, 1000);
    }
})();



const linkTo = (() => {

    let busy = false;
    const LINK = document.createElement("a");
    document.body.appendChild(LINK);

    function link(url = "#", target = "_self") {

        LINK.href = url;
        LINK.target = target;
        LINK.click();
    }
    return (url, target) => {
        if (busy) return;
        busy = true;
        link(url, target);
        setTimeout(() => {
            busy = false;
        }, 1000);
    }
})();



function getAbsolutePos(el) {
    var r = { x: el.offsetLeft, y: el.offsetTop };
    if (el.offsetParent) {
        var tmp = getAbsolutePos(el.offsetParent);
        r.x += tmp.x;
        r.y += tmp.y;
    }
    return r;
}



function showList(elem, depth) {

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
    if (["UL", "OL"].indexOf(elem.nodeName) + 1) {
        elem.setAttribute("class", "showList");
    }

}



function hideList(elem, depth) {

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
    if (["UL", "OL"].indexOf(elem.nodeName) + 1) {
        elem.setAttribute("class", "hideList");
    }
}



function getFirstChildNode(parentNode, nodeNameList = ["###defoult###defoult###"], nodeType = "defoult") {

    if (!parentNode) return;
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


function getTopNode(elem) {
    let depth = 10;
    while (depth--) {
        const CLASS_NANE = elem.parentNode.getAttribute("class");
        if (CLASS_NANE == "bodyDiv") {
            return elem;
        }
        elem = elem.parentNode;
    }
}



const hashControl = (() => {
    let busy = false;
    return () => {
        if (busy) return;
        busy = true;
        const HASH = window.location.hash;
        console.log(HASH)
        if (HASH != "#1" && HASH != "#0" && HASH) {

            const ID = HASH.slice(1);
            const ELEM = document.getElementById(ID);
            const FIRST_LIST = getFirstChildNode(ELEM, ["UL", "OL"]);

            let node = getFirstChildNode(FIRST_LIST, ["LI"]);
            if (node && node.style.display == "none") {
                elemClick(node.parentNode, 1, true);
            }

            scrollToElement(ELEM);
            focusElement(FIRST_LIST);
        }
        setTimeout(() => {
            busy = false;
        }, 1000);
    };
})();



window.onhashchange = function(event) {

    hashControl();
}

document.body.onload = function() {

    setView();
    const iHTML = document.body.innerHTML;
    document.body.innerHTML = "";
    createTop();
    createBody(iHTML);
    createButtom();
    setTimeout(() => {
        window.onhashchange();
    }, 1000);

}



function setView(width = 800) {

    const ELEM_LIST = document.getElementsByName("viewport");
    const VIEW = ELEM_LIST[0] || document.createElement("meta");
    let dw = document.documentElement.clientWidth;
    let dh = document.documentElement.clientHeight;
    let sw = window.screen.width;
    let sh = window.screen.height;
    let max = sw > sh ? sw : sh;
    let min = sw < sh ? sw : sh;
    let scale = (dw > dh ? max : min) / width;
    document.head.appendChild(VIEW);
    VIEW.setAttribute("name", "viewport");
    VIEW.setAttribute("content", `initial-scale=${self.scale+0.01} `);
    VIEW.setAttribute("content", `width=${width}, initial-scale=${scale}, minimum-scale=${scale}, maximum-scale =${scale}, user-scalable=${"no"}`);
}


function createTop() {

    const TOP_DIV = document.createElement("div");
    TOP_DIV.setAttribute("class", "topDiv");
    TOP_DIV.innerHTML = "";
    document.body.appendChild(TOP_DIV);
}


function createBody(iHTML) {

    const BODY_DIV = document.createElement("div");
    BODY_DIV.setAttribute("class", "bodyDiv");
    BODY_DIV.innerHTML = iHTML;
    mapUL(BODY_DIV);
    document.body.appendChild(BODY_DIV);

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
        if (["UL", "OL"].indexOf(ELEM_NAME) + 1) {
            elem.onclick = () => { // if not ListClick to cancel
                alert(elem)
                elemClick(elem, depth);
            }
        }
        else if (ELEM_NAME == "A") {
            const ID = elem.getAttribute("href").slice(1);
            elem.removeAttribute("href")
            elem.onclick = () => {
                //event.preventDefault();
                alert(ID)
                const TARGET_ELEM = document.getElementById(ID);
                const FIRST_NODE = getFirstChildNode(TARGET_ELEM, ["UL", "OL"]);
                elemClick(elem, depth); //cancel parentNode click event
                showList(FIRST_NODE, 1);
                scrollToElement(getTopNode(TARGET_ELEM));
                focusElement(FIRST_NODE);
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
                else if (["A","IMG","MARK","PS"].indexOf(NODE_NAME)+1) {
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


function createButtom() {
    const BUTTOM_DIV = document.createElement("div");
    BUTTOM_DIV.setAttribute("class", "buttomDiv");
    BUTTOM_DIV.innerHTML = "";
    document.body.appendChild(BUTTOM_DIV);
}