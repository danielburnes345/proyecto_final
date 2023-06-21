const express = require('express')
const ventasControllerApi = require('../controllers/ventas-controller-api')
const router = express.Router();

//La Ruta (End Point) GET de todas las ventas 
router.get('/',ventasControllerApi.getTodasVentas);

//La Ruta (End Point) GET de solo una ventas 
router.get('/:id',ventasControllerApi.getVentaById);

//La Ruta (End point) AGREGAR = POST de una ventas
router.post('/',ventasControllerApi.agregarVenta);

//La Ruta (End point) UPDATE = PUT de una ventas
router.put('/:id',ventasControllerApi.updateVenta);

//La Ruta (End point) DELETE de una ventas
router.delete('/:id',ventasControllerApi.deleteVentaById);

//Para poder usar el router en otro archivo .js o modulo
module.exports = router;