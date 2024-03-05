import User from '../users/user.model.js'
import Category from '../category/category.model.js'

export const existeEmail = async (email = '') => {
    const existeEmail = await User.findOne({email});
    if (existeEmail){
        throw new Error(`The Email ${email} has already been registered`);
    }
}

export const existeUsuarioById = async (id = '') => {
    const existeUsuario = await User.findById(id);
    if (!existeUsuario){
        throw new Error(`The id: ${correo} does not exist`);
    }
}


export const existeCategory = async (name = '') => {
    const existeCategorys = await Category.findOne({name});
    if (existeCategorys){
        throw new Error(`The name ${name} has already been registered`);
    }
}

export const existeCaregoriaById = async (name = '') => {
    const existeCategoria = await User.findOne({name});
    if (existeCategoria){
        throw new Error(`The name ${name} does not exist`);
    }
}