const fs = require("fs");

let buf = Buffer.alloc(58);
let buf2 = Buffer.alloc(200);

//同步读文件
let fd = fs.openSync("data.txt");
console.log("fd:" + fd);
/**
 * fd:3
 */
fs.readSync(fd, buf);
fs.readSync(fd, buf2);
console.log(buf, buf.length);
console.log(buf2, buf2.length);
/**
 * <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64 21 e8 bf 99 e6 98 af e4 b8> 20
 * <Buffer 80 e4 b8 aa e7 94 a8 e4 ba 8e e6 8f 90 e4 be 9b e6 95 b0 e6 8d ae e7 9a 84 e6 96 87 e6 9c ac e6 96 87 e4 bb b6 2e 00 00 00 00 00 00 00 00 00 00 00 00 ... 150 more bytes> 200
 */
fs.closeSync(fd);

let fd_w = fs.openSync("data_copy.txt", "w");
let fd_w2 = fs.openSync("data_copy2.txt", "w");
fs.writeSync(fd_w, buf);
fs.writeSync(fd_w2, buf2);
fs.closeSync(fd_w);
fs.closeSync(fd_w2);

/**
 * 这是一条分割线
 */
const fs = require("fs");
console.log(fs.statSync("data.txt"));

/**
 * 这是一条分割线
 */
const fs = require("fs");
let ws = fs.createWriteStream("img_copy.jpeg");
let rs = fs.createReadStream("data.jpeg");
rs.pipe(ws);
rs.once("end", function () {
  ws.end();
});
setTimeout(() => {
  //如果不包装成异步操作则会报错，可能上面某步骤的操作为异步
  console.log(fs.statSync("img_copy.jpeg"));
}, 0);

/**
 * 这是一条分割线
 */
//回调地狱出现了
const fs = require("fs");
fs.open("./fs/data.jpeg", function (err, fd) {
  if (!err) {
    fs.read(fd, function (err, bytesRead, buf) {
      if (!err) {
        //console.log(`bytesRead:${bytesRead}\nbuf:${buf}`);
        fs.open("./fs/test.jpeg", "w", function (err, fd) {
          if (!err) {
            fs.write(fd, buf, function (err) {
              if (!err) {
                console.log("新建文件成功！");
              }
            });
          }
        });
      }
    });
  }
});

//分割线
const fs = require("fs");
console.log(fs.statSync("./fs/test.jpeg"));
