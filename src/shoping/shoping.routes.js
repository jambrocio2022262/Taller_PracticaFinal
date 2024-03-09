import { Router } from 'express';
import { check } from 'express-validator';

import{
    shopingPost,
    shopingGet,
    shopingDelete
} from './shoping.controller.js';

import { validarJWT } from "../middlewares/validar-jwt.js";
import {isClient} from '../middlewares/verify-admin.js'

const router = Router();

router.get("/", validarJWT, isClient, shopingGet);
router.delete("/", validarJWT,isClient, shopingDelete);

router.post(
    "/",
    [
        validarJWT,
        isClient,
        check("nameProduct", "The name the product is obligatory").not().isEmpty(),
        check("quantity", "The quently is obligatory").not().isEmpty()
    ], shopingPost)

export default router;