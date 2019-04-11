window.onload = inicializar;
var applicationList;

var inputName, inputToken;

function inicializar() {
  this.inputName = document.getElementById("inputName");
  this.inputToken = document.getElementById("inputToken");
  applicationList = document.getElementById("form-applicationList");
  showApplications();
}

function updateApplication(event) {
  event.preventDefault();
  var updatedApp = {
    applicationName: this.inputName.value,
    tokenApplication: this.inputToken.value
  }

  postUpdateApp("PUT", "192.168.1.137:3000/app/" + this.inputName.placeholder, updatedApp);


}

function postUpdateApp(method, url, application) {
  console.log(method, url, application);

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    console.log("adios?");

    if (this.readyState == 4 && this.status == 200) {
      client = JSON.parse(xhttp.responseText);
      if (client != null) {
        if (method == "PUT") { alert("Application updated") }
        else { alert("Application created") }
        listAllUsers();
      }
    } else {
      console.log("error");

    }
  };
  xhttp.open(method, url, true);
  xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  console.log("hola?");

  xhttp.send(JSON.stringify(application));
}

//https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_tabs
function showNewTab(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

function showApplications() {
  var xhttp = new XMLHttpRequest(), method = "GET", url = "http://192.168.1.137:3000/apps";
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // Typical action to be performed when the document is ready:
      applications = JSON.parse(xhttp.responseText);
      if (applications != null) {
        var apps;
        for (var i = 0; i < applications.length; i++) {
          if (i == 0) { apps = giveFormatApps(applications, i); }
          else { apps += giveFormatApps(applications, i); }
        }
        document.getElementById("form-applicationList").innerHTML = apps;
      }
    }
  };
  xhttp.open(method, url, true);
  xhttp.send();
}

//"showApplicationModal('SuperApp','AbcDeFg')"
function showApplicationModal(applicationName, tokenApplication) {
  document.getElementById("defaultOpen3").click();
  document.getElementById("exampleModalLabel").innerHTML = applicationName;
  this.inputName.placeholder = applicationName;
  this.inputToken.placeholder = tokenApplication;
  console.log(applicationName, tokenApplication);

}

function giveFormatApps(applications, i) {
  return "<tr onclick=showApplicationModal(" + "'" + applications[i].applicationName + "',"
    + "'" + applications[i].tokenApplication + "'" + ") ><td>" + applications[i].applicationName + "</td>"
    + "<td>" + applications[i].tokenApplication + "</td>" +
    "<td>" + applications[i].createdAt.substring(0, 10) + "</td>" +
    "<td>" + applications[i].updatedAt.substring(0, 10) + "</td>" + "</tr>"
}
