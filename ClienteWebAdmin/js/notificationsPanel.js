window.onload = initialize;

var notificationMessege, notificationLabel, notificationDate, applicationSelected, applications, messageSelct, messages;

function initialize() {

    this.notificationMessege = document.getElementById("notificationMessege");
    this.notificationLabel = document.getElementById("notificationLabel");

    this.applicationSelected = document.getElementById("applicationSelected");
    document.getElementById("send").addEventListener("click", sendNotification);

    this.application = document.getElementById("applications");
    this.application.addEventListener("change", fillMessageFromApplication);

    this.messageSelct = document.getElementById("messageFromApplications");

    document.getElementById("selectApplications").style.visibility = "hidden";
    document.getElementById("selectMessges").style.visibility = "hidden";

    document.getElementById("addMessageModal").addEventListener("focus", messageShop)
    document.getElementById("addMessageModal").addEventListener("focusout", stopMusic);

    getApplications();
}
function selectMessageToAdd(docElement) {
    var selectedMessages = document.getElementById("selectedMessageToAdd");
    if (docElement.className.includes('active')) {
        docElement.className = docElement.className.substring(0, 15);
        for (let index = 1; index < selectedMessages.childNodes.length; index++) {
            if (selectedMessages.childNodes[index].childNodes[0].innerHTML == docElement.innerHTML) {
                var newSelectedMessages = document.createElement('div');
                newSelectedMessages.id = "selectedMessageToAdd";
                newSelectedMessages.className = "col-md-6 fixed-ul";
                for (let j = 0; j < selectedMessages.childNodes.length; j++) {
                    if (j != index) {
                        newSelectedMessages.appendChild(selectedMessages.childNodes[index]);
                    }
                }
                selectedMessages = newSelectedMessages;
                break;
            }
        }
    } else {
        docElement.className += ' active';
        document.getElementById("selectedMessageToAdd").innerHTML +=
            "<li><i class='far fa-times-circle' >" + docElement.innerHTML + "</i></li >";
    }


}
function stopMusic() {
    document.getElementById("shopAudio").pause();
}
function messageShop() {
    var audio = document.getElementById("shopAudio");
    audio.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
    }, false);
    audio.play();
}

function sendNotification(event) {
    event.preventDefault();

    var notification = {};
    var app = application[application.selectedIndex].value;
    var xhttp = new XMLHttpRequest(), method = "POST"
    var url = "http://192.168.1.111:3000/sendNotificationToApplication/" + app + "/" + messages[messageSelct.selectedIndex].body;
    //creo el json de la notificacin con los valores del formulario
    console.log(url);

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
        document.getElementById("selectApplications").style.visibility = "visible";
        document.getElementById("selectMessges").style.visibility = "visible";
        fillMessageFromApplication();
    }
    else {
        document.getElementById("selectApplications").style.visibility = "hidden";
        document.getElementById("selectMessges").style.visibility = "hidden";
    }
}

function fillMessageFromApplication() {
    var xhttp = new XMLHttpRequest(), method = "GET", url = "http://192.168.1.111:3000/messageFromApp/"
        + application[application.selectedIndex].value;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            var messages = JSON.parse(xhttp.responseText);
            if (messages != null) { printMessages(messages); }
        }
    };
    xhttp.open(method, url, true);
    xhttp.send();

}
function printMessages(messages) {
    this.messages = messages;
    var showMessages;
    for (var i = 0; i < messages.length; i++) {
        //añado las aplicaciones con el formato de option para mostrarlo en el html
        if (i == 0) {
            showMessages = "<option>"
                + messages[i].body + messages[i].label + messages[i].createdAt + "</option>";
        } else {
            showMessages += "<option>"
                + messages[i].body + messages[i].label + messages[i].createdAt + "</option>";
        }
    }
    //estabezco en el html las aplicaciones cn el formato necesario
    document.getElementById("messageFromApplications").innerHTML = showMessages;

}

function getApplications() {
    var xhttp = new XMLHttpRequest(), method = "GET", url = "http://192.168.1.111:3000/apps";
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