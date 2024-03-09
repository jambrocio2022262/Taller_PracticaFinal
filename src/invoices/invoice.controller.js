import Invoice from './invoice.model.js';
import Shoping from '../shoping/shoping.model.js'
import { validationResult } from 'express-validator';

export const createInvoice = async (req, res) =>{
    const user = req.usuario;
    const idShoping = req.shoping;

    try {
        const shoping = await Shoping.findOne({idShoping});

        if(!shoping){
            return res.status(404).json({msg: 'No shopping cart was found for this user'})
        }

        const priceTotal = shoping.products.reduce((total, product) => total +  product.subTotal, 0);

        const newInvoice = new Invoice({
            user,
            shoping: shoping._id,
            priceTotal
        });

        await newInvoice.save()
        return res.status(201).json({msg: 'Invoice found'})
    } catch (error) {
        console.error('Error when creating the invoice', error);
        res.status(500).json({error: 'Error when creating the invoice'})
    }
}

export const invoiceUser = async (req, res) =>{
    const idShoping = req.shoping;

    try {
        const invoices = await Invoice.find({idShoping}).populate('shoping');

        return res.status(200).json({ invoices})
    } catch (error) {
        console.error('error when obtaining user is invoice', error)
        res.status(500).json({msg: 'error when obtaining user is invoice'})
    }
}


export const detallerInvoice = async (req, res) =>{
    const {invoiceId} = req.params;

    try {
        const invoice = await Invoice.findById(invoiceId).populate({
            path: 'shoping',
            populate: {path: 'products'}
        });

        if(!invoice){
            return res.status(404).json({msg: "Invoice not found"})
        }

        return res.status(200).json({ invoice })
    } catch (error) {
        console.error('Error in invoice details', error);
        res.status(500).json({msg: 'Error in invoice details'});
    }
}