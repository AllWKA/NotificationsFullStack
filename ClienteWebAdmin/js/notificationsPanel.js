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
    getApplications();
}


function sendNotification(){
    var xhttp = new XMLHttpRequest(), method = "GET", url = "http://localhost:3000/";
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            var applications = JSON.parse(xhttp.responseText);

            if (applications != null) {
                
                
                
            }
        }
    };
    xhttp.open(method, url, true);
    xhttp.send();
}



function showApplications() {
    if (applicationSelected.checked == true) 
    {document.getElementById("applications").style.visibility = "visible";} 
    else {document.getElementById("applications").style.visibility = "hidden";}
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