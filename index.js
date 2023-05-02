const express = require('express');
const cors = require('cors');
const routes = require('./routes/auth');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const path = require('path');

//crea server/app

const app = express();

//DB conn
dbConnection();

//cors
app.use(cors());

//lectura y parseo del body
app.use(express.json());

//directorio publico
app.use(express.static('public'));




//rutas
app.use('/api/auth', routes)

// rutas de angular

app.use('*', (req, res) =>{
    res.sendFile(path.resolve(__dirname,'public/index.html'));
})



//inicia

app.listen(process.env.PORT, () => {
    console.log(`Server corriendo en el puerto ${process.env.PORT}`);
})