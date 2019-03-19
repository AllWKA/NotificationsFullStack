window.onload = inicializar;
var formAutenticacion;

function inicializar() {
    formAutenticacion = document.getElementById("form-autenticacion");
    formAutenticacion.addEventListener("submit", autentificar, false);
    console.log("ale1");
}

function autentificar(event) {
    event.preventDefault();
    var email = event.target.inputEmail.value;
    var password = event.target.inputPassword.value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function (result) {
            window.location.href = "panel.html";
        })
        .catch(function (error) {
            $("#errorModal").modal();
        });
}