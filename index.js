const axios = require('axios');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = 3000;
app.use(cors());


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


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});