window.onload = inicializar;



function inicializar() {
  updateClient = document.getElementById("form-updateClient");
  updateClient.addEventListener("submit", UpdateClient, false);

  console.log("ale1");

}

function UpdateClient(event) {
  event.preventDefault();
  var app = {};
  var idUser = event.target.inputIdUser.value;

  app.userName = event.target.inputName.value;
  app.userEmail = event.target.inputEmail.value;

  console.log(JSON.stringify(app));


  var xhttp = new XMLHttpRequest(), method = "PUT", url = "http://192.168.1.125:3000/user/" + idUser;
  xhttp.onreadystatechange = function () {

    if (this.readyState == 4 && this.status == 200) {
      // Typical action to be performed when the document is ready:
      admin = JSON.parse(xhttp.responseText);


      if (admin != null) {

        alert("Aplicación Actualizada");


      }
    }
  };
  xhttp.open(method, url, true);
  xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhttp.send(JSON.stringify(app));
}

