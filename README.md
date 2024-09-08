Here's a short `README.md` for your script:

# ChatGPT API Express Server

This project is an Express.js server that integrates with OpenAI's ChatGPT API,
allowing you to send a message to the API and receive a response via an HTTP endpoint.

## Setup

1. Clone the repository.

2. Install dependencies:

   ```bash
   $ npm install
   ```

3. Create a `.env` file and add your OpenAI API key:

   ```bash
   OPENAI_API_KEY=your-openai-api-key-here
   ```

4. Start the server:

   ```bash
   $ node scripts/chat.js
   ```

The server will start on port `3327`.

## Usage

To send a message to ChatGPT, make a POST request to the `/chat` endpoint with the following format:

### Request:
```bash
curl -X POST http://localhost:3327/chat \
    -H "Content-Type: application/json" \
    -d '{"message": "Tell me about Ethereum."}'
```

### Response:
The server will return a JSON object with the ChatGPT response, for example:

```json
{
  "response": "Ethereum is a decentralized, open-source blockchain platform..."
}
```

## Error Handling

- If the `message` field is missing in the request body, the server will return a `400 Bad Request` error.
- If the API request to OpenAI fails, a `500 Internal Server Error` is returned.
