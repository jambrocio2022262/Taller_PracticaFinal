import { response, request} from "express";
import Category from  '../category/category.model.js';
import Product from '../product/product.model.js';


export const categoryGet = async(req= request, res= response) =>{
    const{limite, desde} = req.query;
    const query = {status: true};

    const[total, categorys] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        categorys
    })
}

export const categoryPost = async(req, res) =>{
    const { name, description} = req.body;
    const category = new Category({name, description});

    await category.save();

    res.status(200).json({
        category
    })
}

export const categoryPut = async (req, res = response) =>{
    const {id} = req.params;
    const {id__, ...resto} = req.body;

    await Category.findByIdAndUpdate(id, resto);

    const category = await Category.findOne({_id: id});

    res.status(200).json({
        msg: 'Update Category',
        category 
    })
}

export const categoryDelete = async (req, res) =>{
    const{id} = req.params;
    
    try {
        const category = await Category.findById(id);
        if(!category){
            return res.status(404).json({msg: 'Category not found'})
        }

        const defaultCategory = await Category.findOne({name: 'Productos'});
        if(!defaultCategory){
            return res.status(404).json({msg: 'Not found category default'})
        }

        await Product.updateMany({category: id}, {$set: {category: defaultCategory._id}});

        const categoryUpdate = await Category.findByIdAndUpdate(id,{status: false},{new : true});

        res.status(200).json({msg: 'Category eliminated', category: categoryUpdate});
    } catch (error) {
        res.status(500).json({error: error.message})
        
    }
}