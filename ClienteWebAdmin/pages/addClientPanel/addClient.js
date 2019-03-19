window.onload = inicializar;
var formResgistrarCliente;

function inicializar(){
    formResgistrarCliente = document.getElementById("form-registroCliente");
    formResgistrarCliente.addEventListener("submit", registrarCliente, false);
    console.log("ale1");
}

function registrarCliente(event){
    event.preventDefault();
    var app = {};
    app.userName = event.target.inputName.value;
    app.email = event.target.inputEmail.value;
    console.log(JSON.stringify(app));
    
  
    var xhttp = new XMLHttpRequest(),method = "POST",  url = "http://192.168.201.76:3000/user";
    xhttp.onreadystatechange = function() {
        
        if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
           admin = JSON.parse(xhttp.responseText);
    
    
           if (admin != null) {
    
            alert("Cliente subido");
            
          
           }
        }
    };
    xhttp.open(method, url , true);
    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhttp.send(JSON.stringify(app));  
  }