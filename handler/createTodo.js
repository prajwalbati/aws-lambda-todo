const AWS = require("aws-sdk");
const uuid = require('uuid');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TODO_TABLE = process.env.TODO_TABLE;

module.exports.createTodo = async(event, context, callback) => {
    console.log(event);
    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);
    if (typeof data.todo !== "string") {
        console.error("Validation failed");
        return;
    }

    const params = {
        TableName: TODO_TABLE,
        Item: {
            id: uuid.v1(),
            todo: data.todo,
            checked: false,
            createdAt: timestamp,
            updatedAt: timestamp
        }
    };

    dynamoDb.put(params, (error, data) => {
        if(error) {
            console.error(error);
            callback(new Error(error));
            return;
        }
        const response = {
            statusCode: 200,
            body: JSON.stringify(data.Item0)
        }
        callback(null, response);
    });
};