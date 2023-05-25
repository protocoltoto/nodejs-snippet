const {
  S3Client,
  ListObjectsV2Command,
  DeleteObjectCommand,
  PutObjectCommand,
  GetObjectCommand,
  CopyObjectCommand,
} = require("@aws-sdk/client-s3");
const path = require("path");
const deleteObjecthandler = async (Bucketname, absolutefilename) => {
  const params = {
    Bucket: Bucketname,
    Key: absolutefilename,
  };
  const client = new S3Client({});
  const command = new DeleteObjectCommand(params);
  try {
    const response = await client.send(command);
    return response;
  } catch (err) {
    console.err("AWS-SDK V3 Error deleteObject:", err);
    throw err;
  }
};

const listObjecthandler = async (Bucketname, Prefix = undefined) => {
  const client = new S3Client({});
  const params = {
    Bucket: Bucketname,
  };
  if (Prefix) {
    params["Prefix"] = Prefix;
  }
  const command = new ListObjectsV2Command(params);
  try {
    let isTruncated = true;

    console.log("Your bucket contains the following objects:\n");
    let contents = "";
    let bufferresponse = [];
    while (isTruncated) {
      const { Contents, IsTruncated, NextContinuationToken } =
        await client.send(command);
      console.log("Contents", Contents);
      bufferresponse = [
        ...Contents.map((iterator) => {
          return iterator.Key;
        }),
      ];
      isTruncated = IsTruncated;
      console.log("isTruncated", isTruncated);
      command.input.ContinuationToken = NextContinuationToken;
    }
    return bufferresponse;
  } catch (err) {
    console.error("AWS-SDK V3 Error ListObject:", err);
    return undefined;
  }
};

const uploadObjectHandler = async (Bucketname, absolutefilename, data) => {
  const client = new S3Client({});
  const params = {
    Bucket: Bucketname,
    Key: absolutefilename,
    Body: data,
  };
  const command = new PutObjectCommand(params);
  try {
    const response = await client.send(command);
    return response;
  } catch (err) {
    console.error("AWS-SDK V3 Error PutObject:", err);
    return undefined;
  }
};

const downloadObjectHandler = async (Bucketname, absolutefilename) => {
  const client = new S3Client({});
  const params = {
    Bucket: Bucketname,
    Key: absolutefilename,
  };
  const command = new GetObjectCommand(params);
  try {
    const response = await client.send(command);
    const stream = response.Body;
    return new Promise((resolve, reject) => {
      const chunks = [];
      stream.on("data", (chunk) => chunks.push(chunk));
      stream.once("end", () => resolve(Buffer.concat(chunks)));
      stream.once("error", reject);
    });
  } catch (err) {
    console.error("AWS-SDK V3 Error PutObject:", err);
    return undefined;
  }
};

const copyObjectHandler = async (
  bucketname,
  absolutesource,
  absolutedestination
) => {
  const client = new S3Client({});
  const params = {
    Bucket: bucketname,
    CopySource: path.posix.join(bucketname, absolutesource),
    Key: absolutedestination,
  };
  const command = new CopyObjectCommand(params);
  try {
    const response = await client.send(command);
    return response;
  } catch (err) {
    console.error("AWS-SDK V3 Error CopyObject:", err);
    throw err;
  }
};

const moveObjectHandler = async (
  bucketname,
  absolutesource,
  absolutedestination
) => {
  try {
    await copyObjectHandler(bucketname, absolutesource, absolutedestination);
    await deleteObjecthandler(bucketname, absolutesource);
    return true;
  } catch (err) {
    console.error("AWS-SDK V3 Error movefile:", err);
    return undefined;
  }
};
const mainprocess = async () => {
  console.time("Processing Time");
  const bucketname = "rujji-tmp-storage";
  //   let result = await downloadObjectHandler(
  //     bucketname,
  //     "tmpstorage/processed/Dumpfile1664.txt"
  //   );
  let result = await moveObjectHandler(
    bucketname,
    "tmpstorage/move.pdf",
    "tmpstorage/processed/move.pdf"
  );
  console.log(result);
  console.timeEnd("Processing Time");
};
mainprocess();
