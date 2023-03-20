import { Table } from 'sst/node/table'
import handler from '@notes/core/handler'
import dynamoDb from '@notes/core/dynamodb'

export const main = handler(async (event) => {
    const params = {
        TableName: Table.Notes.tableName,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ":userId": event.requestContext.authorizer.iam.cognitoIdentity.identityId,
        },
    }

    const result = await dynamoDb.query(params)

    return result.Items
})