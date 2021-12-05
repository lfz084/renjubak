
#define NULL 0

typedef unsigned char BYTE;
typedef unsigned int UINT; 
typedef unsigned short DWORD;
typedef char* CString;

extern UINT getBuffer(BYTE* pBuf, UINT size);
extern UINT grow(UINT pages);
extern void loading(UINT current, UINT end);

/*
UINT getBuffer(BYTE* pBuf, UINT size){
    static UINT current=0;
    BYTE bytes[]={255,82,101,110,76,105,98,255,3,0,255,255,255,255,255,255,255,255,255,255,0,0,120,0,104,0,90,0,105,0,103,0,137,0,121,0,119,0,134,0,88,0,72,1,0,1,99,0,102,1,0,1,87,54,49,32,0,0,85,129,0,1,76,54,49,32,0,0,122,1,0,1,87,54,49,32,0,0,139,129,0,1,76,54,49,32,0,0,57,1,0,1,87,54,49,32,0,0,74,129,0,1,76,54,49,32,0,0,58,1,0,1,87,54,49,32,0,0,56,129,0,1,76,54,49,32,0,0,43,1,0,1,87,54,49,32,0,0,28,129,0,1,76,54,49,32,0,0,41,1,0,1,87,54,49,32,0,0,75,129,0,1,76,54,49,32,0,0,76,1,0,1,87,54,49,32,0,0,73,129,0,1,76,54,49,32,0,0,71,1,0,1,87,54,49,32,0,0,54,1,0,1,76,54,49,32,0,0,107,1,0,1,87,54,49,32,0,0,92,129,0,1,76,54,49,32,0,0,170,1,0,1,87,54,49,32,0,0,39,129,0,1,99,76,54,49,0,0,22,1,0,1,97,87,54,49,0,0,154,1,0,1,76,54,49,32,0,0,168,1,0,1,87,54,49,32,0,0,169,1,0,1,76,54,49,32,0,0,184,1,0,1,87,54,49,32,0,0,136,1,0,1,76,54,49,32,0,0,152,1,0,1,87,54,49,32,0,0,167,1,0,1,76,54,49,32,0,0,200,1,0,1,87,54,49,32,0,0,216,1,0,1,76,54,49,32,0,0,185,1,0,1,87,54,49,32,0,0,109,1,0,1,76,54,49,32,0,0,124,1,0,1,87,54,49,32,0,0,126,1,0,1,76,54,49,32,0,0,143,1,0,1,87,54,49,32,0,0,215,1,0,1,76,54,49,32,0,0,183,1,0,1,87,54,49,32,0,0,186,1,0,1,76,54,49,32,0,0,153,1,0,1,87,54,49,32,0,0,138,65,0,1,76,54,49,32,0,0,151,129,0,1,99,0,168,65,0,1,97,0,106,192,154,192,155,129,0,1,99,0,168,65,0,1,97,0,136,129,0,1,99,0,106,65,0,1,97,0,152,129,0,1,99,0,106,65,0,1,97,0,138,129,0,1,99,0,42,65,0,1,97,0,22,192,108,129,0,1,99,0,154,65,0,1,97,0,153,129,0,1,99,0,106,65,0,1,97,0,167,1,0,1,99,0,106,65,0,1,97,0,152,129,0,1,99,0,108,65,0,1,97,0,39,192,22,1,0,1,99,0,39,65,0,1,97,0,107,129,0,1,99,0,89,65,0,1,97,0,55,129,0,1,99,0,152,65,0,1,97,0,69,129,0,1,99,0,152,65,0,1,97,0,124,129,0,1,99,0,89,65,0,1,97,0,133,129,0,1,99,0,152,65,0,1,97,0,123,129,0,1,99,0,42,65,0,1,97,0,100,129,0,1,99,0,152,65,0,1,97,0,155,129,0,1,99,0,152,65,0,1,97,0,151,129,0,1,99,0,152,65,0,1,97,0,166,129,0,1,99,0,152,65,0,1,97,0,71,129,0,1,99,0,73,65,0,1,97,0,168,129,0,1,99,0,152,65,0,1,97,0,91,129,0,1,99,0,42,65,0,1,97,0,152,129,0,1,99,0,42,65,0,1,97,0,39,129,0,1,99,0,89,65,0,1,97,0,117,129,0,1,99,0,152,65,0,1,97,0,86,129,0,1,99,0,42,65,0,1,97,0,150,129,0,1,99,0,152,65,0,1,97,0,101,129,0,1,99,0,152,65,0,1,97,0,83,129,0,1,99,0,152,65,0,1,97,0,53,129,0,1,99,0,152,65,0,1,97,0,52,129,0,1,99,0,42,65,0,1,97,0,84,129,0,1,99,0,152,65,0,1,97,0,70,129,0,1,99,0,54,65,0,1,97,0,45,129,0,1,99,0,92,65,0,1,97,0,149,129,0,1,99,0,152,65,0,1,97,0,171,129,0,1,99,0,152,65,0,1,97,0,169,129,0,1,99,0,152,65,0,1,97,0,165,129,0,1,99,0,152,65,0,1,97,0,25,129,0,1,99,0,152,65,0,1,97,0,106,129,0,1,99,0,152,65,0,1,97,0,132,129,0,1,99,0,152,65,0,1,97,0,187,129,0,1,99,0,152,65,0,1,97,0,89,129,0,1,99,0,42,65,0,1,97,0,172,129,0,1,99,0,152,65,0,1,97,0,148,129,0,1,99,0,152,65,0,1,97,0,141,129,0,1,99,0,152,65,0,1,97,0,154,129,0,1,99,0,152,65,0,1,97,0,184,129,0,1,99,0,152,65,0,1,97,0,92,129,0,1,99,0,42,65,0,1,97,0,182,129,0,1,99,0,42,65,0,1,97,0,170,129,0,1,99,0,152,65,0,1,97,0,140,129,0,1,99,0,152,65,0,1,97,0,135,129,0,1,99,0,152,65,0,1,97,0,109,129,0,1,99,0,152,65,0,1,97,0,185,129,0,1,99,0,152,65,0,1,97,0,167,129,0,1,99,0,42,65,0,1,97,0,164,129,0,1,99,0,152,65,0,1,97,0,136,129,0,1,99,0,152,65,0,1,97,0,118,129,0,1,99,0,152,65,0,1,97,0,37,129,0,1,99,0,152,65,0,1,97,0,68,129,0,1,99,0,152,65,0,1,97,0,40,129,0,1,99,0,152,65,0,1,97,0,93,129,0,1,99,0,152,65,0,1,97,0,94,129,0,1,99,0,152,65,0,1,97,0,156,129,0,1,99,0,152,65,0,1,97,0,188,129,0,1,99,0,152,65,0,1,97,0,115,129,0,1,99,0,152,65,0,1,97,0,108,129,0,1,99,0,152,65,0,1,97,0,116,129,0,1,99,0,152,65,0,1,97,0,60,129,0,1,99,0,42,65,0,1,97,0,38,129,0,1,99,0,152,65,0,1,97,0,54,129,0,1,99,0,73,65,0,1,97,0,138,129,0,1,99,0,152,65,0,1,97,0,153,129,0,1,99,0,152,65,0,1,97,0,131,129,0,1,99,0,152,65,0,1,97,0,44,129,0,1,99,0,152,65,0,1,97,0,130,129,0,1,99,0,152,65,0,1,97,0,142,129,0,1,99,0,152,65,0,1,97,0,21,129,0,1,99,0,152,65,0,1,97,0,29,129,0,1,99,0,152,65,0,1,97,0,61,129,0,1,99,0,152,65,0,1,97,0,24,129,0,1,99,0,152,65,0,1,97,0,59,129,0,1,99,0,152,65,0,1,97,0,173,129,0,1,99,0,152,65,0,1,97,0,77,129,0,1,99,0,152,65,0,1,97,0,125,129,0,1,99,0,152,65,0,1,97,0,147,129,0,1,99,0,152,65,0,1,97,0,22,129,0,1,99,0,89,65,0,1,97,0,87,129,0,1,99,0,152,65,0,1,97,0,157,129,0,1,99,0,152,65,0,1,97,0,67,129,0,1,99,0,152,65,0,1,97,0,179,129,0,1,99,0,152,65,0,1,97,0,51,129,0,1,99,0,152,65,0,1,97,0,42,129,0,1,99,0,152,65,0,1,97,0,99,129,0,1,99,0,152,65,0,1,97,0,82,129,0,1,99,0,152,65,0,1,97,0,26,129,0,1,99,0,152,65,0,1,97,0,62,129,0,1,99,0,92,65,0,1,97,0,30,129,0,1,99,0,152,65,0,1,97,0,27,129,0,1,99,0,152,65,0,1,97,0,11,129,0,1,99,0,152,65,0,1,97,0,9,129,0,1,99,0,152,65,0,1,97,0,110,129,0,1,99,0,152,65,0,1,97,0,46,129,0,1,99,0,152,65,0,1,97,0,7,129,0,1,99,0,152,65,0,1,97,0,6,129,0,1,99,0,152,65,0,1,97,0,78,129,0,1,99,0,152,65,0,1,97,0,10,129,0,1,99,0,152,65,0,1,97,0,126,129,0,1,99,0,152,65,0,1,97,0,127,129,0,1,99,0,152,65,0,1,97,0,12,129,0,1,99,0,152,65,0,1,97,0,8,129,0,1,99,0,152,65,0,1,97,0,23,129,0,1,99,0,152,65,0,1,97,0,13,129,0,1,99,0,152,65,0,1,97,0,190,129,0,1,99,0,152,65,0,1,97,0,79,129,0,1,99,0,152,65,0,1,97,0,34,129,0,1,99,0,152,65,0,1,97,0,5,129,0,1,99,0,152,65,0,1,97,0,14,129,0,1,99,0,152,65,0,1,97,0,31,1,0,1,99,0,152,65,0,1,97,0,71,129,0,1,99,76,51,49,0,0,73,65,0,1,97,87,51,49,0,0,107,129,0,1,99,0,54,65,0,1,97,0,76,129,0,1,99,0,92,65,0,1,97,0,69,129,0,1,99,0,89,65,0,1,97,0,124,129,0,1,99,0,54,65,0,1,97,0,70,129,0,1,99,0,152,65,0,1,97,0,39,129,0,1,99,0,54,65,0,1,97,0,89,129,0,1,99,0,92,65,0,1,97,0,141,129,0,1,99,0,89,65,0,1,97,0,77,129,0,1,99,0,89,65,0,1,97,0,22,129,0,1,99,0,54,65,0,1,97,0,5,1,0,1,99,0,89,65,0,1,97,0,75,129,0,1,76,52,49,32,0,0,73,1,0,1,87,52,49,32,0,0,28,1,0,1,76,52,49,32,0,0,60,1,0,1,87,52,49,32,0,0,89,1,0,1,76,52,49,32,0,0,77,1,0,1,87,52,49,32,0,0,26,1,0,1,76,52,49,32,0,0,61,1,0,1,87,52,49,32,0,0,59,1,0,1,76,52,49,32,0,0,107,1,0,1,87,52,49,32,0,0,92,1,0,1,76,52,49,32,0,0,111,65,0,1,87,52,49,32,0,0,107,129,0,1,99,0,54,65,0,1,97,0,71,129,0,1,99,0,73,65,0,1,97,0,69,129,0,1,99,0,28,65,0,1,97,0,124,129,0,1,99,0,54,65,0,1,97,0,76,129,0,1,99,0,73,65,0,1,97,0,70,129,0,1,99,0,152,65,0,1,97,0,39,129,0,1,99,0,54,65,0,1,97,0,141,129,0,1,99,0,28,65,0,1,97,0,77,129,0,1,99,0,28,65,0,1,97,0,22,129,0,1,99,0,54,65,0,1,97,0,5,1,0,1,99,0,28,65,0,1,97,0,75,129,0,1,76,51,53,32,0,0,73,1,0,1,87,51,53,32,0,0,41,1,0,1,76,51,53,32,0,0,153,1,0,1,87,51,53,32,0,0,107,1,0,1,76,51,53,32,0,0,168,1,0,1,87,51,53,32,0,0,155,1,0,1,76,51,53,32,0,0,170,1,0,1,87,51,53,32,0,0,136,65,0,1,76,51,53,32,0,0,73,129,0,1,76,53,49,32,0,0,71,1,0,1,87,53,49,32,0,0,54,1,0,1,76,53,49,32,0,0,107,1,0,1,87,53,49,32,0,0,92,1,0,1,76,53,49,32,0,0,59,1,0,1,87,53,49,32,0,0,75,1,0,1,76,53,49,32,0,0,76,1,0,1,87,53,49,32,0,0,56,1,0,1,76,53,49,32,0,0,170,1,0,1,87,53,49,32,0,0,22,1,0,1,76,53,49,32,0,0,39,1,0,1,87,53,49,32,0,0,106,1,0,1,76,53,49,32,0,0,152,1,0,1,87,53,49,32,0,0,167,1,0,1,76,53,49,32,0,0,154,1,0,1,87,53,49,32,0,0,136,1,0,1,76,53,49,32,0,0,151,1,0,1,87,53,49,32,0,0,153,1,0,1,76,53,49,32,0,0,186,1,0,1,87,53,49,32,0,0,138,1,0,1,76,53,49,32,0,0,203,1,0,1,87,53,49,32,0,0,169,1,0,1,76,53,49,32,0,0,188,65,0,1,87,53,49,32,0,0,55,129,0,1,99,0,92,65,0,1,97,0,107,129,0,1,99,0,56,65,0,1,97,0,69,129,0,1,99,0,59,65,0,1,97,0,91,129,0,1,99,0,56,65,0,1,97,0,71,129,0,1,99,0,73,65,0,1,97,0,133,129,0,1,99,0,59,65,0,1,97,0,124,129,0,1,99,0,56,65,0,1,97,0,100,129,0,1,99,0,92,65,0,1,97,0,155,129,0,1,99,0,56,65,0,1,97,0,76,129,0,1,99,0,107,65,0,1,97,0,151,129,0,1,99,0,107,65,0,1,97,0,70,129,0,1,99,0,92,65,0,1,97,0,166,129,0,1,99,0,59,65,0,1,97,0,168,129,0,1,99,0,59,65,0,1,97,0,152,129,0,1,99,0,56,65,0,1,97,0,123,129,0,1,99,0,55,65,0,1,97,0,117,129,0,1,99,0,59,65,0,1,97,0,141,129,0,1,99,0,92,65,0,1,97,0,150,129,0,1,99,0,59,65,0,1,97,0,83,129,0,1,99,0,59,65,0,1,97,0,59,129,0,1,99,0,54,65,0,1,97,0,106,129,0,1,99,0,59,65,0,1,97,0,52,129,0,1,99,0,59,65,0,1,97,0,86,129,0,1,99,0,59,65,0,1,97,0,84,129,0,1,99,0,59,65,0,1,97,0,101,129,0,1,99,0,107,65,0,1,97,0,53,129,0,1,99,0,56,65,0,1,97,0,149,129,0,1,99,0,59,65,0,1,97,0,171,129,0,1,99,0,56,65,0,1,97,0,169,129,0,1,99,0,59,65,0,1,97,0,165,129,0,1,99,0,59,65,0,1,97,0,132,129,0,1,99,0,59,65,0,1,97,0,89,129,0,1,99,0,59,65,0,1,97,0,187,129,0,1,99,0,59,65,0,1,97,0,172,129,0,1,99,0,59,65,0,1,97,0,148,129,0,1,99,0,59,65,0,1,97,0,92,129,0,1,99,0,59,65,0,1,97,0,154,129,0,1,99,0,59,65,0,1,97,0,136,129,0,1,99,0,107,65,0,1,97,0,184,129,0,1,99,0,59,65,0,1,97,0,182,129,0,1,99,0,59,65,0,1,97,0,60,129,0,1,99,0,54,65,0,1,97,0,140,129,0,1,99,0,59,65,0,1,97,0,170,129,0,1,99,0,59,65,0,1,97,0,135,129,0,1,99,0,59,65,0,1,97,0,185,129,0,1,99,0,59,65,0,1,97,0,167,129,0,1,99,0,59,65,0,1,97,0,108,129,0,1,99,0,56,65,0,1,97,0,37,129,0,1,99,0,59,65,0,1,97,0,164,129,0,1,99,0,59,65,0,1,97,0,109,129,0,1,99,0,59,65,0,1,97,0,118,129,0,1,99,0,59,65,0,1,97,0,68,129,0,1,99,0,59,65,0,1,97,0,39,129,0,1,99,0,56,65,0,1,97,0,156,129,0,1,99,0,59,65,0,1,97,0,188,129,0,1,99,0,59,65,0,1,97,0,38,129,0,1,99,0,59,65,0,1,97,0,115,129,0,1,99,0,59,65,0,1,97,0,41,129,0,1,99,0,107,65,0,1,97,0,116,129,0,1,99,0,59,65,0,1,97,0,138,129,0,1,99,0,59,65,0,1,97,0,153,129,0,1,99,0,59,65,0,1,97,0,93,129,0,1,99,0,92,65,0,1,97,0,131,129,0,1,99,0,59,65,0,1,97,0,77,129,0,1,99,0,107,65,0,1,97,0,54,129,0,1,99,0,59,65,0,1,97,0,44,129,0,1,99,0,92,65,0,1,97,0,130,129,0,1,99,0,59,65,0,1,97,0,94,129,0,1,99,0,92,65,0,1,97,0,142,129,0,1,99,0,73,65,0,1,97,0,21,129,0,1,99,0,59,65,0,1,97,0,40,129,0,1,99,0,92,65,0,1,97,0,61,129,0,1,99,0,92,65,0,1,97,0,43,129,0,1,99,0,92,65,0,1,97,0,173,129,0,1,99,0,59,65,0,1,97,0,125,129,0,1,99,0,73,65,0,1,97,0,147,129,0,1,99,0,59,65,0,1,97,0,25,129,0,1,99,0,92,65,0,1,97,0,87,129,0,1,99,0,59,65,0,1,97,0,157,129,0,1,99,0,59,65,0,1,97,0,67,129,0,1,99,0,59,65,0,1,97,0,179,129,0,1,99,0,59,65,0,1,97,0,51,129,0,1,99,0,59,65,0,1,97,0,99,129,0,1,99,0,59,65,0,1,97,0,82,129,0,1,99,0,59,65,0,1,97,0,29,129,0,1,99,0,92,65,0,1,97,0,45,129,0,1,99,0,92,65,0,1,97,0,28,129,0,1,99,0,92,65,0,1,97,0,42,129,0,1,99,0,56,65,0,1,97,0,6,129,0,1,99,0,59,65,0,1,97,0,27,129,0,1,99,0,92,65,0,1,97,0,26,129,0,1,99,0,59,65,0,1,97,0,10,129,0,1,99,0,59,65,0,1,97,0,24,129,0,1,99,0,56,65,0,1,97,0,12,129,0,1,99,0,59,65,0,1,97,0,9,129,0,1,99,0,59,65,0,1,97,0,7,129,0,1,99,0,59,65,0,1,97,0,23,129,0,1,99,0,59,65,0,1,97,0,190,129,0,1,99,0,59,65,0,1,97,0,13,129,0,1,99,0,59,65,0,1,97,0,34,1,0,1,99,0,59,65,0,1,97,0,69,129,0,1,99,0,107,65,0,1,97,0,107,129,0,1,99,0,54,65,0,1,97,0,55,129,0,1,99,0,54,65,0,1,97,0,106,129,0,1,99,0,152,65,0,1,97,0,133,129,0,1,99,0,107,65,0,1,97,0,100,129,0,1,99,0,107,65,0,1,97,0,124,129,0,1,99,0,107,65,0,1,97,0,155,129,0,1,99,0,107,65,0,1,97,0,73,129,0,1,99,0,107,65,0,1,97,0,91,129,0,1,99,0,54,65,0,1,97,0,151,129,0,1,99,0,54,65,0,1,97,0,166,129,0,1,99,0,56,65,0,1,97,0,71,129,0,1,99,0,107,65,0,1,97,0,168,129,0,1,99,0,108,65,0,1,97,0,152,129,0,1,99,0,54,65,0,1,97,0,123,129,0,1,99,0,54,65,0,1,97,0,70,129,0,1,99,0,107,65,0,1,97,0,117,129,0,1,99,0,107,65,0,1,97,0,75,129,0,1,99,0,107,65,0,1,97,0,141,129,0,1,99,0,107,65,0,1,97,0,150,129,0,1,99,0,107,65,0,1,97,0,83,129,0,1,99,0,107,65,0,1,97,0,52,129,0,1,99,0,107,65,0,1,97,0,56,129,0,1,99,0,107,65,0,1,97,0,86,129,0,1,99,0,107,65,0,1,97,0,84,129,0,1,99,0,107,65,0,1,97,0,101,129,0,1,99,0,107,65,0,1,97,0,53,129,0,1,99,0,107,65,0,1,97,0,149,129,0,1,99,0,107,65,0,1,97,0,171,129,0,1,99,0,107,65,0,1,97,0,169,129,0,1,99,0,107,65,0,1,97,0,165,129,0,1,99,0,107,65,0,1,97,0,132,129,0,1,99,0,107,65,0,1,97,0,187,129,0,1,99,0,107,65,0,1,97,0,89,129,0,1,99,0,152,65,0,1,97,0,172,129,0,1,99,0,107,65,0,1,97,0,148,129,0,1,99,0,107,65,0,1,97,0,40,129,0,1,99,0,107,65,0,1,97,0,154,129,0,1,99,0,107,65,0,1,97,0,136,129,0,1,99,0,54,65,0,1,97,0,76,129,0,1,99,0,54,65,0,1,97,0,184,129,0,1,99,0,107,65,0,1,97,0,182,129,0,1,99,0,107,65,0,1,97,0,140,129,0,1,99,0,152,65,0,1,97,0,170,129,0,1,99,0,107,65,0,1,97,0,135,129,0,1,99,0,107,65,0,1,97,0,185,129,0,1,99,0,107,65,0,1,97,0,167,129,0,1,99,0,107,65,0,1,97,0,37,129,0,1,99,0,107,65,0,1,97,0,164,129,0,1,99,0,107,65,0,1,97,0,118,129,0,1,99,0,107,65,0,1,97,0,68,129,0,1,99,0,107,65,0,1,97,0,60,129,0,1,99,0,107,65,0,1,97,0,39,129,0,1,99,0,107,65,0,1,97,0,156,129,0,1,99,0,107,65,0,1,97,0,188,129,0,1,99,0,107,65,0,1,97,0,38,129,0,1,99,0,107,65,0,1,97,0,115,129,0,1,99,0,107,65,0,1,97,0,109,129,0,1,99,0,107,65,0,1,97,0,58,129,0,1,99,0,107,65,0,1,97,0,116,129,0,1,99,0,107,65,0,1,97,0,108,129,0,1,99,0,152,65,0,1,97,0,138,129,0,1,99,0,107,65,0,1,97,0,153,129,0,1,99,0,107,65,0,1,97,0,59,129,0,1,99,0,152,65,0,1,97,0,93,129,0,1,99,0,56,65,0,1,97,0,131,129,0,1,99,0,107,65,0,1,97,0,130,129,0,1,99,0,107,65,0,1,97,0,94,129,0,1,99,0,108,65,0,1,97,0,21,129,0,1,99,0,107,65,0,1,97,0,54,129,0,1,99,0,107,65,0,1,97,0,41,129,0,1,99,0,107,65,0,1,97,0,42,129,0,1,99,0,107,65,0,1,97,0,77,129,0,1,99,0,107,65,0,1,97,0,173,129,0,1,99,0,107,65,0,1,97,0,147,129,0,1,99,0,107,65,0,1,97,0,25,129,0,1,99,0,107,65,0,1,97,0,87,129,0,1,99,0,107,65,0,1,97,0,67,129,0,1,99,0,107,65,0,1,97,0,157,129,0,1,99,0,107,65,0,1,97,0,179,129,0,1,99,0,107,65,0,1,97,0,125,129,0,1,99,0,56,65,0,1,97,0,51,129,0,1,99,0,74,65,0,1,97,0,43,129,0,1,99,0,107,65,0,1,97,0,99,129,0,1,99,0,107,65,0,1,97,0,82,129,0,1,99,0,107,65,0,1,97,0,142,129,0,1,99,0,107,65,0,1,97,0,26,129,0,1,99,0,107,65,0,1,97,0,45,129,0,1,99,0,107,65,0,1,97,0,23,129,0,1,99,0,107,65,0,1,97,0,27,129,0,1,99,0,107,65,0,1,97,0,12,129,0,1,99,0,107,65,0,1,97,0,9,129,0,1,99,0,107,65,0,1,97,0,6,129,0,1,99,0,107,65,0,1,97,0,24,129,0,1,99,0,107,65,0,1,97,0,190,129,0,1,99,0,107,65,0,1,97,0,34,129,0,1,99,0,107,65,0,1,97,0,92,1,0,1,99,0,54,1,0,1,97,0,71,1,0,1,99,0,56,65,0,1,97,0,71,1,0,1,99,0,138,1,0,1,97,0,136,129,0,1,99,0,107,65,0,1,97,0,139,129,0,1,99,0,170,65,0,1,97,0,140,129,0,1,99,0,139,65,0,1,97,0,156,1,0,1,99,0,170,65,0,1,97,0,71,129,0,1,99,0,136,65,0,1,97,0,136,129,0,1,99,0,71,65,0,1,97,0,74,129,0,1,99,0,136,65,0,1,97,0,55,129,0,1,99,0,136,65,0,1,97,0,123,129,0,1,99,0,122,65,0,1,97,0,69,129,0,1,99,0,136,65,0,1,97,0,124,129,0,1,99,0,122,65,0,1,97,0,151,129,0,1,99,0,136,65,0,1,97,0,91,129,0,1,99,0,136,65,0,1,97,0,166,129,0,1,99,0,136,65,0,1,97,0,133,129,0,1,99,0,136,65,0,1,97,0,168,129,0,1,99,0,136,65,0,1,97,0,73,129,0,1,99,0,136,65,0,1,97,0,42,129,0,1,99,0,136,65,0,1,97,0,150,129,0,1,99,0,136,65,0,1,97,0,75,129,0,1,99,0,136,65,0,1,97,0,56,129,0,1,99,0,136,65,0,1,97,0,107,129,0,1,99,0,136,65,0,1,97,0,52,129,0,1,99,0,136,65,0,1,97,0,155,129,0,1,99,0,136,65,0,1,97,0,138,129,0,1,99,0,85,65,0,1,97,0,165,129,0,1,99,0,136,65,0,1,97,0,135,129,0,1,99,0,85,65,0,1,97,0,152,129,0,1,99,0,136,65,0,1,97,0,149,129,0,1,99,0,136,65,0,1,97,0,132,129,0,1,99,0,136,65,0,1,97,0,172,129,0,1,99,0,136,65,0,1,97,0,148,129,0,1,99,0,136,65,0,1,97,0,170,129,0,1,99,0,136,65,0,1,97,0,117,129,0,1,99,0,136,65,0,1,97,0,58,129,0,1,99,0,136,65,0,1,97,0,100,129,0,1,99,0,136,65,0,1,97,0,76,129,0,1,99,0,136,65,0,1,97,0,70,129,0,1,99,0,136,65,0,1,97,0,185,129,0,1,99,0,136,65,0,1,97,0,92,129,0,1,99,0,136,65,0,1,97,0,60,129,0,1,99,0,136,65,0,1,97,0,139,129,0,1,99,0,85,65,0,1,97,0,57,129,0,1,99,0,136,65,0,1,97,0,182,129,0,1,99,0,136,65,0,1,97,0,164,129,0,1,99,0,136,65,0,1,97,0,118,129,0,1,99,0,136,65,0,1,97,0,68,129,0,1,99,0,139,65,0,1,97,0,84,129,0,1,99,0,136,65,0,1,97,0,39,129,0,1,99,0,136,65,0,1,97,0,154,129,0,1,99,0,136,65,0,1,97,0,171,129,0,1,99,0,136,65,0,1,97,0,169,129,0,1,99,0,136,65,0,1,97,0,156,129,0,1,99,0,85,65,0,1,97,0,59,129,0,1,99,0,136,65,0,1,97,0,108,129,0,1,99,0,136,65,0,1,97,0,167,129,0,1,99,0,136,65,0,1,97,0,153,129,0,1,99,0,86,65,0,1,97,0,188,129,0,1,99,0,136,65,0,1,97,0,38,129,0,1,99,0,136,65,0,1,97,0,54,129,0,1,99,0,136,65,0,1,97,0,101,129,0,1,99,0,136,65,0,1,97,0,53,129,0,1,99,0,136,65,0,1,97,0,116,129,0,1,99,0,136,65,0,1,97,0,140,129,0,1,99,0,85,65,0,1,97,0,141,129,0,1,99,0,136,65,0,1,97,0,83,129,0,1,99,0,136,65,0,1,97,0,131,129,0,1,99,0,139,65,0,1,97,0,93,129,0,1,99,0,136,65,0,1,97,0,37,129,0,1,99,0,136,65,0,1,97,0,40,129,0,1,99,0,136,65,0,1,97,0,147,129,0,1,99,0,136,65,0,1,97,0,51,129,0,1,99,0,136,65,0,1,97,0,41,129,0,1,99,0,136,65,0,1,97,0,179,129,0,1,99,0,136,65,0,1,97,0,43,129,0,1,99,0,136,65,0,1,97,0,99,129,0,1,99,0,136,65,0,1,97,0,21,129,0,1,99,0,136,65,0,1,97,0,27,129,0,1,99,0,136,65,0,1,97,0,45,129,0,1,99,0,136,65,0,1,97,0,24,129,0,1,99,0,136,65,0,1,97,0,87,129,0,1,99,0,136,1,0,1,97,0,85,129,0,1,99,0,139,65,0,1,97,0,153,1,0,1,99,0,139,65,0,1,97,0,86,129,0,1,99,0,136,1,0,1,97,0,85,129,0,1,99,0,139,65,0,1,97,0,153,129,0,1,99,0,139,65,0,1,97,0,69,129,0,1,99,0,52,65,0,1,97,0,52,1,0,1,99,0,69,65,0,1,97,0,89,129,0,1,99,0,136,1,0,1,97,0,85,129,0,1,99,0,139,65,0,1,97,0,153,1,0,1,99,0,139,65,0,1,97,0,106,129,0,1,99,0,136,1,0,1,97,0,85,129,0,1,99,0,139,65,0,1,97,0,153,1,0,1,99,0,139,65,0,1,97,0,122,1,0,1,99,0,85,1,0,1,97,0,136,129,0,1,99,0,86,65,0,1,97,0,68,129,0,1,99,0,153,1,0,1,97,0,136,1,0,1,99,0,86,1,0,1,97,0,87,129,0,1,99,0,54,1,0,1,97,0,70,129,0,1,99,0,71,65,0,1,97,0,118,129,0,1,99,0,70,65,0,1,97,0,38,129,0,1,99,0,70,65,0,1,97,0,124,129,0,1,99,0,123,65,0,1,97,0,123,1,0,1,99,0,124,65,0,1,97,0,89,129,0,1,99,0,71,65,0,1,97,0,124,129,0,1,99,0,123,1,0,1,97,0,87,129,0,1,99,0,54,64,89,129,0,1,99,0,54,65,0,1,97,0,84,1,0,1,99,0,89,65,0,1,97,0,84,129,0,1,99,0,89,65,0,1,97,0,123,1,0,1,99,0,124,65,0,1,97,0,123,129,0,1,99,0,124,1,0,1,97,0,136,129,0,1,99,0,86,65,0,1,97,0,68,1,0,1,99,0,86,65,0,1,97,0,124,1,0,1,99,0,123,1,0,1,97,0,136,129,0,1,99,0,86,65,0,1,97,0,68,1,0,1,99,0,86,65,0,1,97,0
    };
    UINT len = sizeof(bytes);
    UINT rt = 0;
    //cout << int(pBuf) << endl;
    //cout << " current = " << current << endl;
    for(UINT i=0; i<size; i++){
        if(current >= len) break;
        pBuf[i] = bytes[current];
        //cout << int(bytes[current]) << ",";
        current++;
        rt++;
    }
    //cout << endl;
    return rt;
}
*/
const UINT _ONE_KB = 1024; //1KB
const UINT _PAGE_SIZE = _ONE_KB*64; //64K
const UINT _ONE_MB = _ONE_KB*1024; //1MB
const UINT _IO_BUFFER_SIZE = _PAGE_SIZE;
const UINT _ERR_BUFFER_SIZE = _ONE_MB;
const UINT _LOG_BUFFER_SIZE = _ONE_MB*2;
const UINT _COMMENT_BUFFER_SIZE = _ONE_MB*2;
const UINT _BOARDTEXT_BUFFER_SIZE = _ONE_MB*64;
const UINT _LIBFILE_BUFFER_SIZE = _ONE_MB;

