const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// BAGO: Nilakihan natin ang limit to 50MB para makapasok ang Inspo Pictures!
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

let ordersList = [];
let onHandList = [];
let myWorksList = [];

for (let i = 1; i <= 18; i++) {
    myWorksList.push({ id: Date.now() + i, image: `${i}.png` });
}

// --- ORDERS API ---
app.post('/api/orders', (req, res) => {
    const newOrder = { id: Date.now(), status: "Pending", ...req.body };
    ordersList.push(newOrder);
    res.json(newOrder); 
});

app.get('/api/orders', (req, res) => res.json(ordersList));

app.put('/api/orders/:id/status', (req, res) => {
    const orderId = parseInt(req.params.id);
    const { status } = req.body;
    const order = ordersList.find(o => o.id === orderId);
    if(order) {
        order.status = status;
        res.json({ success: true });
    } else {
        res.status(404).json({ error: "Order not found" });
    }
});

// --- ON-HAND API ---
app.get('/api/onhand', (req, res) => res.json(onHandList));
app.post('/api/onhand', (req, res) => {
    onHandList.push({ id: Date.now(), ...req.body });
    res.json({ message: "Item added!" });
});

// --- MY WORKS API ---
app.get('/api/myworks', (req, res) => res.json(myWorksList));
app.post('/api/myworks', (req, res) => {
    myWorksList.push({ id: Date.now(), ...req.body });
    res.json({ message: "Work added!" });
});

app.listen(PORT, () => {
    console.log(`\n=================================================`);
    console.log(`🌸 SERVER IS RUNNING WITH ADMIN CONTROLS! 🌸`);
    console.log(`🌸 (Ready to receive large pictures!) 🌸`);
    console.log(`=================================================\n`);
});