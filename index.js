
const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/product.model')

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

app.post('/api/products', async (req,res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
});

app.get('/api/products', async (req,res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/api/product/:id', async (req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.put('/api/product/:id', async (req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);   
        if(!product) {
            return res.status(404).json({message: "Product NOT Found"});
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


app.delete('/api/product/:id', async (req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: "Product NOT Found"});
        }
        res.status(200).json({message: "Product Deleted Successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});



