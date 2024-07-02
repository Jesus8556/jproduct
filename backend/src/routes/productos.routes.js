const express = require("express");
const router = express.Router();
const productoController = require ("../controllers/productos.controller");

router.post("/",productoController.createProductos);
router.get("/",productoController.getProductos);
router.get("/:productId",productoController.getProductosById);
router.put("/:productId",productoController.updateProducto);
router.delete("/:productId",productoController.deleteProducto);

module.exports = router;