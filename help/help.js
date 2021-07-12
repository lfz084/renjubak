"use strict";

window.console = window.top.console;

const topImage = (() => {

    let busy = false;
    let topDocument, topDiv, topImg;
    let startX = 0,
        startY = 0;

    function resetTopImage() {
        topDocument = window.top.document;
        topDiv = topDocument.createElement("div");
        topImg = topDocument.createElement("img");
        topDocument.body.appendChild(topDiv);
        topDiv.appendChild(topImg);

        topDiv.addEventListener("touchstart", (event) => {
            startX = event.changedTouches[0].pageX;
            startY = event.changedTouches[0].pageY;
        }, true);

        topDiv.addEventListener("touchend", (event) => {
            let tX = event.changedTouches[0].pageX;
            let tY = event.changedTouches[0].pageY;
            if ((Math.abs(startX - tX) < 30) && (Math.abs(startY - tY) < 30)) {
                close();
            }
        }, true);

        topDiv.onclick = () => {
            close();
        }
    }

    function close() {

        topDiv.setAttribute("class", "hide");
        setTimeout(() => {
            topDiv.style.zIndex = -99999;
            busy = false;
        }, 1000)
    }
    return (img) => {
        if (busy) return;
        busy = true;
        if (!topDocument) {
            resetTopImage();
        }
        let padding = img.width > img.height ? img.width : img.height;
        let dw = topDocument.documentElement.clientWidth;
        let dh = topDocument.documentElement.clientHeight;
        let scaleWidth = dw / img.width;
        let scaleHeight = dh / img.height;
        let minScale = scaleWidth < scaleHeight ? scaleWidth : scaleHeight;

        let s = topDiv.style;
        s.position = "fixed";
        s.left = -padding + "px";
        s.top = -padding + "px";
        s.width = dw + padding * 2 + "px";
        s.height = dh + padding * 2 + "px";
        s.backgroundColor = "black";
        s.zIndex = 99999;

        s = topImg.style;
        s.position = "absolute";
        s.left = (dw - img.width * minScale) / 2 + padding + "px";
        s.top = (dh - img.height * minScale) / 2 + padding + "px";
        s.width = img.width * minScale + "px";
        s.height = img.height * minScale + "px";
        topImg.src = img.src;

        topDiv.setAttribute("class", "show");
        topDiv.focus();

    }
})();


const elemClick = (() => {

    let busy = false;

    return (elem, fast) => {

        if (!fast && busy) return;
        busy = !fast;
        const NODE_NAME = elem.nodeName;
        if (NODE_NAME == "UL" || NODE_NAME == "OL") {
            listClick(elem, fast);
        }
        if (busy) setTimeout(() => {
            busy = false;
        }, 1000);
    }

})();



