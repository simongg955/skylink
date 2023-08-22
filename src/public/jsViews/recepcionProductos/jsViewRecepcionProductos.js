    //Función que muestra el formulario si los inputs como proveedor, factura y causa ingreso estan llenos
    var queryFacturaRegistrada = []
    function mostrarFormularioFactura() {

        let factura = document.getElementById('codigoFactura').value;
        let nombreProveedor = document.getElementById('nombreProveedor').value;
        let causaIngreso = document.getElementById('codigoCausaIngreso').value;
        let div_formulario_productos = document.getElementById('div-formulario-productos');

        if (factura != "" && nombreProveedor != "" && causaIngreso != "") {        
            validarProveedorExiste(nombreProveedor, div_formulario_productos);

        }
        else {
            alert("- Debes ingresar el número de la factura, seleccionar el proveedor y la causa de ingreso.");
            div_formulario_productos.style.display = 'none';        
        }
    }

    //Esta función es para validar sí el proveedor digitado sí esta en el sistema.
    function validarProveedorExiste(nombreProveedor, div_formulario_productos) {    

        axios.post('/BuscarExistenciaProveedorPorNombre', {
            nombreProveedor: nombreProveedor
        })
            .then(function (response) {
                queryProveedorRegistrado = response.data.existenciaProveedor

                if (queryProveedorRegistrado.length === 0) {
                    alert('-El proveedor ingresado no esta registrado en el sistema')                    
                    document.getElementById("nombreProveedor").value = "";       
                    div_formulario_productos.style.display = 'none'             
                }
                else  {

                     validarFacturaExiste();
                    }   
            });
    }

    //Validar si la factura a ingresar ya esta registrada con el proveedor que van a registrar 
    function validarFacturaExiste() {
        let nitProveedor = document.getElementById('nitProveedor').value;
        let codigoFactura = document.getElementById('codigoFactura').value;
        let div_formulario_productos = document.getElementById('div-formulario-productos');
        let modalFacturaExistente = document.getElementById('modalFacturaExistente');   
        let informacionFactura = document.getElementById('informacionFactura');

        axios.post('/BuscarFacturaProveedor', {
            nitProveedor: nitProveedor,
            codigoFactura: codigoFactura
        })
            .then(function (response) {
                queryFacturaRegistrada = response.data.datosFacturaProveedorRegistrar

                if (queryFacturaRegistrada.length > 0) {
                    alert('La factura ya existe');
                    modalFacturaExistente.style.display = 'block';                        
                }
                else {
                    div_formulario_productos.style.display = 'block';   
                    informacionFactura.style.display = 'none'
                    detalleFacturaRecepcion(codigoFactura);                
                }
            });            
    }

    //Funcion para capturar en número de factura y fecha, para mostrar en la factura
    function detalleFacturaRecepcion(codigoFactura) {

        document.getElementById('btn_mostrar_ocultar').style.display = 'block'; 
        document.getElementById('modalFacturaExistente').style.display = 'none'; 
        var facturaARegistrar = document.getElementById('lblCodigoFactura');
        var lblProveedor = document.getElementById('lblProveedor');
        let proveedor = document.getElementById('nombreProveedor').value;
        
        var fecha = document.getElementById('lblFechaRemision')
        var f = new Date();
        const opciones = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const fechaFormateada = f.toLocaleDateString('es-ES', opciones);

        facturaARegistrar.innerHTML = codigoFactura;
        fecha.innerHTML = fechaFormateada;    
        lblProveedor.innerHTML = proveedor;  
        //Oculta el menú   
        let btnClick = document.getElementById('btnClick');
        btnClick.click();          
    }



    let RecepcionIngresos = [];
    let contadorId = 0;
    function agregarProductoEnArray() {

        let codigoFactura = document.getElementById("codigoFactura").value;
        let nitProveedor = document.getElementById("nitProveedor").value;
        let codigoCausaIngreso = document.getElementById("codigoCausaIngreso").value;
        let cantidadIngreso = document.getElementById("cantidadIngreso").value;
        let cantidadMuestra = document.getElementById("cantidadMuestra").value;
        let cantidadIngresoProdCorespondeACompra = document.getElementById("cantidadIngresoProdCorespondeACompra").value;
        let criterioAdministrativo = document.getElementById("criterioAdministrativo").value;
        let loteProducto = document.getElementById("loteProducto").value;
        let invima = document.getElementById("invima").value;
        let codigoMarca = document.getElementById("codigoMarca").value;
        let valorUnitario = document.getElementById("valorUnitario").value;
        let fechaVencimiento = document.getElementById("fechaVencimiento").value;

        let recepcionObject = {
            contadorId: contadorId + 1,
            codigoFactura: codigoFactura,
            nitProveedor: $("#nitProveedor").val(),
            nombreProveedor: $('#nombreProveedor option:selected').text(),
            codigoProducto: $("#CodigoProductoRecepcion").val(),
            nombreProducto: $("#NombreProductoRecepcion").val(),
            loteProducto: loteProducto,
            invima: invima,
            fechaVencimiento: $("#fechaVencimiento").val(),
            cantidadIngreso: cantidadIngreso,
            cantidadIngresoProdCorespondeACompra: cantidadIngresoProdCorespondeACompra,
            cantidadMuestra: cantidadMuestra,
            empaque: $("#empaque").val(),
            etiqueta: $("#etiqueta").val(),
            embalaje: $("#embalaje").val(),
            envase: $("#envase").val(),
            criterioAdministrativo: criterioAdministrativo,
            codigoCausaIngreso: codigoCausaIngreso,
            codigoMarca: codigoMarca,
            nombreMarca: $('#nombreMarca').val(),
            valorUnitario: valorUnitario,
        }

        contadorId++;

        RecepcionIngresos.unshift(recepcionObject);

        //Mostramos la la cantidad de productos registrados
        var Cantidad = document.getElementById('lblCantidad')
        Cantidad.innerHTML = RecepcionIngresos.length.toString();


        var buttons = document.getElementsByClassName("btn-close");
        buttons[0].click();


        document.getElementById("NombreProductoRecepcion").value = "";
        document.getElementById("cantidadIngreso").value = "";
        document.getElementById("cantidadMuestra").value = "Seleccione una Opción";
        document.getElementById("criterioAdministrativo").value = "Seleccione una Opción";
        document.getElementById("loteProducto").value = "";
        document.getElementById("invima").value = "";
        document.getElementById("nombreMarca").value = "";
        document.getElementById("valorUnitario").value = "";
        $("#fechaVencimiento").val("");
        $("#empaque").val("Aprobado");
        $("#etiqueta").val("Aprobado");
        $("#embalaje").val("Aprobado");
        $("#envase").val("Aprobado");

        ConstruirTablaFactura()        
    }





