let txtName = document.getElementById("Name");
let txtNumber = document.getElementById("Number");
let btnAgregar = document.getElementById("btnAgregar");
let alertValidacionesTexto =document.getElementById("alertValidacionesTexto");
let alertValidaciones = document.getElementById("alertValidaciones");
let tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");

//Numeración de la primera columna de la tabla
let cont = 0;
let costoTotal = 0;
let totalEnProductos = 0;

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
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
        costoTotal += precio * Number(txtNumber.value);
        precioTotal.innerText = "$ " + costoTotal.toFixed(2);
        totalEnProductos += Number(txtNumber.value);
        productosTotal.innerText = totalEnProductos;
        contadorProductos.innerText = cont; // Actualiza el contenido del elemento con el valor actual de la variable




        txtName.value = "";
        txtNumber.value = "";
        txtName.focus();

    }//if isValid

}); //btnAgregar