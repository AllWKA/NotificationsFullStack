window.onload = inicializar;

console.log("holi");


function inicializar() {
  applicationAdd = document.getElementById("form-registro-aplicaion");
  applicationAdd.addEventListener("submit", registrarApp, false);

  console.log("ale1");

}

function registrarApp(event) {
  event.preventDefault();
  var app = {};
  app.aplicationName = event.target.inputName.value;
  app.tokenAplication = event.target.inputToken.value;
  console.log(JSON.stringify(app));


  var xhttp = new XMLHttpRequest(), method = "POST", url = "http://192.168.201.76:3000/app";
  xhttp.onreadystatechange = function () {

    if (this.readyState == 4 && this.status == 200) {
      // Typical action to be performed when the document is ready:
      admin = JSON.parse(xhttp.responseText);


      if (admin != null) {

        alert("Aplicaion subida");


      }
    }
  };
  xhttp.open(method, url, true);
  xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhttp.send(JSON.stringify(app));
}

