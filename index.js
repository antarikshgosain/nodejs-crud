const express = require('express')
const mongoose = require('mongoose')

const app = express();

mongoose.connect("mongodb+srv://USERNAME:PASSWORD@node-cluster-1.c9d6e.mongodb.net/nodedb?retryWrites=true&w=majority&appName=node-cluster-1")
.then(() => {
    console.log('Connected to Mongo Database');
})
.catch(() => {
    console.log('Connection to Mongo Database Failed');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000!!!');
});

app.get('/', (req,res) => {
    res.send('Hello from node API server');
});