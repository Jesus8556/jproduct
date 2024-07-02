const mongoose = require("mongoose");
require("dotenv").config();

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() =>{
        console.log("Conectado a la base de datos");
    })
    .catch((error) => console.log(`Error al conectar: ${error}`))