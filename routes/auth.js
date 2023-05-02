const {Router} = require('express');
const { check } = require('express-validator');
const { crearUsuario, login, revalidarToken } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//new User
router.post('/new', [
    check('email','El email es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').isLength({min:6}),
    check('name', 'El nombre es obligatorio').notEmpty(),
    validarCampos,
], crearUsuario);

//login
router.post('/',[
    check('email','El email es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').isLength({min:6}),
    validarCampos,
], login);

//validar y revalidar

router.get('/renew', validarJWT,revalidarToken);



module.exports = router;