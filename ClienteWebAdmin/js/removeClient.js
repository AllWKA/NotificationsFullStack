window.onload = inicializar;

function inicializar() {
    formClientRemove = document.getElementById("form-ClientRemove");
    formClientRemove.addEventListener("submit", removeClient, false);


}

function removeClient(event) {
    event.preventDefault();
    var idUser = event.target.inputIdClient.value;


    var xhttp = new XMLHttpRequest(), method = "DELETE", url = "http://192.168.1.137:3000/user/" + idUser;
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            admin = JSON.parse(xhttp.responseText);


            if (admin != null) {


                alert("Se han borrado " + admin + " Registros");

            }
        }
    };
    xhttp.open(method, url, true);
    xhttp.send();
}
