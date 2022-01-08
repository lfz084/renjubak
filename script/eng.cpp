#define NULL 0
typedef unsigned char BYTE;
typedef unsigned int UINT; 
typedef unsigned short DWORD;

const UINT _ONE_KB = 1024;
const UINT _PAGE_SIZE = 1024*64; //64K
const UINT _IO_BUFFER_SIZE = _PAGE_SIZE;

const char DIRECTIONS[4] = {0, 1, 2, 3}; //[→, ↓, ↘, ↗]; // 米字线
const char FIND_ALL = 0;
const char ONLY_FREE = 1; // 只找活3，活4
const char ONLY_NOFREE = 2; // 只找眠3，眠4
const char ONLY_VCF = 1; // 只找做VCF点
const char ONLY_SIMPLE_WIN = 2; // 只找43级别做杀点

const char GOMOKU_RULES = 1; //无禁
const char RENJU_RULES = 2; //有禁

//---------------- color --------------------

const char BLACK_COLOR = 1;
const char WHITE_COLOR = 2;
const char INVERT_COLOR[3] = {0, 2, 1}; //利用数组反转棋子颜色

//---------------- level --------------------

const char LEVEL_WIN = 10;
const char LEVEL_FREEFOUR = 9;
const char LEVEL_NOFREEFOUR = 8;
const char LEVEL_DOUBLEFREETHREE = 7;
const char LEVEL_DOUBLEVCF = LEVEL_DOUBLEFREETHREE;
const char LEVEL_FREETHREE = 6;
const char LEVEL_VCF = LEVEL_FREETHREE;
const char LEVEL_VCT = 4;
const char LEVEL_NONE = 0;

//--------------- lineInfo ------------------

const short FREE = 1; //0b00000001
const short MAX = 14; //0b00001110
const short MAX_FREE = 15; //0b00001111
const short FOUL = 16; //0b00010000
const short FOUL_FREE = 17; //0b00010001
const short FOUL_MAX = 30; //0b00011110
const short FOUL_MAX_FREE = 31; //0b00011111
const short MARK_MOVE = 224; //0b11100000
const short FREE_COUNT = 0x0700; //0b00000111 00000000
const short ADD_FREE_COUNT = 0x800; //0b00001000 00000000
const short MAX_COUNT = 0x7000; //0b01110000 00000000
const short DIRECTION = 0x7000; //0b01110000 00000000
const short ADD_MAX_COUNT = 0x8000; //0b10000000 00000000
const short ZERO = 0;
const short ONE_FREE = 3;
const short ONE_NOFREE = 2;
const short TWO_FREE = 5;
const short TWO_NOFREE = 4;
const short THREE_FREE = 7;
const short THREE_NOFREE = 6;
const short FOUR_FREE = 9;
const short FOUR_NOFREE = 8;
const short LINE_DOUBLE_FOUR = 24;
const short FIVE = 10;
const short SIX = 28;
const short SHORT = 14; //空间不够


//  --------------------------  --------------------------
BYTE out_buffer[_IO_BUFFER_SIZE] = {0};
BYTE in_buffer[_IO_BUFFER_SIZE] = {0};

BYTE cBoardSize = 15;
BYTE gameRules = RENJU_RULES;

BYTE idxLists[4 * 29 * 43] = {0}; // = createIdxLists();
BYTE idxTable[226 * 29 * 4] = {0}; // = createIdxTable();
BYTE aroundIdxTable[(15 + 225) * 225] = {0}; // = createAroundIdxTable();

char valueList[12] = {0}; //testLine, testLineThree...
BYTE stackBuffer[36 * 12] = {0}; // isFoul stackBuffer
BYTE getPoints[4] = {0}; // getBlockThreePoints, getFreeFourPoint
BYTE freeFourPoints[4] = {0}; //testThree

BYTE emptyList[16] = {0}; //testFive ...
BYTE emptyMoves[16] = {0};
DWORD markArr[228] = {0};

DWORD infoArr[228] = {0}; //level


DWORD vcfInfoArr[228] = {0};    // findVCF
BYTE vcfMoves[228] = {0},
    vcfTwoPoints[228] = {0},
    vcfThreePoints[228] = {0},
    vcfFreeThreePoints[228] = {0},
    vcfFourPoints[228] = {0},
    vcfStack[_PAGE_SIZE] = {0},
    vcfWinMoves[_PAGE_SIZE] = {0};


//--------------------- log --------------------------

extern void log(double num);

extern void log(BYTE* buf, UINT len);

//--------------------- IO_BUFFER --------------------

BYTE* getInBuffer() {
    return in_buffer;
}

BYTE* getOutBuffer() {
    return out_buffer;
}

BYTE* getVcfWinMoves() {
    return vcfWinMoves;
} 

BYTE* getVcfMoves() {
    return vcfMoves;
}
//------------------ setBuffer ---------------------

void setBuffer(BYTE* buf, long len, BYTE value) {
    for (long i=0; i<len; i++) {
        buf[i] = value;
    }
}
    
void setBuffer(DWORD* buf, long len, DWORD value) {
    for (long i=0; i<len; i++) {
        buf[i] = value;
    }
}

void setBuffer(UINT* buf, long len, UINT value) {
    for (long i=0; i<len; i++) {
        buf[i] = value;
    }
}

//--------------------- idxLists ---------------------

// 创建空白lists 用来保存阳线，阴线的idx
void createEmptyLists() {
    BYTE outIdx = 225;
    setBuffer(idxLists, 4 * 29 * 43, outIdx);
}

//保存棋盘区域内每一条线的idx，每条线按照 line[n] < line[n+1] 排序
void createIdxLists() {
    BYTE* List = NULL;
    
    //direction = 0
    for (BYTE y = 0; y < 15; y++) {
        List = idxLists + y * 43;
        for (BYTE x = 0; x < 15; x++) {
            if (x < cBoardSize && y < cBoardSize) List[14 + x] = x + y * 15;
        }
    }
    
    //direction = 1
    for (BYTE x = 0; x < 15; x++) {
        List = idxLists + (29 + x) * 43;
        for (BYTE y = 0; y < 15; y++) {
            if (x < cBoardSize && y < cBoardSize) List[14 + y] = x + y * 15;
        }
    }
    
    //direction = 2
    for (BYTE i = 0; i < 15; i++) { // x + (14-y) = i, y = x + 14 - i
        List = idxLists + (2 * 29 + i) * 43;
        for (BYTE j = 0; j <= i; j++) {
            BYTE x = 0 + j,
                y = x + 14 - i;
            if (x < cBoardSize && y < cBoardSize) List[14 + j] = x + y * 15;
        }
    }
    for (BYTE i = 0; i < 14; i++) { // (14-x) + y = i, y = i - 14 + x;
        List = idxLists + (2 * 29 + 14 + 14 - i) * 43;
        for (BYTE j = 0; j <= i; j++) {
            BYTE x = 14 - i + j,
                y = i - 14 + x;
            if (x < cBoardSize && y < cBoardSize) List[14 + j] = x + y * 15;
        }
    }
    
    //direction = 3
    for (BYTE i = 0; i < 15; i++) { // x + y = i, y = i - x
        List = idxLists + (3 * 29 + i) * 43;
        for (BYTE j = 0; j <= i; j++) {
            BYTE x = i - j,
                y = i - x;
            if (x < cBoardSize && y < cBoardSize) List[14 + j] = x + y * 15;
        }
    }
    for (BYTE i = 0; i < 14; i++) { // (14-x)+(14-y) = i, y = 28 - i - x
        List = idxLists + (3 * 29 + 14 + 14 - i) * 43;
        for (BYTE j = 0; j <= i; j++) {
            BYTE x = 14 - j,
                y = 28 - i - x;
            if (x < cBoardSize && y < cBoardSize) List[14 + j] = x + y * 15;
        }
    }
    
}

