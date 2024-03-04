import User from '../users/user.model.js'

export const existeEmail = async (email = '') => {
    const existeEmail = await User.findOne({email});
    if (existeEmail){
        throw new Error(`The Email ${email} has already been registered`);
    }
}