import mongoose  from "mongoose";

const shopingSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true
    },
    products:[{
        nameProduct: {
            type: String,
            require: true
        },
        quantity: {
            type: Number,
            require: true
        },
        price: {
            type: Number
        }, 
        subTotal: {
            type: Number
        }
    }]
});

export default mongoose.model('Shoping', shopingSchema);