//------------------------- idxTable ----------------------

// 创建索引表，快速读取阳线，阴线idx. 超出棋盘范围返回 outIdx = 225
void createIdxTable() {
    BYTE outIdx = 225;
    
    for (BYTE idx = 0; idx < 225; idx++) {
        for (char move = -14; move < 15; move++) {
            for (BYTE direction = 0; direction < 4; direction++) {
                BYTE x = idx % 15,
                    y = ~~(idx/15);
                if (x >= 0 && x < cBoardSize && y >= 0 && y < cBoardSize) {
                    switch (direction) {
                        case 0:
                            idxTable[(idx * 29 + move + 14) * 4 + direction] = idxLists[(direction * 29 + y) * 43 + 14 + x + move];
                            break;
                        case 1:
                            idxTable[(idx * 29 + move + 14) * 4 + direction] = idxLists[(direction * 29 + x) * 43 + 14 + y + move];
                            break;
                        case 2:
                            idxTable[(idx * 29 + move + 14) * 4 + direction] = idxLists[(direction * 29 + x + 14 - y) * 43 + (x + 14 - y < 15 ? 14 + x + move : 14 + y + move)];
                            break;
                        case 3:
                            idxTable[(idx * 29 + move + 14) * 4 + direction] = idxLists[(direction * 29 + x + y) * 43 + (x + y < 15 ? 14 + y + move : 28 - x + move)];
                            break;
                    }
                }
                else {
                    idxTable[(idx * 29 + move + 14) * 4 + direction] = outIdx;
                }
            }
        }
    }
    /*
    for (BYTE i = 0; i < 29 * 4; i++) {
        idxTable[225 * 29 * 4 + i] = outIdx;
    }
    */
    setBuffer(&idxTable[225 * 29 * 4],  29 * 4, outIdx);

}

// 按照阳线，阴线读取idx, 如果参数idx在棋盘外，直接返回 outIdx = 225
BYTE moveIdx(BYTE idx, char move, BYTE direction) {
    return idxTable[(idx * 29 + move + 14) * 4 + direction]; // 7s
}

// 取得一个点的值
char getArrValue(BYTE idx, char move, BYTE direction, char* arr) {
    return arr[moveIdx(idx, move, direction)];
}

//--------------------  aroundIdxTable  ------------------------

void createAroundIdxTable() {
    BYTE outIdx = 225;
    
    for (BYTE idx = 0; idx < 225; idx++) { //RESET
        /*
        for (BYTE i = 0; i < 15; i++) {
            aroundIdxTable[idx * 240 + i] = 0;
        }
        */
        setBuffer(&aroundIdxTable[idx * 240], 15, 0);
        /*
        for (BYTE i = 0; i < 225; i++) { //RESET
            aroundIdxTable[idx * 240 + 15 + i] = outIdx;
        }
        */
        setBuffer(&aroundIdxTable[idx * 240 + 15], 225, outIdx);
        BYTE pIdx = 0,
            x = idx % 15,
            y = ~~(idx / 15);
        if (x < 0 || x >= cBoardSize || y < 0 || y >= cBoardSize) continue;
        aroundIdxTable[idx * 240 + 15 + pIdx++] = idx;
        aroundIdxTable[idx * 240] = pIdx;
        for (BYTE radius = 1; radius < 15; radius++) {
            BYTE top = moveIdx(idx, -radius, 1),
                right = moveIdx(idx, radius, 0),
                buttom = moveIdx(idx, radius, 1),
                left = moveIdx(idx, -radius, 0),
                nIdx;
            if (top != outIdx) {
                for (char m = -radius + 1; m <= radius; m++) {
                    nIdx = moveIdx(top, m, 0);
                    if (nIdx != outIdx) aroundIdxTable[idx * 240 + 15 + pIdx++] = nIdx;
                }
            }
            if (right != outIdx) {
                for (char m = -radius + 1; m <= radius; m++) {
                    nIdx = moveIdx(right, m, 1);
                    if (nIdx != outIdx) aroundIdxTable[idx * 240 + 15 + pIdx++] = nIdx;
                }
            }
            if (buttom != outIdx) {
                for (char m = radius - 1; m >= -radius; m--) {
                    nIdx = moveIdx(buttom, m, 0);
                    if (nIdx != outIdx) aroundIdxTable[idx * 240 + 15 + pIdx++] = nIdx;
                }
            }
            if (left != outIdx) {
                for (char m = radius - 1; m >= -radius; m--) {
                    nIdx = moveIdx(left, m, 1);
                    if (nIdx != outIdx) aroundIdxTable[idx * 240 + 15 + pIdx++] = nIdx;
                }
            }
            aroundIdxTable[idx * 240 + radius] = pIdx;
        }
    }
}

//返回centerIdx为中心，顺时针绕圈的第index个点，index=0时就直接返回centerIdx
BYTE aroundIdx(BYTE centerIdx, BYTE index) {
    return aroundIdxTable[centerIdx * 240 + 15 + index];
}

//返回centerIdx为中心，radius半径内的点的计数，radius=0时，返回1
BYTE getAroundIdxCount(BYTE centerIdx, BYTE radius) {
    return aroundIdxTable[centerIdx * 240 + radius];
}


//----------------------  init  --------------------------


int init(BYTE size, BYTE rules) {
    gameRules = rules;
	cBoardSize = size;
	createEmptyLists();
	createIdxLists();
	createIdxTable();
	createAroundIdxTable();
	return 1;
}

//------------------------------------------------------

// (long*)lineInfo,  (lineInfo >> 3) & 0b111
DWORD testLine(BYTE idx, BYTE direction, char color, char* arr) {
    char max = -1; // -1 | 0 | 1 | 2 | 3 | 4 | 5 | SIX
    BYTE addFree = 0, // 0 | 1
        addCount = 0,
        free = 0, // >= 0
        count = 0,
        markMove = 0,
        emptyCount = 0,
        colorCount = 0;
    char ov = arr[idx];
    arr[idx] = color;
    // getArrValue(18 - 28次)，使用缓存快一些
    valueList[0] = getArrValue(idx, -5, direction, arr);
    valueList[1] = getArrValue(idx, -4, direction, arr);
    for (char move = -4; move < 5; move++) {
        valueList[move + 6] = getArrValue(idx, move + 1, direction, arr);
        char v = valueList[move + 5];
        if (v == 0) {
            emptyCount++;
        }
        else if (v == color) {
            colorCount++;
        }
        else { // v!=color || v==-1
            emptyCount = 0;
            colorCount = 0;
        }
        if (emptyCount + colorCount == 5) {

            if (gameRules == RENJU_RULES && color == 1 &&
                (color == valueList[move] || color == valueList[move + 6]))
            {
                if (colorCount == 5 && colorCount > max) {
                    max = SIX;
                    free = 0;
                    count = 0;
                    markMove = move;
                }
            }
            else {
                if (colorCount > max) {
                    max = colorCount;
                    addFree = 0;
                    addCount = 1;
                    free = 0;
                    count = 0;
                    markMove = move;
                }

                if (colorCount == max) {
                    if (addCount) count++;
                    addCount = 0;

                    if (addFree) {
                        free++;
                        markMove = move;
                    }
                    addFree = 1;
                }

            }

            v = valueList[move + 1];
            if (v == 0) {
                emptyCount--;
                addCount = 1;
            }
            else {
                colorCount--;
                addFree = 0;
            }
        }
    }

    arr[idx] = ov;
    max &= 0b111;
    BYTE lineFoul = (max == 6) || ((max == 4) && (count > 1) && (!free)) ? 1 : 0;

    return (direction << 12) |
        (free << 8) |
        (markMove << 5) |
        (lineFoul << 4) | // set lineFoul
        (max << 1) | // set maxNum
        (free ? 1 : 0); // set free
}



