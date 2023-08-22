//Busqueda informacion

//Con este JQUERY se hace una consulta de proveedores por nombre, para seleccionar un proveedor a la hora de registrar una nueva factura
$(document).ready(function () {
  $("#nombreProveedor").autocomplete({
    source: function (request, response) {
      let longitudPalabra =
        document.getElementById("nombreProveedor").value.length;
      //Se hace una petición a Node.js para obtener datos
      if (longitudPalabra >= 2) {
        $.ajax({
          url: "/todosLosProveedores",
          dataType: "json",
          data: {
            valor: request.term,
          },
          success: function (data) {
            response(data);
          },
        });
      }
    },
    select: function (event, ui) {
      //Agregar la opción seleccionada al control select
      document.getElementById("lista").innerHTML = "";
      $("lista").append(
        $("<option>", {
          value: ui.item.value,
          text: ui.item.label,
        })
      );
      document.querySelector("#nombreProveedor").value = ui.item.label;
      document.querySelector("#nitProveedor").value = ui.item.value;
      return false;
    },
  });
});

//Esta función busca y muestra con jquery los nombres de los productos que coincidan con la busqueda
$(document).ready(function () {
  $("#NombreProductoRecepcion").autocomplete({
    source: function (request, response) {
      let longitudPalabra = document.getElementById("NombreProductoRecepcion")
        .value.length;
      //Se hace una petición a Node.js para obtener datos
      if (longitudPalabra >= 2) {
        $.ajax({
          url: "/BuscarProductosJQuery",
          dataType: "json",
          data: {
            valor: request.term,
          },
          success: function (data) {
            response(data);
          },
        });
      }
    },
    select: function (event, ui) {
      //Agregar la opción seleccionada al control select
      document.getElementById("lista").innerHTML = "";
      $("lista").append(
        $("<option>", {
          value: ui.item.value,
          text: ui.item.label,
        })
      );
      console.log(
        (document.querySelector("#NombreProductoRecepcion").value =
          ui.item.label)
      );
      console.log(
        (document.querySelector("#CodigoProductoRecepcion").value =
          ui.item.value)
      );

      return false;
    },
  });
});

// -- Lista marcas

$(document).ready(function () {
  $("#nombreMarca").autocomplete({
    source: function (request, response) {
      let longitudPalabra = document.getElementById("nombreMarca").value.length;
      //Se hace una petición a Node.js para obtener datos
      if (longitudPalabra >= 2) {
        $.ajax({
          url: "/listaMarcas",
          dataType: "json",
          data: {
            valor: request.term,
          },
          success: function (data) {
            response(data);
          },
        });
      }
    },
    select: function (event, ui) {
      //Agregar la opción seleccionada al control select
      document.getElementById("listaMarca").innerHTML = "";
      $("listaMarca").append(
        $("<option>", {
          value: ui.item.value,
          text: ui.item.label,
        })
      );
      console.log(
        (document.querySelector("#nombreMarca").value = ui.item.label)
      );
      console.log(
        (document.querySelector("#codigoMarca").value = ui.item.value)
      );

      return false;
    },
  });
});

//new
// -- Lista Lote 

$(document).ready(function(){

    $('#loteProducto').autocomplete({             
        source: function(request, response) {
            let longitudPalabra = document.getElementById('loteProducto').value.length;
            //Se hace una petición a Node.js para obtener datos
            if(longitudPalabra >= 2){
                $.ajax({
                    url: '/listaLote',
                    dataType: 'json',
                    data: {
                        valor: request.term
                    },
                    success: function(data) {
                        response(data);                           
                    }
                });
            } 
        },
        select: function(event, ui) {
            //Agregar la opción seleccionada al control select 
            document.getElementById("listaLote").innerHTML = "";
            $('listaLote').append($('<option>', {
                value: ui.item.value,
                text: ui.item.label
                }));
                console.log(  document.querySelector('#loteProducto').value = ui.item.label )
                console.log(  document.querySelector('#codigoLote').value = ui.item.value )

                return false;
        }
    });
});
//new

//new
// -- Lista Invima 

$(document).ready(function(){

    $('#invima').autocomplete({             
        source: function(request, response) {
            let longitudPalabra = document.getElementById('invima').value.length;
            //Se hace una petición a Node.js para obtener datos
            if(longitudPalabra >= 2){
                $.ajax({
                    url: '/listaInvima',
                    dataType: 'json',
                    data: {
                        valor: request.term
                    },
                    success: function(data) {
                        response(data);                           
                    }
                });
            } 
        },
        select: function(event, ui) {
            //Agregar la opción seleccionada al control select 
            document.getElementById("listaInvima").innerHTML = "";
            $('listaInvima').append($('<option>', {
                value: ui.item.value,
                text: ui.item.label
                }));
                console.log(  document.querySelector('#invima').value = ui.item.label )
                console.log(  document.querySelector('#codigoInvima').value = ui.item.value )

                return false;
        }
    });
});
//new