window.onload = initialize;

var notificationMessege;
var notificationLabel;
var notificationDate;
var applicationSelected;

var applications;

function initialize() {
    this.notificationMessege = document.getElementById("notificationMessege");
    this.notificationLabel = document.getElementById("notificationLabel");
    this.notificationDate = document.getElementById("deliveyDate");
    this.applicationSelected = document.getElementById("applicationSelected");
    getApplications();
}



function showApplications() {
    console.log("applications pls");
    if (applicationSelected.checked == true) {
        console.log("si");
    } else {
        console.log("no");
    }
}

function getApplications() {

    console.log("getting applications");

    var xhttp = new XMLHttpRequest(), method = "GET", url = "http://localhost:3000/apps";
    xhttp.onreadystatechange = function () {
        console.log("ready");

        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            var applications = JSON.parse(xhttp.responseText);


            if (applications != null) {


                console.log(JSON.stringify(applications));


            } else {
                alert("Any app in DB");
            }
        } else {
            alert("Something went wrong");
        }
    };
    xhttp.open(method, url, true);
    xhttp.send();
}