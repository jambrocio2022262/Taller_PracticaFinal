'use strict'

import Product from '../product/product.model.js'
import Category from '../category/category.model.js'

export const productPost = async (req, res) =>{
    const data = req.body;

    try{
        const category = await Category.findOne({name: data.category});

        if(!category){
            return res.status(404).json({msg: "Category not found"})
        }

        const product = new Product({
            ...data,
            category:category._id
        });

        await product.save();

        category.products.push(product._id)
        await category.save();

        res.status(200).json({
            msg: "New product added",
            product
        })
    }catch(error){
        console.error('Error, cannot add product', error);
        res.status(500).json({error: 'Error, cannot add product'})
    }
    
}

export const productGet = async(req, res) =>{
    const {limite, desde} = req.query;

    try{
        const [total, products] = await Promise.all([
            Product.countDocuments({status: true}),
            Product.find({status: true})
            .populate('category', 'name')
            .skip(Number(desde))
            .limit(Number(limite))
        ])

        res.status(200).json({
            total,
            products
        })
    }catch(error){
        console.error(error);
        res.status(500).json({ error: "There was an error in bringing products"})
    }

}