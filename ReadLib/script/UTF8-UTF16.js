//UTF-16转UTF-8
function utf16ToUtf8(s) {
    if (!s) {
        return;
    }

    var i, code, ret = [],
        len = s.length;
    for (i = 0; i < len; i++) {
        code = s.charCodeAt(i);
        if (code > 0x0 && code <= 0x7f) {
            //单字节
            //UTF-16 0000 - 007F
            //UTF-8  0xxxxxxx
            ret.push(s.charAt(i));
        } else if (code >= 0x80 && code <= 0x7ff) {
            //双字节
            //UTF-16 0080 - 07FF
            //UTF-8  110xxxxx 10xxxxxx
            ret.push(
                //110xxxxx
                String.fromCharCode(0xc0 | ((code >> 6) & 0x1f)),
                //10xxxxxx
                String.fromCharCode(0x80 | (code & 0x3f))
            );
        } else if (code >= 0x800 && code <= 0xffff) {
            //三字节
            //UTF-16 0800 - FFFF
            //UTF-8  1110xxxx 10xxxxxx 10xxxxxx
            ret.push(
                //1110xxxx
                String.fromCharCode(0xe0 | ((code >> 12) & 0xf)),
                //10xxxxxx
                String.fromCharCode(0x80 | ((code >> 6) & 0x3f)),
                //10xxxxxx
                String.fromCharCode(0x80 | (code & 0x3f))
            );
        }
    }

    return ret.join('');
}
//UTF-8转UTF-16
function utf8ToUtf16(s) {
    if (!s) {
        return;
    }

    var i, codes, bytes, ret = [],
        len = s.length;
    for (i = 0; i < len; i++) {
        codes = [];
        codes.push(s.charCodeAt(i));
        if (((codes[0] >> 7) & 0xff) == 0x0) {
            //单字节  0xxxxxxx
            ret.push(s.charAt(i));
        } else if (((codes[0] >> 5) & 0xff) == 0x6) {
            //双字节  110xxxxx 10xxxxxx
            codes.push(s.charCodeAt(++i));
            bytes = [];
            bytes.push(codes[0] & 0x1f);
            bytes.push(codes[1] & 0x3f);
            ret.push(String.fromCharCode((bytes[0] << 6) | bytes[1]));
        } else if (((codes[0] >> 4) & 0xff) == 0xe) {
            //三字节  1110xxxx 10xxxxxx 10xxxxxx
            codes.push(s.charCodeAt(++i));
            codes.push(s.charCodeAt(++i));
            bytes = [];
            bytes.push((codes[0] << 4) | ((codes[1] >> 2) & 0xf));
            bytes.push(((codes[1] & 0x3) << 6) | (codes[2] & 0x3f));
            ret.push(String.fromCharCode((bytes[0] << 8) | bytes[1]));
        }
    }
    return ret.join('');
}



// 将字符串格式化为UTF8编码的字节
var writeUTF = function (str, isGetBytes) {
   var back = [];
   var byteSize = 0;
   for (var i = 0; i < str.length; i++) {
     var code = str.charCodeAt(i);
     if (0x00 <= code && code <= 0x7f) {
        byteSize += 1;
        back.push(code);
     } else if (0x80 <= code && code <= 0x7ff) {
        byteSize += 2;
        back.push((192 | (31 & (code >> 6))));
        back.push((128 | (63 & code)))
     } else if ((0x800 <= code && code <= 0xd7ff) 
         || (0xe000 <= code && code <= 0xffff)) {
        byteSize += 3;
        back.push((224 | (15 & (code >> 12))));
        back.push((128 | (63 & (code >> 6))));
        back.push((128 | (63 & code)))
     }
    }
    for (i = 0; i < back.length; i++) {
      back[i] &= 0xff;
    }
    if (isGetBytes) {
      return back
    }
    if (byteSize <= 0xff) {
      return [0, byteSize].concat(back);
    } else {
      return [byteSize >> 8, byteSize & 0xff].concat(back);
    }
}

writeUTF('中'); // => [0, 3, 228, 184, 173] 
// 前两位表示后面utf8字节的长度。因为长度为3，所以前两个字节为`0，3`
// 内容为`228, 184, 173`转成16进制就是`0xE4 0xB8 0xAD`


// 读取UTF8编码的字节，并专为Unicode的字符串
var readUTF = function (arr) {
  if (typeof arr === 'string') {
    return arr;
  }
  var UTF = '', _arr = this.init(arr);
  for (var i = 0; i < _arr.length; i++) {
    var one = _arr[i].toString(2),
        v = one.match(/^1+?(?=0)/);
    if (v && one.length == 8) {
      var bytesLength = v[0].length;
      var store = _arr[i].toString(2).slice(7 - bytesLength);
      for (var st = 1; st < bytesLength; st++) {
        store += _arr[st + i].toString(2).slice(2)
      }
      UTF += String.fromCharCode(parseInt(store, 2));
      i += bytesLength - 1
    } else {
      UTF += String.fromCharCode(_arr[i])
    }
  }
  return UTF
}

readUTF([0, 3, 228, 184, 173]); // => '中'