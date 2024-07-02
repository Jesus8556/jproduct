const { Producto } = require("../models/productos");
const { uploadImage, deleteImage } = require("../utils/cloudinary");
const fs = require("fs-extra");

const createProductos = async (req, res) => {
    try {
        const { nombre, descripcion, marca, precio } = req.body;
        const producto = new Producto({
            nombre,
            descripcion,
            marca,
            precio
        });
        if (req.files?.imagen) {
            const result = await uploadImage(req.files.imagen.tempFilePath);
            producto.imagen = {
                public_id: result.public_id,
                secure_url: result.secure_url
            }
            await fs.unlink(req.files.imagen.tempFilePath);
        } else {
            console.log("No hay imagen");
        }
        const productoSave = await producto.save()
        res.status(200).json(productoSave);


    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });

    }
}
const getProductos = async (req, res) => {
    try {
        const producto = await Producto.find();
        res.json(producto);
    } catch (error) {
        console.error('Error al obtener garages:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const getProductosById = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.productId)
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(200).json(producto);

    } catch (error) {
        console.error('Error al obtener producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });

    }
}

const updateProducto = async (req, res) => {
    try {
        const productId = req.params.productId;
        const producto = req.body;
        if (req.files?.imagen) {
            const busqueda = await Producto.findById(productId);
            console.log(busqueda.imagen);

            if (busqueda.imagen?.public_id) {
                await deleteImage(busqueda.imagen.public_id);
            }
            const result = await uploadImage(req.files.imagen.tempFilePath);
            producto.imagen = {
                public_id: result.public_id,
                secure_url: result.secure_url
            }
            await fs.unlink(req.files.imagen.tempFilePath);
        }
        const updateProducto = await Producto.findByIdAndUpdate(req.params.productId, producto, {
            new: true
        });
        res.status(201).json(updateProducto);

    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });


    }
}
const deleteProducto = async(req,res) =>{
    try {
        const {productId} = req.params
        const producto = await Producto.findByIdAndDelete(productId);
        if(!producto){
            return res.status(404).json({error:"Producto no encontrado"});
        }
        if(producto.imagen?.public_id){
            await deleteImage(producto.imagen.public_id);
        }
        res.status(200).json({ message: "Eliminado correctamente" })

        
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
        
    }
}
module.exports = {
    createProductos,
    getProductos,
    getProductosById,
    updateProducto,
    deleteProducto
}