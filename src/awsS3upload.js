const AWS = require("aws-sdk");
const REGION_NAME = "ap-southeast-1";

const _uploadToS3 = (s3bucket, objectFile, absolutepath) => {
  const params = {
    Bucket: s3bucket,
    Key: absolutepath, // File name you want to save as in S3
    Body: objectFile,
  };
  return new Promise((resolve, reject) => {
    let s3 = new AWS.S3({ region: REGION_NAME });
    s3.upload(params, function (err, data) {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

const _downloadS3 = (s3bucket, absolutepath) => {
  const params = {
    Bucket: s3bucket,
    Key: absolutepath, // File name you want to save as in S3
  };

  return new Promise((resolve, reject) => {
    let s3 = new AWS.S3({ region: REGION_NAME });
    s3.getObject(params, function (err, data) {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};
const _deleteS3 = (s3bucket, absolutepath) => {
  const params = {
    Bucket: s3bucket,
    Key: absolutepath, // File name you want to save as in S3
  };

  return new Promise((resolve, reject) => {
    let s3 = new AWS.S3({ region: REGION_NAME });
    s3.deleteObject(params, function (err, data) {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

const _listObjectS3 = (s3bucket) => {
  const params = {
    Bucket: s3bucket,
  };

  return new Promise((resolve, reject) => {
    let s3 = new AWS.S3({ region: REGION_NAME });
    s3.listObjects(params, function (err, data) {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

module.exports = { _uploadToS3, _listObjectS3, _downloadS3, _deleteS3 };
