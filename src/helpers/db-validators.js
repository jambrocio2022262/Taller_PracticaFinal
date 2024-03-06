import User from '../users/user.model.js'
import Category from '../category/category.model.js'
import Product from '../product/product.model.js'

export const existeEmail = async (email = '') => {
    const existeEmail = await User.findOne({email});
    if (existeEmail){
        throw new Error(`The Email ${email} has already been registered`);
    }
}

export const existeUsuarioById = async (id = '') => {
    const existeUsuario = await User.findById(id);
    if (!existeUsuario){
        throw new Error(`The id: ${email} does not exist`);
    }
}


export const existeCategory = async (name = '') => {
    const existeCategorys = await Category.findOne({name});
    if (existeCategorys){
        throw new Error(`The name ${name} has already been registered`);
    }
}

export const existeCaregoriaById = async (name = '') => {
    const existeCategoria = await Category.findOne({name});
    if (existeCategoria){
        throw new Error(`The name ${name} does not exist`);
    }
}

export const validarStock= async (stock = "") => {
    if(stock < 0){
        throw new Error('Stock cannot be less than 0');
    }

    if(stock == 0){
        throw new Error('Stock be equal to 0');
    }
}


export const existeProductos = async (name = '') => {
    const existeProducto = await Product.findOne({name});
    if (existeProducto){
        throw new Error(`The name ${name} has already been registered`);
    }
}

export const existeProductoById = async (id = '') => {
    const existeProducto = await Product.findById(id);
    if (!existeProducto){
        throw new Error(`The id: ${id} does not exist`);
    }
}