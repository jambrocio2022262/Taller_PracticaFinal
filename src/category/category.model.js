import mongoose from "mongoose";

const CategorySchema = mongoose.Schema({
    name:{
        type: String,
        require : [true, "The Category is obligatory"]
    },
    description:{
        type: String,
        require: [true, "The description is obligatory"]
    },
    products:{
        type: [mongoose.Schema.Types.ObjectId],
        require: true
    },
    status: {
        type: Boolean,
        default: true
    }
})

CategorySchema.methods.toJSON = function(){
    const {__v, _id, ...category} = this.toObject();
    category.uid = _id;
    return category;
}

export default mongoose.model('Category', CategorySchema)