const listClick = (() => {

    let busy = false;
    return (elem, fast) => {

        if (!fast && busy) return;
        busy = !fast;
        if (getFirstChildNode(elem, undefined, 1).style.display == "none") {
            showList(elem);
            if (!fast) {
                scrollToElement(elem);
                focusElement(elem);
            }
        }
        else {
            hideList(elem);
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

    return (elem) => {

        if (busy) return;
        busy = true;
        if (elem && elem.childNodes) {
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
        //console.log(`scrollToElement`)
        if (!fast && busy) return;
        busy = !fast;
        if (elem && elem.nodeType == 1) {

            //console.log(`scrollHeight = ${elem.scrollHeight}`)
            const p = getAbsolutePos(elem);
            //console.log(`x=${p.x}, p.y=${p.y}`)
            scrollToAnimation(p.y - 15);
            setFocus(elem);
        }
        if (busy) setTimeout(() => {
            busy = false;
        }, 1000);
    };
})();



window.scrollToAnimation = (() => {

    let moves = [];
    let animationFrameScroll = null;
    let targetScrollTop = 0;
    let tempScrollTop = 0;

    function scrollTo() {

        tempScrollTop += moves.splice(0, 1)[0];
        setScrollY(tempScrollTop);
        if (moves.length) {
            animationFrameScroll = requestAnimationFrame(scrollTo);
        }
        else {
            cancelAnima();
        }
    }

    function cancelAnima() {

        //console.log(`cancel \n getScrollY= +${tempScrollTop}, targetScrollTop=${targetScrollTop}`)
        cancelAnimationFrame(animationFrameScroll);
        moves = [];
        animationFrameScroll = null;
        targetScrollTop = 0;
        tempScrollTop = 0;
    }

    return (top) => {
        console.log(`scroll animation`)
        cancelAnima();
        targetScrollTop = top;
        tempScrollTop = getScrollY();
        //console.log(`getScrollY= +${tempScrollTop}, targetScrollTop=${targetScrollTop}`)
        moves = getScrollPoints(targetScrollTop - tempScrollTop);
        scrollTo();
    }
})();



const setFocus = (() => {
    let busy = false;
    let focusH = document.createElement("H4");
    return (elem) => {
        if (busy) return;
        busy = true;
        if (elem && elem.nodeType == 1 && elem != focusH) {

            focusH.removeAttribute("class", "cancelFocus");
            focusH = elem;
            focusH.setAttribute("class", "focus");
        }
        else {
            const firstUL = getFirstChildNode(focusH, ["UL", "OL"]);
            const firstLI = getFirstChildNode(firstUL, ["LI"]);
            if (firstLI && firstLI.style.display == "none") {
                focusH.removeAttribute("class", "cancelFocus");
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



window.getAbsolutePos = (el) => {
    var r = { x: el.offsetLeft, y: el.offsetTop };
    if (el.offsetParent) {
        var tmp = getAbsolutePos(el.offsetParent);
        r.x += tmp.x;
        r.y += tmp.y;
    }
    return r;
}


window.getScrollPoints = (move) => {

    const PAR = 1.28;
    const PAR2 = move < 0 ? 2 : 1;
    const MAX_MOVE = 5000;
    const HALF = move / 2;
    let sum = Math.abs(HALF);
    let tempMove = 0;
    let tempMoves = [0]; //保证最少有一个
    while (sum) {
        tempMove = Math.pow(tempMove, PAR) * PAR2 || 2;
        tempMove = tempMove > MAX_MOVE ? MAX_MOVE : tempMove;
        tempMoves.push(tempMove);
        sum -= tempMove;
        if (sum < tempMove) {
            tempMoves[tempMoves.length - 1] = tempMoves[tempMoves.length - 1] + sum;
            sum = 0;
        }
    }

    let rtHs = [];
    for (let i = 0; i < tempMoves.length; i++) {
        rtHs.push(parseInt(tempMoves[i] * (move < 0 ? -1 : 1) * 10) / 10);
    }
    for (let i = tempMoves.length - 1; i >= 0; i--) {
        rtHs.push(parseInt(tempMoves[i] * (move < 0 ? -1 : 1) * 10) / 10);
    }

    console.log(String(rtHs))
    return rtHs;
}


window.getScrollY = () => {
    //console.log("doc.h" + document.documentElement.scrollTop + "\nbody.scH=" + document.body.scrollTop);
    return document.documentElement.scrollTop || document.body.scrollTop || 0;
}


window.setScrollY = (top) => {

    let t = document.documentElement.scrollTop;
    if (t !== undefined && t != top) {
        document.documentElement.scrollTop = top;
    }
    t = document.body.scrollTop;
    if (t !== undefined && t != top) {
        document.body.scrollTop = top;
    }
}



window.setScrollHeight = () => {}; // ios set iframe Height



function showList(elem) {

    if (!elem) return;
    const UL_LIST_STYLE = ["none", "disc", "circle", "square", "disc", "circle", "square"];
    const OL_LIST_STYLE = ["none", "decimal", "decimal-leading-zero", "lower-alpha", "upper-alpha", "lower-roman", "upper-roman"];
    if (["H4"].indexOf(elem.nodeName) + 1) {
        let firstList = getFirstChildNode(elem, ["UL", "OL"]);
        showChildNode(firstList, getListDepth(firstList), firstList.nodeName);
    }
    else {
        showChildNode(elem, getListDepth(elem), elem.nodeName);
    }
    showParentNodes(elem);
    if (["UL", "OL"].indexOf(elem.nodeName) + 1) {
        elem.setAttribute("class", "showList");
    }
    setScrollHeight();

    function showNode(node, depth) {

        const NODE_TYPE = node.nodeType;
        const NODE_NAME = node.nodeName;
        if (NODE_TYPE == 1) {
            let value = NODE_NAME == "LI" ? "list-item" : "block";
            node.style.display = value;
            if (NODE_NAME == "LI") {
                node.style.listStyle = getListName(node) == "UL" ?
                    UL_LIST_STYLE[depth % UL_LIST_STYLE.length] : OL_LIST_STYLE[depth % OL_LIST_STYLE.length];
            }
        }
        else if (NODE_TYPE == 3) {
            const TOHIDE_TXT = "⇦ ";
            const TOSHOW_TXT = "➪ 点  我";
            const NODE_VALUE = node.nodeValue;
            const ISTOSHOW = NODE_VALUE.indexOf(TOSHOW_TXT) == 0;
            node.nodeValue = ISTOSHOW ?
                TOHIDE_TXT : node.nodeValue;
        }
    }

    function showChildNode(elem, depth) {

        const CHILD_NODES = elem.childNodes;
        for (let i in CHILD_NODES) { // show childNode
            showNode(CHILD_NODES[i], depth);
        }
    }

    function showParentNodes(elem) {

        let pNode = elem.parentNode;
        while (pNode && pNode != document.body) {
            const NODE_NAME = pNode.nodeName;
            //console.log(NODE_NAME + getListDepth(pNode))
            if (["OL", "UL"].indexOf(NODE_NAME) + 1) {
                showChildNode(pNode, getListDepth(pNode), NODE_NAME);
            }
            pNode = pNode.parentNode;
        }
    }

}



function hideList(elem) {

    if (!elem) return;
    const CHILD_NODES = elem.childNodes;
    for (let i in CHILD_NODES) {
        const NODE_TYPE = CHILD_NODES[i].nodeType;
        const NODE_NAME = CHILD_NODES[i].nodeName;
        if (NODE_TYPE == 1) {
            CHILD_NODES[i].style.display = "none";
        }
        else if (NODE_TYPE == 3) {
            const TOHIDE_TXT = "⇦ ";
            const TOSHOW_TXT = "➪ 点  我";
            const NODE_VALUE = CHILD_NODES[i].nodeValue;
            const ISTOHIDE = NODE_VALUE.indexOf(TOHIDE_TXT) == 0;
            CHILD_NODES[i].nodeValue = ISTOHIDE ?
                TOSHOW_TXT : CHILD_NODES[i].nodeValue;
        }
    }
    if (["UL", "OL"].indexOf(elem.nodeName) + 1) {
        elem.setAttribute("class", "hideList");
    }
    setScrollHeight();
}



function getListDepth(elem, depth = 0) {

    let listName = null;
    let pNode = elem;
    let pNodeName = pNode.nodeName;
    while (pNode && pNode != document.body) {

        if (["OL", "UL"].indexOf(pNodeName) + 1) {
            if (listName === null) {
                listName = pNodeName;
                depth++;
            }
            else {
                if (listName == pNodeName) {
                    depth++;
                }
                else {
                    break;
                }
            }
        }
        pNode = pNode.parentNode;
        pNodeName = pNode.nodeName;
    }
    return depth;
}



function getListName(elem) {

    if (!elem || elem.nodeName != "LI") return;
    elem = elem.parentNode;
    while (elem && elem != document.body) {
        if (elem.nodeName == "UL") {
            return "UL";
        }
        else if (elem.nodeName == "OL") {
            return "OL";
        }
        elem = elem.parentNode;
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
        if (HASH != "#1" && HASH != "#0") {

            if (HASH) {
                const ID = HASH.slice(1);
                const ELEM = document.getElementById(ID);
                const FIRST_LIST = getFirstChildNode(ELEM, ["UL", "OL"]);

                let node = getFirstChildNode(FIRST_LIST, ["LI"]);
                if (node && node.style.display == "none") {
                    console.log(`hashChange elemClick`);
                    elemClick(node.parentNode, true);
                }

                focusElement(ELEM);
                scrollToElement(ELEM);
                
            }
            else {
                const FIRST_NODE = getFirstChildNode(document.body, undefined, 1);
                scrollToElement(FIRST_NODE);
            }
        }
        setTimeout(() => {
            busy = false;
        }, 1000);
    };
})();



window.onhashchange = function(event) {
    //console.log(`onhashchang`)
    setTimeout(hashControl, 1000);
}


document.body.onload = function() {

    //if (window.parent == window.self) setView();
    document.body.setAttribute("class", "finish");
    const iHTML = document.body.innerHTML;
    document.body.innerHTML = "";
    let dDiv = createDocumentDiv();
    createTop(dDiv);
    createBody(iHTML, dDiv);
    createButtom(dDiv);
    window.onhashchange();
    //alert(`${document.documentElement.clientWidth}, ${document.documentElement.clientHeight}`)
    console.log(`parentWindow=${window.parent==window.self}`);

}



window.setView = (doc = document, width = 800) => {

    const ELEM_LIST = doc.getElementsByName("viewport");
    const VIEW = ELEM_LIST[0] || doc.createElement("meta");
    let dw = doc.documentElement.clientWidth;
    let dh = doc.documentElement.clientHeight;
    let sw = window.screen.width;
    let sh = window.screen.height;
    let max = sw > sh ? sw : sh;
    let min = sw < sh ? sw : sh;
    let scale = (dw > dh ? max : min) / width;
    doc.head.appendChild(VIEW);
    VIEW.setAttribute("name", "viewport");
    VIEW.setAttribute("content", `initial-scale=${self.scale+0.01} `);
    VIEW.setAttribute("content", `width=${width}, initial-scale=${scale}, minimum-scale=${scale}, maximum-scale =${scale*3}, user-scalable=${"yes"}`);

}



function createDocumentDiv(parentNode = document.body) {

    const D_DIV = document.createElement("div");
    D_DIV.setAttribute("class", "documentDiv");
    parentNode.appendChild(D_DIV);
    center(D_DIV);
    return D_DIV;
}


function createTop(parentNode = document.body) {

    const TOP_DIV = document.createElement("div");
    TOP_DIV.setAttribute("class", "topDiv");
    //TOP_DIV.innerHTML = `<a onclick="window.open('./renjuhelp.html','_self')"><< 首页</a>`;
    parentNode.appendChild(TOP_DIV);
}


function createBody(iHTML, parentNode = document.body) {

    const BODY_DIV = document.createElement("div");
    const DEFOULT_HEIGHT =
        BODY_DIV.setAttribute("class", "bodyDiv");
    BODY_DIV.innerHTML = iHTML;
    mapUL(BODY_DIV);
    parentNode.appendChild(BODY_DIV);
    //console.log(`BODY_DIV.height=${BODY_DIV.scrollHeight}`);

    function mapUL(elem) {
        const CHILD_NODES = elem.childNodes;
        for (let i in CHILD_NODES) {
            if (CHILD_NODES[i]) {
                const NODE_NAME = CHILD_NODES[i].nodeName;
                if (["OL", "UL"].indexOf(NODE_NAME) + 1) {
                    mapLI(CHILD_NODES[i], NODE_NAME);
                }
                else if (["B", "H4", "H3", "DIV"].indexOf(NODE_NAME) + 1) {
                    mapLI(CHILD_NODES[i]);
                }

            }
        }
    }

    function mapLI(elem, listName) {
        const ELEM_NAME = elem.nodeName;
        if (["UL", "OL"].indexOf(ELEM_NAME) + 1) {
            elem.onclick = () => { // if not ListClick to cancel
                elemClick(elem);
            }
        }
        else if (ELEM_NAME == "A") {
            const HASH = elem.getAttribute("href");
            if (HASH.indexOf("#") == 0) {
                const ID = HASH.slice(1);
                elem.removeAttribute("href")
                elem.onclick = () => {
                    //event.preventDefault();
                    const TARGET_ELEM = document.getElementById(ID);
                    const FIRST_NODE = getFirstChildNode(TARGET_ELEM, ["UL", "OL"]);
                    elemClick(elem); //cancel parentNode click event
                    showList(TARGET_ELEM);
                    scrollToElement(TARGET_ELEM);
                    focusElement(TARGET_ELEM);
                }
            }
        }
        else if (ELEM_NAME == "IMG") {
            elem.onclick = () => { // if not ListClick to cancel
                elemClick(elem);
                topImage(elem);
            }
        }

        const CHILD_NODES = elem.childNodes;
        for (let i in CHILD_NODES) {
            if (CHILD_NODES[i]) {
                const NODE_NAME = CHILD_NODES[i].nodeName;
                if (NODE_NAME == "UL" || NODE_NAME == "OL") {
                    if (ELEM_NAME == listName) {
                        mapLI(CHILD_NODES[i], listName);
                    }
                    else {
                        listName = ELEM_NAME;
                        mapLI(CHILD_NODES[i], listName);
                    }
                }
                else if (["LI", "A", "IMG", "MARK", "PS", "B", "DIV", "TEXT"].indexOf(NODE_NAME) + 1) {
                    mapLI(CHILD_NODES[i], listName);
                }
                else if (i == 0 && NODE_NAME == "#text") {
                    const TOHIDE_TXT = "...";
                    const NEW_TOSHOW_TXT = "⇦ ";
                    const NODE_VALUE = CHILD_NODES[i].nodeValue.replace(/^\s*/g, "");
                    const ISTOHIDE = NODE_VALUE.indexOf(TOHIDE_TXT) == 0;
                    CHILD_NODES[i].nodeValue = ISTOHIDE ? NEW_TOSHOW_TXT : NODE_VALUE;
                }
            }
        }
        if (ELEM_NAME == "UL" || ELEM_NAME == "OL") {
            elemClick(elem, true);
        }
    }
}


function createButtom(parentNode = document.body) {
    const BUTTOM_DIV = document.createElement("div");
    BUTTOM_DIV.setAttribute("class", "buttomDiv");
    //BUTTOM_DIV.innerHTML = `<a onclick="window.open('./renjuhelp.html','_self')"><< 首页</a>`;
    parentNode.appendChild(BUTTOM_DIV);
}


function center(elem) {

    if (window.parent == window.self) {
        const DW = document.documentElement.clientWidth;
        const ELEM_WIDTH = 800;
        elem.style.position = "absolute";
        elem.style.left = (DW - ELEM_WIDTH) / 2 + `px`;
    }

}