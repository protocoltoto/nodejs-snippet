const fs = require("fs");
const path = require("path");
const looping = 1000000;
const arr = [];
const BufferAllocate = 1664;
for (let index = 0; index < looping; index++) {
  arr.push(Buffer.alloc(BufferAllocate, "x").toString());
}
const pathoutput = path.join(__dirname, "..", "output");
if (!fs.existsSync(pathoutput)) {
  fs.mkdirSync(pathoutput);
}
const streamwriter = fs.createWriteStream(
  path.join(__dirname, "..", "output", `Dumpfile${BufferAllocate}.txt`),
  { flags: "w" }
);
arr.forEach((e) => {
  streamwriter.write(e + "\n");
});
// fs.writeFileSync(
//   path.join(__dirname, "..", "output", "Dumpfile.txt"),
//   arr.join("\n"),
//   {}
// );
