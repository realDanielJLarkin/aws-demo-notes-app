import { Table } from 'sst/node/table'
import handler from '@notes/core/handler'
import dynamoDb from '@notes/core/dynamodb'

export const main = handler(async (event) => {
    const params = {
        TableName: Table.Notes.tableName,
        Key: {
            userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId,
            noteId: event.pathParameters.id,
        }
    }

    const result = await dynamoDb.get(params)

    if (!result.Item) {
        throw new Error("Item not found.")
    }

    return result.Item
})