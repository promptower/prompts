require("dotenv").config();
const axios = require('axios');
const apiKey = process.env.OPENAI_API_KEY;

const express = require('express');
const cors = require("cors");

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

const handleError = (error, message) => {
    console.error(`${message}:`, error);
};

const exitIfTimeout = async (promise, timeout) => {
    let timeoutHandle;
    const timeoutPromise = new Promise((_, reject) => {
        timeoutHandle = setTimeout(() => reject(new Error('Timeout')), timeout);
    });
    return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timeoutHandle));
};

const callChatGPT = async (content, timeout = 10000) => {
    const url = 'https://api.openai.com/v1/chat/completions';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
    };
    const body = JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: content }],
        max_tokens: 150,
    });

    try {
        const response = await exitIfTimeout(axios.post(url, body, { headers }), timeout);
        return response.data.choices[0].message.content;
    } catch (error) {
        handleError(error, 'Error calling ChatGPT');
        throw error;
    }
};

// API endpoint for handling requests
app.post('/chat', async (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).send({ error: "Message is required" });
    }

    try {
        const response = await callChatGPT(message);
        res.send({ response });
    } catch (error) {
        res.status(500).send({ error: 'Failed to get response from ChatGPT' });
    }
});

app.listen(3327, () => console.log('Server listening on port 3327...'));
