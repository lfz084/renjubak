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


    class CRenLibDoc {
        constructor() {
            this.m_MoveList = new MoveList();
            this.m_file
        }
    }

    CRenLibDoc.prototype.readOldComment = function(libFile, pStrOneLine = [], pStrMultiLine = []) {

        function msb(ch) {
            return (ch & 0x80);
        }

        let buffer = new Uint8Array(2);
        pStrOneLine[0] = "";
        pStrMultiLine[0] = "";

        while (true) {
            libFile.get(buffer);
            if (msb(buffer[0]) || msb(buffer[1])) break;
        }

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
        //postMessage(strNew)
        let n = -1 //strNew.indexOf(String.fromCharCode(10));
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
        //postMessage(strNew)
        //postMessage(`${strNew[0].toString(16)}${strNew[1].toString(16)} => ${pStrBoardText[0].charCodeAt(0).toString(16)}`)
        //postMessage(pStrBoardText[0])

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

    CRenLibDoc.prototype.findMoveNode = function(pMoveToFind) {
        let m_Stack = new Stack();

        let isFound = false;

        let pMove = [this.m_MoveList.getRoot()];
        this.m_MoveList.clearAll();

        let done = false;

        while (!done) {
            if (pMove[0]) {
                this.m_MoveList.add(pMove[0]);

                if (pMove[0] == pMoveToFind) {
                    isFound = true;
                    break;
                }

                if (pMove[0].getRight()) {
                    m_Stack.push(this.m_MoveList.index(), pMove[0].getRight());
                }

                pMove[0] = pMove[0].getDown();
            }
            else if (!m_Stack.isEmpty()) {
                let nMove = [0];
                m_Stack.pop(nMove, pMove[0]);
                this.m_MoveList.setIndex(nMove[0] - 1);
            }
            else {
                this.m_MoveList.setRootIndex();
                pMove[0] = this.m_MoveList.current();
                done = true;
            }
        }

        //m_Board.SetLastMove(pMove[0].getPos());
        //SetPreviousVariant();

        // Clear end of move list
        this.m_MoveList.clearEnd();

        return isFound;
    }

    CRenLibDoc.prototype.getVariant = function(pMove = new MoveNode(), Pos) {

        if (pMove.getDown()) {
            pMove = pMove.getDown();

            if (pMove.getPos().x == Pos.x && pMove.getPos().y == Pos.y) return pMove;

            while (pMove.getRight()) {
                pMove = pMove.getRight();
                if (pMove.getPos().x == Pos.x && pMove.getPos().y == Pos.y) return pMove;
            }
        }

        return 0;
    }

    CRenLibDoc.prototype.addMove = function(pMove = new MoveNode(), pNewMove = new MoveNode()) {
        //console.log("addMove")
        if (pMove.getDown() == 0) {
            //console.log("addMove 1")
            pMove.setDown(pNewMove);
            //pNewMove.setRight(0);
        }
        else {
            //console.log("addMove 2")
            if (LessThan(pNewMove.getPos(), pMove.getDown().getPos())) {
                //console.log("addMove 2.1")
                pNewMove.setRight(pMove.getDown());
                pMove.setDown(pNewMove);
            }
            else {
                //console.log("addMove 2.2")
                pMove = pMove.getDown();

                while (true) {
                    //console.log("addMove 2.3")
                    if (pMove.getRight() == 0) {
                        pMove.setRight(pNewMove);
                        //pNewMove.setRight(0);
                        break;
                    }
                    else if (LessThan(pNewMove.getPos(), pMove.getRight().getPos())) {
                        pNewMove.setRight(pMove.getRight());
                        pMove.setRight(pNewMove);
                        break;
                    }
                    pMove = pMove.getRight();
                }
            }
        }
    }

    CRenLibDoc.prototype.addComment = function(pMove, pStrOneLine = "", pStrMultiLine = "") {
        let isComment = false;

        if (pStrOneLine) {
            isComment = true;

            if (!pMove.getOneLineComment()) {
                pMove.setOneLineComment(pStrOneLine);
            }
            /*
            else if (pMove.getOneLineComment() != pStrOneLine[0]){
                m_SearchList.Add(SearchItem(pMove, pStrOneLine, SearchItem::ONE_LINE_COMMENT));
            }*/
        }

        if (pStrMultiLine) {
            isComment = true;

            if (!pMove.getMultiLineComment()) {
                pMove.setMultiLineComment(pStrMultiLine);
            }
            /*
            else if (pMove.getMultiLineComment() != pStrMultiLine[0] &&
                !Sgf::equalComment(pMove - > getMultiLineComment(), pStrMultiLine))
            {
                m_SearchList.Add(SearchItem(pMove, pStrMultiLine, SearchItem::MULTI_LINE_COMMENT));
            }*/
        }

        return isComment;
    }

    CRenLibDoc.prototype.addBoardText = function(pMove, boardText = "") {
        let isBoardText = false;

        if (boardText) {
            isBoardText = true;

            if (!pMove.getBoardText()) {
                pMove.setBoardText(boardText);
            }
            /*
            else if (pMove.getBoardText() != boardText){
                m_SearchList.Add(SearchItem(pMove, boardText, SearchItem::BOARD_TEXT));
            }*/
        }

        return isBoardText;
    }

    CRenLibDoc.prototype.addAttributes = function(pMove, pFrom, bMark = [], bMove = [], bStart = []) {

        bMark[0] = false;
        bMove[0] = false;
        bStart[0] = false;

        if (pFrom.isMark() && !pMove.isMark()) {
            bMark[0] = true;
            pMove.setIsMark(bMark[0]);
        }

        if (pFrom.isMove() && !pMove.isMove()) {
            bMove[0] = true;
            pMove.setIsMove(bMove[0]);
        }

        if (pFrom.isStart() && !pMove.isStart()) {
            bStart[0] = true;
            pMove.setIsStart(bStart[0]);
        }
    }


    CRenLibDoc.prototype.addLibrary = function(libFile, FullTree) {
        console.log("addLibrary")
        if (!libFile.checkVersion()) return false;

        let m_Stack = new Stack();

        let number = 0;

        let pCurrentMove = 0;

        if (this.m_MoveList.isEmpty()) {
            console.log("m_MoveList.isEmpty")
            pCurrentMove = new MoveNode(NullPoint);
            this.m_MoveList.setRoot(pCurrentMove);
        }
        else {
            console.log("m_MoveList.isEmpty = false")
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

            if (checkRoot && Point.x == NullPoint.x && Point.y == NullPoint.y) {
                // Skip root node
                checkRoot = false;
                console.log("checkRoot")
            }
            else if ((Point.x != 0 || Point.y != 0) && (Point.x < 1 || Point.x > 15 || Point.y < 1 || Point.y > 15)) {
                // ERROR checking code
                /*
                CString strMessage;
                strMessage += Utils::GetString(IDS_MSG_LIBRARY_DATA, number);
                strMessage += "\n";
                strMessage += Utils::GetString(IDS_MSG_POSITION, next.getPos());
                strMessage += "\n\n";
                strMessage += Utils::GetString(IDS_MSG_REPORT);
                strMessage += "\n\n";
                strMessage += Utils::GetString(IDS_MSG_NOTE);
                Utils::ShowMessage(strMessage, Utils::GetString(IDS_CAP_ADD_TABLE), MB_ICONERROR);
                */
                next.setPos(new JPoint(1, 1));
                next.setIsMark(true);
                //SetModifiedFlag();
                console.error("Point err")
                return false;
            }
            else {

                number++;
                //console.log(`number=${number}`)

                pNextMove = this.getVariant(pCurrentMove, next.getPos());

                if (pNextMove) {
                    console.log(`pNextMove=${pNextMove}`)
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
        postMessage(`loop << number = ${number}`)
        if (number > 0) {
            this.m_MoveList.setRootIndex();
            this.m_MoveList.clearEnd();
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


    CRenLibDoc.prototype.toRenjuTree = function(renjuTree = new RenjuTree()) {
        let m_Stack = new Stack();

        let pMove = [this.m_MoveList.getRoot()],
            rNode = renjuTree,
            r_MoveList = new MoveList();

        this.m_MoveList.clearAll();

        let done = false;
        postMessage("copying...")
        let t_start = new Date().getTime();
        let number = 0;
        while (!done) {
            if (pMove[0]) {
                number++
                if (number < 100 || new Date().getTime() - t_start > 1000) {
                    t_start = new Date().getTime();
                    postMessage(`${number}, ${this.m_MoveList.index()}, ${pMove[0].pos2Name(pMove[0].mPos) || " "}, ${pMove[0].mPos}`)
                    postMessage(`Stack = [${m_Stack.toArray("pMove")}]`)
                }

                if (this.m_MoveList.index() > -1) {
                    rNode = pMove[0].toRenjuNode();
                    r_MoveList.current().pushChildNode(rNode)
                }

                this.m_MoveList.add(pMove[0]);
                r_MoveList.add(rNode)

                if (pMove[0].getRight()) {
                    //postMessage("stack push")
                    m_Stack.push(this.m_MoveList.index(), pMove[0].getRight());
                }

                pMove[0] = pMove[0].getDown()
            }
            else if (!m_Stack.isEmpty()) {
                let nMove = [0];
                m_Stack.pop(nMove, pMove);
                this.m_MoveList.setIndex(nMove[0] - 1);
                r_MoveList.setIndex(nMove[0] - 1);
            }
            else {
                this.m_MoveList.setRootIndex();
                pMove[0] = this.m_MoveList.current();
                done = true;
            }
        }
        postMessage(`end number = ${number}, timer = ${new Date().getTime() - t_start}`)
        this.m_MoveList.clearEnd();
        return renjuTree;
    }


    exports.CRenLibDoc = CRenLibDoc;
})))