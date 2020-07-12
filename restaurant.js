require('dotenv').config();
const express = require('express');
const http = require('http');

require('./kitchen');
const {
    placeOrder,
    getStatus
} = require('./waiter');

// Inits
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

// Routes
app.get('/', (req, res) => {
    res.send("😋 We are serving freshly cooked food 🍲");
});

app.post('/order', (req, res) => {
    let order = {
        dish: req.body.dish,
        qty: req.body.qty
    }

    if (order.dish && order.qty) {
        placeOrder(order)
            .then((job) => res.json({
                done: true,
                order: job.id,
                message: "Your order will be ready in a while"
            }))
            .catch(() => res.json({
                done: false,
                message: "Your order could not be placed"
            }));
    } else {
        res.status(422);
    }
});


app.post('/order-legacy', (req, res) => {
    let order = {
        dish: req.body.dish,
        qty: req.body.qty,
        orderNo: Date.now().toString(36)
    }
    if (order.dish && order.qty) {
        setTimeout(() => console.log("Getting the ingredients ready... 🥬 🧄 🧅 🍄"), 1000);
        setTimeout(() => console.log(`🍳 Preparing ${order.dish}`), 1500);
        setTimeout(() => {
            console.log(`🧾 Order ${order.orderNo}: ${order.dish} ready`);
            res.json({
                done: true,
                message: `Your ${order.qty}x ${order.dish} is ready`
            })
        }, order.qty * 5000);
    } else {
        console.log("Incomplete order rejected");
        res.status(422).json({
            done: false,
            message: "Your order could not be placed"
        });
    }
});

app.get("/order/:id", (req, res) => {
    let orderId = req.params.id;
    if (!orderId) {
        res.sendStatus(400);
        return;
    };
    
    getStatus(orderId).then((result) => {
        res.json({
            progress: result.status == "succeeded" ? `Your order is ready 😊` : `Your order is ⏲ ${result.progress}% ready`,
            order: result.order,
            status: result.status
        })
    }).catch((err) => {
        res.sendStatus(500);
    });
})


// Create and start the server
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Restaurant open at:${PORT}`);
});