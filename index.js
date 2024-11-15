const axios = require('axios');
const express = require('express');
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());


app.post('/dev-search-contact', async (req, res) => {
    try {
        const response = await axios.post('https://landing.shalommediastore.org/_hcms/api/accounts/search/contact', req.body);
        res.json(response.data);
        console.log(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to search contact' });
    }
});



app.get('/dev-fetch-contact-details', (req, res) => {
    try {
        const response = axios.get('https://landing.shalommediastore.org/_hcms/api/accounts/search/contact');
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch contact details' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});