DWORD testLineFoul(BYTE idx, BYTE direction, char color, char* arr) {
    char max = 0; // 0 | 3 | 4 | 5 | SIX
    BYTE addFree = 0, // 0 | 1
        addCount = 0,
        free = 0, // >= 0
        count = 0,
        markMove = 0,
        emptyCount = 0,
        colorCount = 0;
    char ov = arr[idx];
    arr[idx] = 1;
    // getArrValue(18 - 28次)，使用缓存快一些
    valueList[0] = getArrValue(idx, -5, direction, arr);
    valueList[1] = getArrValue(idx, -4, direction, arr);
    for (char move = -4; move < 5; move++) {
        valueList[move + 6] = getArrValue(idx, move + 1, direction, arr);
        char v = valueList[move + 5];
        if (v == 0) {
            emptyCount++;
        }
        else if (v == 1) {
            colorCount++;
        }
        else { // v!=color || v==-1
            emptyCount = 0;
            colorCount = 0;
        }
        if (emptyCount + colorCount == 5) {
            if (colorCount == 5) {
                if (1 == valueList[move] ||
                    1 == valueList[move + 6])
                {
                    max = SIX;
                }
                else {
                    max = 5;
                }
                free = 0;
                count = 0;
                markMove = move;
                break;
            }
            else if (colorCount == 4) {
                if (1 == valueList[move] ||
                    1 == valueList[move + 6])
                { //六腐形
                }
                else {
                    if (max < 4) {
                        max = 4;
                        addFree = 0;
                        addCount = 1;
                        free = 0;
                        count = 0;
                        markMove = move;
                    }

                    if (addCount) count++;
                    addCount = 0;

                    if (addFree) {
                        free++;
                        markMove = move;
                    }
                    addFree = 1;
                }
            }
            else if (colorCount == 3 && max <= 3) {
                if (1 == valueList[move] ||
                    1 == valueList[move + 6])
                { //六腐形
                }
                else {
                    if (max < 3) {
                        max = 3;
                        addFree = 0;
                        addCount = 1;
                        free = 0;
                        count = 0;
                        markMove = move;
                    }

                    if (addCount) count++;
                    addCount = 0;

                    if (addFree) {
                        free++;
                        markMove = move;
                    }
                    addFree = 1;
                }
            }

            v = valueList[move + 1];
            if (v == 0) {
                emptyCount--;
                addCount = 1;
            }
            else {
                colorCount--;
                addFree = 0;
            }
        }
    }

    arr[idx] = ov;

    return (direction << 12) |
        (free << 8) |
        (markMove << 5) |
        (free ?  (max == 4 ? FOUR_FREE : THREE_FREE) :
            ((max == 4) && (count > 1) ? LINE_DOUBLE_FOUR :
            max << 1));
}



// 不会验证x,y是否有棋子
// idx,点在 direction指定这条线上是不是一个冲4点,活4
DWORD testLineFour(BYTE idx, BYTE direction, char color, char* arr) {
    char max = 0; // 0 | 4 | 5 | SIX
    BYTE addFree = 0, // 0 | 1
        addCount = 0,
        free = 0, // >= 0
        count = 0,
        markMove = 0,
        emptyCount = 0,
        colorCount = 0;
    char ov = arr[idx];
    arr[idx] = color;

    for (char move = -4; move < 5; move++) {
        // getArrValur(18 - 22次)直接 getArrValur 快一些
        char v = getArrValue(idx, move, direction, arr);
        if (v == 0) {
            emptyCount++;
        }
        else if (v == color) {
            colorCount++;
        }
        else { // v!=color || v==-1
            emptyCount = 0;
            colorCount = 0;
        }
        if (emptyCount + colorCount == 5) {
            if (colorCount == 5) {
                if (gameRules == RENJU_RULES && color == 1 &&
                    (color == getArrValue(idx, move - 5, direction, arr) ||
                        color == getArrValue(idx, move + 1, direction, arr)))
                {
                    max = SIX;
                }
                else {
                    max = 5;
                }
                free = 0;
                count = 0;
                markMove = move;
                break;
            }
            else if (colorCount == 4) {
                if (gameRules == RENJU_RULES && color == 1 &&
                    (color == getArrValue(idx, move - 5, direction, arr) ||
                        color == getArrValue(idx, move + 1, direction, arr)))
                { //六腐形
                }
                else {
                    if (max < 4) {
                        max = 4;
                        addFree = 0;
                        addCount = 1;
                        free = 0;
                        count = 0;
                        markMove = move;
                    }

                    if (addCount) count++;
                    addCount = 0;

                    if (addFree) {
                        free++;
                        markMove = move;
                    }
                    addFree = 1;
                }
            }

            v = getArrValue(idx, move - 4, direction, arr);
            if (v == 0) {
                emptyCount--;
                addCount = 1;
            }
            else {
                colorCount--;
                addFree = 0;
            }
        }
    }
    arr[idx] = ov;

    return (direction << 12) |
        (free << 8) |
        (markMove << 5) |
        (free ? FOUR_FREE :
            (count > 1 ? LINE_DOUBLE_FOUR :
            (max << 1)));
}



DWORD testLineThree(BYTE idx, BYTE direction, char color, char* arr) {
    char max = 0; // 0 | 3 | 4 | 5 | SIX
    BYTE addFree = 0, // 0 | 1
        addCount = 0,
        free = 0, // >= 0
        count = 0,
        markMove = 0,
        emptyCount = 0,
        colorCount = 0;
    char ov = arr[idx];
    arr[idx] = color;
    // getArrValue(18 - 28次)，使用缓存快一些
    valueList[0] = getArrValue(idx, -5, direction, arr);
    valueList[1] = getArrValue(idx, -4, direction, arr);
    for (char move = -4; move < 5; move++) {
        valueList[move + 6] = getArrValue(idx, move + 1, direction, arr);
        char v = valueList[move + 5];
        if (v == 0) {
            emptyCount++;
        }
        else if (v == color) {
            colorCount++;
        }
        else { // v!=color || v==-1
            emptyCount = 0;
            colorCount = 0;
        }
        
        if (emptyCount + colorCount == 5) {
            if (colorCount == 5) {
                if (gameRules == RENJU_RULES && color == 1 &&
                    (color == valueList[move] ||
                        color == valueList[move + 6]))
                {
                    max = SIX;
                }
                else {
                    max = 5;
                }
                free = 0;
                count = 0;
                markMove = move;
                break;
            }
            else if (colorCount == 4) {
                if (gameRules == RENJU_RULES && color == 1 &&
                    (color == valueList[move] ||
                        color == valueList[move + 6])) {}
                else {
                    if (max < 4) {
                        max = 4;
                        addFree = 0;
                        addCount = 1;
                        free = 0;
                        count = 0;
                        markMove = move;
                    }

                    if (addCount) count++;
                    addCount = 0;

                    if (addFree) {
                        free++;
                        markMove = move;
                    }
                    addFree = 1;
                }
            }
            else if (colorCount == 3 && max <= 3) {
                if (gameRules == RENJU_RULES && color == 1 &&
                    (color == valueList[move] ||
                        color == valueList[move + 6]))
                { //六腐形
                }
                else {
                    if (max < 3) {
                        max = 3;
                        addFree = 0;
                        addCount = 1;
                        free = 0;
                        count = 0;
                        markMove = move;
                    }

                    if (addCount) count++;
                    addCount = 0;

                    if (addFree) {
                        free++;
                        markMove = move;
                    }
                    addFree = 1;
                }
            }

            v = valueList[move + 1];
            if (v == 0) {
                emptyCount--;
                addCount = 1;
            }
            else {
                colorCount--;
                addFree = 0;
            }
        }
    }

    arr[idx] = ov;
    
    return (direction << 12) |
        (free << 8) |
        (markMove << 5) |
        (free ? (max == 4 ? FOUR_FREE : THREE_FREE) :
            ((max == 4) && (count > 1) ? LINE_DOUBLE_FOUR :
            max << 1));
}

