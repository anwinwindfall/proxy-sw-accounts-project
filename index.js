const axios = require('axios');
const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');
const e = require('express');
require('dotenv').config();
const app = express();
const PORT = 3000;
app.use(bodyParser.urlencoded({ extended: false }));
var options = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }
app.use(cors(options))
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
        if (error.status === 409) {
            res.status(409).json({ error: 'Contact already exists' });
        }
        else {
            console.error(error);
            res.status(500).json({ error: 'Failed to create contact' });
        }
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

app.post('/dev-update-recurring-plan', async (req, res) => {
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

app.post('/dev-create-association', async (req, res) => {
    try {
        const response = await axios.post('https://landing.shalommediastore.org/_hcms/api/accounts/associate/reccuringToContact', req.body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.API_KEY
            },
        });
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create association' });
    }    
});


app.get('/dev-fetch-recurring-plans', async (req, res) => {
    const pagination = req.query.pagination;
    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;
    const paymentMethod = req.query.paymentMethod
    const filters = {}

    if(pagination) filters.pagination = pagination;
    if(fromDate) filters.fromDate = fromDate;
    if(toDate) filters.toDate = toDate;
    if(paymentMethod) filters.paymentMethod = paymentMethod;

    const filterString = Object.keys(filters).map(key => `${key}=${filters[key]}`).join('&');

    try {
        const response = await axios.get(`https://landing.shalommediastore.org/_hcms/api/accounts/fetch/recurring-plans?${filterString}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.API_KEY
            },
        });
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch recurring plans' });
    }
});

app.post('/dev-create-deal', async (req, res) => {
    try {
        const response = await axios.post('https://landing.shalommediastore.org/_hcms/api/accounts/create/deal', req.body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.API_KEY
            },
        });
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create deal' });
    }
});

app.patch('/dev-update-contact', async (req, res) => {
    try {
        const response = await axios.patch('https://landing.shalommediastore.org/_hcms/api/accounts/update/contact', req.body, {
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
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});