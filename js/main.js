let txtName = document.getElementById("Name");
let txtNumber = document.getElementById("Number");
let btnAgregar = document.getElementById("btnAgregar");
let alertValidacionesTexto =document.getElementById("alertValidacionesTexto");
let alertValidaciones = document.getElementById("alertValidaciones");


btnAgregar.addEventListener("click", function(event){
    event.preventDefault();

    txtName.value = txtName.value.trim(); // txtName es la referencia al input con una propiedad llamada value
    txtNumber.value = txtNumber.value.trim();

    if(txtName.value.length <3){
        txtName.style.border = "solid 3px red";
        alertValidacionesTexto.innerHTML = "<strong>El nombre del producto no es correcto.</strong>";
        alertValidaciones.style.display = "block";

    } //lenght>=3

}); //btnAgregar