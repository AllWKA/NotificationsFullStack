window.onload = inicializar;

var formUser;
var clientsCharged;
var clientNameModal, inputEmail, userNameInput, inputPassword, applicationsSelect, appFromClient

function inicializar() {
  formUser = document.getElementById("dataTable");
  clientNameModal = document.getElementById("clientNameModal");
  inputEmail = document.getElementById("inputEmail");
  userNameInput = document.getElementById("clientsNameInput");
  inputPassword = document.getElementById("inputPassword");
  applicationsSelect = document.getElementById("applications");
  appFromClient = document.getElementById("applicationFromClient")
  listAllUsers();
  fillApplicationsNewAdmin();
}

function createClient(event) {
  event.preventDefault();
  if (document.getElementById("inputEmailNew").value == "" ||
    document.getElementById("inputUserNameNew").value == "" ||
    document.getElementById("inputPasswordNew").value == "") {
    alert("fill all pls")
  } else {
    var xhttp = new XMLHttpRequest(), method = "POST", url = "http://localhost:3000/user";
    var newAdmin = {
      "userName": document.getElementById("inputUserNameNew").value,
      "email": document.getElementById("inputEmailNew").value,
      "password": document.getElementById("inputPasswordNew").value,
      "applicationName": document.getElementById("applicationsNewClient")[document.getElementById("applicationsNewClient").selectedIndex].text
    }
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        client = JSON.parse(xhttp.responseText);
        if (client != null) {
          alert("Client created");
          listAllUsers();
        }
      }
    };
    xhttp.open(method, url, true);
    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhttp.send(JSON.stringify(newAdmin));
  }
}

function fillApplicationsNewAdmin() {
  var xhttp = new XMLHttpRequest(), method = "GET", url = "http://localhost:3000/apps";
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      applications = JSON.parse(xhttp.responseText);
      if (applications != null) {
        var apps;
        for (var i = 0; i < applications.length; i++) {
          apps += "<option>" + applications[i].applicationName + "</option>";
        }
        document.getElementById("applicationsNewClient").innerHTML = apps;
      }
    }
  };
  xhttp.open(method, url, true);
  xhttp.send();
}


function deleteClient(event) {
  event.preventDefault();
  var xhttp = new XMLHttpRequest(), method = "DELETE", url = "http://localhost:3000/user/"
    + inputEmail.placeholder + "/" + appFromClient.innerHTML
  xhttp.onreadystatechange = function () {

    if (this.readyState == 4 && this.status == 200) {
      res = JSON.parse(xhttp.responseText);
      if (res != null) {
        alert("delete " + res + " client")
        //close modal
        $('#showClient').modal('hide');
        listAllUsers();
      }
    }
  };
  xhttp.open(method, url, true);
  xhttp.send();
}

function fillModalClient(email, userName, password, applicationName) {
  document.getElementById("defaultOpen2").click();
  clientNameModal.innerHTML = email;
  inputEmail.placeholder = email;
  userNameInput.placeholder = userName;
  inputPassword.placeholder = password;
  appFromClient.innerHTML = applicationName;
}

function fillApplicationFromClient() {
  var xhttp = new XMLHttpRequest(), method = "GET", url = "http://localhost:3000/appsFromAdmin/" + inputEmail.placeholder;
  xhttp.onreadystatechange = function () {

    if (this.readyState == 4 && this.status == 200) {
      applications = JSON.parse(xhttp.responseText);
      if (applications != null) {
        var apps;
        for (var i = 0; i < applications.applications.length; i++) {
          if (i == 0) {
            apps = "<tr><td>" + applications.applications[i].applicationName + "</td>" + "<td>" + applications.applications[i].tokenApplication + "</td>" +
              "<td>" + applications.applications[i].createdAt + "</td>" + "<td>" + applications.applications[i].updatedAt + "</td>" + "</tr>";
          } else {
            apps += "<tr><td>" + applications.applications[i].applicationName + "</td>" + "<td>" + applications.applications[i].tokenApplication + "</td>" +
              "<td>" + applications.applications[i].createdAt + "</td>" + "<td>" + applications.applications[i].updatedAt + "</td>" + "</tr>";
          }
        }
        document.getElementById("applicationAdminTable").innerHTML = apps;
      }
    }
  };
  xhttp.open(method, url, true);
  xhttp.send();
}

function updateClient(event) {
  event.preventDefault();
  if (inputEmail.value == "" || userNameInput.value == "" || inputPassword.value == "") { alert("fill all inputs please!"); }
  else {
    var xhttp = new XMLHttpRequest(), method = "PUT", url = "http://localhost:3000/user/"
      + inputEmail.placeholder + "/" + appFromClient.innerHTML;
    var updatedClient = {
      "userName": userNameInput.value,
      "email": inputEmail.value,
      "password": inputPassword.value
    }
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        client = JSON.parse(xhttp.responseText);
        if (client != null) {
          alert("Cliente Actualizada");
          listAllUsers();
        }
      }
    };
    xhttp.open(method, url, true);
    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhttp.send(JSON.stringify(updatedClient));
  }

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

function listAllUsers() {
  var xhttp = new XMLHttpRequest(), method = "GET", url = "http://localhost:3000/users";
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      clients = JSON.parse(xhttp.responseText);
      clientsCharged = clients;
      if (clients != null) { printAdmins(clients); }
    }
  };
  xhttp.open(method, url, true);
  xhttp.send();
}
function printAdmins(clientsResult) {
  var clients;
  for (var i = 0; i < clientsResult.length; i++) {
    if (i == 0) {
      clients = "<tr onclick=fillModalClient("
        + "'" + clientsResult[i].email + "'," + "'" + clientsResult[i].userName + "',"
        + "'" + clientsResult[i].password + "'," + "'" + clientsResult[i].applicationName + "',"
        + ")><td>" + clientsResult[i].email + "</td><td>" + clientsResult[i].userName
        + "</td><td>" + clientsResult[i].password.substring(0, 10) + "...</td>"
        + "<td>" + clientsResult[i].applicationName
        + "</td><td>" + clientsResult[i].createdAt.substring(0, 10) + "</td>"
        + "</td><td>" + clientsResult[i].updatedAt.substring(0, 10) + "</td></tr>";

    } else {
      clients += "<tr onclick=fillModalClient("
        + "'" + clientsResult[i].email + "'," + "'" + clientsResult[i].userName + "',"
        + "'" + clientsResult[i].password + "'," + "'" + clientsResult[i].applicationName + "',"
        + ")><td>" + clientsResult[i].email + "</td><td>" + clientsResult[i].userName
        + "</td><td>" + clientsResult[i].password.substring(0, 10) + "...</td>"
        + "<td>" + clientsResult[i].applicationName
        + "</td><td>" + clientsResult[i].createdAt.substring(0, 10) + "</td>"
        + "</td><td>" + clientsResult[i].updatedAt.substring(0, 10) + "</td></tr>";
    }
  }
  formUser.innerHTML = clients;
}
