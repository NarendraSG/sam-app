# AWS SAM APPLICATION

AWS Serverless Application Model is an open-source framework that we can use to build [serverless applications](https://aws.amazon.com/serverless/) on AWS.
A **serverless application** is a combination of Lambda functions, event sources, and other resources that work together to perform tasks.

AWS SAM consists of the following components:

- **AWS SAM template specification** We use this specification to define your serverless application. It provides us with a simple and clean syntax to describe the functions, APIs, permissions, configurations, and events that make up a serverless application.
- **AWS SAM command line interface (AWS SAM CLI)** We use this tool to build serverless applications that are defined by AWS SAM templates. The CLI provides commands that enable us to verify that AWS SAM template files are written according to the specification, invoke Lambda functions locally, step-through debug Lambda functions, package and deploy serverless applications to the AWS Cloud, and so on.

SAM CLI commands:

- sam init
- sam local invoke | sam local start-api
- sam logs
- sam package
- sam deploy

Details about these commands can be found [here](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-reference.html#serverless-sam-cli)

## File/Folder Info

1.  `root`: Contains the SAM application
2.  `.aws-sam`: Created when SAM application is built, it contains all the deployable code to Lambda function along with template.yaml file which is used by SAM to create/Update required resources on AWS.
3.  `src`: Contains all the typescript code (Basically a NodeJS project)
4.  `src/handlers`: Contains the handlers for Lambda. Each file corresponds to an individual lambda function.
5.  `src/models`: Contains the Model class for various tables.
6.  `template.yaml`: It contains all the resources that are to be created/updated by SAM on AWS for this Application.

## How to add a new Table in DynamoDB?

- Go To `template.yaml` file in the root folder.
- Under Resources, Add Resource name as Table name or anything similar to it. Under that, set its Type as `AWS::DynamoDB::Table` and declare Properties containing name, attributes and other parameters for the table.

```
UserTable:
	Type: AWS::DynamoDB::Table
	Properties:
		TableName:  nv_User
			AttributeDefinitions:
				- AttributeName:  id
				  AttributeType:  N
			KeySchema:
				- AttributeName:  id
				  KeyType:  HASH
			BillingMode:  PAY_PER_REQUEST
```

## How to give access for table to lambda?

Go To `template.yaml` file under the lambda function. Add `Policies` under `Properties`
For example:

```
Policies:
  - DynamoDBCrudPolicy:
	   TableName:  !Ref  UserTable
```

Some readymade policy can be found [here](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-policy-template-list.html)

## How to add a model for the table?

Go To `src/models` folder and add the file there which contains schema for the table and export its model from there.

```
import {
    Schema,
    model
} from "dynamoose";

const schema = new Schema({
    id: {
        type: Number,
        hashKey: true,
    },
    desc: {
        type: String,
        required: true
    },
}, {
    saveUnknown: true,
    timestamps: true,
});

export const Task = model("nv_Task", schema);
```