char _empty0[_ONE_KB] = {0};

const char STR_MOVENODE_MPOS_ERR[] = "MoveNode node Error: mPos error";
const char STR_STACK_FULL_0[] = "Stack Push(int nMove, MoveNode* pMove) Error: Stack full";
const char STR_STACK_EMPTY_0[] = "Stack Pop(int nMove, MoveNode* pMove) Error: Stack is Empty";
const char STR_STACK_FULL_1[] = "Stack Push(MoveNode* pMove) Error: Stack full";
const char STR_STACK_EMPTY_1[] = "Stack Pop(MoveNode* pMove) Error: Stack is Empty";
const char STR_STACK_FULL_2[] = "Stack Push(int nMove) Error: Stack full";
const char STR_STACK_EMPTY_2[] = "Stack Pop(int nMove) Error: Stack is Empty";
const char STR_MOVELIST_SETROOT_ERR[] = "MoveList SetRoot Error:";
const char STR_MOVELIST_FULL[] = "MoveList full";
const char STR_MOVELIST_SWAP_ERR[] = "MoveList Swap Error:";
const char STR_MOVELIST_GET_ERR[] = "MoveList Get Error:";
const char STR_MOVELIST_GETROOT_ERR[] = "MoveList GetRoot Error:";
const char STR_MOVELIST_CURRENT_ERR[] = "MoveList Current Error:";
const char STR_MOVELIST_SETINDEX_ERR[] = "MoveList SetIndex Error:";
const char STR_MOVELIST_DECREMENT_ERR[] = "MoveList Decrement Error:";
const char STR_CHECK_VERSION_ERR[] = "CheckVersion Error";
const char STR_NOT_RENLIB_FILE[] ="not RenLib File";
const char STR_SKIP_ROOT_NODE[] = "Skip root node";
const char STR_CHECKING_CODE_ERR[] = "ERROR checking code";
const char STR_ADDLIBRARY[] = "addLibrary...";
const char STR_SETROOT[] = "MoveList SetRoot";
const char STR_CHECKING_CODE[] = "checking code";
const char STR_GETVARIANT[] = "getVariant";
const char STR_SET_COMMENT[] = "set comment";
const char STR_SET_BOARDTXT[] = "set BoardTxt";
const char STR_ADDATTRIBUTES[] = "addAttributes";
const char STR_GET[] = "get";
const char STR_SETPOS[] = "setPos";
const char STR_SETINFO[] = "setInfo";

