const fs = require("fs");
const path = require("path");
const openpgp = require("openpgp");
const generate = async (
  keypasspharse = "changeit",
  keytype = "rsa",
  keylength = 2048
) => {
  const { privateKey, publicKey } = await openpgp.generateKey({
    type: keytype, // Type of the key
    rsaBits: keylength, // RSA key size (defaults to 4096 bits)
    userIDs: [{ name: "Rujji", email: "example@erujji.org" }], // you can pass multiple user IDs
    passphrase: keypasspharse, // protects the private key
  });
  return {
    privatekey: privateKey,
    publickey: publicKey,
    passphrase: keypasspharse,
  };
};

const mainproc = async () => {
  //   const objKey = await generate();
  const objKey = {
    publickey: fs
      .readFileSync(path.join(__dirname, "..", "security", "publickey.pgp"))
      .toString(),
    privatekey: fs
      .readFileSync(path.join(__dirname, "..", "security", "privatekey.pgp"))
      .toString(),
    passphrase: "changeit",
  };

  // //NOTED: Encrypted Large file
  // const datafile = fs.readFileSync(
  //   path.join(__dirname, "..", "data", "Dumpfile.txt")
  // );
  // const testdata = Buffer.from(datafile, "binary");
  // // console.log(testdata);
  // const ciphertext = await pgpencrypted(testdata, objKey.publickey);
  // console.time("Writefile Encrypted PGP")
  // const writestream = fs.createWriteStream(
  //   path.join(__dirname, "..", "output", "Dumpfileoutput.txt.pgp"),
  //   { encoding: "binary" }
  // );
  // writestream.write(ciphertext);
  // writestream.end();
  // console.timeEnd("Writefile Encrypted PGP")

  // NOTED: Decrypted binary pgp files
  const ciphervalue = fs.readFileSync(
    path.join(__dirname, "..", "output", "Dumpfileoutput.txt.pgp")
  );
  console.time("Decrypted pgp files");
  const plaintext = await pgpdecrypted(
    Buffer.from(ciphervalue, "binary"),
    objKey.privatekey,
    objKey.passphrase
  );

  const writestream = fs.createWriteStream(
    path.join(__dirname, "..", "output", "Dumpfileoutput.txt")
  );
  writestream.write(plaintext);
  writestream.end();
  console.timeEnd("Decrypted pgp files");

  //   Buffer.from(ciphertext)
  //     .filter((e) => e)
  //     .forEach((element) => {
  //       writestream.write(Buffer.from(element, "binary"));
  //     });
  //   console.log(plaintext);
  //   fs.writeFileSync(
  //     path.join(__dirname, "..", "security", "privatekey.pgp"),
  //     objKey.privatekey
  //   );
  //   fs.writeFileSync(
  //     path.join(__dirname, "..", "security", "publickey.pgp"),
  //     objKey.publickey
  //   );
};

const pgpencrypted = async (
  message,
  publicKeyarmor,
  encryptedtype = "string"
) => {
  const msg = await openpgp.createMessage({
    binary: message,
  });
  const publicKey = await openpgp.readKey({ armoredKey: publicKeyarmor });

  const cipherValue = await openpgp.encrypt({
    message: msg, // input as Message object
    encryptionKeys: publicKey,
    format: "binary", // don't ASCII armor (for Uint8Array output)
  });
  return cipherValue;
};

const pgpdecrypted = async (
  ciphervalue,
  privatearmor,
  passphrase,
  encryptedtype = "string"
) => {
  const msg = await openpgp.readMessage({ binaryMessage: ciphervalue });
  const privateKey = await openpgp.decryptKey({
    privateKey: await openpgp.readKey({ armoredKey: privatearmor }),
    passphrase,
  });
  const { data: decrypted } = await openpgp.decrypt({
    message: msg,
    decryptionKeys: privateKey,
    format: "binary",
  });

  return decrypted;
};

const pgpdecryptedlarge = async (
  ciphervalue,
  privatearmor,
  passphrase,
  encryptedtype = "string"
) => {
  const readableStream = new ReadableStream({
    start(controller) {
      controller.enqueue(ciphervalue);
      controller.close();
    },
  });
  const msg = await openpgp.createMessage({ binary: readableStream });
  const privateKey = await openpgp.decryptKey({
    privateKey: await openpgp.readKey({ armoredKey: privatearmor }),
    passphrase,
  });
  const decrypted = await openpgp.decrypt({
    message: msg,
    decryptionKeys: privateKey,
    format: "binary",
  });
  const chunks = [];
  for await (const chunk of decrypted.data) {
    chunks.push(chunk);
  }
  return chunks;
};

mainproc();
