const express = require('express')
const productosControllerApi = require('../controllers/productos-controller-api')
const router = express.Router();

//La Ruta (End Point) GET de todas los productos 
router.get('/',productosControllerApi.getTodasProductos);

//La Ruta (End Point) GET de solo un producto 
router.get('/:id',productosControllerApi.getProductoById);

//La Ruta (End point) AGREGAR = POST de un producto
router.post('/',productosControllerApi.agregarProducto);

//La Ruta (End point) UPDATE = PUT de un producto
router.put('/:id',productosControllerApi.updateProducto);

//La Ruta (End point) DELETE de un producto
router.delete('/:id',productosControllerApi.deleteProductoById);

//Para poder usar el router en otro archivo .js o modulo
module.exports = router;