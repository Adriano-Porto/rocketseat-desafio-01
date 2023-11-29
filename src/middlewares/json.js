export async function useJson(req, res) {
    const buffer = []

    for await(const chunck of req) {
        buffer.push(chunck)
    }

    req.body = buffer.length !== 0 ? JSON.parse(Buffer.concat(buffer).toString()) : null

    res.setHeader('Content-Type', 'application/json')
}