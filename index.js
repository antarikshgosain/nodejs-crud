
const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/product.model.js');
const productRoute = require('./routes/product.route.js');

//middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

mongoose.connect("mongodb+srv://USERNAME:PASSWORD@node-cluster-1.c9d6e.mongodb.net/nodedb?retryWrites=true&w=majority&appName=node-cluster-1")
.then(() => {
    console.log('Connected to Mongo Database');
    app.listen(3000, () => {
        console.log('Server is running on port: 3000');
    });
})
.catch(() => {
    console.log('Connection to Mongo Database Failed');
});

app.get('/', (req,res) => {
    res.send('Hello from node.js API server');
});

//route(s)
app.use("/api/product", productRoute);

