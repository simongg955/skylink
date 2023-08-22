// FUNCION PARA OCULTAR LAS TARJETAS HASTA QUE SE SELECCIONE LA SEDE 
// Se validan los inputs antes de registrar producto 

    function Seleccionarsede() {
        let sedes = document.getElementById('codigoSede')
        let CSalida = document.getElementById('txtCodigoSalida')
        let inputCodigoCategoria = document.getElementById('txtCodigoCategoria')
        let inputTipoEnvio = document.getElementById('txtTipoEnvio')
        let inputnombreMedioEnvio = document.getElementById('txtnombreME').value;
       
        let productos_ = document.getElementById('pnlproductos')
        let remisiones_ = document.getElementById('pnlremision')
        let SedeCod = document.getElementsByName('txtSede');
        if (sedes.value != '' && CSalida.value != '' && inputCodigoCategoria.value != '' && inputTipoEnvio.value != '' && inputnombreMedioEnvio != '') {

            productos_.style.display = 'block'
            remisiones_.style.display = 'block'

            SedeCod.value = sedes.value;
            let sedesx = document.getElementById('lblNombreSede')
            sedesx.innerText = sedes.value;

            let fecha = document.getElementById('lblFechaRemision')
            let f = new Date();
            const opciones = { day: '2-digit', month: '2-digit', year: 'numeric' };
            const fechaFormateada = f.toLocaleDateString('es-ES', opciones);

            fecha.innerHTML = fechaFormateada;

        }
        else {

            alert(`Desbes seleccionar: \n una sede,   \n una causa de salida, \n un tipo de envío, \n un área se servicio hacia donde va el producto y \n un medio de envio.`);

            productos_.style.display = 'none'
            remisiones_.style.display = 'none'
        }

    }



   //Función que carga la información del producto a enviar --*
   // var ProductoSeleccionadoParaEnviar = [];
    function CargarDatosProducto(codigo) {
            const valorBotonCI = codigo;
            axios.post('/datos', {
                valorBotonCI: valorBotonCI
            })
                .then(function (response) {
                  
                    IdentificacionProducto = response.data.datosProducto.queryRecepcionByCodigo.recordset;
               

                    $("#txtCodigoIngreso").val(IdentificacionProducto[0].codigoIngreso)
                    $("#txtCodigoFactura").val(IdentificacionProducto[0].codigoFactura)
                    $("#txtNombreProducto").val(IdentificacionProducto[0].nombreProducto)
                    $("#txtFechaVencimiento").val(IdentificacionProducto[0].fechaVencimiento)
                    $("#txtNitProveedor").val(IdentificacionProducto[0].nitProveedor)
                    $("#txtCodigoProducto").val(IdentificacionProducto[0].codigoProducto)
                    $("#txtLoteProducto").val(IdentificacionProducto[0].loteProducto)
                    $("#txtInvima").val(IdentificacionProducto[0].invima)
                    $("#txtMarca").val(IdentificacionProducto[0].codigoMarca)
                    $("#txtcantidadIngreso").val(IdentificacionProducto[0].existencias)
    
                   
                   if(Remision.length > 0){
                    let cantidad = 0;
                     Remision.forEach((item) => {
                     cantidad = item.codigoIngreso === IdentificacionProducto[0].codigoIngreso ? parseInt(item.cantidadEnvio) + cantidad : cantidad;
                   
                   })               

                     $("#txtcantidadIngreso").val(parseInt(IdentificacionProducto[0].existencias) - cantidad)
                   } 

                })
        
    }


    const botones = document.querySelectorAll('#productoCargar');
    var IdentificacionProducto = [];
    
    botones.forEach(boton => {
        boton.addEventListener('click', () => {
            const valorBotonCI = boton.dataset.producto;
            axios.post('/datos', {
                valorBotonCI: valorBotonCI
            })
                .then(function (response) {
                   
                    IdentificacionProducto = response.data.datosProducto.queryRecepcionByCodigo.recordset;

                    $("#txtCodigoIngreso").val(IdentificacionProducto[0].codigoIngreso)
                    $("#txtCodigoFactura").val(IdentificacionProducto[0].codigoFactura)
                    $("#txtNombreProducto").val(IdentificacionProducto[0].nombreProducto)
                    $("#txtFechaVencimiento").val(IdentificacionProducto[0].fechaVencimiento)
                    $("#txtNitProveedor").val(IdentificacionProducto[0].nitProveedor)
                    $("#txtCodigoProducto").val(IdentificacionProducto[0].codigoProducto)
                    $("#txtLoteProducto").val(IdentificacionProducto[0].loteProducto)
                    $("#txtInvima").val(IdentificacionProducto[0].invima)
                    $("#txtMarca").val(IdentificacionProducto[0].codigoMarca)
                    $("#txtcantidadIngreso").val(IdentificacionProducto[0].existencias)
            
                })
        })
    })



    var Remision = [];
    let contadorId = 0;

   
    function submitForm(event) {
        event.preventDefault(); // Evita la acción predeterminada del evento submit
        var sedes = document.getElementById('codigoSede').value;
        const form = document.getElementById("frmSalidaProducto");
        let formData = new FormData(form);


        var validacion = "";
        validacion += $("#txtCodigoCategoria").val() == "" ? "- Seleccione un área de servicio a enviar el producto \n" : ""
        let valCantidadEnvio = $("#txtCantidadEnvio").val() == "" ? "- Ingrese la cantidad a enviar \n" : $("#txtCantidadEnvio").val()
        if (valCantidadEnvio.length <= 4) {
            let disponible = $('#txtcantidadIngreso').val()
            if (parseInt(valCantidadEnvio) > parseInt(disponible)) {
                validacion += "- La cantidad a enviar es mayor a la cantidad disponible \n"
            }
        }
        else {
            validacion += valCantidadEnvio;
        }


      //  validacion += $("#txtCodigoSalida").val() == "" ? "- Seleccione una causa de salida  \n" : ""


        validacion += $("#txtTipoEnvio").val() == "" ? "- Seleccione un tipo de envío \n" : ""


        if (validacion == "") {
            //Objeto con toda la información de producto a enviar

            const salidasProductos = {
                contadorId: contadorId + 1,
                codigoIngreso: $("#txtCodigoIngreso").val(),
                codigoFactura: $("#txtCodigoFactura").val(), //Ya no iria
                nitProveedor: $("#txtNitProveedor").val(),
                codigoProducto: $("#txtCodigoProducto").val(),
                nombreProducto: $("#txtNombreProducto").val(),
                loteProducto: $("#txtLoteProducto").val(),
                invima: $("#txtInvima").val(),
                fechaVencimiento: $("#txtFechaVencimiento").val(),
                codigoMarca: $("#txtMarca").val(),
                codigoCategoria: $("#txtCodigoCategoria").val(),
                cantidadEnvio: $("#txtCantidadEnvio").val(),
                tipoEnvio: $("#txtTipoEnvio").val(),
                nombreME: $("#txtnombreME").val(),
                observacionesEnvio: $("#txtObservacionesEnvio").val(),
                codigoSalida: $("#txtCodigoSalida").val(),
                codigoSede: $("#codigoSede").val(),
            }

            contadorId++;
            
            Remision.push(salidasProductos);
         

            var Cantidad = document.getElementById('lblCantidad')
            Cantidad.innerHTML = Remision.length.toString();
            
            ConstruirTabla();
            form.reset()

            var buttons = document.getElementsByClassName("btn-close");
            buttons[0].click();

        } else {
            alert(validacion)
        }

    }