char MoveNode_Name_buffer[4] = {0};
char bit32_buffer[4] = {0};

UINT current_log_buffer = 0;
UINT current_err_buffer = 1;
UINT current_comment_buffer = 2;
UINT current_boardText_buffer = 3;
UINT current_data_buffer = 4;
UINT end_data_buffer = 5;

const UINT skip_data_pages = 32;
//const UINT start_data_buffer = _PAGE_SIZE * skip_data_pages; //skip 128 page

BYTE out_buffer[_IO_BUFFER_SIZE] = {0};
char _empty1[_ONE_KB] = {0};
BYTE in_buffer[_IO_BUFFER_SIZE] = {0};
char _empty2[_ONE_KB] = {0};

BYTE log_buffer[_LOG_BUFFER_SIZE] = {0}; //8M
char _empty3[_ONE_KB] = {0};
BYTE err_buffer[_ERR_BUFFER_SIZE] ={0}; // 1M
char _empty4[_ONE_KB] = {0};

BYTE libFile_buffer[_LIBFILE_BUFFER_SIZE] = {0};
char _empty7[_ONE_KB] = {0};

BYTE* comment_buffer;
BYTE* boardText_buffer;
BYTE* data_buffer;

//---------------158 page-----------------------

BYTE* getOutBuffer(){
    return out_buffer;
}

