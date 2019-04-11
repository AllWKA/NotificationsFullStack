//TODO: LOS MENSAJES YA NO SON UNICOS POR SU BODY!!!!!!!!!!!!!!!!!

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
    this.messageSelct = document.getElementById("messageFromApplications");

    document.getElementById("fillFromMessage").style.visibility = "hidden";

    getApplications();
}


function sendNotification(event) {
    event.preventDefault();

    //TODO: cambiar, los mensajes ya no son únicos
    var notification = {};
    var app = application[application.selectedIndex].value;
    var xhttp = new XMLHttpRequest(), method = "POST"
    var url = "http://192.168.1.137:3000/sendNotificationToApplication/"
        + app + "/" + messages[messageSelct.selectedIndex].body;

    notification.notification = {
        "body": messages[messageSelct.selectedIndex].body,
        "title": messages[messageSelct.selectedIndex].title
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
function printMessages(messages) {
    this.messages = messages;
    var showMessages;
    for (var i = 0; i < messages.length; i++) {
        //añado las aplicaciones con el formato de option para mostrarlo en el html
        if (i == 0) {
            showMessages = "<option>"
                + messages[i].body + " - " + messages[i].label + "-" + messages[i].title + "</option>";
        } else {
            showMessages += "<option>"
                + messages[i].body + " - " + messages[i].label + "-" + messages[i].title + "</option>";
        }
    }
    //estabezco en el html las aplicaciones cn el formato necesario
    document.getElementById("messageFromApplications").innerHTML = showMessages;

}

function getApplications() {
    var xhttp = new XMLHttpRequest(), method = "GET", url = "http://192.168.1.137:3000/apps";
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