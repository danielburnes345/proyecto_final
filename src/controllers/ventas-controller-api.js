//Requerimos la conexión a la base de datos
const { request } = require('express');
const { miConexion } = require('../database/db');

//Objeto para manejar el CRUD de ventas
const ventasAPI = {};

//Aqui vamos a eliminar una venta
ventasAPI.deleteVentaById = async (req=request,res,next)=>{
    try{
        const { id } = req.params;
        const conexion = await miConexion();
        const resultado = await conexion.query('DELETE FROM ventas WHERE id_venta = ?',[id]);
        if(resultado[0].affectedRows>0){
            res.status(200).json({
                estado: 1,
                mensaje: "Venta eliminada"
            });
        }else{
            res.status(404).json({
                estado: 0,
                mensaje: "Venta no encontrada"
            });
        }
    }catch(error) {
        next(error);
    }
}
//Vamos a actualizar una venta
ventasAPI.updateVenta = async (req=request,res=request,next) =>{
    try {
        const { id_factura,id_producto,cantidad} = req.body;
        const { id } = req.params;
        if(id==undefined || id_factura==undefined || id_producto == undefined || cantidad == undefined){
            res.status(400).json({
                estado: 0,
                mensaje: "Solicitud incorrecta: Faltan parametros"
            });
        }else{
            const conexion = await miConexion();
            const resultado = await conexion.query('UPDATE ventas SET id_factura = ?, id_producto = ?, cantidad = ? WHERE id_categoria = ?',[id_factura,id_producto,cantidad,id]);
            if(resultado[0].affectedRows>0){
                res.status(200).json({
                    estado: 1,
                    mensaje: "Venta actualizada",
                    id_factura: id_factura,
                    id_producto: id_producto,
                    cantidad: cantidad
                });
            }else{
                res.status(404).json({
                    estado: 0,
                    mensaje: "Venta no actualizada"
                });
            }
        }
    } catch (error) {
        next(error);
    }
}


//Vamos a agregar una venta
ventasAPI.agregarVenta = async(req=request,res=request,next) =>{
    try {
        const { id_factura,id_producto,cantidad } = req.body;
        //Verificar que la solicitud se realice correctamente
        //Que nos mande los dos campos
        if( id_factura==undefined || id_producto == undefined || cantidad == undefined){
            res.status(400).json({
                estado: 0,
                mensaje: "Solicitud incorrecta: Faltan parametros"
            })
        }else{
            const conexion = await miConexion();
            const resultado = await conexion.query('INSERT INTO ventas(id_factura,id_producto,cantidad) values(?,?)',[id_factura,id_producto,cantidad]);
            if(resultado[0].affectedRows>0){
		console.log("Venta creada");
                res.status(201).json({
                    estado: 1,
                    mensaje: "Ventas creada",
                    categoria:{
                    id: resultado[0].insertId,
                    id_factura: id_factura,
                    id_producto: id_producto,
                    cantidad: cantidad
                }
                });
            }
        }
    } catch (error) {
        next(error);
    }
}

//Aqui que nos regrese una venta por su ID
ventasAPI.getVentaById = async(req=request,res,next) =>{
    try{
        //Recuperar el id de la venta
        const { id } = req.params;
        const conexion = await miConexion();
        const [rows] = await conexion.query('SELECT * FROM ventas WHERE id_venta = ?',[id]);
        if(rows.length > 0){
            res.status(200).json({
                estado:1,
                mensaje: "Venta encontrada",
                categoria: rows[0]
            });
        }else{
            res.status(404).json({
                estado: 0,
                mensaje: "Venta no encontrada",
                categoria: []
            });
        }
    }catch(error){
        next(error);
    }
}
//Aqui es para regresar Todas las ventas
ventasAPI.getTodasVentas = async (req,res, next)=>{
    try{
        const conexion = await miConexion();
        const [rows] = await conexion.query('SELECT * FROM ventas', function(error,data){
	res.render('ventas',{action:'list',sampleData:data});	

	});
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

//Exportar para poder usarlo en otro modulo
module.exports = ventasAPI;
