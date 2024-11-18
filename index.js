const axios = require('axios');
const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser')
require('dotenv').config();
const app = express();
const PORT = 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
app.use(bodyParser.json())

app.get('/dev-fetch-contact-details', async (req, res) => {
    try {
        const contactId = req.query.contactId;
        console.log(contactId);
        const response = await axios.get(`https://landing.shalommediastore.org/_hcms/api/accounts/fetch/contact?contactId=${contactId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.API_KEY
            },
        });
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch contact details' });
    }
});

app.post('/dev-search-contacts', async (req, res) => {
    try {
        const response = await axios.post('https://landing.shalommediastore.org/_hcms/api/accounts/search/contact', req.body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.API_KEY
            },
        });
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to search contacts' });
    }
});

app.post('/dev-create-contact', async (req, res) => {
    try {
        const response = await axios.post('https://landing.shalommediastore.org/_hcms/api/accounts/create/contact', req.body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.API_KEY
            },
        });
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create contact' });
    }
});

app.post('/dev-create-recurring-plan', async (req, res) => {
    try {
        const response = await axios.post('https://landing.shalommediastore.org/_hcms/api/accounts/create/reccuring-plan', req.body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.API_KEY
            },
        });
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create recurring plan' });
    }
});

app.patch('/dev-update-recurring-plan', async (req, res) => {
    try {
        const response = await axios.patch('https://landing.shalommediastore.org/_hcms/api/accounts/update/recurring-plan', req.body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.API_KEY
            },
        });
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update contact' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});