//Esta es la tabla que muestra los productos de la factura
function ConstruirTablaFactura() {
    $("#tablaRecepcionFactura tbody").html("");
    RecepcionIngresos.forEach((item) => {

        $("#tablaRecepcionFactura tbody").append("<tr>").append(
            $('<td>').text(item.nombreProducto).addClass('fuente'),
            $('<td>').text(item.cantidadIngreso).addClass('alinearElemento'),            
            $('<td>').text(item.nombreMarca).addClass('alinearElemento'),
            $('<td>').text(item.loteProducto).addClass('alinearElemento'),
            $('<td>').text(item.invima).addClass('alinearElemento'),
            $('<td>').text(item.fechaVencimiento).addClass('alinearElemento'),
            $('<td>').text(item.criterioAdministrativo).addClass('alinearElemento'),
            $('<td>').text(item.valorUnitario).addClass('alinearElemento'),                       
            // $("<td>").append(
            //     $("<button>").addClass("btnEliminarProducto").append($("<i>").addClass("btn btn-outline-danger bx bx-trash")).data("id", item.contadorId)),

            $("<td>").append(
                `<button type="button" class="btn btn-danger waves-effect btn btn-danger waves-effect ms-4 p-2" onclick="eliminarProductoArray(${item.contadorId})"><i class='bx bx-trash text-danger'></i></button>`),

            $("<td>").append(
                `<button type="button" class="btn btn-primary waves-effect btn btn-primary waves-effect ms-4 p-2"  data-bs-toggle='modal' data-bs-target='.bs-example-modal-lg' onclick="editarProducto(${item.contadorId})"><i class='bx bx-pencil'></i></button>`),

        )
    })
    var Cantidad = document.getElementById('lblCantidad')
    Cantidad.innerHTML = RecepcionIngresos.length.toString();

};

