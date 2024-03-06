import  {Router} from 'express'
import { check } from 'express-validator'

import{
    productGet,
    productPost
} from './product.controller.js'

import {
    validarStock,
    existeProductos,
    existeProductoById
} from "../helpers/db-validators.js"

import {validarCampos} from '../middlewares/validar-campos.js'
import {validarJWT} from '../middlewares/validar-jwt.js'

const router = Router();

router.get("/", productGet);

router.post(
    "/",
    [
        validarJWT,
        check("name", "The name is obligatory").not().isEmpty(),
        check("name").custom(existeProductos),
        check("description", "The desciprion is obligatory").not().isEmpty(),
        check("price", "The price is obligatory").not().isEmpty(),
        check("stock", "The stock is obligatory").not().isEmpty(),
        check("stock").custom(validarStock),
        validarCampos,
    ], productPost)

export default router;