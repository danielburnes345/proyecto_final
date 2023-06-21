const express = require('express');
const clientesControllerApi = require('../controllers/clientes-controller-api');
const router = express.Router();


//La Ruta (End Point) GET de todos los cliente 
router.get('/',clientesControllerApi.getTodasClientes);

//La Ruta (End Point) GET de solo un cliente 
router.get('/:id',clientesControllerApi.getClienteById);

//La Ruta (End point) AGREGAR = POST de un cliente
router.post('/',clientesControllerApi.agregarCliente);

//La Ruta (End point) UPDATE = PUT de un cliente
router.put('/:id',clientesControllerApi.updateCliente);

//La Ruta (End point) DELETE de un cliente
router.delete('/:id',clientesControllerApi.deleteClientesById);

//Para poder usar el router en otro archivo .js o modulo
module.exports = router;