// 返回冲4的防点
BYTE getBlockFourPoint(BYTE idx, char* arr, DWORD lineInfo) {
    char move = (lineInfo >> 5) & 7;
    BYTE direction = (lineInfo >> 12) & 7,
        nIdx;
    for (char m = 0; m > -5; m--) {
        nIdx = moveIdx(idx, move + m, direction);
        if (0 == arr[nIdx]) return nIdx;
    }
    return 225; //return outIdx
}

UINT getBlockThreePoints(BYTE idx, char* arr, DWORD lineInfo) {
    char move = (lineInfo >> 5) & 7;
    BYTE freeCount = (lineInfo >> 8) & 7,
        direction = (lineInfo >> 12) & 7,
        nIdx;
    BYTE* points = getPoints; //point array
    
    char m = 0;
    *(UINT*)(points) = 0; //reset array
    if (freeCount == 1) {
        for (m = 0; m > -6; m--) {
            nIdx = moveIdx(idx, move + m, direction);
            if (0 == arr[nIdx]) points[++points[0]] = nIdx;
        }
    }
    else if (freeCount == 2) {
        for (m = 0; m > -5; m--) {
            nIdx = moveIdx(idx, move + m, direction);
            if (0 == arr[nIdx]) break; // skip first
        }
        for (m--; m > -6; m--) {
            nIdx = moveIdx(idx, move + m, direction);
            if (0 == arr[nIdx]) points[++points[0]] = nIdx;
        }
    }
    
    return *(UINT*)(points);
}

UINT getFreeFourPoint(BYTE idx, char* arr, DWORD lineInfo) {
    char move = (lineInfo >> 5) & 7;
    BYTE direction = (lineInfo >> 12) & 7,
        nIdx;
    BYTE* points = getPoints; //point array
    
    char m = 0;
    *(UINT*)(points) = 0; //reset array
    for (m = 0; m > -5; m--) {
        nIdx = moveIdx(idx, move + m, direction);
        if (0 == arr[nIdx]) break; // skip first
    }
    for (m--; m > -6; m--) {
        nIdx = moveIdx(idx, move + m, direction);
        if (0 == arr[nIdx]) {
            points[++points[0]] = nIdx;
        }
    }
    points[0] = (lineInfo >> 8) & 7; //set freePoint num

    return *(UINT*)(points);
}



bool isFoul(BYTE idx, char* arr) {
    const BYTE LEN = 12, // [value, count, pIdx, idx, info[4]]
        VALUE = 0, // if value > 1 then isFoul = true
        COUNT = 1,
        PIDX = 2,
        IDX = 3,
        INFO_START = 4;
    char stackIdx = 0,
        threeCount = 0,
        fourCount = 0,
        foulCount = 0,
        ov = arr[idx];

    arr[idx] = 1;
    stackBuffer[VALUE] = 0;
    stackBuffer[COUNT] = 0;
    stackBuffer[PIDX] = 0;
    stackBuffer[IDX] = idx;
    
    for (BYTE direction = 0; direction < 4; direction++) {
        DWORD info = testLineThree(idx, direction, 1, arr);
        BYTE v = FOUL_MAX_FREE & info;
        if (v == FIVE) { // not foul
            stackIdx = -1;
            break;
        }
        else if (v >= FOUL) foulCount++;
        else if (v >= FOUR_NOFREE) fourCount++;
        else if (v == THREE_FREE) {
            threeCount++;
            *(DWORD*)(stackBuffer + INFO_START + stackBuffer[COUNT]*2) = (info & 0x8fff) | (direction << 12);
            stackBuffer[COUNT]++;
        }
    }

    if (stackIdx > -1) {
        if ((fourCount > 1) || foulCount) { // is foul
            stackBuffer[VALUE] = 2;
            stackIdx = -1;
        }
        else if (threeCount < 2) stackIdx = -1; //not foul
        
        while (stackIdx > -1) { //continue test doubleThree
            
            if (stackIdx % 2 == 0) { // test freeFourPoint and first doubleThree
                
                BYTE idx = stackBuffer[stackIdx * LEN + IDX];
                if (stackBuffer[stackIdx * LEN + VALUE] > 1) { // is doubleThree
                    arr[idx] = 0;
                    stackIdx--;
                    if (stackIdx == -1) stackBuffer[VALUE] = 2; // set first doubleThree
                }
                else if (stackBuffer[stackIdx * LEN + PIDX] == stackBuffer[stackIdx * LEN + COUNT]) { // not doubleThree
                    arr[idx] = 0;
                    stackIdx--;
                    if (stackIdx > -1) stackBuffer[stackIdx * LEN + VALUE] = 1; //set freeFourPoint
                }
                else {
                    UINT fps = getFreeFourPoint(idx, arr, *(DWORD*)(stackBuffer + stackIdx * LEN + INFO_START + stackBuffer[stackIdx * LEN + PIDX]*2));
                    BYTE* ps = (BYTE*)(&fps);
                    stackBuffer[stackIdx * LEN + PIDX]++;
                    stackIdx++;
                    stackBuffer[stackIdx * LEN + VALUE] = 0;
                    stackBuffer[stackIdx * LEN + COUNT] = ps[0]; //count
                    stackBuffer[stackIdx * LEN + PIDX] = 0;
                    //stackBuffer[stackIdx * LEN + IDX] = idx;
                    stackBuffer[stackIdx * LEN + INFO_START + 0] = ps[1];
                    stackBuffer[stackIdx * LEN + INFO_START + 1] = ps[2];
                }
            }
            else { // test next doubleThree
                
                if (stackBuffer[stackIdx * LEN + VALUE] == 1) { // find freeFourPoint
                    stackIdx--;
                    stackBuffer[stackIdx * LEN + VALUE]++; // add one freeThree
                }
                else if (stackBuffer[stackIdx * LEN + PIDX] == stackBuffer[stackIdx * LEN + COUNT]) { // not freeFourPoint
                    stackIdx--;
                }
                else {
                    bool skip = false;
                    BYTE idx = stackBuffer[stackIdx * LEN + INFO_START + stackBuffer[stackIdx * LEN + PIDX]++];

                    threeCount = 0;
                    fourCount = 0;
                    foulCount = 0;

                    arr[idx] = 1;
                    stackIdx++;
                    stackBuffer[stackIdx * LEN + VALUE] = 0;
                    stackBuffer[stackIdx * LEN + COUNT] = 0; //count
                    stackBuffer[stackIdx * LEN + PIDX] = 0;
                    stackBuffer[stackIdx * LEN + IDX] = idx;
                    for (BYTE direction = 0; direction < 4; direction++) {
                        DWORD info = testLineThree(idx, direction, 1, arr);
                        BYTE v = FOUL_MAX_FREE & info;
                        if (v == FIVE) {
                            arr[idx] = 0;
                            stackIdx--; //not freeFourPoint
                            skip = true;
                            break;
                        }
                        else if (v >= FOUL) foulCount++;
                        else if (v >= FOUR_NOFREE) fourCount++;
                        else if (v == THREE_FREE) {
                            threeCount++;
                            *(DWORD*)(stackBuffer + stackIdx * LEN + INFO_START + stackBuffer[stackIdx * LEN + COUNT]*2) = (info & 0x8fff) | (direction << 12);
                            stackBuffer[stackIdx * LEN + COUNT]++;
                        }
                    }

                    if (!skip) {
                        if (fourCount > 1 || foulCount) {
                            arr[idx] = 0;
                            stackIdx--; //not freeFourPoint
                        }
                        else if (threeCount < 2) {
                            arr[idx] = 0;
                            stackIdx--; // is freeFourPoint
                            stackBuffer[stackIdx * LEN + VALUE] = 1;
                        }
                    }
                }
            }
        }
    }
    
    arr[idx] = ov;
    return stackBuffer[VALUE] > 1;
}



