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

function generateChart(htmldoc, type, labels, datasets, options) {

  new Chart(htmldoc, {
    type: type,
    labels: labels,
    data: {
      labels: labels,
      datasets: datasets
    },
    options: options
  });
}

function createAdmin(event) {
  event.preventDefault();
  if (checkFormCreate()) {
    alert("fill all pls")
  } else {
    var method = "POST", url = "http://localhost:3000/admin";
    var newAdmin = {
      "userName": document.getElementById("inputUserNameNew").value,
      "email": document.getElementById("inputEmailNew").value,
      "password": document.getElementById("inputPasswordNew").value,
      "discriminator": 0,
      "applicationName": document.getElementById("applicationsNewAdmin")[document.getElementById("applicationsNewAdmin").selectedIndex].text
    }
    postPutAdmin(method, url, newAdmin);
  }
}

function checkFormCreate() {
  if (document.getElementById("inputEmailNew").value == "" ||
    document.getElementById("inputUserNameNew").value == "" ||
    document.getElementById("inputPasswordNew").value == "") {
    return true;
  } else { return false; }
}

function postPutAdmin(method, url, Admin) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      admin = JSON.parse(xhttp.responseText);
      if (admin != null) {
        if (method == "POST") {
          alert("Admin creado");
          $('#showAdmin').modal('hide');
        } else {
          alert("Admin actualizado");
          $('#showAdmin').modal('hide');
        }
        listAllUsers();
      }
    }
  };
  xhttp.open(method, url, true);
  xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhttp.send(JSON.stringify(Admin));
}

function fillApplicationsNewAdmin() {
  var xhttp = new XMLHttpRequest(), method = "GET", url = "http://localhost:3000/apps";
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      applications = JSON.parse(xhttp.responseText);
      if (applications != null) {
        printApplicationsNewAdmin(applications);
      }
    }
  };
  xhttp.open(method, url, true);
  xhttp.send();
}

function printApplicationsNewAdmin(applications) {
  var apps;
  for (var i = 0; i < applications.length; i++) {
    apps += "<option>" + applications[i].applicationName + "</option>";
  }
  document.getElementById("applicationsNewAdmin").innerHTML = apps;
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
            apps = giveFormatApplicationsFromAdmin(applications, i);
          } else {
            apps += giveFormatApplicationsFromAdmin(applications, i);
          }
        }
        document.getElementById("applicationAdminTable").innerHTML = apps;
      }
    }
  };
  xhttp.open(method, url, true);
  xhttp.send();
}
function giveFormatApplicationsFromAdmin(applications, i) {
  return "<tr><td>" + applications.applications[i].applicationName + "</td>"
    + "<td>" + applications.applications[i].tokenApplication.substring(0, 10) + "</td>"
    + "<td>" + applications.applications[i].createdAt.substring(0, 10) + "</td>"
    + "<td>" + applications.applications[i].updatedAt.substring(0, 10) + "</td></tr>";
}
function checkUpdateadmin() {
  if (inputEmail.value == "" || userNameInput.value == "" || inputPassword.value == "") {
    return true;
  } else { return false; }
}
function updateAdmin(event) {
  event.preventDefault();
  if (inputEmail.value == "" || userNameInput.value == "" || inputPassword.value == "") { alert("fill all inputs please!"); }
  else {
    var xhttp = new XMLHttpRequest(), method = "PUT", url = "http://localhost:3000/admin/" + inputEmail.placeholder;

    var root;
    if (applicationsSelect[applicationsSelect.selectedIndex].text == 'True') { root = 1; }
    else { root = 0; }
    var newAdmin = {
      "userName": userNameInput.value,
      "email": inputEmail.value,
      "password": inputPassword.value,
      "discriminator": root
    }
    postPutAdmin(method, url, newAdmin);
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
      admins = giveFormatAdmins(adminsResult, i);
    } else {
      admins += giveFormatAdmins(adminsResult, i);
    }
  }
  formUser.innerHTML = admins;
}

function giveFormatAdmins(adminsResult, i) {
  return "<tr onclick=fillModalAdmin("
    + "'" + adminsResult[i].email + "'," + "'" + adminsResult[i].userName + "',"
    + "'" + adminsResult[i].password + "'," + "'" + adminsResult[i].discriminator + "',"
    + ")><td>" + adminsResult[i].email + "</td><td>" + adminsResult[i].userName
    + "</td><td>" + adminsResult[i].password.substring(0, 10) + "...</td>"
    + "</td><td>" + adminsResult[i].discriminator + "</td>"
    + "</td><td>" + adminsResult[i].createdAt.substring(0, 10) + "</td>"
    + "</td><td>" + adminsResult[i].updatedAt.substring(0, 10) + "</td></tr>";
}