BYTE* getInBuffer(){
    return in_buffer;
}

//---------------log and error--------------------

void log(const char* message){
    UINT len = 0;
    if(current_log_buffer < _LOG_BUFFER_SIZE-1){
        log_buffer[current_log_buffer++] = 10;
        while(message[len] && (current_log_buffer < _LOG_BUFFER_SIZE-1)){
            log_buffer[current_log_buffer++] = message[len++];
        }
        log_buffer[current_log_buffer] = 0;
    }
}

void log(char* message){
    UINT len = 0;
    if(current_log_buffer < _LOG_BUFFER_SIZE-1){
        log_buffer[current_log_buffer++] = 10;
        while(message[len] && (current_log_buffer < _LOG_BUFFER_SIZE-1)){
            log_buffer[current_log_buffer++] = message[len++];
        }
        log_buffer[current_log_buffer] = 0;
    }
}

void onError(const char* message){
    UINT len = 0;
    if(current_err_buffer < _ERR_BUFFER_SIZE -1){
        err_buffer[current_err_buffer++] = 10;
        while(message[len] && (current_err_buffer < _ERR_BUFFER_SIZE -1)){
            err_buffer[current_err_buffer++] = message[len++];
        }
        err_buffer[current_err_buffer] = 0;
    }
    
    log(message);
}

BYTE* getLogBuffer(){
    return log_buffer;
}

BYTE* getErrorBuffer(){
    return err_buffer;
}
//----------------- comment buffer --------------------

char* findString(char* str1, UINT len1, char* str2, UINT len2){
    UINT idx;
    char* start = str1;
    char* end = start + len1 - len2 + 1;
    while(start < end){
        idx = 0;
        while(start[idx]==str2[idx]){
            idx++;
            if(idx>=len2) return start;
        }
        
        if(start[idx]) while(*(++start)){}
        while(*(++start)==0){}
    }
    return 0;
}

void putString(char* buffer, char* str, UINT len){
    for(UINT i=0; i<len; i++){
        buffer[i] = str[i]*1;
    }
}

