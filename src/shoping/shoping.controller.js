import Shoping from './shoping.model.js';
import Product from '../product/product.model.js';
import { validationResult } from 'express-validator';

export const shopingPost = async (req, res) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(500).json({ errors: errors.array() });
    }

    const {nameProduct, quantity} = req.body;
    const user = req.usuario;
    console.log({user})

    try {
        const product = await Product.findOne({ name: nameProduct});

        if(!product){
            return res.status(400).json({msg: 'Product not found'});
        }

        if(product.stock < quantity){   
            return res.status(400).json({msg: 'Products out of stock'})
        }

        const price = product.price;
        const subTotal = quantity * price;

        const shopingExist = await Shoping.findOne({ user: user._id });

        if(shopingExist){
            const productExistIndex = shopingExist.products.findIndex(product => product.nameProduct == nameProduct);

            if(productExistIndex !== -1){
                shopingExist.products[productExistIndex].quantity += quantity;
                shopingExist.products[productExistIndex].subTotal += subTotal;
            }else{
                shopingExist.products.push({nameProduct, quantity, price, subTotal});
            }
            await shopingExist.save();
        }else{
            const newShoping = new Shoping({
                user: user._id,
                products: [{ nameProduct, quantity, price, subTotal}]
            });

            await newShoping.save();
        }

        product.stock -= quantity;
        await product.save();

        res.status(200).json({msg: 'Product added to cart'})
    } catch (error) {
        console.log('Error adding product', error);
        res.status(500).json({ msg: 'Error adding product'});
    }
}


export const shopingGet = async (req, res) =>{
    const user = req.usuario;
    console.log({user})

    try {
        console.log()
        const shoping = await Shoping.findOne({ user: user._id });
        console.log({shoping})

        if(!shoping){
            return res.status(400).json({msg: 'No se encuentra ningun Producto en el carrito'});
        }

        console.log('SHOPING WORKING')

        let priceTotal = 0;
        const productosEnCarrito = shoping.products.map(product =>{
            const subTotal = product.price * product.quantity;
            priceTotal += subTotal;

            return{
                user: user.name,
                product: product.nameProduct,
                quantity: product.quantity,
                price: product.price,
                subTotal: subTotal

            };
        });

        const shopingId = shoping._id;
        return res.status(200).json({shopingId, productosEnCarrito, priceTotal});
    } catch (error) {
        console.error('Error al obtener los productos en el carrito: ', error);
        res.status(500).json({error: 'Error al obtener los productos en el carrito'})
    }
}


export const shopingDelete = async (req, res) =>{
    const { nameProduct } = req.query;
    const user = req.user;

    try {
        const shopingExist = await Shoping.findOne({user});

        if(!shopingExist){
            return res.status(404).json({msg: 'Cart not found by user'})
        }

        const productIndex = shopingExist.products.findIndex(item => item.nameProduct == nameProduct);

        if(productIndex == -1){
            return res.status(404).json({msg: 'Cart not found by user'})
        }

        const quantity = shopingExist.products[productIndex].quantity;

        shopingExist.products.splice(productIndex, 1);

        await shopingExist.save();

        await Product.findOneAndUpdate(
            {name: nameProduct},
            { $inc: {stock: quantity}}
        );

        return res.status(200).json({msg: 'Delete de product de Shoping'})
    } catch (error) {
        console.error('Error deleting product from cart', error)
        res.status(500).json({msg: 'Error deleting product from cart'})
    }
}