const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; 
    if (!token) {
        return res.status(401).json({ status: 'error', message: 'Authorization token missing' });
    }
    req.token = token;
    next();
};

app.get('/api/v1/batch-sales', authenticateToken, async (req, res) => {
    const { date, pageSize = 20 } = req.query;
    const token = req.token;

    if (!date) {
        return res.status(400).json({ status: 'error', message: 'Missing required fields' });
    }

    try {
        const response = await axios.get('http://the-best-pos.com/api/v1/batch-sales', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            params: {
                date, 
                pageSize, 
            }
        });

        const data = response.data;

        res.status(200).json({
            page: data.page,
            totalPage: data.totalPage,
            pageSize: data.pageSize,
            items: data.items,
            data: data.data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Failed to fetch data from THE BEST POS API' });
    }
});

app.listen(port, () => {
    console.log(`Server is running`);
});
