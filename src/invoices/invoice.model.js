import mongoose from "mongoose";

const invoiceSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    shoping: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shoping',
        require: true
    },
    fecha:{
        type: Date,
        default: Date.now
    }
})