window.onload = initialize;

var notificationMessege;
var notificationLabel;
var notificationDate;
var applicationSelected;
var applications;

function initialize() {
    this.notificationMessege = document.getElementById("notificationMessege");
    this.notificationLabel = document.getElementById("notificationLabel");
    this.applicationSelected = document.getElementById("applicationSelected");
    document.getElementById("send").addEventListener("click", sendNotification);
    getApplications();
}

function sendNotification(event) {
    event.preventDefault();
    if (notificationMessege.value == "") {
        alert("fill the message pls");
    } else {
        var notification = {};
        var app = document.getElementById("applications")[document.getElementById("applications").selectedIndex].value;
        var xhttp = new XMLHttpRequest(), method = "POST"
        var url = "http://localhost:3000/sendNotificationToApplication/" + app;
        //creo el json de la notificacin con los valores del formulario
        notification.notification = {
            "body": document.getElementById("notificationMessege").value,
            "title": document.getElementById("notificationLabel").value
        };
        //añado los tokens a los que deben enviarse la notificacion
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var res = JSON.parse(xhttp.responseText);
                //si hay respuesta muestro una alerta con las estadísticas que manda NodeJs
                if (res != null) {
                    alert("Notification done!" + "\n----*----\nsuccess: " + res.successCount
                        + "\nfailure: " + res.failureCount);
                }
            }
        };
        xhttp.open(method, url, true);
        xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhttp.send(JSON.stringify(notification));
    }

}

function showApplications() {
    //comprueba que el checkbox seleccionado es el indicado para mostrar el select de aplicaciones
    //en caso contrario lo oculta
    if (applicationSelected.checked == true) { document.getElementById("applications").style.visibility = "visible"; }
    else { document.getElementById("applications").style.visibility = "hidden"; }
}

function getApplications() {
    var xhttp = new XMLHttpRequest(), method = "GET", url = "http://localhost:3000/apps";
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            var applications = JSON.parse(xhttp.responseText);
            if (applications != null) { printApplications(applications); }
        }
    };
    xhttp.open(method, url, true);
    xhttp.send();
}

function printApplications(applications) {
    //todas las aplicaciones dentro de la base de datos
    this.applications = applications;
    //resultado html con todas las aplicaciones
    var apps;
    for (var i = 0; i < applications.length; i++) {
        //añado las aplicaciones con el formato de option para mostrarlo en el html
        if (i == 0) {
            apps = "<option>"
                + applications[i].applicationName + "</option>";
        } else {
            apps += "<option>"
                + applications[i].applicationName + "</option>";
        }
    }
    //estabezco en el html las aplicaciones cn el formato necesario
    document.getElementById("applications").innerHTML = apps;
}