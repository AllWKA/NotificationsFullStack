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
  if (checkCreateClientFrom()) {
    alert("fill all pls")
  } else {
    var method = "POST", url = "http://192.168.1.111:3000/user";
    var newClient = {
      "userName": document.getElementById("inputUserNameNew").value,
      "email": document.getElementById("inputEmailNew").value,
      "password": document.getElementById("inputPasswordNew").value,
      "applicationName": document.getElementById("applicationsNewClient")[document.getElementById("applicationsNewClient").selectedIndex].text
    }
    postUpdateClient(method, url, newClient);
  }
}

function postUpdateClient(method, url, client) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      client = JSON.parse(xhttp.responseText);
      if (client != null) {
        if (method == "PUT") { alert("Client updated") }
        else { alert("Client created") }
        listAllUsers();
      }
    }
  };
  xhttp.open(method, url, true);
  xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhttp.send(JSON.stringify(client));
}

function checkCreateClientFrom() {
  if (document.getElementById("inputEmailNew").value == "" ||
    document.getElementById("inputUserNameNew").value == "" ||
    document.getElementById("inputPasswordNew").value == "") {
    return true
  } else {
    return false;
  }
}

function fillApplicationsNewAdmin() {
  var xhttp = new XMLHttpRequest(), method = "GET", url = "http://192.168.1.111:3000/apps";
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
  var xhttp = new XMLHttpRequest(), method = "DELETE", url = "http://192.168.1.111:3000/user/"
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
  fillStatsFromClient();
}

function fillStatsFromClient() {
  getTokensNotifications().then(tokenNotifications => {
    //will save the number of success and faileds
    var sortedInformation = [];
    //will save the dates
    var labelsToPost = [];
    //will search in each tokenNotification
    for (let index = 0; index < tokenNotifications.length; index++) {
      //jus for th first time adding something or not first time
      if (labelsToPost.length > 0) {
        //will say if the date now analizing is inside labels
        var exist = false;
        //searching inside labels to find the date now analizing
        for (let j = 0; j < labelsToPost.length; j++) {
          //if it exist just add 1 to success or fail
          if (tokenNotifications[index].createdAt.substring(0, 10) == labelsToPost[j]) {
            sortedInformation[labelsToPost.indexOf(tokenNotifications[index].createdAt.substring(0, 10))]++;
            exist = true;
            break;
          }
        }
        //if the date now analizing is not inside label, will add it and add 1 to the 
        //success or failed for the first time
        if (exist == false) {
          labelsToPost.push(tokenNotifications[index].createdAt.substring(0, 10));
          sortedInformation[labelsToPost.indexOf(tokenNotifications[index].createdAt.substring(0, 10))] = 1;
        }
        exist = false;
        //if it is the first iteration
      } else {
        labelsToPost.push(tokenNotifications[index].createdAt.substring(0, 10));
        sortedInformation[labelsToPost.indexOf(tokenNotifications[index].createdAt.substring(0, 10))] = 1;
      }

    }
    generateChart(document.getElementById("myCanvas").getContext('2d'), 'line', labelsToPost, [{ label: "Notification recived", data: sortedInformation }], {})
  });
}

function getTokensNotifications() {
  return new Promise((resolve, reject) => {
    var xhttp = new XMLHttpRequest(), method = "GET", url = "http://192.168.1.111:3000/tokenNotificationsFromUser/"
      + inputEmail.placeholder + "/" + appFromClient.innerHTML;
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        tokenNotification = JSON.parse(xhttp.responseText);
        if (tokenNotification != null) {
          resolve(tokenNotification);
        }
      }
    };
    xhttp.open(method, url, true);
    xhttp.send();
  })
}

function generateChart(htmldoc, type, labels, Sorteddata, options) {
  Sorteddata[0].backgroundColor = ['#0453b2'];
  new Chart(htmldoc, {
    type: type,
    labels: labels,
    data: {
      labels: labels,
      datasets: Sorteddata
    },
    options: options
  });
}

function fillApplicationFromClient() {
  var xhttp = new XMLHttpRequest(), method = "GET", url = "http://192.168.1.111:3000/appsFromAdmin/" + inputEmail.placeholder;
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      applications = JSON.parse(xhttp.responseText);
      if (applications != null) {
        printApplicationsFromUser(applications);
      }
    }
  };
  xhttp.open(method, url, true);
  xhttp.send();
}

function printApplicationsFromUser(applications) {
  var apps;
  for (var i = 0; i < applications.applications.length; i++) {
    if (i == 0) { apps = giveFormatApplicationsFromUser(applications, i); }
    else { apps += giveFormatApplicationsFromUser(applications, i); }
  }
  document.getElementById("applicationAdminTable").innerHTML = apps;
}
function giveFormatApplicationsFromUser(applications, i) {
  return "<tr><td>" + applications.applications[i].applicationName + "</td>" + "<td>" + applications.applications[i].tokenApplication + "</td>" +
    "<td>" + applications.applications[i].createdAt + "</td>" + "<td>" + applications.applications[i].updatedAt + "</td>" + "</tr>";
}
function updateClient(event) {
  event.preventDefault();
  if (inputEmail.value == "" || userNameInput.value == "" || inputPassword.value == "") { alert("fill all inputs please!"); }
  else {
    var method = "PUT"
    var url = "http://192.168.1.111:3000/user/" + inputEmail.placeholder + "/" + appFromClient.innerHTML;
    var updatedClient = {
      "userName": userNameInput.value,
      "email": inputEmail.value,
      "password": inputPassword.value
    }
    postUpdateClient(method, url, updatedClient);
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
  var xhttp = new XMLHttpRequest(), method = "GET", url = "http://192.168.1.111:3000/users";
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
      clients = giveFormatClients(clientsResult, i);

    } else {
      clients += giveFormatClients(clientsResult, i);
    }
  }
  formUser.innerHTML = clients;
}

function giveFormatClients(clientsResult, i) {
  return "<tr onclick=fillModalClient("
    + "'" + clientsResult[i].email + "'," + "'" + clientsResult[i].userName + "',"
    + "'" + clientsResult[i].password + "'," + "'" + clientsResult[i].applicationName + "',"
    + ")><td>" + clientsResult[i].email + "</td><td>" + clientsResult[i].userName
    + "</td><td>" + clientsResult[i].password.substring(0, 10) + "...</td>"
    + "<td>" + clientsResult[i].applicationName
    + "</td><td>" + clientsResult[i].createdAt.substring(0, 10) + "</td>"
    + "</td><td>" + clientsResult[i].updatedAt.substring(0, 10) + "</td></tr>";
}