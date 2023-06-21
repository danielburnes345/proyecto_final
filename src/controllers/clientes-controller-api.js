//Requerimos la conexión a la base de datos
const { request } = require('express');
const { miConexion } = require('../database/db');

//Objeto para manejar el CRUD de clientes
const clientesAPI = {};

//Aqui vamos a eliminar un cliente
clientesAPI.deleteClientesById = async (req=request,res,next)=>{
    try{
        const { id } = req.params;
        const conexion = await miConexion();
        const resultado = await conexion.query('DELETE FROM clientes WHERE id_cliente = ?',[id]);
        if(resultado[0].affectedRows>0){
            res.status(200).json({
                estado: 1,
                mensaje: "Cliente eliminado"
            });
        }else{
            res.status(404).json({
                estado: 0,
                mensaje: "Cliente no encontrado"
            });
        }
    }catch(error) {
        next(error);
    }
}
//Vamos a actualizar un cliente
clientesAPI.updateCliente = async (req=request,res=request,next) =>{
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
            const resultado = await conexion.query('UPDATE clientes SET nombre = ?, direccion = ?, telefono = ? WHERE id_cliente = ?',[nombre,direccion,telefono,id]);
            if(resultado[0].affectedRows>0){
                res.status(200).json({
                    estado: 1,
                    mensaje: "Cliente actualizado",
                    nombre: nombre,
                    direccion: direccion,
                    telefono: telefono
                });
            }else{
                res.status(404).json({
                    estado: 0,
                    mensaje: "Cliente no actualizado"
                });
            }
        }
    } catch (error) {
        next(error);
    }
}


//Vamos a agregar un cliente
clientesAPI.agregarCliente = async(req=request,res=request,next) =>{
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
            const resultado = await conexion.query('INSERT INTO clientes(nombre,direccion,telefono) values(?,?)',[nombre,direccion,telefono]);
            if(resultado[0].affectedRows>0){
                res.status(201).json({
                    estado: 1,
                    mensaje: "Cliente creado",
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

//Aqui que nos regrese un cliente por su ID
clientesAPI.getClienteById = async(req=request,res,next) =>{
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
//Aqui es para regresar Todos los clientes
clientesAPI.getTodasClientes = async (req,res, next)=>{
    try{
        const conexion = await miConexion();
        const [rows] = await conexion.query('SELECT * FROM clientes');
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
module.exports = clientesAPI;
