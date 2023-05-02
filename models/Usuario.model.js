const { Schema, model } = require("mongoose");

const usuarioSchema = Schema ({
    name : {
        type: String,
        require: [true, 'El nombre es obligatorio']
    },   
    email : {
        type: String,
        unique: true,
        require: [true, 'El correo es obligatorio']
    },
    password: {
        type: String,
        require: [true, 'La contraseña es obligatoria']

    }

})   

module.exports = model('Usuario',usuarioSchema);