
var clientList;
var foto = "/images/working.png";

function inicializar(){clientList = document.getElementById("form-clientList");}

var xhttp = new XMLHttpRequest(),method = "GET",  url = "http://192.168.201.76:3000/users" ;

xhttp.onreadystatechange = function() {
    
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       admin = JSON.parse(xhttp.responseText);


       if (admin != null) {

        var apps;
        
        for (var i = 0 ; i<admin.length; i++){
          if (i == 0) {
            apps = "<tr><td>"+admin[i].idUser+"</td><td>"+admin[i].userName+"</td><td>"+admin[i].email+"</td></tr>";
          } else {
            apps += "<tr><td>"+admin[i].idUser+"</td><td>"+admin[i].userName+"</td><td>"+admin[i].email+"</td></tr>";
          }
        }
        document.getElementById("form-clientList").innerHTML= apps;
       }
    }
};
xhttp.open(method, url , true);
xhttp.send();
