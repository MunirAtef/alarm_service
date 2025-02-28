const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3001;
const SECONDARY_SERVER = 'https://seminative-backend.onrender.com/ping';

setTimeout(async () => {
    console.log('Forwarding request from Main to Secondary');
    await axios.get(SECONDARY_SERVER).catch(err => console.error('Error:', err.message));
}, 3000);

app.get('/ping', async (req, res) => {
    console.log('Received request at Main Server');
    res.send('Received at Main Server, forwarding after 30 sec...');

    setTimeout(async () => {
        console.log('Forwarding request from Main to Secondary');
        await axios.get(SECONDARY_SERVER).catch(err => console.error('Error:', err.message));
    }, 30000);
});

app.listen(PORT, () => console.log(`Main Server running on port ${PORT}`));
