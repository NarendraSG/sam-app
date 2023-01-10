import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as dynamoose from 'dynamoose';
import { User } from '../models/user';
import { Task } from '../models/task';

// This step is necessary in order to connect to DynamoDB.
// I tried moving to other location to reuse it in different
// lambda functions but it doesn't work.

const ddb = new dynamoose.aws.ddb.DynamoDB({
    region: 'us-east-1',
});
dynamoose.aws.ddb.set(ddb);

// Main Controller function for the API
export const controller = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const { body } = event;

    const { userData, taskData } = JSON.parse(body as string);

    const user = new User(userData);
    const task = new Task(taskData);

    await Promise.all([user.save(), task.save()]);

    let response: APIGatewayProxyResult;
    try {
        response = {
            statusCode: 200,
            body: JSON.stringify({
                message: `created user`,
            }),
        };
    } catch (err: unknown) {
        console.error(err);
        response = {
            statusCode: 500,
            body: JSON.stringify({
                message: err instanceof Error ? err.message : 'some error happened',
            }),
        };
    }

    return response;
};
