const express = require("express");
const hbs = require('hbs');
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT||3000;

//Rutsa personalizadas
const rutasCategoriasAPI = require('./src/routers/categorias-routes-api');
const rutasClientesAPI = require('./src/routers/clientes-routes-api');
const rutasUsuariosAPI = require('./src/routers/usuarios-routes-api');
const rutasAuthAPI = require('./src/routers/auth-routes-api');
const rutasFacturasAPI = require('./src/routers/facturas-routes-api');
const rutasProductosAPI = require('./src/routers/productos-routes-api');
const rutasProveedoresAPI = require('./src/routers/proveedores-routes-api');
const rutasVentasAPI = require('./src/routers/ventas-routes-api');

const app= express();

app.set('view engine','hbs');
hbs.registerPartials(__dirname+'/views/partials',()=>{});

//Vistas
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

//Definir rutas
app.get('/',(req,res)=>{
    res.render('index');
});

app.get('/login',(req,res)=>{
    res.render('login');
});

app.get('/clientes',(req,res)=>{
    res.render("clientes");
});

app.get('/facturas',(req,res)=>{
    res.render("facturas");
});

app.get('/productos',(req,res)=>{
    res.render("productos");
});

app.get('/categorias',(req,res)=>{
    res.render("categorias");
});

app.get('/ventas',(req,res)=>{
    res.render("ventas");
});

app.get('/proveedores',(req,res)=>{
    res.render("proveedores");
});

app.get('/registro',(req,res)=>{
    res.render("registro");
});

app.get('*',(req,res)=>{
    res.render('404');
});
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//Me regresa en formato JSON los datos de categoria
app.use('/categorias/api',rutasCategoriasAPI);
app.use('/usuarios/api', rutasUsuariosAPI);
app.use('/auth/api',rutasAuthAPI);
//app.use('/productos/api',rutasProductosAPI);
app.use('/clientes/api',rutasClientesAPI);
app.use('/facturas/api',rutasFacturasAPI);
app.use('/productos/api',rutasProductosAPI);
app.use('/proveedores/api',rutasProveedoresAPI);
app.use('/ventas/api',rutasVentasAPI);


//Definir puerto
app.listen(port,()=>{
    console.log("El servidor corriendo en el puerto: ", port);
});