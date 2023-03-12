const crypto = require("crypto");

const algorithm = "aes-256-ecb";
const secretKey = "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3";
const iv = new Buffer.alloc(16);

const encrypt = async (text) => {
  const cipher = crypto.createCipher(algorithm, secretKey);
  let data = cipher.update(text, "utf-8", "hex");
  data += cipher.final("hex");
  // const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return data;
};
const arr = [];
const fn = async () => {
  console.time("push");
  for (let index = 0; index < 1000000; index++) {
    arr.push(index);
  }
  console.timeEnd("push");
  const tmp = arr.map(async(data) => {
    const sha1 = crypto.createHash("sha1");
    sha1.update(data.toString(), "utf-8");
    const hash = sha1.digest("hex");
    return encrypt(hash);
  });
  return Promise.all(tmp);
};

// console.table(arr);

const main = async () => {
  console.time("encrypt");
  const data = await fn();
  console.timeEnd("encrypt");
  console.log(data);
};
main();