void testFive(char* arr, char color, DWORD* infoArr) {
    //setBuffer(emptyList, 16, 0); //empty
    //setBuffer(emptyMoves, 16, 0);
    setBuffer(infoArr, 228, 0);
    for (BYTE direction = 0; direction < 4; direction++) {
        setBuffer(markArr, 228, 0);
        BYTE listStart = direction == 2 ? 15 - cBoardSize : 0,
            listEnd = direction < 2 ? listStart + cBoardSize : listStart + cBoardSize * 2 - 5;
        for (BYTE list = listStart; list < listEnd; list++) {
            BYTE emptyCount = 0,
                colorCount = 0,
                moveStart = direction < 3 || list < cBoardSize ? 14 : list < 15 ? 15 + list - cBoardSize : 29 - cBoardSize,
                moveEnd = direction < 2 ? moveStart + cBoardSize : list - listStart < cBoardSize ? moveStart + list - listStart + 1 : moveStart + cBoardSize - (list - listStart + 1 - cBoardSize),
                emptyStart = 0,
                emptyEnd = 0;
            for (BYTE move = moveStart; move < moveEnd; move++) {
                long pIdx = (direction * 29 + list) * 43 + move;
                char v = arr[idxLists[pIdx]];
                if (v == 0) {
                    emptyCount++;
                    emptyMoves[emptyEnd] = move;
                    emptyList[emptyEnd++] = idxLists[pIdx];
                }
                else if (v == color) {
                    colorCount++;
                }
                else { // v!=color || v==-1
                    emptyCount = 0;
                    colorCount = 0;
                    emptyStart = emptyEnd;
                }

                if (emptyCount + colorCount == 5) {
                    if (colorCount == 4) {
                        if (gameRules == RENJU_RULES && color == 1 &&
                            (color == arr[idxLists[pIdx - 5]] ||
                                color == arr[idxLists[pIdx + 1]]))
                        {
                            for (BYTE e = emptyStart; e < emptyEnd; e++) {
                                markArr[emptyList[e]] = SIX | ((move - emptyMoves[e]) << 5);
                            }
                        }
                        else {
                            for (BYTE e = emptyStart; e < emptyEnd; e++) {
                                markArr[emptyList[e]] = FIVE | ((move - emptyMoves[e]) << 5);
                            }
                        }
                    }

                    v = arr[idxLists[pIdx - 4]];
                    if (v == 0) {
                        emptyCount--;
                        emptyStart++;
                        for (BYTE e = emptyStart; e < emptyEnd; e++) {
                            markArr[emptyList[e]] |= ADD_MAX_COUNT; //set addCount
                        }
                    }
                    else {
                        colorCount--;
                        for (BYTE e = emptyStart; e < emptyEnd; e++) {
                            markArr[emptyList[e]] = markArr[emptyList[e]] & 0xf7ff;
                        }
                    }
                }
            }
        }

        for (BYTE idx = 0; idx < 225; idx++) {
            BYTE max = markArr[idx] & MAX;
            if (FIVE == max) {
                infoArr[idx] = (markArr[idx] & 0x8fff) | (direction << 12);
            }
        }
    }
}

void testFour(char* arr, char color, DWORD* infoArr) {
    //setBuffer(emptyList, 16, 0); //empty
    //setBuffer(emptyMoves, 16, 0);
    setBuffer(infoArr, 228, 0);
    for (BYTE direction = 0; direction < 4; direction++) {
        setBuffer(markArr, 228, 0);
        BYTE listStart = direction == 2 ? 15 - cBoardSize : 0,
            listEnd = direction < 2 ? listStart + cBoardSize : listStart + cBoardSize * 2 - 5;
        for (BYTE list = listStart; list < listEnd; list++) {
            BYTE emptyCount = 0,
                colorCount = 0,
                moveStart = direction < 3 || list < cBoardSize ? 14 : list < 15 ? 15 + list - cBoardSize : 29 - cBoardSize,
                moveEnd = direction < 2 ? moveStart + cBoardSize : list - listStart < cBoardSize ? moveStart + list - listStart + 1 : moveStart + cBoardSize - (list - listStart + 1 - cBoardSize),
                emptyStart = 0,
                emptyEnd = 0;
            for (BYTE move = moveStart; move < moveEnd; move++) {
                long pIdx = (direction * 29 + list) * 43 + move;
                char v = arr[idxLists[pIdx]];
                if (v == 0) {
                    emptyCount++;
                    emptyMoves[emptyEnd] = move;
                    emptyList[emptyEnd++] = idxLists[pIdx];
                }
                else if (v == color) {
                    colorCount++;
                }
                else { // v!=color || v==-1
                    emptyCount = 0;
                    colorCount = 0;
                    emptyStart = emptyEnd;
                }

                if (emptyCount + colorCount == 5) {
                    if (colorCount == 4) {
                        if (gameRules == RENJU_RULES && color == 1 &&
                            (color == arr[idxLists[pIdx - 5]] ||
                                color == arr[idxLists[pIdx + 1]]))
                        {
                            for (BYTE e = emptyStart; e < emptyEnd; e++) {
                                markArr[emptyList[e]] = SIX | ((move - emptyMoves[e]) << 5);
                            }
                        }
                        else {
                            for (BYTE e = emptyStart; e < emptyEnd; e++) {
                                markArr[emptyList[e]] = FIVE | ((move - emptyMoves[e]) << 5);
                            }
                        }
                    }
                    else if (colorCount == 3) {
                        if (gameRules == RENJU_RULES && color == 1 &&
                            (color == arr[idxLists[pIdx - 5]] ||
                                color == arr[idxLists[pIdx + 1]]))
                        { //六腐形
                        }
                        else {
                            for (BYTE e = emptyStart; e < emptyEnd; e++) {
                                if ((markArr[emptyList[e]] & MAX) < FOUR_NOFREE) {
                                    markArr[emptyList[e]] = ADD_MAX_COUNT | ((move - emptyMoves[e]) << 5) | FOUR_NOFREE;
                                }

                                if ((markArr[emptyList[e]] & MAX) == FOUR_NOFREE) {
                                    if (markArr[emptyList[e]] & ADD_MAX_COUNT) {
                                        markArr[emptyList[e]] += 0x1000; //count++
                                    }
                                    markArr[emptyList[e]] = markArr[emptyList[e]] & 0x7fff;

                                    if (markArr[emptyList[e]] & ADD_FREE_COUNT) {
                                        markArr[emptyList[e]] += 0x100; //free++
                                        markArr[emptyList[e]] = (markArr[emptyList[e]] & 0xff1f) | ((move - emptyMoves[e]) << 5); //set markMove
                                    }
                                    markArr[emptyList[e]] |= ADD_FREE_COUNT;
                                }
                            }
                        }
                    }

                    v = arr[idxLists[pIdx - 4]];
                    if (v == 0) {
                        emptyCount--;
                        emptyStart++;
                        for (BYTE e = emptyStart; e < emptyEnd; e++) {
                            markArr[emptyList[e]] |= ADD_MAX_COUNT; //set addCount
                        }
                    }
                    else {
                        colorCount--;
                        for (BYTE e = emptyStart; e < emptyEnd; e++) {
                            markArr[emptyList[e]] = markArr[emptyList[e]] & 0xf7ff;
                        }
                    }
                }
            }
        }

        for (BYTE idx = 0; idx < 225; idx++) {
            BYTE max = markArr[idx] & MAX;
            if (FIVE == max) {
                infoArr[idx] = (markArr[idx] & 0x8fff) | (direction << 12);
            }
            else if (FOUR_NOFREE == max) {
                markArr[idx] |= (markArr[idx] & FREE_COUNT) ? 1 : 0;
                if ((markArr[idx] & FOUL_MAX_FREE) > (infoArr[idx] & FOUL_MAX_FREE)) {
                    if (gameRules == RENJU_RULES && color == 1) {
                        BYTE foul = isFoul(idx, arr) ? 1 : 0;
                        infoArr[idx] = (markArr[idx] & 0x8fff) | (direction << 12) | foul << 4;
                    }
                    else
                        infoArr[idx] = (markArr[idx] & 0x8fff) | (direction << 12);
                }
            }
        }
    }
}

