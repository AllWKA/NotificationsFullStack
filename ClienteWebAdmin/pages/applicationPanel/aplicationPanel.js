
var applicationList;


function inicializar() { applicationList = document.getElementById("form-applicationList"); }

var xhttp = new XMLHttpRequest(), method = "GET", url = "http://localhost:3000/apps";
xhttp.onreadystatechange = function () {

  if (this.readyState == 4 && this.status == 200) {
    admin = JSON.parse(xhttp.responseText);

    if (admin != null) {

      var apps;

      console.log(admin.length);
      for (var i = 0; i < admin.length; i++) {
        apps += "<tr><td>" + admin[i].aplicationName + "</td><td>" + admin[i].tokenAplication + "</td></tr>";

      }

      document.getElementById("form-applicationList").innerHTML = apps;
    }
  }
};
xhttp.open(method, url, true);
xhttp.send();
