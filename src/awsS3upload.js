const AWS = require("aws-sdk");
const REGION_NAME = "ap-southeast-1";

const _uploadToS3 = (s3bucket, objectFile, absolutepath) => {
  const params = {
    Bucket: s3bucket,
    Key: absolutepath, // File name you want to save as in S3
    Body: objectFile
  };

  return new Promise((resolve, reject) => {
    let s3 = new AWS.S3({ region: REGION_NAME });
    s3.upload(params, function(err, data) {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

module.exports = { _uploadToS3 };
