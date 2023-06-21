//alert('Hola mundo del Front de los productos');
function getURL(){
  let URL = window.location.protocol + '//'+window.location.hostname;
  if(window.location.port){
    URL += ':'+window.location.port;
  }
  return URL;
}

let idEliminarProducto=0;
let idActualizarProducto=0;



function AgregarProducto(){
  const descripcion = document.getElementById('descripcionProductoAgregar').value;
  const precio = document.getElementById('precioProductoAgregar').value;
  const URL = getURL() + "/productos/api";
$.ajax({
  method:'POST', //Metodo
  url: URL, //End Point 
  data: { //Body
    descripcion: descripcion, 
    precio: precio

  },
  success: function( result ) {
    if(result.estado==1){
     
      
      const productos = result.productos;
      let tabla = $('#tabla-productos').DataTable();
      let botones = Generabotones(productos);
      let nuevoRenglon = tabla.row.add([productos.descripcion, precio.observaciones, botones]).node();
      // Linea agregada para el ID del renglo
      $(nuevoRenglon).attr('id', 'renglo_'+productos.id);
      //----------------------------------------------------------
      $(nuevoRenglon).find('td').addClass('table-td');
      tabla.draw(false);
      //Limpiamos los campos
      document.getElementById('descripcionProductoAgregar').value='';
      document.getElementById('observacionesProductoAgregar').value='';
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Producto guardado correctamente',
        showConfirmButton: false,
        timer: 1500
      })
    }else{
      alert(result.mensaje);
    }
  }
});
}