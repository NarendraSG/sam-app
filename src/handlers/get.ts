import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as dynamoose from 'dynamoose';
import { Task } from '../models/task';
import { User } from '../models/user';

const ddb = new dynamoose.aws.ddb.DynamoDB({
    region: 'us-east-1',
});

dynamoose.aws.ddb.set(ddb);

export const controller = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const {
        queryStringParameters: { id },
    } = event;

    const [user, task] = await Promise.all([User.get({ id: parseInt(id) }), Task.get({ id: parseInt(id) })]);

    let response: APIGatewayProxyResult;
    try {
        response = {
            statusCode: 200,
            body: JSON.stringify({
                message: `get user`,
                user,
                task,
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
