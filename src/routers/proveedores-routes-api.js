const express = require('express');
const proveedoresControllerApi = require('../controllers/proveedores-controller-api');
const router = express.Router();


//La Ruta (End Point) GET de todos los proveedores 
router.get('/',proveedoresControllerApi.getTodasProveedores);

//La Ruta (End Point) GET de solo un proveedores 
router.get('/:id',proveedoresControllerApi.getProveedorById);

//La Ruta (End point) AGREGAR = POST de un proveedores
router.post('/',proveedoresControllerApi.agregarProveedor);

//La Ruta (End point) UPDATE = PUT de un proveedores
router.put('/:id',proveedoresControllerApi.updateProveedor);

//La Ruta (End point) DELETE de un proveedores
router.delete('/:id',proveedoresControllerApi.deleteProveedoresById);

//Para poder usar el router en otro archivo .js o modulo
module.exports = router;