import express from "express"

import Product from "../model/product.js";

 

const route = express.Router();

 

route.get('/products', async (req, res) => {

    try {

        const products = await Product.find();

        res.json(products);

    } catch (error) {

        res.status(500).send(error.message);

    }

});

 

// GET a product by id

route.get('/products/:id', async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (product) {

            res.json(product);

        } else {

            res.status(404).send('Product not found');

        }

    } catch (error) {

        res.status(500).send(error.message);

    }

});

 

route.post('/products', async (req, res) => {

    try {

        const newProduct = new Product(req.body);

        await newProduct.save();

        res.status(201).json(newProduct);

    } catch (error) {

        res.status(500).send(error.message);

    }

});

 

route.put('/products/:id', async (req, res) => {

    try {

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (updatedProduct) {

            res.json(updatedProduct);

        } else {

            res.status(404).send('Product not found');

        }

    } catch (error) {

        res.status(500).send(error.message);

    }

});

 

// DELETE a product by id

route.delete('/products/:id', async (req, res) => {

    try {

        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (deletedProduct) {

            res.json({ message: 'Product deleted' });

        } else {

            res.status(404).send('Product not found');

        }

    } catch (error) {

        res.status(500).send(error.message);

    }



});

 
route.delete('/products', async (req, res) => {
    try {
        const deletedProducts = await Product.deleteMany({});

        if (deletedProducts.deletedCount > 0) {
            res.json({ message: 'All products deleted' });
        } else {
            res.status(404).send('No products found to delete');
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
});

export default route;


