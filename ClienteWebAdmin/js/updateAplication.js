window.onload = inicializar;



function inicializar() {
  updateApplication = document.getElementById("form-updateApp");
  updateApplication.addEventListener("submit", UpdateApp, false);

}

function UpdateApp(event) {
  event.preventDefault();
  var app = {};
  var aplicationOldName = event.target.inputOldName.value;

  app.aplicationName = event.target.inputName.value;
  app.tokenAplication = event.target.inputToken.value;

  console.log(JSON.stringify(app));


  var xhttp = new XMLHttpRequest(), method = "PUT", url = "http://192.168.1.125:3000/app/" + aplicationOldName;
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