char* pushComment(char* comment, UINT len){
    char* rt = findString((char*)comment_buffer, current_comment_buffer, comment, len);
    if(rt) return rt;
    
    
    if(current_comment_buffer + len <= _COMMENT_BUFFER_SIZE){
        rt = (char*)&comment_buffer[current_comment_buffer];
        for(UINT i=0; i<len; i++){
            rt[i] = comment[i];
        }
        current_comment_buffer+=len;
    }
    return rt;
}

BYTE* getCommentBuffer(){
    return comment_buffer;
}

//----------------- boardText buffer --------------------

char* pushBoardText(char* boardText, UINT len){
    char* rt = findString((char*)boardText_buffer, current_boardText_buffer, boardText, len);
    if(rt) return rt;
    
    
    if(current_boardText_buffer + len <= _BOARDTEXT_BUFFER_SIZE){
        rt = (char*)&boardText_buffer[current_boardText_buffer];
        for(UINT i=0; i<len; i++){
            rt[i] = boardText[i];
        }
        current_boardText_buffer+=len;
    }
    return rt;
}

BYTE* getBoardTextBuffer(){
    return boardText_buffer;
}

//----------------- data buffer --------------------

//UINT grow(UINT pages){
    //return pages;
//}

BYTE* getDataBuffer(){
    //return data_buffer + start_data_buffer;
    return data_buffer;
}

BYTE* newBuffer(UINT size){
    current_data_buffer += size;
    /*if(current_data_buffer > end_data_buffer){
        grow(128);
        end_data_buffer += _PAGE_SIZE * 128;
    }*/
    return &data_buffer[current_data_buffer-size];
}

//------------------ LibraryFile Buffer ---------------

BYTE* getLibFileBuffer(){
    return libFile_buffer;
}
//------------------- CPoint ------------------------

class CPoint
{
public:
    BYTE x;
    BYTE y;
private:
    const static char* alpha;
    const static char* mbArr;
    static char name[4];
public:
    CPoint():
    x(0),
    y(0)
    {
    }
    CPoint(unsigned char _x, unsigned char _y):
    x(_x),
    y(_y)
    {
    }
    char* getName(){
        name[0] = alpha[x-1];
           if(y<7){
               name[1] = mbArr[1];
               name[2] = mbArr[16-y-10];
               name[3] = 0;
           }
           else{
               name[1] = mbArr[16-y];
               name[2] = 0;
           }
        return name;
    }
    CPoint operator+(const CPoint& b){
        CPoint p;
        p.x = this->x + b.x;
        p.y = this->y + b.y;
        return p;
    }
    CPoint operator-(const CPoint& b){
        CPoint p;
        p.x = this->x - b.x;
        p.y = this->y - b.y;
        return p;
    }
    CPoint operator+=(const CPoint& b){
        this->x += b.x;
        this->y += b.y;
        return *this;
    }
    CPoint operator-=(const CPoint& b){
        this->x -= b.x;
        this->y -= b.y;
        return *this;
    }
    bool operator==(const CPoint& b){
        return this->x == b.x && this->y == b.y;
    }
    bool operator!=(const CPoint& b){
        return this->x != b.x || this->y != b.y;
    }
};

const char* CPoint::alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const char* CPoint::mbArr = "0123456789";
char CPoint::name[4] = {0,0,0,0};


//struct CPoint{
    //BYTE x;
    //BYTE y;
//};

CPoint* newCPoint(){
    CPoint* p = (CPoint*)newBuffer(sizeof(CPoint));
    p->x = 0;
    p->y = 0;
    return p;
}

CPoint* newCPoint(BYTE x, BYTE y){
    CPoint* p = (CPoint*)newBuffer(sizeof(CPoint));
    p->x = x;
    p->y = y;
    return p;
}

void test_newCPoint(UINT count){
    log("newCPoint");
    for(UINT i=0; i<count; i++){
        CPoint* p = newCPoint(i%16,i%16);
        //log(p->getName());
    }
    log("newCPoint end");
}

//----------------- MoveNode -----------------------------

    const int BOARD_TEXT = 0x000100;

    const int DOWN = 0x000080;
    const int RIGHT = 0x000040;
    const int OLD_COMMENT = 0x000020;
    const int MARK = 0x000010;
    const int COMMENT = 0x000008;
    const int START = 0x000004;
    const int NO_MOVE = 0x000002;
    const int EXTENSION = 0x000001;

    const int MASK = 0xFFFF3F;
    const CPoint NullPoint(0, 0);

    bool isValid(CPoint Pos) {
        return (Pos == NullPoint) ||
            (Pos.x >= 1 && Pos.x <= 15 && Pos.y >= 1 && Pos.y <= 15);
    }


    bool bit_is_one(int bit_value, UINT value) {
        return ((value & bit_value) != 0);
    }

    void set_bit(int bit_value, UINT& value) {
        value |= bit_value;
    }

    void clear_bit(int bit_value, UINT& value) {
        value &= ~bit_value;
    }
    
    bool isValidPoint(CPoint point) {
        return point.x >= 1 && point.x <= 15 && point.y >= 1 && point.y <= 15;
    }
    
    bool isEmpty(CString  str){
        return str==NULL || str[0]==0;
    }

    CPoint PosToPoint(BYTE pos) {
        if (pos == 0) {
            return CPoint(0, 0);
        }
        else {
            return CPoint(pos % 16, pos / 16 + 1);
        }
    }

    BYTE PointToPos(CPoint point) {
        if (isValidPoint(point)) {
            return 16 * (point.y - 1) + point.x;
        }
        else {
            return 0;
        }
    }
    
    class MoveNode
    {
        
    public:
        MoveNode():
        mPos(NullPoint),
        mMatch(0),
        mInfo(0),
        mDown(0),
        mRight(0),
        mOneLineComment(NULL),
        mBoardText(NULL)
        {
        }
        MoveNode(MoveNode& node):
        mPos(node.mPos),
        mMatch(0),
        mInfo(node.mInfo),
        mDown(0),
        mRight(0),
        mOneLineComment(NULL),
        mBoardText(NULL)
        {
            /*if (!isValid(mPos)){
                onError(STR_MOVENODE_MPOS_ERR);
            }*/
        }
        MoveNode(CPoint Pos):
        mPos(Pos),
        mMatch(0),
        mInfo(0),
        mDown(0),
        mRight(0),
        mOneLineComment(NULL),
        mBoardText(NULL)
        {
            /*if (!isValid(mPos)){
                onError(STR_MOVENODE_MPOS_ERR);
            }*/
        }
    
        //virtual ~MoveNode();
  
        void setPosInfo(BYTE pos, BYTE info){
            mPos  = PosToPoint(pos);
            mInfo = (mInfo & 0xFFFF00) | info;
        }
        void getPosInfo(BYTE& pos, BYTE& info){
            pos  = PointToPos(mPos);
            info = BYTE(mInfo & 0xFF);
        }
    
        void setExtendedInfo(BYTE info2, BYTE info1){
            mInfo &= 0xFF;
            mInfo |= ((info2 << 8) | info1) << 8;
        }
        void getExtendedInfo(BYTE& info2, BYTE& info1){
            UINT info = mInfo >> 8;
            info1 = BYTE(info & 0xFF);

            info >>= 8;
            info2 = BYTE(info & 0xFF);
        }
    
        //
        // Position
        //
        void setPos(CPoint pos){
            mPos = pos;
            setIsMove(true);
        }
        CPoint getPos(){
            return mPos;
        }
        char* getName(){
            return mPos.getName();
        }
    
        //
        // Information
        //
        void clearInformation(){
            mInfo = 0;
        }
        bool isInformation(){
            return (mInfo & MASK) != 0;
        }
    
        bool isDown() {
            return isValue(DOWN);
        }
        void setIsDown(bool value){
            setIsValue(value, DOWN);
        }
    
        bool isRight() {
            return isValue(RIGHT);
        }
        void setIsRight(bool value){
            setIsValue(value, RIGHT);
        }
    
        bool isOldComment() {
            return isValue(OLD_COMMENT);
        }
        bool isNewComment() {
            return isValue(COMMENT);
        }
    
        bool isMark() {
            return isValue(MARK);
        }
        void setIsMark(bool value){
            setIsValue(value, MARK);
        }
    
        bool isStart() {
            return isValue(START);
        }
        void setIsStart(bool value){
            setIsValue(value, START);
        }
    
        bool isMove() {
            return !isValue(NO_MOVE);
        }
        bool isPassMove() {
            bool result = false;
            if (isMove()){
                result = (mPos == NullPoint);
            }
            return result;
        }
        void setIsMove(bool value){
            setIsValue(!value, NO_MOVE);
        }
    
        bool isExtension() {
            return isValue(EXTENSION);
        }
        void setIsExtension(bool value){
            setIsValue(value, EXTENSION);
        }
    
        void setMatch(BYTE match){
            mMatch = match;
        }
        BYTE getMatch() const{
            return mMatch;
        }
    
        //
        // Instance data
        //
        void setDown(MoveNode* node){
            mDown = node;
        }
        MoveNode* getDown() {
            return mDown;
        }
    
        void setRight(MoveNode* node){
            mRight = node;
        }
        MoveNode* getRight() {
            return mRight;
        }
    
        bool isOneLineComment() {
            return !isEmpty(mOneLineComment);
        }
        void setOneLineComment(CString comment){
            mOneLineComment = comment;
            setIsNewComment(isOneLineComment());
        }
        CString getOneLineComment() {
            return mOneLineComment;
        }
    
        bool isBoardText() {
            return isValue(BOARD_TEXT);
        }
        void setBoardText(CString text){
            mBoardText = text;
            setIsBoardText(!isEmpty(mBoardText));
        }
        CString getBoardText() {
            return mBoardText;
        }
    
    private:
        void setIsNewComment(bool value){
            setIsValue(value, COMMENT);
            setIsValue(false, OLD_COMMENT);
        }
        void setIsBoardText(bool value){
            setIsValue(value, BOARD_TEXT);
            checkExtension();
        }
        void checkExtension(){
            setIsExtension((mInfo & 0xFFFF00) != 0);
        }
        bool isValue(UINT bitValue) {
            return bit_is_one(bitValue, mInfo);
        }
        void setIsValue(bool value, UINT bitValue){
            if (value){
                set_bit(bitValue, mInfo);
            }
            else{
                clear_bit(bitValue, mInfo);
            }
        }
    
    public:
        CPoint        mPos;              // position, (x,y)
        
        BYTE        mMatch;            // position search
        
        //BYTE        mBoardTextLen;
        
        UINT        mInfo;             // information
    
        CString        mOneLineComment;   // one line comment
        CString        mBoardText;        // board text
    
        MoveNode*    mDown;             // next level
        MoveNode*    mRight;            // same level
    };
    

    MoveNode* newMoveNode(){
        MoveNode* node = (MoveNode*)newBuffer(sizeof(MoveNode));
        return node;
    }
    
    MoveNode* newMoveNode(MoveNode& _node){
        MoveNode* node = (MoveNode*)newBuffer(sizeof(MoveNode));
        node->mPos = _node.mPos;
        node->mInfo = _node.mInfo;
        return node;
    }
    
    MoveNode* newMoveNode(CPoint Pos){
        MoveNode* node = (MoveNode*)newBuffer(sizeof(MoveNode));
        node->mPos = Pos;
        return node;
    }
    
    void test_newMoveNode(UINT count){
        log("newMoveNode");
        for(UINT i=0; i<count; i++){
            MoveNode* node = newMoveNode(CPoint(i%16,i%16));
            node = newMoveNode(*node);
            log(node->getName());
        }
        log("newMoveNode end");
    }

