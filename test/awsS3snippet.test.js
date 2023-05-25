const s3snippet = require("../src/awsS3upload");

describe("Test Upload file to S3", () => {
  // it("Should Upload file Success when bucket=rujji-test-app ", async () => {
  //   let s3bucket = 'rujji-test-app';
  //   let filename = "test-folder/output/testfile.txt";
  //   let content = "TestFile|1|1234erwgasdfa";
  //   let result = "";
  //   try {
  //     result = await s3snippet._uploadToS3(s3bucket, content, filename);
  //   } catch (error) {
  //     result = error;
  //   }
  //   expect(result).toBeTruthy();
  // });

  // it("Should Upload file Fail when bucket=notFound ", async () => {
  //   let s3bucket = 'rujji-test-fail';
  //   let filename = "test-folder/output/testfile.txt";
  //   let content = "TestFile|1|1234erwgas123123123dfa";
  //   let result = "";
  //   try {
  //     result = await s3snippet._uploadToS3(s3bucket, content, filename);
  //   } catch (error) {
  //     result = error;
  //   }
  //   expect(result.code).toBe("InvalidBucketName");
  // });

  // it("Should Download file", async () => {
  //   let s3bucket = "rujji-test-app";
  //   let filename = "test-folder/output/testfile.txt";
  //   try {
  //     result = await s3snippet._downloadS3(s3bucket, filename);
  //   } catch (error) {
  //     result = error;
  //   }
  //   console.log("_downloadS3", result);
  //   expect(result).toBeTruthy();
  // });
  // it("Should Delete file", async () => {
  //   let s3bucket = "rujji-test-app";
  //   let filename = "test-folder/output/testfile.txt";
  //   try {
  //     result = await s3snippet._deleteS3(s3bucket, filename);
  //   } catch (error) {
  //     result = error;
  //   }
  //   console.log("_deleteS3", result);
  //   expect(result).toBeTruthy();
  // });
  it("Should List Object S3", async () => {
    let s3bucket = "rujji-test-app";
    try {
      result = await s3snippet._listObjectS3(s3bucket);
    } catch (error) {
      result = error;
    }
    console.log(
      "_listObjectS3",
      result
    );
    console.log(
      "_listObjectS3",
      result.Contents.filter((element) => element.Size > 0).map(
        (element) => element.Key
      )
    );
    expect(result).toBeTruthy();
  });
});
