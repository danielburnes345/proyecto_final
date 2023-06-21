const express = require('express')
const facturasControllerApi = require('../controllers/facturas-controller-api')
const router = express.Router();

//La Ruta (End Point) GET de todas las facturas 
router.get('/',facturasControllerApi.getTodasFacturas);

//La Ruta (End Point) GET de solo una facturas 
router.get('/:id',facturasControllerApi.getFacturaById);

//La Ruta (End point) AGREGAR = POST de una facturas
router.post('/',facturasControllerApi.agregarFactura);

//La Ruta (End point) UPDATE = PUT de una facturas
router.put('/:id',facturasControllerApi.updateFactura);

//La Ruta (End point) DELETE de una facturas
router.delete('/:id',facturasControllerApi.deleteFacturaById);

//La Ruta (End point) Get de un solo cliente 
router.get('/:id',facturasControllerApi.getClienteById);

//Para poder usar el router en otro archivo .js o modulo
module.exports = router;