//--------------------------- Stack -----------------------

class Stack  
{
public:
    Stack(){
        ClearAll();
    }
    
    void ClearAll(){
        m_nIndex = 0;
        for (int i=0; i < SIZE; i++){
            m_Stack[i].nMove = 0;
            m_Stack[i].pMove = 0;
        }
    }

    bool IsEmpty(){
        return (m_nIndex == 0);
    }

    void Push(int nMove, MoveNode*  pMove){
        /*if (m_nIndex >= SIZE){
            onError(STR_STACK_FULL_0);
        }*/

        m_Stack[m_nIndex].nMove = nMove;
        m_Stack[m_nIndex].pMove = pMove;
        m_nIndex++;
    }
    void Pop(int& nMove, MoveNode*& pMove){
        /*if(m_nIndex <= 0){
            onError(STR_STACK_EMPTY_0);
        }*/
    
        m_nIndex--;
        nMove = m_Stack[m_nIndex].nMove;
        pMove = m_Stack[m_nIndex].pMove;
    }

    void Push(MoveNode*  pMove){
        /*if (m_nIndex >= SIZE){
            onError(STR_STACK_FULL_1);
        }*/

        m_Stack[m_nIndex].nMove = 0;
        m_Stack[m_nIndex].pMove = pMove;
        m_nIndex++;
    }
    void Pop(MoveNode*& pMove){
        /*if(m_nIndex <= 0){
            onError(STR_STACK_EMPTY_1);
        }*/

        m_nIndex--;
        pMove = m_Stack[m_nIndex].pMove;
    }

    void Push(int nMove){
        /*if (m_nIndex >= SIZE){
               onError(STR_STACK_FULL_2);
        }*/

        m_Stack[m_nIndex].nMove = nMove;
        m_Stack[m_nIndex].pMove = NULL;

        m_nIndex++;
    }
    void Pop(int& nMove){
        /*if(m_nIndex <= 0){
            onError(STR_STACK_EMPTY_2);
        }*/

        m_nIndex--;
        nMove = m_Stack[m_nIndex].nMove;
    }

private:
    struct Item
    {
        int       nMove;
        MoveNode* pMove;
    };
    enum { SIZE = 225 };
    Item    m_Stack [SIZE];
    int        m_nIndex;
};


//---------------------- MoveList -----------------------


class MoveList  
{
public:
    MoveList(){
        ClearAll();
    }

    bool IsEmpty() {
        return m_nIndex == -1;
    }
    bool IsFull(){
        return m_nIndex == MAXINDEX;
    }

    void SetRoot(MoveNode* pMove){
        /*if(!IsEmpty()){
            onError(STR_MOVELIST_SETROOT_ERR);
        }*/
        Add(pMove);
        //m_List[++m_nIndex] = pMove;
    }
    void Add(MoveNode* pMove){
        /*if(m_nIndex >= MAXINDEX){
            onError(STR_MOVELIST_FULL);
        }*/
        m_List[++m_nIndex] = pMove;
    }
    void Swap(int nIndex1, int nIndex2){
        /*if(nIndex1 < 1 || nIndex1 > m_nIndex || nIndex2 < 1 || nIndex2 > m_nIndex){
            onError(STR_MOVELIST_SWAP_ERR);
        }*/
        MoveNode* temp  = m_List[nIndex1];
        m_List[nIndex1] = m_List[nIndex2];
        m_List[nIndex2] = temp;
    }

    MoveNode* Get(int nIndex) {
        /*if(IsEmpty() ||
        nIndex < 0 || nIndex > MAXINDEX){
            onError(STR_MOVELIST_GET_ERR);
        }*/
        return m_List[nIndex];
    }
    MoveNode* GetRoot() {
        /*if(IsEmpty()){
            onError(STR_MOVELIST_GETROOT_ERR);
        }*/
        return m_List[0];
    }
    MoveNode* Current() {
        /*if(IsEmpty()){
            onError(STR_MOVELIST_CURRENT_ERR);
        }*/
        return m_List[m_nIndex];
    }

    MoveNode* Next(){
        if (m_nIndex < MAXINDEX){
            return m_List[m_nIndex + 1];
        }
        else{
            return 0;
        }
    }
    MoveNode* Previous(){
        if (m_nIndex > 0){
            return m_List[m_nIndex - 1];
        }
        else{
            return 0;
        }
    }

    void SetIndex(int nIndex){
        /*if(nIndex < 0 || nIndex > m_nIndex){
            onError(STR_MOVELIST_SETINDEX_ERR);
        }*/
        m_nIndex = nIndex;
    }
    void SetRootIndex(){
        SetIndex(0);
    }
    void Decrement(){
        /*if(m_nIndex <= 0){
            onError(STR_MOVELIST_DECREMENT_ERR);
        }*/
        m_nIndex--;
    }
    int  Index(){
        return m_nIndex;
    }

    void ClearAll(){
        for (int i=0; i <= MAXINDEX; i++){
            m_List[i] = 0;
        }
    
        m_nIndex = -1;
    }
    void ClearEnd(){
        for (int i = m_nIndex + 1; i <= MAXINDEX; i++){
            m_List[i] = 0;
        }
    }

private:
    enum{ MAXINDEX = 225 };
    MoveNode*    m_List [MAXINDEX + 1]; // 1 based
    int            m_nIndex;
};

//-----------------------------------------------------

const int HEADER_SIZE = 20;

const int MAJOR_FILE_VERSION_INDEX = 8;
const int MINOR_FILE_VERSION_INDEX = 9;

const int MAJOR_FILE_VERSION = 3;
const int MINOR_FILE_VERSION = 4;

const int MAJOR_FILE_VERSION_H8  = 3;
const int MINOR_FILE_VERSION_OLD = 0;

const int CENTER = 0x78;


class LibraryFile  
{
public:
    LibraryFile():
    m_indexStart(0),
    m_indexEnd(0),
    m_MajorFileVersion(0),
    m_MinorFileVersion(0)
    {
    }

    int Open(int size){
        m_indexStart = 0;
        m_indexEnd = 0;
        m_MajorFileVersion = 0;
        m_MinorFileVersion = 0;
        return size;
    }

    bool Get(BYTE& data1, BYTE& data2){
        data1 = 0;
        data2 = 0;
        //log(STR_GET);
        if (m_indexStart >= m_indexEnd){
            UINT nBytesRead = getBuffer(libFile_buffer, BUFFERSIZE);

            if (nBytesRead == 0){
                return false;
            }

            m_indexEnd   = nBytesRead - 1;
            m_indexStart = 0;
        }

        data1 = libFile_buffer[m_indexStart++];
        data2 = libFile_buffer[m_indexStart++];

        return true;
    }
    bool Get(MoveNode& node){
        //log(STR_SETPOS);
        node.setPos(CPoint(0,0));
        //log(STR_SETINFO);
        node.clearInformation();

        BYTE data1;
        BYTE data2;

        bool success = Get(data1, data2);
    
        if (success){
        node.setPosInfo(data1, data2);

            if (node.isExtension()){
                success = Get(data1, data2);
                node.setExtendedInfo(data1, data2);
            }
        }
        return success;
    }
    bool CheckVersion(){
        bool VersionOk = false;

    //                            0     1    2    3    4    5    6    7
        BYTE header[HEADER_SIZE] = { 0xFF, 'R', 'e', 'n', 'L', 'i', 'b', 0xFF };
        UINT dwRead;

        dwRead = getBuffer(libFile_buffer, HEADER_SIZE);
        log(STR_CHECKING_CODE);
        if (dwRead == HEADER_SIZE){
            bool HeaderMatch = true;

            for (int i=0; i<=7; i++){
                if (libFile_buffer[i] != header[i]){
                    //cout << "HeaderMatch = false" << endl;
                    HeaderMatch = false;
                    i = 8;
                }
            }

            if (HeaderMatch){
                m_MajorFileVersion = libFile_buffer[MAJOR_FILE_VERSION_INDEX];
                m_MinorFileVersion = libFile_buffer[MINOR_FILE_VERSION_INDEX];

                if (100 * m_MajorFileVersion + m_MinorFileVersion <=
                100 * MAJOR_FILE_VERSION + MINOR_FILE_VERSION)
                {
                    VersionOk = true;
                }
            }
            else if (libFile_buffer[0] == CENTER){
                VersionOk = true;
            }
        }
        /*
        if (!VersionOk){
               onError(STR_CHECK_VERSION_ERR);
        }
        */
        return VersionOk;
    }