void testThree(char* arr, char color, DWORD* infoArr) {
    //setBuffer(emptyList, 16, 0); //empty
    //setBuffer(emptyMoves, 16, 0);
    setBuffer(infoArr, 228, 0);
    for (BYTE direction = 0; direction < 4; direction++) {
        setBuffer(markArr, 228, 0);
        BYTE listStart = direction == 2 ? 15 - cBoardSize : 0,
            listEnd = direction < 2 ? listStart + cBoardSize : listStart + cBoardSize * 2 - 5;
        for (BYTE list = listStart; list < listEnd; list++) {
            BYTE emptyCount = 0,
                colorCount = 0,
                moveStart = direction < 3 || list < cBoardSize ? 14 : list < 15 ? 15 + list - cBoardSize : 29 - cBoardSize,
                moveEnd = direction < 2 ? moveStart + cBoardSize : list - listStart < cBoardSize ? moveStart + list - listStart + 1 : moveStart + cBoardSize - (list - listStart + 1 - cBoardSize),
                emptyStart = 0,
                emptyEnd = 0;
            for (BYTE move = moveStart; move < moveEnd; move++) {
                long pIdx = (direction * 29 + list) * 43 + move;
                char v = arr[idxLists[pIdx]];
                if (v == 0) {
                    emptyCount++;
                    emptyMoves[emptyEnd] = move;
                    emptyList[emptyEnd++] = idxLists[pIdx];
                }
                else if (v == color) {
                    colorCount++;
                }
                else { // v!=color || v==-1
                    emptyCount = 0;
                    colorCount = 0;
                    emptyStart = emptyEnd;
                }
                
                if (emptyCount + colorCount == 5) {
                    if (colorCount == 4) {
                        if (gameRules == RENJU_RULES && color == 1 &&
                            (color == arr[idxLists[pIdx - 5]] ||
                                color == arr[idxLists[pIdx + 1]]))
                        {
                            for (BYTE e = emptyStart; e < emptyEnd; e++) {
                                markArr[emptyList[e]] = SIX | ((move - emptyMoves[e]) << 5);
                            }
                        }
                        else {
                            for (BYTE e = emptyStart; e < emptyEnd; e++) {
                                markArr[emptyList[e]] = FIVE | ((move - emptyMoves[e]) << 5);
                            }
                        }
                    }
                    else if (4 > colorCount && colorCount > 1) {
                        if (gameRules == RENJU_RULES && color == 1 &&
                            (color == arr[idxLists[pIdx - 5]] ||
                                color == arr[idxLists[pIdx + 1]]))
                        { //六腐形
                        }
                        else {
                            for (BYTE e = emptyStart; e < emptyEnd; e++) {
                                if (((markArr[emptyList[e]] & MAX) >> 1) < colorCount + 1) {
                                    markArr[emptyList[e]] = ADD_MAX_COUNT | ((move - emptyMoves[e]) << 5) | ((colorCount + 1) << 1);
                                }

                                if (((markArr[emptyList[e]] & MAX) >> 1) == colorCount + 1) {
                                    if (markArr[emptyList[e]] & ADD_MAX_COUNT) {
                                        markArr[emptyList[e]] += 0x1000; //count++
                                    }
                                    markArr[emptyList[e]] = markArr[emptyList[e]] & 0x7fff;

                                    if (markArr[emptyList[e]] & ADD_FREE_COUNT) {
                                        markArr[emptyList[e]] += 0x100; //free++
                                        markArr[emptyList[e]] = (markArr[emptyList[e]] & 0xff1f) | ((move - emptyMoves[e]) << 5); //set markMove
                                    }
                                    markArr[emptyList[e]] |= ADD_FREE_COUNT;
                                }
                            }
                        }
                    }

                    v = arr[idxLists[pIdx - 4]];
                    if (v == 0) {
                        emptyCount--;
                        emptyStart++;
                        for (BYTE e = emptyStart; e < emptyEnd; e++) {
                            markArr[emptyList[e]] |= ADD_MAX_COUNT; //set addCount
                        }
                    }
                    else {
                        colorCount--;
                        for (BYTE e = emptyStart; e < emptyEnd; e++) {
                            markArr[emptyList[e]] = markArr[emptyList[e]] & 0xf7ff;
                        }
                    }
                }
            }
        }

        for (BYTE idx = 0; idx < 225; idx++) {
            BYTE max = (markArr[idx] & MAX) >> 1;
            if (5 == max) {
                infoArr[idx] = (markArr[idx] & 0x8fff) | (direction << 12);
            }
            else if (5 > max && max > 2) {
                markArr[idx] |= (markArr[idx] & FREE_COUNT) ? 1 : 0; //mark free
                if ((markArr[idx] & FOUL_MAX_FREE) > (infoArr[idx] & FOUL_MAX_FREE)) {
                    if (gameRules == RENJU_RULES && color == 1) {
                        BYTE foul = isFoul(idx, arr) ? 1 : 0;
                        if((max == 3) && (markArr[idx] & FREE) && (foul == 0)) {
                            arr[idx] = color;
                            *(UINT*)(freeFourPoints) = getFreeFourPoint(idx, arr, ((markArr[idx] & 0x8fff) | (direction << 12)));
                            BYTE i = 1;
                            for (i=1; i<=freeFourPoints[0]; i++) { 
                                BYTE f = isFoul(freeFourPoints[i], arr);
                                if (!f) break; //freeFourPoints[i] is freeFour point
                            }
                            if (i > freeFourPoints[0]) markArr[idx] &= 0xf8fe; //clear free
                            arr[idx] = 0;
                        }
                        infoArr[idx] = (markArr[idx] & 0x8fff) | (direction << 12) | foul << 4;
                    }
                    else
                        infoArr[idx] = (markArr[idx] & 0x8fff) | (direction << 12);
                }
            }
        }
    }
}



