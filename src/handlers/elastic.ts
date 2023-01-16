import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Client } from '@elastic/elasticsearch';

// Main Controller function for the API
export const controller = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const client = new Client({
        node: 'http://elasticsearch:9200',
        auth: {
            username: 'elastic',
            password: 'elastic',
        },
    });

    let response: APIGatewayProxyResult;
    try {
        response = {
            statusCode: 200,
            body: JSON.stringify({
                message: `created user`,
                data: await client.cluster.health({}),
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
