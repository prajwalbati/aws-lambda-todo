const AWS = require("aws-sdk");
const uuid = require('uuid');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TODO_TABLE = process.env.TODO_TABLE;

module.exports.listTodos = async(event, context, callback) => {
    const params = {
        TableName: TODO_TABLE
    };

    dynamoDb.scan(params, (error, data) => {
        if(error) {
            console.error(error);
            callback(new Error(error));
            return;
        }

        const response = {
            statusCode: 200,
            body: JSON.stringify(data.Items)
        }
        callback(null, response);
    });
};