DWORD getLevel(char* arr, char color) {
    bool isWin = false;
    BYTE fiveIdx = 0xff;
    //setBuffer(emptyList, 16, 0);
    //setBuffer(emptyMoves, 16, 0);
    setBuffer(infoArr, 228, 0);
    for (BYTE direction = 0; direction < 4; direction++) {
        setBuffer(markArr, 228, 0);
        BYTE listStart = direction == 2 ? 15 - cBoardSize : 0,
            listEnd = direction < 2 ? listStart + cBoardSize : listStart + cBoardSize * 2 - 5;
        for (BYTE list = listStart; list < listEnd; list++) {
            BYTE emptyCount = 0,
                colorCount = 0,
                moveStart = direction < 3 || list < cBoardSize ? 14 : list < 15 ? 15 + list - cBoardSize : 29 - cBoardSize,
                moveEnd = direction < 2 ? moveStart + cBoardSize : list - listStart < cBoardSize ? moveStart + list - listStart + 1 : moveStart + cBoardSize - (list - listStart + 1 - cBoardSize),
                emptyStart = 0,
                emptyEnd = 0;
            for (BYTE move = moveStart; move < moveEnd; move++) {
                long pIdx = (direction * 29 + list) * 43 + move;
                char v = arr[idxLists[pIdx]];
                if (v == 0) {
                    emptyCount++;
                    emptyMoves[emptyEnd] = move;
                    emptyList[emptyEnd++] = idxLists[pIdx];
                }
                else if (v == color) {
                    colorCount++;
                }
                else { // v!=color || v==-1
                    emptyCount = 0;
                    colorCount = 0;
                    emptyStart = emptyEnd;
                }

                if (emptyCount + colorCount == 5) {
                    if (colorCount == 5) {
                        if (gameRules == RENJU_RULES && color == 1 &&
                            (color == arr[idxLists[pIdx - 5]] ||
                                color == arr[idxLists[pIdx + 1]]))
                        { //
                        }
                        else {
                            isWin = true;
                            direction = 4; //break for
                            list = listEnd;
                            move = moveEnd;
                        }
                    }
                    else if (colorCount == 4) {
                        if (gameRules == RENJU_RULES && color == 1 &&
                            (color == arr[idxLists[pIdx - 5]] ||
                                color == arr[idxLists[pIdx + 1]]))
                        { //
                        }
                        else {
                            for (BYTE e = emptyStart; e < emptyEnd; e++) {
                                markArr[emptyList[e]] = FIVE | ((move - emptyMoves[e]) << 5);
                            }
                        }
                    }

                    v = arr[idxLists[pIdx - 4]];
                    if (v == 0) {
                        emptyCount--;
                        emptyStart++;
                    }
                    else {
                        colorCount--;
                    }
                }
            }
        }

        for (BYTE idx = 0; idx < 225; idx++) {
            BYTE max = (markArr[idx] & MAX) >> 1;
            if (5 == max) {
                infoArr[idx] = (markArr[idx] & 0x8fff) | (direction << 12);
            }
        }
    }

    if (isWin) {
        return LEVEL_WIN;
    }
    else {
        for (BYTE idx = 0; idx < 225; idx++) {
            BYTE max = (infoArr[idx] & MAX) >> 1;
            if (5 == max) {
                if (fiveIdx == 0xff) fiveIdx = idx;
                else if (fiveIdx != idx) return (fiveIdx << 8) | LEVEL_FREEFOUR;
            }
        }
        if (fiveIdx == 0xff)
            return LEVEL_NONE;
        else if (gameRules == RENJU_RULES && color == 2 && isFoul(fiveIdx, arr))
            return (fiveIdx << 8) | LEVEL_FREEFOUR;
        else
            return (fiveIdx << 8) | LEVEL_NOFREEFOUR;
    }
}

//--------------------- moves ------------------------

bool isChildMove(BYTE* parentMove, BYTE pLen, BYTE* childMove, BYTE cLen) {
    BYTE j, k;
    // 判断一个颜色,最后一手活四级忽略
    for (k = 1; k < pLen; k += 2) {
        for (j = 1; j < cLen; j += 2) {
            if (childMove[j] == parentMove[k]) {
                break; //找到相同数据
            }
        }
        if (j >= cLen) break; // 没有找到相同数据;
    }
    return k >= pLen;
}



bool isRepeatMove(BYTE* newMove, BYTE* oldMove, BYTE len) {
    return isChildMove(newMove, len, oldMove, len);
}

//--------------------- vcf ------------------------

const UINT VCF_HASHTABLE_LEN = 5880420 + 6400000 + 116000000; //((135+224)*45)*90*4 + 80*80000 + 232*500000
BYTE vcfHashTable[VCF_HASHTABLE_LEN + 256] = {0};
UINT vcfHashNextValue = 0;
    
void resetVCF() {
    vcfHashNextValue = 5880420;
    setBuffer(vcfHashTable, 5880420, 0);
}

UINT vcfPositionPush(BYTE keyLen, UINT keySum, char* position) {
    if (vcfHashNextValue >= VCF_HASHTABLE_LEN) {
        return 0;
    }
    
    UINT pNext = ((keyLen >> 1) * 16155 + keySum) << 2,
        pPosition = *(UINT*)(vcfHashTable + pNext);
    while (pPosition) {
        pNext = pPosition + 228;
        pPosition =  *(UINT*)(vcfHashTable + pNext);
    }

    *(UINT*)(vcfHashTable + pNext) = vcfHashNextValue;
    
    char* newPosition = (char*)(vcfHashTable + vcfHashNextValue);
    for (BYTE i = 0; i < 225; i++) {
        newPosition[i] = position[i];
    }
    
    pNext = vcfHashNextValue + 228;
    *(UINT*)(vcfHashTable + pNext) = 0;
    vcfHashNextValue += 232;
    
    return vcfHashNextValue;
}


bool vcfPositionHas(BYTE keyLen, UINT keySum, char* position) {
    UINT pNext = ((keyLen >> 1) * 16155 + keySum) << 2,
        pPosition = *(UINT*)(vcfHashTable + pNext);
    while (pPosition) {
        bool isEqual = true;
        char* nextPosition = (char*)(vcfHashTable + pPosition);
        for (BYTE i = 0; i < 225; i++) {
            if (nextPosition[i] != position[i]) {
                isEqual = false;
                break;
            }
        }
        if (isEqual) return true;
        pNext = pPosition + 228;
        pPosition = *(UINT*)(vcfHashTable + pNext);
    }
    return false;
}


UINT vcfMovesPush(BYTE keyLen, UINT keySum, BYTE* move) {
    if (vcfHashNextValue >= VCF_HASHTABLE_LEN) {
        return 0;
    }
    
    BYTE movesByte = ((keyLen >> 2) + 1) << 2;
    UINT pNext = ((keyLen >> 1) * 16155 + keySum) << 2,
        pMoves =  *(UINT*)(vcfHashTable + pNext);
    
    while (pMoves) {
        pNext = pMoves + movesByte;
        pMoves = *(UINT*)(vcfHashTable + pNext);
    }
    
    *(UINT*)(vcfHashTable + pNext) = vcfHashNextValue;
    
    BYTE* newMoves = vcfHashTable + vcfHashNextValue;
    newMoves[0] = keyLen;
    newMoves++;
    for (BYTE i = 0; i < keyLen; i++) {
        newMoves[i] = move[i];
    }
    
    pNext = vcfHashNextValue + movesByte;
    *(UINT*)(vcfHashTable + pNext) = 0;
    vcfHashNextValue = pNext+ 4;
    
    return vcfHashNextValue;
}

// 对比VCF手顺是否相等
bool vcfMovesHas(BYTE keyLen, UINT keySum, BYTE* move) {
    BYTE movesByte = ((keyLen >> 2) + 1) << 2;
    UINT pNext = ((keyLen >> 1) * 16155 + keySum) << 2,
        pMoves = *(UINT*)(vcfHashTable + pNext);
    while (pMoves) {
        if(isRepeatMove(move, vcfHashTable + pMoves + 1, keyLen)) return true;
        pNext = pMoves + movesByte;
        pMoves = *(UINT*)(vcfHashTable + pNext);
    }
    return false;
}

