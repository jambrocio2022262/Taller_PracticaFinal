import { Router } from "express";
import { check } from "express-validator";

import{
    categoryPost,
    categoryGet,
    categoryPut,
    categoryDelete
} from './category.controller.js'

import{
    existeCategory,
    existeCaregoriaById
} from '../helpers/db-validators.js'

import { validarCampos } from "../middlewares/validar-campos.js";
import {validarJWT} from '../middlewares/validar-jwt.js'

const router = Router();

router.get("/", categoryGet);

router.post(
    "/",
    [
        validarJWT,
        check("name", "The name is obligatory").not().isEmpty(),
        check("name").custom(existeCategory),
        check("description", "The description is obligatory"),
        validarCampos,  
    ], categoryPost);


router.put(
    "/:id",
    [
        validarJWT,
        check("id", "The ID is not valid"),
        check("id").custom(existeCaregoriaById),
        validarCampos,
    ], categoryPut)

router.delete(
    "/:id",
    [
        validarJWT,
        check("id", "The Id is not valid").isMongoId(),
        check("id").custom(existeCaregoriaById),
        validarCampos
    ], categoryDelete)

export default router;