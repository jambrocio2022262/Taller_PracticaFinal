import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import User from '../users/user.model.js';

export const usuarioPost = async (req, res) => {
    const {name, email, password, role} = req.body;
    const usuario = new User({name, email, password, role});

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.status(200).json({
        usuario
    })
}