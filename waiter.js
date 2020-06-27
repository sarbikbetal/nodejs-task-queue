const Queue = require('bee-queue');

const options = {
    isWorker: false,
    sendEvents: false,
    redis: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        password: process.env.DB_PASS,
    },
}

const cookQueue = new Queue('cook', options);


const placeOrder = (order) => {
    return cookQueue.createJob(order).save();
};

cookQueue.on("succeeded", (job) => {
    // Notify the client via push notification, web socket or email etc.
    console.log(`🧾 ${job.data.qty}x ${job.data.dish} ready to be served 😋`);
});

const getOrderStatus = (orderId) => {
    return cookQueue.getJob(orderId).then((job) => {
        return {
            progress: job.progress,
            status: job.status,
            order: job.data
        };
    });
}

module.exports = {
    placeOrder: placeOrder,
    getStatus: getOrderStatus
};