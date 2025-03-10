const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let orders = [];

app.post('/api/pos/orders', (req, res) => {
    const order = req.body;

    if (!order.orderId || !order.timestamp || !order.deviceId || !order.salesPerson || !order.posPerson || !order.products || !order.total || !order.discount) {
        return res.status(400).json({
            status: 'error',
            message: 'Missing required fieldsd'd
        });
    }
    orders.push(order);
    
    res.status(200).json({
        status: 'success',
        message: 'Data successfully received.',
        orderId: order.orderId
    });
});
