window.onload = inicializar;
var clientList;
var foto = "/images/working.png";

function inicializar() {
  clientList = document.getElementById("form-clientList");
  listUsers();
}



function listUsers() {
  var xhttp = new XMLHttpRequest(), method = "GET", url = "http://localhost:3000/users";

  xhttp.onreadystatechange = function () {

    if (this.readyState == 4 && this.status == 200) {
      admin = JSON.parse(xhttp.responseText);
      if (admin != null) {
        var apps;
        for (var i = 0; i < admin.length; i++) {
          if (i == 0) {
            apps = "<tr onclick=fillModalClient(" + "'" + admin[i].email + "'" + ")" + "><td>" + admin[i].userName + "</td><td>"
              + admin[i].email + "</td>" + "<td>" + admin[i].password + "</td>" + "<td>" + admin[i].createdAt + "</td>" + "<td>" + admin[i].updatedAt + "</td>" + "</tr>";
          } else {
            apps += "<tr onclick=fillModalClient(" + "'" + admin[i].email + "'" + ")" + "><td>" + admin[i].userName + "</td><td>"
              + admin[i].email + "</td>" + "<td>" + admin[i].password + "</td>" + "<td>" + admin[i].createdAt + "</td>" + "<td>" + admin[i].updatedAt + "</td>" + "</tr>";
          }
        }
        document.getElementById("form-clientList").innerHTML = apps;
      }
    }
  };
  xhttp.open(method, url, true);
  xhttp.send();
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
