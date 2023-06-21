//Requerimos la conexión a la base de datos
const { request } = require('express');
const { miConexion } = require('../database/db');

//Objeto para manejar el CRUD de Productos
const productosAPI = {};

//Aqui vamos a eliminar un producto
productosAPI.deleteProductoById = async (req=request,res,next)=>{
    try{
        const { id } = req.params;
        const conexion = await miConexion();
        const resultado = await conexion.query('DELETE FROM productos WHERE id_producto = ?',[id]);
        if(resultado[0].affectedRows>0){
            res.status(200).json({
                estado: 1,
                mensaje: "Producto eliminado"
            });
        }else{
            res.status(404).json({
                estado: 0,
                mensaje: "Producto no encontrado"
            });
        }
    }catch(error) {
        next(error);
    }
}
//Vamos a actualizar un producto
productosAPI.updateProducto = async (req=request,res=request,next) =>{
    try {
        const { descripcion,precio,id_categoria,id_proveedor} = req.body;
        const { id } = req.params;
        if(id==undefined || descripcion==undefined || precio == undefined || id_categoria == undefined || id_proveedor == undefined){
            res.status(400).json({
                estado: 0,
                mensaje: "Solicitud incorrecta: Faltan parametros"
            });
        }else{
            const conexion = await miConexion();
            const resultado = await conexion.query('UPDATE productos SET descripcion = ?, precio = ? id_categoria = ?, id_proveedor = ? WHERE id_categoria = ?',[descripcion,precio,id_categoria,id_proveedor,id]);
            if(resultado[0].affectedRows>0){
                res.status(200).json({
                    estado: 1,
                    mensaje: "Producto actualizado",
                    descripcion: descripcion,
                    precio: precio,
                    id_categoria: id_categoria,
                    id_proveedor: id_proveedor
                });
            }else{
                res.status(404).json({
                    estado: 0,
                    mensaje: "Producto no actualizado"
                });
            }
        }
    } catch (error) {
        next(error);
    }
}


//Vamos a agregar un producto
productosAPI.agregarProducto = async(req=request,res=request,next) =>{
    try {
        const { descripcion,precio,id_categoria,id_proveedor} = req.body;
        //Verificar que la solicitud se realice correctamente
        //Que nos mande los dos campos
        if( descripcion == undefined || precio == undefined || id_categoria == undefined || id_proveedor == undefined){
            res.status(400).json({
                estado: 0,
                mensaje: "Solicitud incorrecta: Faltan parametros"
            })
        }else{
            const conexion = await miConexion();
            const resultado = await conexion.query('INSERT INTO productos(descripcion,precio,id_categoria,id_proveedor) values(?,?)',[descripcion,precio,id_categoria,id_proveedor]);
            if(resultado[0].affectedRows>0){
                res.status(201).json({
                    estado: 1,
                    mensaje: "Categoria creada",
                    categoria:{
                    id: resultado[0].insertId,
                    descripcion: descripcion,
                    precio: precio,
                    id_categoria: id_categoria,
                    id_proveedor: id_proveedor
                }
                });
            }
        }
    } catch (error) {
        next(error);
    }
}

//Aqui que nos regrese un producto por su ID
productosAPI.getProductoById = async(req=request,res,next) =>{
    try{
        //Recuperar el id del producto
        const { id } = req.params;
        const conexion = await miConexion();
        const [rows] = await conexion.query('SELECT * FROM productos WHERE id_producto = ?',[id]);
        if(rows.length > 0){
            res.status(200).json({
                estado:1,
                mensaje: "Producto encontrado",
                categoria: rows[0]
            });
        }else{
            res.status(404).json({
                estado: 0,
                mensaje: "Producto no encontrado",
                categoria: []
            });
        }
    }catch(error){
        next(error);
    }
}
//Aqui es para regresar Todos los productos
productosAPI.getTodasProductos = async (req,res, next)=>{
    try{
        const conexion = await miConexion();
        const [rows] = await conexion.query('SELECT * FROM productos');
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
module.exports = productosAPI;