// $(document).on("click", "button.btnEliminarProducto", function () {
//     const id = $(this).data("id")
//     RecepcionIngresos = RecepcionIngresos.filter(x => x.contadorId != id)
//     ConstruirTablaFactura();
// });
function eliminarProductoArray(id) {    
     RecepcionIngresos =  RecepcionIngresos.filter(x => x.contadorId != id)
     ConstruirTablaFactura();
};



// ================ Editar =================

//Funcion para editar un producto 
function editarProducto (id) {


      document.getElementById('btnRegistrar').innerHTML = 'Editar'

    const productoEditar = RecepcionIngresos.find((objeto) => {
       return objeto.contadorId === id
    })


    $("#NombreProductoRecepcion").val(productoEditar.nombreProducto)
    $("#loteProducto").val(productoEditar.loteProducto)
    $("#invima").val(productoEditar.invima)
    $("#fechaVencimiento").val(productoEditar.fechaVencimiento)
    $("#cantidadIngreso").val(productoEditar.cantidadIngreso)
    $("#cantidadIngresoProdCorespondeACompra").val(productoEditar.cantidadIngresoProdCorespondeACompra)
    $("#cantidadMuestra").val(productoEditar.cantidadMuestra)
    $("#empaque").val(productoEditar.empaque)
    $("#etiqueta").val(productoEditar.etiqueta)
    $("#embalaje").val(productoEditar.embalaje)
    $("#envase").val(productoEditar.envase)
    $("#criterioAdministrativo").val(productoEditar.criterioAdministrativo)
    $("#codigoMarca").val(productoEditar.codigoMarca)
    $("#nombreMarca").val(productoEditar.nombreMarca)
    $("#valorUnitario").val(productoEditar.valorUnitario)

    
    eliminarProductoEditado(id)
    
    
 };


  function eliminarProductoEditado(id) {
     RecepcionIngresos =  RecepcionIngresos.filter(x => x.contadorId != id)     
};


// ================ Editar =================

function GuardarFactura() {
    if (RecepcionIngresos.length > 0) {
        let recepcionIngresos = RecepcionIngresos
        RecepcionIngresos = {}
        axios.post('/recepciones', { data: recepcionIngresos })
            .then(function (response) {

                let Resulado = response.data;

                if (Resulado.exito_) {
                    alert('- Recepción guardada con éxito')
                    var link = document.createElement("a");
                    link.href = "/registroRecepcionNuevoProducto";
                    link.click();
                }
                else if (Resulado.error_) {
                    alert('- La recepción no pudo ser guarda, contacte al administrador del sistema')
                }

            })
            .catch(function (error) {
                alert('- La recepción no pudo ser guarda, contacte al administrador del sistema')
            });
    } else {
        alert('- No se han agregado productos a la recepción')
    }
}


// ----------Organizando
// Funcion que lanza una lerta informando a el usuario en caso de haber un error al cargar la página

document.addEventListener("DOMContentLoaded", () => {
    let mensaje = document.getElementById('mensajeExcepcion').textContent.trim();
    let paginaRecepcionProductos = document.getElementById('paginaRecepcionProductos');
    let mensajeError = document.getElementById('mensajeError');
    if (mensaje != '') {

        paginaRecepcionProductos.style.display = 'none'
        mensajeError.style.display = 'block'
        alert(mensaje)

    }
});
