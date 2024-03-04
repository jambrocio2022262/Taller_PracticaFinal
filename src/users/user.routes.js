import { Router } from "express";
import { check } from "express-validator";

import{
    usuarioPost
} from './user.controller.js';

import{
    existeEmail,
} from '../helpers/db-validators.js'

import {validarCampos} from '../middlewares/validar-campos.js'
/*import { tieneRole } from "../middlewares/validar-roles.js";
import { validarJWT } from "../middlewares/validar-jwt.js";*/

const router = Router();

router.post(
    "/",
    [
        check("name", "The name is obligatory").not().isEmpty(),
        check("email", "The email is obligatory").isEmail(),
        check("email").custom(existeEmail),
        check("password", "The password is most be 6 characters").isLength({min: 6}),
        check("role", "The role must be ADMIN_ROLE / CLIENT_ROLE").not().isEmpty(),
        validarCampos,
    ],usuarioPost)

export default router;