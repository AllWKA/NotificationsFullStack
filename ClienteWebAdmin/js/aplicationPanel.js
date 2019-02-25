
var applicationList;


function inicializar(){
    applicationList = document.getElementById("form-applicationList");
    
    console.log("ale1");
    
}
var xhttp = new XMLHttpRequest(),method = "GET",  url = "http://192.168.201.76:3000/apps" ;
xhttp.onreadystatechange = function() {
    
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       admin = JSON.parse(xhttp.responseText);


       if (admin != null) {

        var apps;
        
        console.log(admin.length);
        for (var i = 0 ; i<admin.length; i++){
          apps += "<tr><td>"+admin[i].aplicationName+"</td><td>"+admin[i].tokenAplication+"</td></tr>";
          console.log(admin[i].aplicationName,i);
        }
        
        document.getElementById("form-applicationList").innerHTML= apps;
       }
    }
};
xhttp.open(method, url , true);
xhttp.send();