    void Close(){
        m_indexStart = 0;
        m_indexEnd = 0;
        m_MajorFileVersion = 0;
        m_MinorFileVersion = 0;
    }

    CString GetVersion() {
        return m_Version;
    }

private:
    enum { BUFFERSIZE = _LIBFILE_BUFFER_SIZE};

    int     m_indexStart;
    int     m_indexEnd;
    CString m_Version;
    BYTE    m_MajorFileVersion;
    BYTE    m_MinorFileVersion;
};

//--------------------- Doc -------------------------
    
    MoveNode* rootMoveNode = 0;
    Stack* m_Stack = 0;
    MoveList* m_MoveList = 0;
    LibraryFile* m_file = 0;

    int msb(BYTE ch){
        return (ch & 0x80);
    }
    
    bool LessThan(CPoint Left, CPoint Right) {
        return PointToPos(Left) < PointToPos(Right);
    }

    void readOldComment(CString pStrOneLine){
        BYTE data1;
        BYTE data2;
        pStrOneLine[0] = 0;
        do {
            m_file->Get(data1, data2);
        }while(msb(data1)==0 && msb(data2)==0);
        
    }
    
    UINT readNewComment(CString pStrOneLine){
        BYTE data1;
        BYTE data2;
        UINT len = 0;
        
        do {
            m_file->Get(data1, data2);

            pStrOneLine[len++] = data1;
            pStrOneLine[len++] = data2;
        
        }while(data1 && data2);
        
        return len;
    }
    
    UINT readBoardText(CString pStrBoardText){
        BYTE data1;
        BYTE data2;
        UINT len = 0;

        do {
            m_file->Get(data1, data2);

            pStrBoardText[len++] = data1;
            pStrBoardText[len++] = data2;
            
        }while(data1 && data2);
        
        return len;
    }
    
    void addMove(MoveNode* pMove, MoveNode* pNewMove){
        if (pMove->mDown == 0) {
            pMove->setDown(pNewMove);
        }
        else {
            if (LessThan(pNewMove->mPos, pMove->mDown->mPos)) {
                pNewMove->setRight(pMove->mDown);
                pMove->setDown(pNewMove);
            }
            else {
                pMove = pMove->mDown;
                bool br = false;
                while (!br) {
                    if (pMove->mRight == 0) {
                        pMove->setRight(pNewMove);
                        br = true;
                    }
                    else if (LessThan(pNewMove->mPos, pMove->mRight->mPos)) {
                        pNewMove->setRight(pMove->mRight);
                        pMove->setRight(pNewMove);
                        br = true;
                    }
                    pMove = pMove->mRight;
                }
            }
        }
    }
    
    void addAttributes(MoveNode* pMove, MoveNode* pFrom, bool& bMark, bool& bMove, bool& bStart){
        bMark = false;
        bMove = false;
        bStart = false;
    
        if (pFrom->isMark() && !pMove->isMark()) {
            bMark = true;
            pMove->setIsMark(bMark);
        }
    
        if (pFrom->isMove() && !pMove->isMove()) {
            bMove = true;
            pMove->setIsMove(bMove);
        }
    
        if (pFrom->isStart() && !pMove->isStart()) {
            bStart = true;
            pMove->setIsStart(bStart);
        }
    }
    
    MoveNode* getVariant(/*MoveList* m_MoveList*/MoveNode* pMove, CPoint  Pos){
        /*   
        int i = 0;
        int current = m_MoveList->Index();
        MoveNode* pMove;
        while(i <= current){ //      兼容 Rapfi 制谱
            pMove = m_MoveList->Get(i++);   
            if (pMove->mPos == Pos) return pMove;
        }*/
            
        if (pMove->mDown) { //RenLib 3.6 标准
            pMove = pMove->mDown;
    
            if (pMove->mPos == Pos) return pMove;
    
            while (pMove->mRight) {
                pMove = pMove->mRight;
                if (pMove->mPos == Pos) return pMove;
            }
        }
            
        return 0;
    }
    
    UINT getAutoMove() {
        MoveNode* pMove = rootMoveNode;
        CPoint* pPos = (CPoint*)out_buffer;
        UINT len = 0;
        while (pMove->mDown) {
            pMove = pMove->mDown;
            if (pMove->mRight==0) {
                pPos[len++] = pMove->mPos;
            }
            else {
                break;
            }
        }
        return len;
    }
    
    
bool test_getVariant(){
    MoveNode* p = newMoveNode(CPoint(7,7));
    MoveNode* p1 = newMoveNode(CPoint(8,8));
    log("m_MoveList SetRoot()");
    m_MoveList->SetRoot(p);
    log("m_MoveList Add()");
    m_MoveList->Add(p1);
    log("getVariant()");
    
    getVariant(/*m_MoveList*/p, p1->getPos());
    log("getVariant return <<");
    return true;
}

//-------------------- get B -------------------- 

struct Item{
    int nMove;
    MoveNode* pMove;
};

struct Node{
    CPoint mPos;
    char* txt;
    UINT color;
};

struct InnerHTMLInfo{
    char* innerHTML;
    int depth;
};

void findNode(MoveNode*& pMove, CPoint Pos) {
    while (pMove) {
        if (pMove->mPos == Pos) {
            break;
        }
        else if (pMove->mRight) {
            pMove = pMove->mRight;
        }
        else {
            pMove = 0;
            break;
        }
    }
}

void searchInnerHTMLInfo(CPoint* posArr, UINT len) {
    MoveNode* pMove = rootMoveNode;
    CPoint* pPos = (CPoint*)in_buffer;
    struct InnerHTMLInfo* innerHTMLInfo = (struct InnerHTMLInfo*)out_buffer;
    innerHTMLInfo->innerHTML = pMove->mOneLineComment;
    innerHTMLInfo->depth =  -1;
    
    for (UINT i = 0; i < len; i++) {
        if (pMove->mDown) {
            pMove = pMove->mDown;
            findNode(pMove, pPos[i]);
            if (pMove){
                if(pMove->mOneLineComment && i == len - 1) {
                    innerHTMLInfo->innerHTML = pMove->mOneLineComment;
                    innerHTMLInfo->depth = i;
                }
            }
            else {
                break;
           }
        }
        else {
            break;
        }
    }
}

int indexOf(CPoint Pos, CPoint* posArr, int len){
    for(int i=0; i<len; i++){
        if(posArr[i] == Pos) return i;
    }
    return -1;
}

int indexOfNode(CPoint Pos, struct Node* nodes, int len){
    for(int i=0; i<len; i++){
        if(nodes[i].mPos == Pos) return i;
    }
    return -1;
}

void getBranchNodes(CPoint* posArr, int len){
    bool done = false;
    int* count = (int*)out_buffer;
    *count = 0;
    struct Node* Nodes = (struct Node*)&out_buffer[4];
    struct Node* pNode = Nodes;
    MoveNode* pMove = rootMoveNode->mDown;
    MoveNode** moveList = (MoveNode**)&in_buffer[1024];
    int listLength = 0;
    struct Item* stack = (struct Item*)&in_buffer[2048];
    int stackLength = 0;
    struct Item jointNode = {0,0};
    while(!done){
        
        if(pMove){
            int idx = indexOf(pMove->mPos, posArr, len);
            moveList[listLength++] = pMove;
    
            //if(listLength <= len + 1){
                if(pMove->mRight){
                    stack[stackLength].pMove = pMove->mRight;
                    stack[stackLength++].nMove = listLength;
                }
                
                if(listLength <= len){
                    if(idx > -1 && idx%2 == (listLength-1)%2){
                        pMove = pMove->mDown;
                    }
                    else if(idx == -1 && jointNode.pMove == 0 && listLength%2 == (len+1)%2){
                        jointNode.nMove = listLength;
                        jointNode.pMove = pMove;
                        pMove = pMove->mDown;
                    }
                    else{
                        pMove = 0;
                    }
                }
                else if(listLength == len + 1){
                    if(idx>=0){
                        int idxNode = indexOfNode(jointNode.pMove->mPos, Nodes, *count);
                        if(idxNode>-1){
                            if(Nodes[idxNode].txt==0){
                                Nodes[idxNode].txt = pMove->mBoardText;
                                Nodes[idxNode].color = 0;
                            }
                        }
                        else{
                            pNode->mPos = jointNode.pMove->mPos;
                            pNode->txt = pMove->mBoardText;
                            pNode->color = 0;
                            pNode++;
                            (*count)++;
                        }
                    }
                    else if(idx==-1 && jointNode.pMove==0){
                        int idxNode = indexOfNode(pMove->mPos, Nodes, *count);
                        if(idxNode>-1){
                            if(Nodes[idxNode].txt==0){
                                Nodes[idxNode].txt = pMove->mBoardText;
                                Nodes[idxNode].color = 0;
                            }
                        }
                        else{
                            pNode->mPos = pMove->mPos;
                            pNode->txt = pMove->mBoardText;
                            pNode->color = 0;
                            pNode++;
                            (*count)++;
                        }
                    }
                    pMove = 0;
                }
            //}
            //else{
                //pMove = 0;
            //}
        }
        else if(stackLength>0){
            pMove = stack[--stackLength].pMove;
            listLength = stack[stackLength].nMove - 1;
            if(jointNode.pMove && jointNode.nMove > listLength){
                jointNode.nMove = 0;
                jointNode.pMove = 0;
            }
        }
        else{
            done = true;
        }
        
    }
}

//-------------------- RenLib Tree ------------------

UINT m_MoveNode_count = 0;

UINT* getMoveNodeCountBuffer(){
    return &m_MoveNode_count;
}

