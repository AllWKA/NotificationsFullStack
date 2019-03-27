window.onload = inicializar;
var formUser;
var adminsCharged;

var adminNameModal, inputEmail, userNameInput, inputPassword

function inicializar() {
  /*formVerUser = document.getElementById("form-verUsers");
  formVerUser.addEventListener("submit", listAllUsers, false);
  console.log("ale1");*/
  formUser = document.getElementById("dataTable");
  adminNameModal = document.getElementById("adminNameModal");
  inputEmail = document.getElementById("inputEmail");
  userNameInput = document.getElementById("userNameInput");
  inputPassword = document.getElementById("inputPassword");
  listAllUsers();

}

function fillModalAdmin(email, userName, password, discriminator) {
  adminNameModal.innerHTML = email;
  inputEmail.placeholder = email;
  userNameInput.placeholder = userName;
  inputPassword.placeholder = password;

}

function updateAdmin() {
  if (condition) {
    var xhttp = new XMLHttpRequest(), method = "PUT", url = "http://localhost:3000/user/" + idUser;
    xhttp.onreadystatechange = function () {

      if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        admin = JSON.parse(xhttp.responseText);


        if (admin != null) {

          alert("Aplicación Actualizada");


        }
      }
    };
    xhttp.open(method, url, true);
    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhttp.send(JSON.stringify(app));
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
      // Typical action to be performed when the document is ready:
      admin = JSON.parse(xhttp.responseText);
      adminsCharged = admin;

      if (admin != null) {

        var admins;

        for (var i = 0; i < admin.length; i++) {
          if (i == 0) {
            admins = "<tr onclick=fillModalAdmin("
              + "'" + admin[i].email + "'," + "'" + admin[i].userName + "',"
              + "'" + admin[i].password + "'," + "'" + admin[i].discriminator + "',"
              + ")><td>" + admin[i].email + "</td><td>" + admin[i].userName
              + "</td><td>" + admin[i].password + "</td>"
              + "</td><td>" + admin[i].discriminator + "</td>"
              + "</td><td>" + admin[i].createdAt + "</td>"
              + "</td><td>" + admin[i].updatedAt + "</td></tr>";
          } else {
            admins += "<tr onclick=fillModalAdmin("
              + "'" + admin[i].email + "'," + "'" + admin[i].userName + "',"
              + "'" + admin[i].password + "'," + "'" + admin[i].discriminator + "',"
              + ")><td>" + admin[i].email + "</td><td>" + admin[i].userName
              + "</td><td>" + admin[i].password + "</td>"
              + "</td><td>" + admin[i].discriminator + "</td>"
              + "</td><td>" + admin[i].createdAt + "</td>"
              + "</td><td>" + admin[i].updatedAt + "</td></tr>";
          }
        }
        formUser.innerHTML = admins;
      }
    }
  };
  xhttp.open(method, url, true);
  xhttp.send();


}
