'use strict'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { dbConnection } from './mongo.js';
import User from '../src/users/user.model.js'
import bcryptjs from 'bcryptjs'
import userRoutes from '../src/users/user.routes.js'
import authRoutes from '../src/auth/auth.routes.js'
import categoryRoutes from '../src/category/category.routes.js'
import productRoutes from '../src/product/product.routes.js'
import shopingRoutes from '../src/shoping/shoping.routes.js'
import invoiceRouter from '../src/invoices/invoice.routes.js'

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuarioPath = '/FinalProject/v1/users'
        this.authPath = '/FinalProject/v1/auth'
        this.categoryPath ='/FinalProject/v1/category'
        this.productPath ='/FinalProject/v1/product'
        this.shopingPath ='/FinalProject/v1/shoping'
        this.invoicePath ='/FinalProject/v1/invoice' 


        this.middlewares();
        this.conectarDB();
        this.routes();
    }


    async conectarDB(){
        await dbConnection();
        const lengthUsers = await User.countDocuments();
        if(lengthUsers > 0) return;

        const salt = bcryptjs.genSaltSync();
        const password = bcryptjs.hashSync('123456', salt);

        const adminUser = new User(
            {name: "Josue Ambrocio", email: "admin@gmail.com", password, role: "ADMIN_ROLE"}
        )

        adminUser.save();
    }
    
    middlewares(){
            this.app.use(express.urlencoded({extended: false}));
            this.app.use(cors());
            this.app.use(express.json());
            this.app.use(helmet());
            this.app.use(morgan('dev'));
    }

    routes(){
        this.app.use(this.usuarioPath, userRoutes);
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.categoryPath, categoryRoutes);
        this.app.use(this.productPath, productRoutes);
        this.app.use(this.shopingPath, shopingRoutes);
        this.app.use(this.invoicePath, invoiceRouter);
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Server running on port', this.port);
        });
    }
}

export default Server;