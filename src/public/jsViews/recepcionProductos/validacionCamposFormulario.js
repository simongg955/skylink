function submitForm(event) {
    event.preventDefault(); // Evita la acción predeterminada del evento submit
}

// function validarDatos() {
//     validarProductoExiste()
   
//     //validarCampo()
// }

function validarCampo() {
    document.getElementById('btnRegistrar').innerHTML = '+Agregar' 
    let codigoFactura = document.getElementById("codigoFactura").value;
    let nitProveedor = document.getElementById("nitProveedor").value;
    let NombreProductoRecepcion = document.getElementById("NombreProductoRecepcion").value;
    let cantidadIngreso = document.getElementById("cantidadIngreso").value;
    let cantidadMuestra = document.getElementById("cantidadMuestra").value;
    let criterioAdministrativo = document.getElementById("criterioAdministrativo").value;
    let loteProducto = document.getElementById("loteProducto").value;
    let invima = document.getElementById("invima").value;
    let nombreMarca = document.getElementById("nombreMarca").value;
    // let codigoMarca = document.getElementById("codigoMarca").value;
    let valorUnitario = document.getElementById("valorUnitario").value;
    let fechaVencimiento = document.getElementById("fechaVencimiento").value;       
    let codigoMarca = document.getElementById("codigoMarca").value;
    let CodigoProductoRecepcion = document.getElementById("CodigoProductoRecepcion").value;   
    
    var validacion = ''

    if (codigoFactura === '') {
        validacion += "Por favor ingrese el número de factura \n";
    }

    if (nitProveedor === '') {
        validacion += "Selecciona un Proveedor valido \n";
    }
    if (CodigoProductoRecepcion === '') {
        validacion += "Selecciona un producto valido \n";
    }
    if (codigoMarca === '') {
        validacion += "Selecciona una marca valida \n";
    }

    if (NombreProductoRecepcion === '') {
        validacion += "Selecciona un producto \n";
    }
    if (cantidadIngreso === '') {
        validacion += "Ingresa la cantidad del producto \n";
    }
    if (cantidadIngreso < 1) {
        validacion += "Ingresa la cantidad del producto recuerda que la cantidad minima es 1 \n";
    }
    if (cantidadMuestra === 'Seleccione una Opción') {
        validacion += "Selecciona una cantidad de muestra \n";
    }

    if (criterioAdministrativo === 'Seleccione una Opción') {
        validacion += "Selecciona un criterio administrativo \n";
    }

    if (loteProducto === '') {
        validacion += "Ingresa el lote del producto \n";
    }

    if (invima === '') {
        validacion += "Ingresa el registro invima del producto \n";
    }
    if (nombreMarca === '') {
        validacion += "Selecciona una marca \n";
    }
    // if (codigoMarca === '') {
    //     validacion += "Selecciona una marca \n";
    // }

    if (valorUnitario === '') {
        validacion += "Ingresa el valor del producto \n";
    }

    if (fechaVencimiento == '') {
        validacion += "Ingresa la fecha de vencimiento del producto\n";
    }

    if (valorUnitario < 0) {
        validacion += "Ingresa un valor valido del producto recuerda que el valor minimo es 0 \n";
    }

    if (validacion != '') {
        alert(validacion)
        return;
    }



    agregarProductoEnArray()

}




//   Esta función es para validar sí el producto digitado sí esta en el sistema.
  function validarProductoExiste() {    

    let nombreProducto = document.getElementById("NombreProductoRecepcion").value;
    axios.post('/buscarExistenciaRegistroProducto', {
        nombreProducto: nombreProducto
    })
        .then(function (response) {
            respuestaQuery = response.data.existenciaProducto

            if (respuestaQuery.length === 0) {
             
                alert('-El Producto ingresado no esta registrado en el sistema')
                document.getElementById("NombreProductoRecepcion").value = "";       
                return    
            }
       //     alert('El producto si esta registrada')
           
            validarMarcaExiste()
        });
}

  //Esta función es para validar sí la marca digitada sí esta en el sistema.
  function validarMarcaExiste() {    
      
    let nombreMarca = document.getElementById("nombreMarca").value;
    axios.post('/buscarExistenciaRegistroMarca', {
        nombreMarca: nombreMarca
    })
        .then(function (response) {
            respuestaQuery = response.data.existenciaMarca

            if (respuestaQuery.length === 0) {
                alert('-La marca  ingresada no esta registrado en el sistema')
                document.getElementById("nombreMarca").value = "";       
                return
            }
          // alert('La marca si esta registrada')
           validarCampo()
        });
}
































//Funcion que redirige a la vista detalla de factura, esto en caso de que la factura a ingresar ya este registrada
function verFacturaRepetida() {
    
    let factura = document.getElementById('codigoFactura').value;

    var link = document.createElement("a");
    link.href = `/detalleFactura/${factura}`;
    link.click();
}

function mostrarInformacionFactura(){
    let informacionFactura = document.getElementById('informacionFactura');
    informacionFactura.style.display = 'block'
}

function ocultarInformacionFactura(){
    let informacionFactura = document.getElementById('informacionFactura');
    informacionFactura.style.display = 'none'
}

function limitarInput(input) {
    if (input.value.length > 11) {
        input.value = input.value.slice(0, 11);
    }
}
