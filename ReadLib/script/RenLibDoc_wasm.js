if (self.SCRIPT_VERSIONS) self.SCRIPT_VERSIONS["RenLibDoc"] = "v1006.00";
(function(global, factory) {
    (global = global || self, factory(global));
}(this, (function(exports) {
    'use strict';
    //console.log(exports);

    const NullPoint = new JPoint(0, 0);
    const Center = new JPoint(8, 8);

    const MajorProgramVersion = 3;
    const MinorProgramVersion = 6;

    const BugFixProgramVersion = 0;

    const Year = 2006;
    const Month = 7;
    const Day = 16;

    const Version = (Year * 100 + Month) * 100 + Day;

    let strEmpty = "";

    const XY_6_6 = 6 + 5 * 16;
    const XY_7_6 = 7 + 5 * 16;
    const XY_8_6 = 8 + 5 * 16;
    const XY_9_6 = 9 + 5 * 16;
    const XY_10_6 = 10 + 5 * 16;

    const XY_6_7 = 6 + 6 * 16;
    const XY_7_7 = 7 + 6 * 16;
    const XY_8_7 = 8 + 6 * 16;
    const XY_9_7 = 9 + 6 * 16;
    const XY_10_7 = 10 + 6 * 16;

    const XY_6_8 = 6 + 7 * 16;
    const XY_7_8 = 7 + 7 * 16;
    const XY_8_8 = 8 + 7 * 16;
    const XY_9_8 = 9 + 7 * 16;
    const XY_10_8 = 10 + 7 * 16;

    const XY_6_9 = 6 + 8 * 16;
    const XY_7_9 = 7 + 8 * 16;
    const XY_8_9 = 8 + 8 * 16;
    const XY_9_9 = 9 + 8 * 16;
    const XY_10_9 = 10 + 8 * 16;

    const XY_6_10 = 6 + 9 * 16;
    const XY_7_10 = 7 + 9 * 16;
    const XY_8_10 = 8 + 9 * 16;
    const XY_9_10 = 9 + 9 * 16;
    const XY_10_10 = 10 + 9 * 16;

    let intervalPost = new IntervalPost();

    function PointToPos(point) {
        if (isValidPoint(point)) {
            return 16 * (point.y - 1) + point.x;
        }
        else {
            return 0;
        }
    }

    function isValidPoint(point) {
        return point.x >= 1 && point.x <= 15 && point.y >= 1 && point.y <= 15;
    }

    function LessThan(Left, Right) {
        return PointToPos(Left) < PointToPos(Right);
    }


    //-------------------------------------------

    let centerPos = { x: 8, y: 8 };

    function Point2Idx(point) {
        return point.x - 1 + (point.y - 1) * 15;
    }

    function Idx2Point(idx) {
        let x = idx % 15,
            y = ~~(idx / 15);
        return { x: x + 1, y: y + 1 }
    }

    function getIdx(pMove) {
        return pMove.mPos.x - 1 + (pMove.mPos.y - 1) * 15;
    }

    function rotate90(point) {
        let x = centerPos.x - point.x,
            y = centerPos.y - point.y;
        return { x: centerPos.x + y, y: centerPos.y - x }
    }

    function rotate180(point) {
        let x = centerPos.x - point.x,
            y = centerPos.y - point.y;
        return { x: centerPos.x + x, y: centerPos.y + y }
    }

    function rotate270(point) {
        let x = centerPos.x - point.x,
            y = centerPos.y - point.y;
        return { x: centerPos.x - y, y: centerPos.y + x }
    }

    function reflectX(point) {
        return { x: point.x, y: centerPos.y * 2 - point.y }
    }

    function normalizeCoord(point, nMatch) {
        switch (nMatch) {
            case 0:
            case 4:
                break;
            case 1:
            case 5:
                point = rotate270(point);
                break;
            case 2:
            case 6:
                point = rotate180(point);
                break;
            case 3:
            case 7:
                point = rotate90(point);
                break;
        }
        if (nMatch > 3) point = reflectX(point);
        return point;
    }

    function transposeCoord(point, nMatch) {
        if (nMatch > 3) point = reflectX(point);
        switch (nMatch) {
            case 0:
            case 4:
                break;
            case 1:
            case 5:
                point = rotate90(point);
                break;
            case 2:
            case 6:
                point = rotate180(point);
                break;
            case 3:
            case 7:
                point = rotate270(point);
                break;
        }
        return point;
    }

    class Node {
        constructor(idx, txt = "", color = "black") {
            this.idx = idx;
            this.txt = txt;
            this.color = color;
        }
    }

    class CRenLibDoc {
        constructor() {
            this.m_MoveList = new MoveList();
            this.m_file;

            this.nodeCount = 0;
        }
    }

    CRenLibDoc.prototype.setCenterPos = function(point) {
        centerPos.x = point.x;
        centerPos.y = point.y;
        post("alert", `棋谱大小改为: ${centerPos.x*2-1} × ${centerPos.y*2-1} \n中心点已改为: x = ${centerPos.x}, y = ${centerPos.y}`)
    }

    CRenLibDoc.prototype.readNewComment = function(libFile, pStrOneLine = [0], pStrMultiLine = [0]) {
        let buffer = new Uint8Array(2),
            strNew = [];

        pStrOneLine[0] = "";
        pStrMultiLine[0] = "";

        while (true) {
            libFile.get(buffer);

            if (buffer[0] == 0) {
                break;
            }

            strNew.push(buffer[0]);

            if (buffer[1] == 0) {
                break;
            }

            strNew.push(buffer[1]);
        }

        strNew = bufferGBK2Unicode(strNew)
        post("log", `${strNew}`)
        let n = strNew.indexOf(String.fromCharCode(10));
        if (n == -1) {
            pStrOneLine[0] = strNew;
        }
        else {
            pStrOneLine[0] = strNew.slice(0, n);
            pStrMultiLine[0] = strNew.slice(n + 1);
        }
    }

    CRenLibDoc.prototype.readBoardText = function(libFile, pStrBoardText = []) {
        let buffer = new Uint8Array(2);

        let strNew = [];

        while (true) {

            libFile.get(buffer);

            if (buffer[0] == 0) {
                break;
            }

            strNew.push(buffer[0]);

            if (buffer[1] == 0) {
                break;
            }

            strNew.push(buffer[1]);
        }
        strNew.length > 3 ? strNew.length = 3 : strNew;
        pStrBoardText[0] = bufferGBK2Unicode(strNew);
        //post("log", strNew)
        //post("log", `${strNew[0].toString(16)}${strNew[1].toString(16)} => ${pStrBoardText[0].charCodeAt(0).toString(16)}`)
        //post("log", pStrBoardText[0])

        /*
        let bufStr = new Uint8Array(pStrBoardText[0])
        let code = new Uint16Array([bufStr[0] << 8 | bufStr[1]])
        console.log(code)
        console.log(code[0].toString(16))
        console.log(bufStr)
        let u16 = ab2str_16(bufStr)
        console.log(new Uint16Array(str2ab(u16))[0].toString(16))
        console.log(u16)
        */
    }


    CRenLibDoc.prototype.addLibrary = function(libFile, FullTree) {
        post("log", "addLibrary")
        if (!libFile.checkVersion()) {
            throw new Error(`不是五子棋棋谱`)
            return false;
        }

        let m_Stack = new Stack();

        let number = 0;

        let pCurrentMove = 0;

        if (this.m_MoveList.isEmpty()) {
            //console.log("m_MoveList.isEmpty")
            pCurrentMove = new MoveNode(NullPoint);
            this.m_MoveList.setRoot(pCurrentMove);
        }
        else {
            //console.log("m_MoveList.isEmpty = false")
            pCurrentMove = this.m_MoveList.getRoot();
            this.m_MoveList.setRootIndex();
        }

        let pFirstMove = 0;
        let pNextMove;

        let nComments = 0;
        let nBoardTexts = 0;
        let nMarks = 0;
        let nNewMoves = 0;

        let bMark = [false];
        let bMove = [false];
        let bStart = [false];

        let checkRoot = true;

        let next = new MoveNode();

        while (libFile.get(next)) {

            const Point = new JPoint(next.getPos());
            //post("log", next.getPos())
            intervalPost.post("loading", { current: libFile.m_file.m_current, end: libFile.m_file.m_end, count: number })
            if (Point.x == NullPoint.x && Point.y == NullPoint.y) {
                // Skip root node
                post("log", "Skip root node")
                if (checkRoot)
                    checkRoot = false;
                else
                    continue;
            }
            else if ((Point.x != 0 || Point.y != 0) && (Point.x < 1 || Point.x > 15 || Point.y < 1 || Point.y > 15)) {
                // ERROR checking code
                /*
                CString strMessage;
                strMessage += Utils::GetString(IDS_MSG_LIBRARY_DATA, number);
                strMessage += "\n";
                strMessage r+= Utils::GetString(IDS_MSG_POSITION, next.getPos());
                strMessage += "\n\n";
                strMessage += Utils::GetString(IDS_MSG_REPORT);
                strMessage += "\n\n";
                strMessage += Utils::GetString(IDS_MSG_NOTE);
                Utils::ShowMessage(strMessage, Utils::GetString(IDS_CAP_ADD_TABLE), MB_ICONERROR);
                */
                next.setPos(new JPoint(1, 1));
                next.setIsMark(true);
                //SetModifiedFlag();
                post("error", "Point err")
                return false;
            }
            else {
                number++;
                //console.log(`number=${number}`)

                pNextMove = this.getVariant(pCurrentMove, next.getPos());

                if (pNextMove) {
                    //console.log(`pNextMove=${pNextMove}`)
                    pCurrentMove = pNextMove;
                }
                else {
                    //console.log(`pNextMove=0}`)
                    pNextMove = new MoveNode(next);

                    this.addMove(pCurrentMove, pNextMove);
                    pCurrentMove = pNextMove;

                    if (pCurrentMove.isMove()) {
                        nNewMoves++;

                        if (pFirstMove == 0) {
                            pFirstMove = pCurrentMove;
                        }
                    }
                }
                //console.log("list_add")
                this.m_MoveList.add(pCurrentMove);

            }

            if (next.isOldComment() || next.isNewComment()) {

                let pStrOneLine = [""];
                let pStrMultiLine = [""];

                if (next.isOldComment()) {
                    //console.log("readOldComment")
                    this.readOldComment(libFile, pStrOneLine, pStrMultiLine);
                }
                else if (next.isNewComment()) {
                    //console.log("readNewComment")
                    this.readNewComment(libFile, pStrOneLine, pStrMultiLine);
                }

                if (this.addComment(pCurrentMove, pStrOneLine, pStrMultiLine)) {
                    nComments++;
                }
            }

            let strBoardText = [""];

            if (next.isBoardText()) {
                //console.log("readBoardText")
                this.readBoardText(libFile, strBoardText);
                //console.log("addBoardText")
                if (this.addBoardText(pCurrentMove, strBoardText[0])) {
                    nBoardTexts++;
                }
            }

            // Add attributes
            this.addAttributes(pCurrentMove, next, bMark, bMove, bStart);

            if (bMark[0] || next.isMark()) {
                nMarks++;
            }

            if (next.isDown()) {
                //console.log(`m_Stack.push ${this.m_MoveList.index()}`)
                m_Stack.push(this.m_MoveList.index());
            }

            if (next.isRight()) {
                if (!m_Stack.isEmpty()) {
                    let nMove = [0];
                    m_Stack.pop(nMove);
                    //console.log(`m_Stack.pop ${nMove[0]-1}`)
                    this.m_MoveList.setIndex(nMove[0] - 1);
                    pCurrentMove = this.m_MoveList.current();
                }
            }

        }

        post("loading", { current: libFile.current(), end: libFile.end(), count: number });
        post("info", `loop << number = ${number}`);
        if (number > 0) {
            this.m_MoveList.setRootIndex();
            this.m_MoveList.clearEnd();
            this.nodeCount = number;
        }

        //m_Board.setLastMove(Center);
        //SetPreviousVariant();

        let strInfo;

        if (FullTree) {
            //strInfo = Utils::GetString(IDS_READ_MOVES, nNewMoves);
        }
        else {
            /*
            strInfo = Utils::GetString(IDS_ADDED_MOVES, nNewMoves, number);
            
            if (nNewMoves || nComments || nMarks)
            {
                m_eMode = UPDATE_MODE;
                SetModifiedFlag();  
            }
            */
            if (pFirstMove) {
                //console.log("findMoveNode")
                this.findMoveNode(pFirstMove);
            }
        }

        /*
        strInfo += Utils::GetString(IDS_INFO_COMMENTS, nComments);
        strInfo += Utils::GetString(IDS_INFO_BOARD_TEXTS, nBoardTexts);
        strInfo += Utils::GetString(IDS_INFO_MARKS, nMarks);
        strInfo += Utils::GetString(IDS_INFO_FROM, libFile.GetFilePath());

        SetPaneText(strInfo);
        */
        return true;
    }


    //-----------------------------------------------------------
    CRenLibDoc.prototype.getBranchNodes = function(path) {

        function normalizeNodes(nodes, nMatch) {
            let idx,
                txt,
                rt = [];
            for (let i = 0; i < nodes.length; i++) {
                idx = Point2Idx(normalizeCoord(Idx2Point(nodes[i].idx), nMatch))
                txt = nodes[i].txt; //nMatch>0 && nodes[i].txt == "○" ? "●" : nodes[i].txt; 
                rt[i] = new Node(idx, txt, nMatch > 0 ? "green" : "black");
            }
            return rt;
        }

        function transposePath(path, nMatch) {
            let rt = [];
            for (let i = 0; i < path.length; i++) {
                rt[i] = Point2Idx(transposeCoord(Idx2Point(path[i]), nMatch))
            }
            return rt;
        }

        function findNode(pMove, idx) {
            while (pMove) {
                if (pMove.getPos().x - 1 + (pMove.getPos().y - 1) * 15 === idx) {
                    return pMove;
                }
                else if (pMove.getRight()) {
                    pMove = pMove.getRight();
                }
                else {
                    return null;
                }
            }
        }

        function getInnerHTML(pMove) {
            let iHTML = pMove.isOneLineComment() ? "<br>" + pMove.getOneLineComment() : "";
            iHTML += pMove.isMultiLineComment() ? "<br>" + String(pMove.getMultiLineComment()).split(String.fromCharCode(10)).join("<br>") : "";
            return iHTML;
        }

        function searchInnerHTMLInfo(path = []) {
            let pMove = this.m_MoveList.getRoot(),
                innerHTMLInfo = { innerHTML: getInnerHTML(this.m_MoveList.getRoot()), depth: -1 };
            for (let i = 0; i < path.length; i++) {
                if (pMove.getDown()) {
                    pMove = pMove.getDown();
                    pMove = findNode(pMove, path[i]);
                    if (pMove) {
                        let innerHTML = getInnerHTML(pMove);
                        if (innerHTML && i === path.length - 1) innerHTMLInfo = { innerHTML: innerHTML, depth: i };
                    }
                    else {
                        break;
                    }
                }
                else {
                    break;
                }
            }
            return innerHTMLInfo;
        }

        function getTXT(pMove) {
            return pMove.getBoardText() || "○";
        }

        function pushNodes(nodes1, nodes2) {
            function hasNode(nodes, node) {
                for (let i = 0; i < nodes.length; i++) {
                    if (nodes[i].idx === node.idx) return true
                }
                return false;
            }
            for (let i = nodes2.length - 1; i >= 0; i--) {
                if (hasNode(nodes1, nodes2[i])) nodes2.splice(i, 1);
            }
            return nodes1.concat(nodes2);
        }

        function _getBranchNodes(path) {
            let done = false,
                pMove = this.m_MoveList.getRoot().getDown(),
                nodes = [],
                jointNodes = [],
                jointNode = null,
                moveList = [],
                moveStack = [];
            while (!done) {
                if (pMove) {
                    let idx = path.indexOf(getIdx(pMove));
                    moveList.push(getIdx(pMove));

                    if (pMove.getRight() &&
                        moveList.length <= path.length + 1
                    ) {
                        moveStack.push({ pMove: pMove.getRight(), length: moveList.length - 1 });
                    }

                    if (moveList.length % 2 === (path.length + 1) % 2) {
                        if (idx === -1 ||
                            moveList.length % 2 !== (idx + 1) % 2
                        ) {
                            if (!jointNode) {
                                jointNode = { pMove: pMove, length: moveList.length - 1 }
                            }
                            else {
                                pMove = null;
                                continue;
                            }
                        }
                    }
                    else {
                        if (idx === -1 ||
                            moveList.length % 2 !== (idx + 1) % 2
                        ) {
                            pMove = false;
                            continue;
                        }
                    }

                    if ((idx === -1 ||
                            moveList.length % 2 === (idx + 1) % 2) &&
                        moveList.length <= path.length + 1
                    ) {
                        if (moveList.length === path.length + 1) {
                            if (idx === -1) {
                                nodes.push(new Node(getIdx(pMove), getTXT(pMove)));
                            }
                            else {
                                jointNodes.push(new Node(getIdx(jointNode.pMove), getTXT(pMove), "Purple"));
                            }
                        }
                        pMove = pMove.getDown();
                    }
                    else {
                        pMove = 0;
                    }
                }
                else if (moveStack.length) {
                    let node = moveStack.pop();
                    pMove = node.pMove;
                    moveList.length = node.length;
                    if (jointNode && moveList.length <= jointNode.length) jointNode = null;
                }
                else {
                    done = true;
                }
            }

            return jointNodes.concat(nodes);
        }

        let done = false,
            //pMove = this.m_MoveList.getRoot().getDown(),
            innerHTMLInfo = { innerHTML: "", depth: -2 },
            nodes = [],
            PH,
            NS,
            normalizeNS;
        post("log", `棋谱中心点为, x = ${centerPos.x}, y = ${centerPos.y}`)
        for (let i = 0; i < 8; i++) {
            //if (i==1) break;
            PH = transposePath(path, i);
            //post("log",`i=${i}, path=[${PH}]`)
            NS = _getBranchNodes.call(this, PH);
            //post("log",NS)
            normalizeNS = normalizeNodes(NS, i);
            //post("log",normalizeNS)
            nodes = pushNodes(nodes, normalizeNS);
            let info = searchInnerHTMLInfo.call(this, PH);
            if (info.depth > innerHTMLInfo.depth) innerHTMLInfo = info;
        }

        return { nodes: nodes, innerHTML: innerHTMLInfo.innerHTML };
    }


    CRenLibDoc.prototype.getAutoMove = function() {
        function getIdx(pMove) {
            return pMove.mPos.x - 1 + (pMove.mPos.y - 1) * 15;
        }
        let pMove = this.m_MoveList.getRoot(),
            path = [];
        while (pMove.getDown()) {
            pMove = pMove.getDown();
            if (!pMove.getRight()) {
                path.push(getIdx(pMove));
            }
            else {
                break;
            }
        }
        return path;
    }

    exports.CRenLibDoc = CRenLibDoc;
})))