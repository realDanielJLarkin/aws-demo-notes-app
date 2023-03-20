import { Api, use } from 'sst/constructs'
import { StorageStack } from './StorageStack'

export function ApiStack({ stack, app }) {
    const { table } = use(StorageStack)

    const api = new Api(stack, "Api", {
        defaults: {
            function: {
                bind: [table],
            },
        },
        routes: {
            "POST /notes": "packages/functions/src/create.main",
            "GET /notes/{id}": "packages/functions/src/get.main",
            "GET /notes": "packages/functions/src/list.main",
            "PUT /notes/{id}": "packages/functions/src/update.main",
            "DELETE /notes/{id}": "packages/functions/src/delete.main"
        },
    })

    stack.addOutputs({
        ApiEndpoint: api.url,
    })

    return {
        api,
    }
}