window.onload = inicializar;

function inicializar() {
    formaplicationRemove = document.getElementById("form-aplicatioRemove");
    formaplicationRemove.addEventListener("submit", remove, false);
}

function remove(event) {
    event.preventDefault();
    var aplicationName = event.target.inputName.value;


    var xhttp = new XMLHttpRequest(), method = "DELETE", url = "http://192.168.201.76:3000/app/" + aplicationName;
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            admin = JSON.parse(xhttp.responseText);


            if (admin != null) {

                
                alert("Se han borrado "+ admin + " Registros" );
                document.getElementById("form-aplicatioRemove").innerHTML = apps;
            }
        }
    };
    xhttp.open(method, url, true);
    xhttp.send();
}
