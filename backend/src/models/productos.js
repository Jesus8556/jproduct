const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true
        },
        descripcion: {
            type: String,
            required: true
        },
        marca: {
            type: String,
            required: true
        },
        precio: {
            type: Number,
            required: true
        },
        imagen: {
            public_id: String,
            secure_url: String
        }
    }
);
const Producto = mongoose.model("Productos",productSchema);

module.exports = {
    Producto
}