//------------------------------------------------------------Cambiar el id por cada producto --------------------------

    function ConstruirTabla() {
        $("#tablaRemisiones tbody").html("");
        Remision.forEach((item) => {

            $("#tablaRemisiones tbody").append("<tr>").append(
                $("<td>").text(item.nombreProducto),
                $("<td>").text(item.cantidadEnvio).addClass('alinearElemento'),
                $("<td>").text(item.loteProducto).addClass('alinearElemento'),
                $("<td>").text(item.fechaVencimiento).addClass('alinearElemento'),
                $("<td>").append(
                    $("<button>").addClass("botonEliminar").append($("<i>").addClass("btn btn-outline-danger bx bx-trash")).data("codigoIngreso", item.contadorId))
            )
        })
        var Cantidad = document.getElementById('lblCantidad')
        Cantidad.innerHTML = Remision.length.toString();
    };

    $(document).on("click", "button.botonEliminar", function () {
        const _codigoIngreso = $(this).data("codigoIngreso")
        Remision = Remision.filter(x => x.contadorId != _codigoIngreso)
        ConstruirTabla();
    });


    function GuardarRemision() {
        if (Remision.length > 0) {
            let remision = Remision
            Remision = {}
            axios.post('/remisiones', { data: remision })
                .then(function (response) {

                    let Resulado = response.data;


                    //alert('- Remisión guardada con exito ' + response)

                    if (Resulado.exito_) {
                        alert('- Remision guardada con éxito')
                        var link = document.createElement("a");
                        link.href = "/nuevaSalida";
                        link.click();
                    }
                    else if (Resulado.error_) {
                        alert('- La remisión no pudo ser guarda, contacte al administrador del sistema')
                    }

                })
                .catch(function (error) {
                    alert('- La remisión no pudo ser guarda, contacte al administrador del sistema')
                });
        } else {
            alert('- No se han agregado productos a la remisión')
        }
    }


    function CancelarRemision() {
        Remision = {};

        var link = document.createElement("a");
        link.href = "/nuevaSalida";
        link.click();
    }


    



// --------------------------BUSCA PRODUCTO----------------------------
//Con  este JQUERY se hace una consulta de productos por nombre
    $(document).ready(function(){

        $('#nombreProductoABuscar').autocomplete({ 
            source: function(request, response) {
                let longitudPalabra = document.getElementById('nombreProductoABuscar').value.length;
                //Se hace una petición a Node.js para obtener datos
                if(longitudPalabra > 1){
                    $.ajax({
                        url: '/BuscarProductosEnviar',
                        dataType: 'json',
                        data: {
                            valor: request.term
                        },
                        success: function(data) {
                            response(data);

                             if(data.datosProducto != 0){

                                ConstruirTablaProducto(data.datosProducto)
                                
                             } else{

                                 $("#tablaProductos tbody").html("");

                             }                    
                        }
                    });
                }
                else if(longitudPalabra <= 1  || longitudPalabra === 0) {
                //Si la longitud de la palabra es menor igual a un caracter la tabla s  limpia 
                  $("#tablaProductos tbody").html("");
                }
            },

        });
    });  
 
    function ConstruirTablaProducto(Productos) {

        $("#tablaProductos tbody").html("");
        Productos.forEach((item) => {
            let dato ="'"+item.codigoIngreso+"'"
            $("#tablaProductos tbody").append("<tr>").append(
                 $("<td>").append(
                    `<button type="button" class="btn btn-light waves-effect btn btn-light waves-effect" id='productoCargar' data-producto='${item.codigoIngreso}'  data-bs-toggle='modal' data-bs-target='.bs-example-modal-lg' onclick="CargarDatosProducto(${dato})"><i class='bx bx-send icon nav-icon'></i></button>`),
                $("<td>").text(item.nombreProducto), 
                $("<td>").text(item.loteProducto),
                $("<td>").text(item.existencias).addClass('alinearElemento'),
                   

            )
        })        
    };

