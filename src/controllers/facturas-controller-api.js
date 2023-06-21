//Requerimos la conexión a la base de datos
const { request } = require('express');
const { miConexion } = require('../database/db');

//Objeto para manejar el CRUD de facturas
const facturasAPI = {};

//Aqui vamos a eliminar una factura
facturasAPI.deleteFacturaById = async (req=request,res,next)=>{
    try{
        const { id } = req.params;
        const conexion = await miConexion();
        const resultado = await conexion.query('DELETE FROM facturas WHERE id_factura = ?',[id]);
        if(resultado[0].affectedRows>0){
            res.status(200).json({
                estado: 1,
                mensaje: "Factura eliminada"
            });
        }else{
            res.status(404).json({
                estado: 0,
                mensaje: "Factura no encontrada"
            });
        }
    }catch(error) {
        next(error);
    }
}
//Vamos a actualizar una factura
facturasAPI.updateFactura = async (req=request,res=request,next) =>{
    try {
        const { fecha,id_cliente} = req.body;
        const { id } = req.params;
        if(id==undefined || fecha==undefined || id_cliente == undefined){
            res.status(400).json({
                estado: 0,
                mensaje: "Solicitud incorrecta: Faltan parametros"
            });
        }else{
            const conexion = await miConexion();
            const resultado = await conexion.query('UPDATE facturas SET fecha = ?, id_cliente = ? WHERE id_factura = ?',[fecha,id_cliente,id]);
            if(resultado[0].affectedRows>0){
                res.status(200).json({
                    estado: 1,
                    mensaje: "Factura actualizada",
                    fecha: fecha,
                    id_cliente: id_cliente
                });
            }else{
                res.status(404).json({
                    estado: 0,
                    mensaje: "Factura no actualizada"
                });
            }
        }
    } catch (error) {
        next(error);
    }
}


//Vamos a agregar una factura
facturasAPI.agregarFactura = async(req=request,res=request,next) =>{
    try {
        const {fecha,id_cliente} = req.body;
        //Verificar que la solicitud se realice correctamente
        //Que nos mande los dos campos
        if( fecha == undefined || id_cliente == undefined){
            res.status(400).json({
                estado: 0,
                mensaje: "Solicitud incorrecta: Faltan parametros"
            })
        }else{
            const conexion = await miConexion();
            const resultado = await conexion.query('INSERT INTO facturas(fecha,id_cliente) values(?,?)',[fecha,id_cliente]);
            if(resultado[0].affectedRows>0){
                res.status(201).json({
                    estado: 1,
                    mensaje: "Factura creada",
                    categoria:{
                    id: resultado[0].insertId,
                    fecha: fecha,
                    id_cliente: id_cliente
                }
                });
            }
        }
    } catch (error) {
        next(error);
    }
}

//Aqui que nos regrese una factura por su ID
facturasAPI.getFacturaById = async(req=request,res,next) =>{
    try{
        //Recuperar el id de la factura
        const { id } = req.params;
        const conexion = await miConexion();
        const [rows] = await conexion.query('SELECT * FROM facturas WHERE id_factura = ?',[id]);
        if(rows.length > 0){
            res.status(200).json({
                estado:1,
                mensaje: "Factura encontrada",
                categoria: rows[0]
            });
        }else{
            res.status(404).json({
                estado: 0,
                mensaje: "Factura no encontrada",
                categoria: []
            });
        }
    }catch(error){
        next(error);
    }
}
//Aqui es para regresar Todas las Facturas
facturasAPI.getTodasFacturas = async (req,res, next)=>{
    try{
        const conexion = await miConexion();
        const [rows] = await conexion.query('SELECT * FROM facturas');
        if(rows.length==0){
            res.status(404).json({
                estado:0,
                mensaje: "Registros no encontrados",
                categorias: rows
            });
        }else{
            res.status(200).json({
                estado: 1,
                mensaje: "Registros encontrados",
                categorias: rows
            })
        }
    }catch(error){
        next(error);
    }
}

//Mas detalles del Cliente
facturasAPI.getClienteById = async(req=request,res,next) =>{
    try{
        //Recuperar el id de la categoría
        const { id } = req.params;
        const conexion = await miConexion();
        const [rows] = await conexion.query('SELECT * FROM clientes WHERE id_cliente = ?',[id]);
        if(rows.length > 0){
            res.status(200).json({
                estado:1,
                mensaje: "Cliente encontrado",
                categoria: rows[0]
            });
        }else{
            res.status(404).json({
                estado: 0,
                mensaje: "Cliente no encontrado",
                categoria: []
            });
        }
    }catch(error){
        next(error);
    }
}

//Exportar para poder usarlo en otro modulo
module.exports = facturasAPI;
