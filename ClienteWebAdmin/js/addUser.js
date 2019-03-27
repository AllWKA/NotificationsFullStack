window.onload = inicializar;
var formResgistrarUser;

function inicializar() {
    formResgistrarUser = document.getElementById("form-registro");
    formResgistrarUser.addEventListener("submit", registrar, false);
}

function registrar(event) {
    event.preventDefault();
    var email = event.target.inputEmail.value;
    var password = event.target.inputPassword.value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function (result) {
            alert("Funciona")

        })
        .catch(function (error) {
            $("#errorModal").modal();
        });
}