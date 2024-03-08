import { Router } from 'express';
import { check } from 'express-validator';

import{
    shopingPost,
    shopingGet,
    shopingDelete
} from './shoping.controller.js';

import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.get("/", validarJWT, shopingGet);
router.delete("/", validarJWT, shopingDelete);

router.post(
    "/",
    [
        validarJWT,
        check("nameProduct", "The name the product is obligatory").not().isEmpty(),
        check("quantity", "The quently is obligatory").not().isEmpty()
    ], shopingPost)

export default router;