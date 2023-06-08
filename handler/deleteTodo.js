const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TODO_TABLE = process.env.TODO_TABLE;

module.exports.deleteTodo = async(event, context, callback) => {
    const params = {
        TableName: TODO_TABLE,
        Key: {
            id: event.pathParameters.id
        }
    };

    dynamoDb.delete(params, (error, data) => {
        if(error) {
            console.error(error);
            callback(new Error(error));
            return;
        }

        const response = {
            statusCode: 200,
            body: JSON.stringify({message: 'Deletion Successful'})
        };
        callback(null, response);
    });
};