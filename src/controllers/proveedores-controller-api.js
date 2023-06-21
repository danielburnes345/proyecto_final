//Requerimos la conexión a la base de datos
const { request } = require('express');
const { miConexion } = require('../database/db');

//Objeto para manejar el CRUD de proveedores
const proveedorAPI = {};

//Aqui vamos a eliminar un proveedores
proveedorAPI.deleteProveedoresById = async (req=request,res,next)=>{
    try{
        const { id } = req.params;
        const conexion = await miConexion();
        const resultado = await conexion.query('DELETE FROM proveedores WHERE id_proveedor = ?',[id]);
        if(resultado[0].affectedRows>0){
            res.status(200).json({
                estado: 1,
                mensaje: "Proveedor eliminado"
            });
        }else{
            res.status(404).json({
                estado: 0,
                mensaje: "Proveedor no encontrado"
            });
        }
    }catch(error) {
        next(error);
    }
}
//Vamos a actualizar un proveedor
proveedorAPI.updateProveedor = async (req=request,res=request,next) =>{
    try {
        const { nombre,direccion,telefono} = req.body;
        const { id } = req.params;
        if(id==undefined || nombre==undefined || direccion == undefined || telefono == undefined){
            res.status(400).json({
                estado: 0,
                mensaje: "Solicitud incorrecta: Faltan parametros"
            });
        }else{
            const conexion = await miConexion();
            const resultado = await conexion.query('UPDATE proveedores SET nombre = ?, direccion = ?, telefono = ? WHERE id_proveedor = ?',[nombre,direccion,telefono,id]);
            if(resultado[0].affectedRows>0){
                res.status(200).json({
                    estado: 1,
                    mensaje: "Proveedor actualizado",
                    nombre: nombre,
                    direccion: direccion,
                    telefono: telefono
                });
            }else{
                res.status(404).json({
                    estado: 0,
                    mensaje: "Proveedor no actualizado"
                });
            }
        }
    } catch (error) {
        next(error);
    }
}


//Vamos a agregar un proveedor
proveedorAPI.agregarProveedor = async(req=request,res=request,next) =>{
    try {
        const { nombre,direccion,telefono } = req.body;
        //Verificar que la solicitud se realice correctamente
        //Que nos mande los dos campos
        if( nombre==undefined || direccion == undefined || telefono == undefined){
            res.status(400).json({
                estado: 0,
                mensaje: "Solicitud incorrecta: Faltan parametros"
            })
        }else{
            const conexion = await miConexion();
            const resultado = await conexion.query('INSERT INTO proveedores(nombre,direccion,telefono) values(?,?)',[nombre,direccion,telefono]);
            if(resultado[0].affectedRows>0){
                res.status(201).json({
                    estado: 1,
                    mensaje: "proveedor creado",
                    categoria:{
                    id: resultado[0].insertId,
                    nombre: nombre,
                    direccion: direccion,
                    telefono: telefono
                }
                });
            }
        }
    } catch (error) {
        next(error);
    }
}

//Aqui que nos regrese un proveedor por su ID
proveedorAPI.getProveedorById = async(req=request,res,next) =>{
    try{
        //Recuperar el id del proveedor
        const { id } = req.params;
        const conexion = await miConexion();
        const [rows] = await conexion.query('SELECT * FROM proveedores WHERE id_proveedor = ?',[id]);
        if(rows.length > 0){
            res.status(200).json({
                estado:1,
                mensaje: "Proveedor encontrado",
                categoria: rows[0]
            });
        }else{
            res.status(404).json({
                estado: 0,
                mensaje: "Proveedor no encontrado",
                categoria: []
            });
        }
    }catch(error){
        next(error);
    }
}
//Aqui es para regresar Todos los Proveedores
proveedorAPI.getTodasProveedores = async (req,res, next)=>{
    try{
        const conexion = await miConexion();
        const [rows] = await conexion.query('SELECT * FROM proveedores');
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
module.exports = proveedorAPI;
