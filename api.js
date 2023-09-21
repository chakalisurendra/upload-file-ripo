const parser = require('lambda-multipart-parser');

const uploadFile = async (event) => {
  try {
    const { file, fields } = await parser.parse(event);
    const tags = { filename: file.filename };

    // Rest of your code for uploading the file to S3
    await s3Client
            .putObject({
              Bucket: BUCKET_NAME,
              Key: fields.filename || file.filename,
              Body: file.content,
              Tagging: queryString.encode(tags),
            })
            .promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ description: 'file created', result: 'ok' }),
    };
  } catch (_error) {
    // Error handling code
    return {
      statusCode: 409,
      body: JSON.stringify({ description: 'something went wrong', result: 'error' }),
    };
  }
};

module.exports = { uploadFile };

// const parser = require('lamda-multipart-parser');
// const uploadFile = async   (event) => {
//     const { file, fields } = await parseFormData(event);
//     const tags = { filename: file.filename };
//     try {
//       await s3Client
//         .putObject({
//           Bucket: BUCKET_NAME,
//           Key: fields.filename || file.filename,
//           Body: file.content,
//           Tagging: queryString.encode(tags),
//         })
//         .promise();
//       return {
//         statusCode: 200,
//         body: JSON.stringify({ description: 'file created', result: 'ok' }),
//       };
//     } catch (_error) {
//       // this is not ideal error handling, but good enough for the purpose of this example
//       return {
//         statusCode: 409,
//         body: JSON.stringify({ description: 'something went wrong', result: 'error' })
//       }
//     }
//   };
// module.exports = {
//     uploadFile,
// };

// const uploadFile = async (event) => {
//     const { file, fields } = await parseFormData(event);
//     const tags = { filename: file.filename };
//     try {
//       await s3Client
//         .putObject({
//           Bucket: BUCKET_NAME,
//           Key: fields.filename || file.filename,
//           Body: file.content,
//           Tagging: queryString.encode(tags),
//         })
//         .promise();
//       return {
//         statusCode: 200,
//         body: JSON.stringify({ description: 'file created', result: 'ok' }),
//       };
//     } catch (_error) {
//       // this is not ideal error handling, but good enough for the purpose of this example
//       return {
//         statusCode: 409,
//         body: JSON.stringify({ description: 'something went wrong', result: 'error' })
//       }
//     }
//   };