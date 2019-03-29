window.onload = inicializar;

var formUser;
var adminsCharged;
var adminNameModal, inputEmail, userNameInput, inputPassword, applicationsSelect

function inicializar() {
  formUser = document.getElementById("dataTable");
  adminNameModal = document.getElementById("adminNameModal");
  inputEmail = document.getElementById("inputEmail");
  userNameInput = document.getElementById("userNameInput");
  inputPassword = document.getElementById("inputPassword");
  applicationsSelect = document.getElementById("applications");

  listAllUsers();
  fillApplicationsNewAdmin();
}

function createAdmin(event) {
  event.preventDefault();
  if (document.getElementById("inputEmailNew").value == "" ||
    document.getElementById("inputUserNameNew").value == "" ||
    document.getElementById("inputPasswordNew").value == "") {
    alert("fill all pls")
  } else {
    var xhttp = new XMLHttpRequest(), method = "POST", url = "http://localhost:3000/admin";
    var newAdmin = {
      "userName": document.getElementById("inputUserNameNew").value,
      "email": document.getElementById("inputEmailNew").value,
      "password": document.getElementById("inputPasswordNew").value,
      "discriminator": 0,
      "applicationName": document.getElementById("applicationsNewAdmin")[document.getElementById("applicationsNewAdmin").selectedIndex].text
    }
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        admin = JSON.parse(xhttp.responseText);
        if (admin != null) {
          alert("Admin creado");
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
        document.getElementById("applicationsNewAdmin").innerHTML = apps;
      }
    }
  };
  xhttp.open(method, url, true);
  xhttp.send();
}


function deleteAdmin() {
  var xhttp = new XMLHttpRequest(), method = "DELETE", url = "http://localhost:3000/admin/" + inputEmail.placeholder;
  xhttp.onreadystatechange = function () {

    if (this.readyState == 4 && this.status == 200) {
      res = JSON.parse(xhttp.responseText);
      if (res != null) {
        alert("delete " + res + " admin")
        listAllUsers();
      }
    }
  };
  xhttp.open(method, url, true);
  xhttp.send();
}

function fillModalAdmin(email, userName, password, discriminator) {
  adminNameModal.innerHTML = email;
  inputEmail.placeholder = email;
  userNameInput.placeholder = userName;
  inputPassword.placeholder = password;
  var root;
  if (applicationsSelect[applicationsSelect.selectedIndex].text == 'True') { root = 1; }
  applicationsSelect.selectedIndex = root;
  document.getElementById("defaultOpen").click();
  fillApplicationsFromAdmin();
}

function fillApplicationsFromAdmin() {
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

function updateAdmin() {

  if (inputEmail.value == "" || userNameInput.value == "" || inputPassword.value == "") { alert("fill all inputs please!"); }
  else {
    var xhttp = new XMLHttpRequest(), method = "PUT", url = "http://localhost:3000/admin/" + inputEmail.placeholder;
    var root;
    if (applicationsSelect[applicationsSelect.selectedIndex].text == 'True') { root = 1; }
    else { root = 0; }
    var updatedAdmin = {
      "userName": userNameInput.value,
      "email": inputEmail.value,
      "password": inputPassword.value,
      "discriminator": root
    }
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        admin = JSON.parse(xhttp.responseText);
        if (admin != null) {
          alert("Admin Actualizada");
          listAllUsers();
        }
      }
    };
    xhttp.open(method, url, true);
    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhttp.send(JSON.stringify(updatedAdmin));
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

  var xhttp = new XMLHttpRequest(), method = "GET", url = "http://localhost:3000/admins";

  xhttp.onreadystatechange = function () {

    if (this.readyState == 4 && this.status == 200) {
      admins = JSON.parse(xhttp.responseText);
      adminsCharged = admins;
      if (admins != null) { printAdmins(admins); }
    }
  };
  xhttp.open(method, url, true);
  xhttp.send();
}

function printAdmins(adminsResult) {
  var admins;

  for (var i = 0; i < adminsResult.length; i++) {
    if (i == 0) {
      admins = "<tr onclick=fillModalAdmin("
        + "'" + adminsResult[i].email + "'," + "'" + adminsResult[i].userName + "',"
        + "'" + adminsResult[i].password + "'," + "'" + adminsResult[i].discriminator + "',"
        + ")><td>" + adminsResult[i].email + "</td><td>" + adminsResult[i].userName
        + "</td><td>" + adminsResult[i].password.substring(0, 10) + "...</td>"
        + "</td><td>" + adminsResult[i].discriminator + "</td>"
        + "</td><td>" + adminsResult[i].createdAt.substring(0, 10) + "</td>"
        + "</td><td>" + adminsResult[i].updatedAt.substring(0, 10) + "</td></tr>";
    } else {
      admins += "<tr onclick=fillModalAdmin("
        + "'" + adminsResult[i].email + "'," + "'" + adminsResult[i].userName + "',"
        + "'" + adminsResult[i].password + "'," + "'" + adminsResult[i].discriminator + "',"
        + ")><td>" + adminsResult[i].email + "</td><td>" + adminsResult[i].userName
        + "</td><td>" + adminsResult[i].password.substring(0, 10) + "...</td>"
        + "</td><td>" + adminsResult[i].discriminator + "</td>"
        + "</td><td>" + adminsResult[i].createdAt.substring(0, 10) + "</td>"
        + "</td><td>" + adminsResult[i].updatedAt.substring(0, 10) + "</td></tr>";
    }
  }
  formUser.innerHTML = admins;
}