void vcfTransTablePush(BYTE keyLen, UINT keySum, BYTE* moves, char* position) {
    if (keyLen < 73)
        vcfMovesPush(keyLen, keySum, moves);
    else
        vcfPositionPush(keyLen, keySum, position);
}

bool vcfTransTableHas(BYTE keyLen, UINT keySum, BYTE* moves, char* position) {
    if (keyLen < 73)
        return vcfMovesHas(keyLen, keySum, moves);
    else
        return vcfPositionHas(keyLen, keySum, position);
}


void findVCF(char* arr, char color, UINT logStart, UINT logCount) {
    BYTE centerIdx = 112,
        colorIdx = 0xff,
        nColorIdx = 0xff;
    BYTE movesLen = 0;
    UINT stackLen = 0;
    bool done = false;
    UINT sum = 0,
        pushMoveCount = 0,
        pushPositionCount = 0,
        hasCount = 0,
        loopCount = 0;
        
    resetVCF();
    
    vcfStack[stackLen++] = 0xff;
    vcfStack[stackLen++] = 0xff;
    vcfStack[stackLen++] = 225;
    vcfStack[stackLen++] = 225;
    
    while (!done) {
        if(!(++loopCount & 0xffff)) log(loopCount);
        
        nColorIdx = vcfStack[--stackLen];
        //log(nColorIdx);
        colorIdx = vcfStack[--stackLen];
        //log(colorIdx);
        
        if (colorIdx < 0xff) {
            if (colorIdx < 225) {
                arr[colorIdx] = color;
                arr[nColorIdx] = INVERT_COLOR[color];
                vcfMoves[movesLen++] = colorIdx;
                vcfMoves[movesLen++] = nColorIdx;
                centerIdx = colorIdx;
                sum += colorIdx;
                vcfStack[stackLen++] = 0xff;
                vcfStack[stackLen++] = 0xff;
                //log((BYTE*)(vcfMoves),movesLen);
            }

            if (vcfTransTableHas(movesLen, sum, vcfMoves, arr)) {
                hasCount++;
            }
            else {
                if (loopCount >= logStart && loopCount < (logStart + logCount)) log((BYTE*)(vcfMoves), movesLen);
                
                testFour(arr, color, vcfInfoArr);
                DWORD nLevel = getLevel(arr, INVERT_COLOR[color]);
                //log (nLevel);
                if ((nLevel & 0xff) <= LEVEL_NOFREEFOUR) {
                    BYTE end;
                    if ((nLevel & 0xff) == LEVEL_NOFREEFOUR) {
                        end = 1;
                        centerIdx = nLevel >> 8;
                    }
                    else {
                        end = 225;
                    }

                    BYTE twoPointsLen = 0,
                        threePointsLen = 0,
                        freeThreePointsLen = 0,
                        fourPointsLen = 0;
                    BYTE i = 0;
                    for (i = 0; i < end; i++) {
                        BYTE idx = aroundIdx(centerIdx, i);
                        DWORD max = vcfInfoArr[idx] & FOUL_MAX;
                        //if((max & MAX) == FOUR_NOFREE) log(max);
                        if (max == FOUR_NOFREE) {
                            arr[idx] = color;
                            DWORD level = getLevel(arr, color);
                            arr[idx] = 0;
                            //log(level);
                            //log((level & 0xff) == LEVEL_FREEFOUR);

                            if ((level & 0xff) == LEVEL_FREEFOUR) { //
                                //push VCF
                                vcfTransTablePush(movesLen, sum, vcfMoves, arr);
                                
                                for (BYTE j = 0; j < movesLen; j++) {
                                    vcfStack[stackLen++] = 0xff;
                                    vcfWinMoves[j] = vcfMoves[j]; // push winMove;
                                    //log(vcfWinMoves, movesLen);
                                }
                                log(88888);
                                log(loopCount);
                                log(stackLen);
                                log((BYTE*)(vcfMoves), movesLen);
                                log((BYTE*)(vcfStack), stackLen);
                                log(-88888);
                                
                                vcfWinMoves[movesLen] = idx;
                                vcfWinMoves[movesLen + 1] = 0xff;
                                
                                vcfStack[stackLen++] = 0xff;
                                vcfStack[stackLen++] = 0xff;
                                break;
                            }
                            else {
                                DWORD lineInfo = 0;
                                for (BYTE direction=0; direction<4; direction++) {
                                    DWORD info = FOUL_MAX_FREE & testLine(idx, direction, color, arr);
                                    if (info == THREE_FREE) {
                                        lineInfo = THREE_FREE;
                                        break;
                                    }
                                    else if (info == THREE_NOFREE) {
                                        lineInfo = THREE_NOFREE;
                                    }
                                }
                                if (lineInfo == THREE_FREE) {
                                    vcfFreeThreePoints[freeThreePointsLen++] = (level >> 8);
                                    vcfFreeThreePoints[freeThreePointsLen++] = idx;
                                }
                                else if (lineInfo == THREE_NOFREE) {
                                    vcfThreePoints[threePointsLen++] = (level >> 8);
                                    vcfThreePoints[threePointsLen++] = idx;
                                }
                                else if ((lineInfo & TWO_NOFREE) == TWO_NOFREE) {
                                    vcfTwoPoints[twoPointsLen++] = (level >> 8);
                                    vcfTwoPoints[twoPointsLen++] = idx;
                                }
                                else {
                                    vcfFourPoints[fourPointsLen++] = (level >> 8);
                                    vcfFourPoints[fourPointsLen++] = idx;
                                }
                            }
                        }
                    }
                    if (i >= end) {
                        /*
                        log((BYTE*)(vcfFourPoints), fourPointsLen);
                        log((BYTE*)(vcfTwoPoints), twoPointsLen);
                        log((BYTE*)(vcfThreePoints), threePointsLen);
                        log((BYTE*)(vcfFreeThreePoints), freeThreePointsLen);
                        */
                        
                        end = fourPointsLen;          
                        for (BYTE i=0; i<end; i++) vcfStack[stackLen++] = vcfFourPoints[--fourPointsLen];
                        end = twoPointsLen;
                        for (BYTE i=0; i<end; i++) vcfStack[stackLen++] = vcfTwoPoints[--twoPointsLen];
                        end = threePointsLen;
                        for (BYTE i=0; i<end; i++) vcfStack[stackLen++] = vcfThreePoints[--threePointsLen];
                        end = freeThreePointsLen;
                        for (BYTE i=0; i<end; i++) vcfStack[stackLen++] = vcfFreeThreePoints[--freeThreePointsLen];
                        
                        if (loopCount >= logStart && loopCount < (logStart + logCount)) log((BYTE*)(vcfStack), stackLen);
                    }
                }
            }
        }
        else {
            if (movesLen < 73) pushMoveCount++;
            else pushPositionCount++;
            vcfTransTablePush(movesLen, sum, vcfMoves, arr);
        }

        if (colorIdx == 0xff) { //back
            if (movesLen) {
                BYTE idx = vcfMoves[--movesLen];
                arr[idx] = 0;
                idx = vcfMoves[--movesLen];
                arr[idx] = 0;
                sum -= idx;
            }
            else {
                done = true;
            }
        }
    }
    log(99999);
    log(sum);
    log(pushMoveCount); 
    log(pushPositionCount);
    log(hasCount);
    log(loopCount);
    log(-99999);
}


//--------------------------------------------------

