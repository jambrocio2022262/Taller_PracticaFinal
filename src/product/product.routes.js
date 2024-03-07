import  {Router} from 'express'
import { check } from 'express-validator'

import{
    productDelete,
    productGet,
    productPost,
    productPut,
    controlInventario
} from './product.controller.js'

import {
    /*validarStock,*/
    existeProductos,
    existeProductoById
} from "../helpers/db-validators.js"

import {validarCampos} from '../middlewares/validar-campos.js'
import {validarJWT} from '../middlewares/validar-jwt.js'

const router = Router();

router.get("/", productGet);
router.get("/control", controlInventario);

router.post(
    "/",
    [
        validarJWT,
        check("name", "The name is obligatory").not().isEmpty(),
        check("name").custom(existeProductos),
        check("description", "The desciprion is obligatory").not().isEmpty(),
        check("price", "The price is obligatory").not().isEmpty(),
        check("stock", "The stock is obligatory").not().isEmpty(),
        /*check("stock").custom(validarStock),*/
        validarCampos,
    ], productPost)

router.put(
    "/:id",
    [
        validarJWT,
        check("id", "ID not valid").isMongoId(),
        check("id").custom(existeProductoById),
        validarCampos,
    ], productPut)

 router.delete(
    "/:id",
    [
        validarJWT,
        check("id", "ID not valid").isMongoId(),
        check("id").custom(existeProductoById),
        validarCampos,
    ], productDelete)   

export default router;