bool checkVersion(){
    if(m_file->CheckVersion()){
        m_MoveList->ClearAll();
        m_Stack->ClearAll();
        MoveNode* pCurrentMove = 0;
        
        if (m_MoveList->IsEmpty()) {
            pCurrentMove = (MoveNode*)newBuffer(sizeof(MoveNode));
            m_MoveList->SetRoot(pCurrentMove);
            rootMoveNode = pCurrentMove;
        }
        else {
            pCurrentMove = m_MoveList->GetRoot();
            m_MoveList->SetRootIndex();
            rootMoveNode = pCurrentMove;
        }
        return true;
    }
    else{
        return false;
    }
}

UINT loadAllMoveNode(){
    m_MoveNode_count = 0;
    MoveNode* next = (MoveNode*)newBuffer(sizeof(MoveNode));
    //log("next = newMoveNode()");
    int len = 0;
    char* str;
    while(m_file->Get(*next)){
        m_MoveNode_count++;
        //log(next->getName());
        
        if (next->isOldComment()){
            //log("readOldComment");
            str = (char*)in_buffer;
            readOldComment(str);
        }
            
        if(next->isNewComment()) {
            //log("readNewComment");
            str = (char*)&comment_buffer[current_comment_buffer];
            len = readNewComment(str);
            if(len && (_COMMENT_BUFFER_SIZE >= current_comment_buffer+len)){
                next->setOneLineComment(str);
                current_comment_buffer+=len;
            }
            /*
            if(_COMMENT_BUFFER_SIZE > current_comment_buffer+len){
                str = findString((char*)&comment_buffer, current_comment_buffer, str, len);
                if(str==0){
                    str = (char*)&comment_buffer[current_comment_buffer];
                    current_comment_buffer+=len;
                }
                next->setOneLineComment(str);
            }
            */
        }
            
        if (next->isBoardText()) {
            //log("readBoardText");
            str = (char*)&boardText_buffer[current_boardText_buffer];
            len = readBoardText(str);
            if(len && (_BOARDTEXT_BUFFER_SIZE > current_boardText_buffer+len)){
                if(len>6){
                    str[4] = 0;
                    str[5] = 0;
                    len = 6;
                }
                next->setBoardText(str);
                current_boardText_buffer+=len;
            }
            /*
            if(_BOARDTEXT_BUFFER_SIZE > current_boardText_buffer+len){
                str = findString((char*)&boardText_buffer, current_boardText_buffer, str, len);
                if(str==0){
                    str = (char*)&boardText_buffer[current_boardText_buffer];
                    current_boardText_buffer+=len;
                }
                next->setBoardText(str);
            }
            */
        }
        next = (MoveNode*)newBuffer(sizeof(MoveNode));
    }
    //log("loadAllMoveNode end");
    return m_MoveNode_count;
}

bool createRenjuTree(){
    bool bMark = false;
    bool bMove = false;
    bool bStart = false;
    MoveNode* pCurrentMove = rootMoveNode;
    MoveNode* pNextMove = 0;
    MoveNode* next = pCurrentMove;
    
    m_MoveList->SetRootIndex();
    
    for(UINT i=0; i<m_MoveNode_count; i++){
        next++;
        //log(next->getName());
        if(i%300000==0) loading(i, m_MoveNode_count);
        
        CPoint Point(next->mPos);
                    
        if (Point == NullPoint) {
            //log(STR_SKIP_ROOT_NODE);
        }
        else if ((Point.x != 0 || Point.y != 0) && (Point.x < 1 || Point.x > 15 || Point.y < 1 || Point.y > 15)) {
            //log(STR_CHECKING_CODE_ERR);
            return false;
        }
        else {
            //log(STR_GETVARIANT);
            pNextMove = getVariant(/*m_MoveList*/pCurrentMove, next->mPos);
            if (pNextMove) {
                pCurrentMove = pNextMove;
                if(pCurrentMove->mOneLineComment==0) pCurrentMove->mOneLineComment = next->mOneLineComment;
                if(pCurrentMove->mBoardText==0) pCurrentMove->mBoardText =  next->mBoardText;
                addAttributes(pCurrentMove, next, bMark, bMove, bStart);
            }
            else {
                pNextMove = next;
                addMove(pCurrentMove, pNextMove);
                pCurrentMove = pNextMove;
            }
            //log(STR_GETVARIANT);
            m_MoveList->Add(pCurrentMove);
        }
        
        if (next->isDown()) {
            if(m_MoveList->Index() > 0) m_Stack->Push(m_MoveList->Index());
        }
                    
        if (next->isRight()) {
            if (!m_Stack->IsEmpty()) {
                int nMove = 0;
                m_Stack->Pop(nMove);
                m_MoveList->SetIndex(nMove - 1);
                pCurrentMove = m_MoveList->Current();
            }
            else{
                m_MoveList->SetRootIndex();
                pCurrentMove = m_MoveList->GetRoot();
            }
        }
    }
    return true;
}

int addLibrary(){
    
    //log("next = newMoveNode()");
    int len = 0;
    char* str;
    
    bool bMark = false;
    bool bMove = false;
    bool bStart = false;
    
    if(!checkVersion()) return -1;
    m_MoveNode_count = 0;
    
    MoveNode* pCurrentMove = rootMoveNode;
    MoveNode* pNextMove = 0;
    MoveNode* next = (MoveNode*)newBuffer(sizeof(MoveNode));
    
    while(m_file->Get(*next)){
        m_MoveNode_count++;
        //log(next->getName());
                
        CPoint Point(next->mPos);
                            
        if (Point == NullPoint) {
            //log(STR_SKIP_ROOT_NODE);
        }
        else if ((Point.x != 0 || Point.y != 0) && (Point.x < 1 || Point.x > 15 || Point.y < 1 || Point.y > 15)) {
            //log(STR_CHECKING_CODE_ERR);
            return -m_MoveNode_count;
        }
        else {
            //log(STR_GETVARIANT);
            pNextMove = getVariant(/*m_MoveList*/pCurrentMove, next->mPos);
            if (pNextMove) {
                pCurrentMove = pNextMove;
            }
            else {
                pNextMove = next;
                addMove(pCurrentMove, pNextMove);
                pCurrentMove = pNextMove;
            }
            //log(STR_GETVARIANT);
            m_MoveList->Add(pCurrentMove);
        }
        
        if (next->isOldComment()){
            //log("readOldComment");
            str = (char*)in_buffer;
            readOldComment(str);
        }
            
        if(next->isNewComment()) {
            //log("readNewComment");
            str = (char*)&comment_buffer[current_comment_buffer];
            len = readNewComment(str);
            if(len && (_COMMENT_BUFFER_SIZE >= current_comment_buffer+len)){
                next->setOneLineComment(str);
                current_comment_buffer+=len;
            }
        }
            
        if (next->isBoardText()) {
            //log("readBoardText");
            str = (char*)&boardText_buffer[current_boardText_buffer];
            len = readBoardText(str);
            if(len && (_BOARDTEXT_BUFFER_SIZE > current_boardText_buffer+len)){
                if(len>6){
                    str[4] = 0;
                    str[5] = 0;
                    len = 6;
                }
                next->setBoardText(str);
                current_boardText_buffer+=len;
            }
        }
        
        addAttributes(pCurrentMove, next, bMark, bMove, bStart);
        
        if (next->isDown()) {
            if(m_MoveList->Index() > 0) m_Stack->Push(m_MoveList->Index());
        }
        
        if (next->isRight()) {
            if (!m_Stack->IsEmpty()) {
                int nMove = 0;
                m_Stack->Pop(nMove);
                m_MoveList->SetIndex(nMove - 1);
                pCurrentMove = m_MoveList->Current();
            }
            else{
                m_MoveList->SetRootIndex();
                pCurrentMove = m_MoveList->GetRoot();
            }
        }
        
        next = (MoveNode*)newBuffer(sizeof(MoveNode));
    }
    //log("loadAllMoveNode end");
    return m_MoveNode_count;
}




//int main(){
    //log("wasm >> main");
    /*m_Stack = (Stack*)newBuffer(sizeof(Stack));
    m_Stack->ClearAll();
    m_MoveList = (MoveList*)newBuffer(sizeof(MoveList));
    m_MoveList->ClearAll();
    m_file = (LibraryFile*)newBuffer(sizeof(LibraryFile));*/
    //test_newCPoint(5);
    //cout << data_buffer;
    //test_newMoveNode(5);
    //loadAllMoveNode();
    //cout << &log_buffer[1];
    //return 101;
//}

int init(UINT bytesLength){
    log("wasm >> init");
    UINT comment_buffer_size = _ONE_MB*2;
    UINT boardText_buffer_size = bytesLength / 7 * 4;
    UINT buffer_pages = (comment_buffer_size + boardText_buffer_size) / _PAGE_SIZE + 1;
    
    //grow(skip_data_pages + buffer_pages);
    
    current_log_buffer = 0;
    current_err_buffer = 0;
    current_comment_buffer = 0;
    current_boardText_buffer = 0;
    current_data_buffer = 0;
    end_data_buffer = 0;
    
    comment_buffer = skip_data_pages*_PAGE_SIZE + libFile_buffer + _LIBFILE_BUFFER_SIZE + _ONE_KB;
    boardText_buffer = comment_buffer + comment_buffer_size + _ONE_KB;
    data_buffer = boardText_buffer + boardText_buffer_size + _ONE_KB;
        
    log("reset m_Stack");
    m_Stack = (Stack*)newBuffer(sizeof(Stack));
    //m_Stack->ClearAll();
    log("reset m_MoveList");
    m_MoveList = (MoveList*)newBuffer(sizeof(MoveList));
    //m_MoveList->ClearAll();
    log("reset m_file");
    m_file = (LibraryFile*)newBuffer(sizeof(LibraryFile));
        
    return int(skip_data_pages);
}