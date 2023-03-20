import { Table } from 'sst/node/table'
import * as uuid from 'uuid'
import handler from '@notes/core/handler'
import dynamoDb from '@notes/core/dynamodb'

export const main = handler(async (event) => {
    const data = JSON.parse(event.body)
    const params = {
        TableName: Table.Notes.tableName,
        Item: {
            userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId,
            noteId: uuid.v4(),
            content: data.content,
            attachment: data.attachment,
            createdAt: Date.now()
        },
    }
    await dynamoDb.put(params)

    return params.Item
})