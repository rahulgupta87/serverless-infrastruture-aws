'use strict';

// module.exports.slsDemoLambda = async (event) => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify(
//       {
//         message: 'Go Serverless v1.0! Your function executed successfully!',
//         input: event,
//       },
//       null,
//       2
//     ),
//   };

//   // Use this code if you don't use the http event with the LAMBDA-PROXY integration
//   // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
// };

const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.queryDynamoDB = async (event) => {
    const userId = parseInt(event.pathParameters.userId); // Convert userId to a number

    const params = {
        TableName: 'slsDemoDynamoTable',
        Key: {
            userId: userId // Use the numeric userId in the Key
        }
    };

    try {
        const data = await dynamoDB.get(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(data.Item)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        };
    }
};
