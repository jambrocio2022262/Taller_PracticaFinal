import  {Router} from 'express'
import { check } from 'express-validator'

import{
    productDelete,
    productGet,
    productPost,
    productPut,
    controlInventario,
    productosAgotados,
    buscarProducto,
    catalogoProducto
} from './product.controller.js'

import {
    validarStock,
    existeProductos,
    existeProductoById
} from "../helpers/db-validators.js"

import {validarCampos} from '../middlewares/validar-campos.js'
import {validarJWT} from '../middlewares/validar-jwt.js'
import {isAdmin} from '../middlewares/verify-admin.js'
import {isClient} from '../middlewares/verify-admin.js'

const router = Router();

router.get("/", productGet);
router.get("/control", validarJWT,isAdmin, controlInventario);
router.get("/agotados",validarJWT,isAdmin, productosAgotados);
router.get("/search",validarJWT, isClient, buscarProducto);
router.get("/category/:category",validarJWT ,isClient, catalogoProducto);

router.post(
    "/",
    [
        validarJWT,
        isAdmin,
        check("name", "The name is obligatory").not().isEmpty(),
        check("name").custom(existeProductos),
        check("description", "The desciprion is obligatory").not().isEmpty(),
        check("price", "The price is obligatory").not().isEmpty(),
        check("stock", "The stock is obligatory").not().isEmpty(),
        check("stock").custom(validarStock),
        validarCampos,
    ], productPost)

router.put(
    "/:id",
    [
        validarJWT,
        isAdmin,
        check("id", "ID not valid").isMongoId(),
        check("id").custom(existeProductoById),
        validarCampos,
    ], productPut)

 router.delete(
    "/:id",
    [
        validarJWT,
        isAdmin,
        check("id", "ID not valid").isMongoId(),
        check("id").custom(existeProductoById),
        validarCampos,
    ], productDelete)   

export default router;