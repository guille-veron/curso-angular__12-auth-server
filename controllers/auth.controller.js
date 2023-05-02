const { request, response } = require('express');
const Usuario = require('../models/Usuario.model');
const bcrypt = require('bcrypt');
const { generarJWT } = require('../helpers/jwt');


const crearUsuario =  async (req=request, res=response) =>{
        
    const {email,password, name} = req.body;
    try {
        const usuario = await Usuario.findOne({email})

        if (usuario) {
            return res.status(400).json({
                ok:false,
                msg:'el usuario ya existe'
            })
        }
        
        const dbUser = new Usuario(req.body);

        const salt = bcrypt.genSaltSync();       

        dbUser.password = bcrypt.hashSync(password, salt);

        await dbUser.save();

        const token = await generarJWT(dbUser.id, name, email);

        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name,
            email,
            token
        })
        
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error desconocido'
        });    
        
    }
}

const login =  async (req, res=response) =>{
    const {email,password} = req.body;
    try {
        const dbUser = await Usuario.findOne({email})

        if (!dbUser) {
            return res.status(400).json({
                ok:false,
                msg:'usuario/contraseña incorrectos'
            })
        }
        
        const validPwd = bcrypt.compareSync(password, dbUser.password);
        if(!validPwd){
            return res.status(400).json({
                ok:false,
                msg:'usuario/contraseña incorrectos'
            })
        }
        
        const token = await generarJWT(dbUser.id, dbUser.name, email);

        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            email,
            token            
        })
        
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error desconocido'
        });    
        
    }
}

const revalidarToken =  async (req, res=response) =>{

    const {uid, name, email} = req;
    try {
        const token = await generarJWT(uid, name, email);
        
        res.json({
            ok: true,
            msg: 'renew',
            uid,
            name,
            email,
            token
        });    
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error desconocido'
        });            
    }
}



module.exports = {
    crearUsuario,
    login,
    revalidarToken

}