import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
    name:{
        type: String,
        require: [true, "The name the product is obligaroty"]
    },
    description:{
        type: String,
        require: [true, "The description is obligatory"]
    },
    stock:{
        type: Number,
        require: [true, "The stock is obligatory"]
    },
    price:{
        type: Number,
        require: [true, "The price is obligatory"]
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    status:{
        type: Boolean,
        default: true
    }

})

ProductSchema.methods.toJSON = function(){
    const{__v, _id, ...product} = this.toObject();
    product.uid = _id;
    return product 
}

export default mongoose.model('Product', ProductSchema)