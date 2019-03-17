window.onload = initialize;

var notificationMessege;
var notificationLabel;
var notificationDate;
var applicationSelected;
var applications;

var applications;

function initialize() {
    this.notificationMessege = document.getElementById("notificationMessege");
    this.notificationLabel = document.getElementById("notificationLabel");
    // this.notificationDate = document.getElementById("deliveyDate");
    this.applicationSelected = document.getElementById("applicationSelected");

    document.getElementById("send").addEventListener("click", getTokens);

    getApplications();
}


function sendNotification(tokens) {

    var notification = {};

    var xhttp = new XMLHttpRequest(), method = "POST", url = "http://localhost:3000/sendNotification";

    notification.notification = {
        "body": document.getElementById("notificationMessege").value,
        "title": document.getElementById("notificationLabel").value
    };

    notification.users = tokens;

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            var res = JSON.parse(xhttp.responseText);

            if (res != null) { alert("Notification done!", res); }
        }
    };
    xhttp.open(method, url, true);
    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhttp.send(JSON.stringify(notification));

}

function getTokens(event) {
    event.preventDefault();

    if (applicationSelected.checked == true) {
        var xhttp = new XMLHttpRequest(), method = "GET", url = "http://localhost:3000/usersFromApp/" + document.getElementById("applications").value;

        xhttp.onreadystatechange = function () {

            if (this.readyState == 4 && this.status == 200) {
                // Typical action to be performed when the document is ready:
                tokens = JSON.parse(xhttp.responseText);
                if (tokens != null) {
                    sendNotification(tokens);
                }
            }
        };
        xhttp.open(method, url, true);
        xhttp.send();


    } else {
        alert("Any Application Seleccted");
    }
}

function showApplications() {
    if (applicationSelected.checked == true) { document.getElementById("applications").style.visibility = "visible"; }
    else { document.getElementById("applications").style.visibility = "hidden"; }
}

function getApplications() {

    var xhttp = new XMLHttpRequest(), method = "GET", url = "http://localhost:3000/apps";
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            var applications = JSON.parse(xhttp.responseText);

            if (applications != null) {
                this.applications = applications;

                var apps;

                for (var i = 0; i < applications.length; i++) {
                    if (i == 0) {
                        apps = "<option>"
                            + applications[i].aplicationName + "</option>";
                    } else {
                        apps += "<option>"
                            + applications[i].aplicationName + "</option>";
                    }
                }
                document.getElementById("applications").innerHTML = apps;
            }
        }
    };
    xhttp.open(method, url, true);
    xhttp.send();
}