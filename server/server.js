const express = require('express');
const app = express();

const serverPort = process.env.PORT || 5000;
const localhost = 'http://localhost';
// const ipv4 = '5.14.152.178';
// const ipv4 = '192.168.0.194';
const ipv4 = '127.0.0.1';
const ipv6 = '2a02:2f0e:d10b:dd00:d9d8:1735:6efe:3fd1';


const { connectToDatabase } = require('./database/db-config.js');
const { getProductData, getReviewData } = require('./database/db-prod-config.js');
const { checkMail } = require('./database/db-user-config.js');

app.get('/api/p/:sku', async (req, res) => {
    // Change '*' to your domain for production
    res.header('Access-Control-Allow-Origin', '*');

    try {
        const result = await getProductData(pool, req.params.sku);
        res.json(ParseValuesToJson(result));
    } catch (err) {
        console.error(`Error querying the database`, err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/p/:sku/reviews', async (req, res) => {
    // Change '*' to your domain for production
    res.header('Access-Control-Allow-Origin', '*');

    try {
        const result = await getReviewData(pool, req.params.sku);
        res.json(ParseValuesToJson(result));
    } catch (err) {
        console.error(`Error querying the database`, err);
        res.status(500).json({ error: 'Server error' });
    }

});

// Handling preflight requests
app.options('/api/post/create-account', (req, res) => {
    // Change '*' to your domain for production
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    res.status(200).send();
});
app.post('/api/post/create-account', async (req, res) => {
    // Change '*' to your domain for production
    res.header('Access-Control-Allow-Origin', '*');

    const userData = new URLSearchParams(req.url.split('?').pop());



    res.json({ "msg": "ok" });
});

const pool = connectToDatabase();

app.listen(serverPort, ipv4, () => {
    console.log(`Server listening on port ${ipv4}:${serverPort}`);
});

/**
 * Parses Stringified JSON into JSON object. (Recursive function)
 * @param {Object} value 
 * @returns The parsed object
 */
function ParseValuesToJson(value) {
    if (typeof value === 'object' && value !== null)
        for (let key of Object.keys(value))
            value[key] = ParseValuesToJson(value[key]);
    else if (typeof value === 'string')
        try { return JSON.parse(value); }
        catch (ex) { }
    return value;
}