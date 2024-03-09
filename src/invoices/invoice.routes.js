import { Router } from "express";
import {validarJWT} from '../middlewares/validar-jwt.js'
import {isAdmin} from '../middlewares/verify-admin.js'

import{
    createInvoice,
    detallerInvoice,
    invoiceUser
} from './invoice.controller.js'

const router = Router();

router.post(
    "/",
        validarJWT, 
        isAdmin,
        createInvoice
    
);

router.get('/', validarJWT, invoiceUser);
router.get('/:invoiceId', validarJWT, detallerInvoice);

export default router;