import { Router } from "express";
import { check } from "express-validator";

import{
    usuarioPost,
    usuarioGet,
    usuarioDelete,
    usuarioPut
} from './user.controller.js';

import{
    existeEmail,
    existeUsuarioById
} from '../helpers/db-validators.js'

import {validarCampos} from '../middlewares/validar-campos.js'
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.get("/",usuarioGet);

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

router.put(
    "/:id",
    [
        check("id","The ID is not valid"),
        check("id").custom(existeUsuarioById),
        validarCampos
    ], usuarioPut)

router.delete(
        "/:id",
    [   
        validarJWT,
        check("id", "The ID is not valid").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos,
    ],usuarioDelete);


export default router;