
const Product = require('../models/product.model');

const getProducts = async (req,res) => {
    console.log('Product Controller - getProducts()');
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getProduct = async (req,res) => {
    console.log('Product Controller - getProduct()');
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const addProduct = async (req,res) => {
    console.log('Product Controller - addProduct()');
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
};


const updateProduct = async (req,res) => {
    console.log('Product Controller - updateProduct()');
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
};

const deleteProduct =  async (req,res) => {
    console.log('Product Controller - deleteProduct()');
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
};

module.exports = {
    getProduct,
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
}
