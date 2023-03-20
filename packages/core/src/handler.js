export default function handler(lamda) {
    return async function (event, context) {
        let body, statusCode

        try {
            body = await lamda(event, context)
            statusCode = 200
        } catch (error) {
            console.error(error)
            body = { error: error.message }
            statusCode = 500
        }

        return {
            statusCode,
            body: JSON.stringify(body)
        }
    }
}