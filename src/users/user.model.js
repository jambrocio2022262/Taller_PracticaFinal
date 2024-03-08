import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "The Name is Obligatory"]
    },
    email: {
        type: String,
        require: [true, "The Email is Obligatory"],
        unique: true
    },
    password: {
        type: String,
        require: [true, "The Password is Obligatory"]
    },
    role: {
        type: String,
        require: true,
        enum: ["ADMIN_ROLE", "CLIENT_ROLE"]
    },
    status: {
        type: Boolean,
        default: true
    }
})


UserSchema.methods.toJSON = function(){
    const {__v, password, _id, ...user} = this.toObject();
    user.uid = _id;
    return user;
}

export default mongoose.model('User', UserSchema)