window.onload = initialize;

var notificationMessege, notificationLabel, notificationDate, applicationSelected,
    applications, messageSelct, messages;

function initialize() {

    fillFromMessage = "";

    this.notificationMessege = document.getElementById("notificationMessege");
    this.notificationLabel = document.getElementById("notificationLabel");

    this.applicationSelected = document.getElementById("applicationSelected");
    document.getElementById("send").addEventListener("click", sendNotification);

    this.application = document.getElementById("applications");

    document.getElementById("fillFromMessage").style.visibility = "hidden";

    getApplications();
}


function sendNotification(event) {
    event.preventDefault();
    var app = application[application.selectedIndex].value;
    var xhttp = new XMLHttpRequest(), method = "POST"
    var url = "http://192.168.1.125:3000/sendNotificationToApplication/" + app;

    var notification = {
        "body": document.getElementById("body").value,
        "title": document.getElementById("title").value
    };

    console.log(app, notification);
    
    //añado los tokens a los que deben enviarse la notificacion
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = JSON.parse(xhttp.responseText);
            //si hay respuesta muestro una alerta con las estadísticas que manda NodeJs
            if (res != null) {alert("Notification done!");}
        }
    };
    xhttp.open(method, url, true);
    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhttp.send(JSON.stringify(notification));
}

function showApplications() {
    //comprueba que el checkbox seleccionado es el indicado para mostrar el select de aplicaciones
    //en caso contrario lo oculta
    if (applicationSelected.checked == true) {
        document.getElementById("fillFromMessage").style.visibility = "visible";
    }
    else {
        document.getElementById("fillFromMessage").style.visibility = "hidden";
    }
}

function getApplications() {
    var xhttp = new XMLHttpRequest(), method = "GET", url = "http://192.168.1.125:3000/apps";
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