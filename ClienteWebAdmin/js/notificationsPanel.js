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
    this.notificationDate = document.getElementById("deliveyDate");
    this.applicationSelected = document.getElementById("applicationSelected");

    document.getElementById("send").addEventListener("click", sendNotification);

    getApplications();
}


function sendNotification(event) {
    event.preventDefault();
    console.log("lanzando notification");
    var notification = {};

    var xhttp = new XMLHttpRequest(), method = "POST", url = "http://localhost:3000/sendNotification";
    // https://fcm.googleapis.com/fcm/send

    notification.to = "eEvuXca6t8o:APA91bF4TG9wkBdvmyA1C2BYfThIAUH8nKWRVkaiaozz1NC0IduXsI3ftNcBIELUSoW3a1hNSMeB2lx68QxCEQ4Ekvf1lJOF-hxb7_EvZa4rmpkRBuY_WZFj1qWLOhaoQibUFhJpALc4";
    notification.notification = {
        "body": "jaja equisde",
        "title": "Title of Your Notification"
    };


    xhttp.onreadystatechange = function () {
        console.log("hola?");

        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            var applications = JSON.parse(xhttp.responseText);

            if (applications != null) {

                alert("Notification done!");

            }
        }
    };
    xhttp.open(method, url, true);
    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    // xhttp.setRequestHeader('Authorization', 'key=AAAA1FvitlI:APA91bGjYNqGuqE_F9kJkRp0kr_x23ytrLaMISay0VS7oWsmET2kF5oVN9vBpUljFi39pQisoInHMl9WoAPb53LWvgHM3ayAzX6b-XGi5jb9mcG2X1jjReaSjjM4wRZMDTXXdVg8XK7I');
    // xhttp.send(JSON.stringify(notification));
    xhttp.send();
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
                        apps = "<option value=" + applications[i].aplicationName + ">"
                            + applications[i].aplicationName + "</option>";
                    } else {
                        apps += "<option value=" + applications[i].aplicationName + ">"
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