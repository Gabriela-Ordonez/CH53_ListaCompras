let txtName = document.getElementById("Name");
let txtNumber = document.getElementById("Number");
let btnAgregar = document.getElementById("btnAgregar");
let alertValidacionesTexto =document.getElementById("alertValidacionesTexto");
let alertValidaciones = document.getElementById("alertValidaciones");
let tablaListaCompras = document.getElementById("tablaListaCompras");
let btnClear = document.getElementById("btnClear");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");

//Numeración de la primera columna de la tabla
let cont = 0;
let costoTotal = 0;
let totalEnProductos = 0;
let datos = new Array(); //almacena los elementos de la tabla

function validarCantidad(){
    if(txtNumber.value.trim().length<=0){
        return false;
    } //length<=0

    // Que sea número
    if(isNaN(txtNumber.value)){
        return false;
    } //isNaN
    
    // Que sea mayor que cero
    if(Number(txtNumber.value)<=0){
        return false;
    } //<=0

        return true;
} //validarCantidad

function getPrecio(){
    return Math.round((Math.random()*10000)) / 100;
} //getPrecio

btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
    // Bandera, al ser true permite agregar los datos a la tabla
    let isValid = true;

    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";
    txtName.style.border = "";
    txtNumber.style.border = "";

    txtName.value = txtName.value.trim(); // txtName es la referencia al input con una propiedad llamada value
    txtNumber.value = txtNumber.value.trim();

    if(txtName.value.length <3){
        txtName.style.border = "solid 3px red";
        alertValidacionesTexto.innerHTML = "<strong>El nombre del producto no es correcto.</strong>";
        alertValidaciones.style.display = "block";
        isValid = false;
    } //lenght>=3

    if(! validarCantidad()){
        txtNumber.style.border = "solid medium red";
        alertValidacionesTexto.innerHTML += "<br/><strong>La cantidad no es correcta.</strong>";
        alertValidaciones.style.display = "block";
        isValid = false;
    } //validarCantidad

    if(isValid){ // si pasó las validaciones
        cont++;
        let precio = getPrecio(); // ultima columna
        let row = `<tr>
                    <td>${cont}</td>
                    <td>${txtName.value}</td>
                    <td>${txtNumber.value}</td>
                    <td>${precio}</td>
                   </tr>`;

        let elemento = {
                        "cont" : cont,
                        "nombre" : txtName.value,
                        "cantidad" : txtNumber.value,
                        "precio" : precio
                        };

        datos.push(elemento);

        localStorage.setItem("datos", JSON.stringify(datos));

        cuerpoTabla.insertAdjacentHTML("beforeend", row);
        costoTotal += precio * Number(txtNumber.value);
        precioTotal.innerText = "$ " + costoTotal.toFixed(2);
        totalEnProductos += Number(txtNumber.value);
        productosTotal.innerText = totalEnProductos;
        contadorProductos.innerText = cont; // Actualiza el contenido del elemento con el valor actual de la variable

        let resumen = {
            "cont" : cont,
            "totalEnProductos" : totalEnProductos,
            "costoTotal" : costoTotal
            }; // let resumen

        localStorage.setItem("resumen", JSON.stringify(resumen));


        txtName.value = "";
        txtNumber.value = "";
        txtName.focus();

    }//if isValid

}); //btnAgregar.addEventListener

window.addEventListener("load", function(event){
    event.preventDefault();
   
    if(this.localStorage.getItem("datos")!=null){
        datos = JSON.parse(this.localStorage.getItem("datos"));
    }// datos !=null

    datos.forEach((d) => {
        let row = `<tr>
                    <td>${d.cont}</td>
                    <td>${d.nombre}</td>
                    <td>${d.cantidad}</td>
                    <td>${d.precio}</td>
                   </tr>`
        cuerpoTabla.insertAdjacentHTML("beforeend", row);

    });


    if(this.localStorage.getItem("resumen")!=null){
        let resumen = JSON.parse(this.localStorage.getItem("resumen"));
        costoTotal = resumen.costoTotal;
        totalEnProductos = resumen.totalEnProductos;
        cont = resumen.cont;
    }// resumen !=null

    precioTotal.innerText = "$ " + costoTotal.toFixed(2);
    productosTotal.innerText = totalEnProductos;
    contadorProductos.innerText = cont;
    
}); //window.addEventListener load

//Agregar la funcionalidad del botón Limpiar Todo
btnClear.addEventListener("click", function (event) {
    event.preventDefault();

    //Resumen
    cont = 0;
    totalEnProductos = 0;
    costoTotal = 0;
    contadorProductos.innerText = cont;
    productosTotal.innerText = totalEnProductos;
    precioTotal.innerText = "$ 0.00";

    //Tabla
    cuerpoTabla.innerHTML = "";

    //campos
    txtName.value = "";
    txtNumber.value = "";
    txtName.focus();

    //alerta
    alertValidaciones.style.display = "none";

    //localStorage
    localStorage.removeItem("datos");
    localStorage.removeItem("resumen");

    datos = [];// Limpiar los datos  
    
});

