window.onload = inicializar;
var formResgistrarUser;

function inicializar(){
    formResgistrarUser = document.getElementById("form-registro");
    formResgistrarUser.addEventListener("submit", registrar, false);
    console.log("ale1");
}

function registrar(event){
    event.preventDefault();
    var email = event.target.inputEmail.value;
    var password = event.target.inputPassword.value;
    console.log("ale2");

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(result){
        alert("Funciona")
        
    })
    .catch(function(error) {
        $("#errorModal").modal();
      });
}