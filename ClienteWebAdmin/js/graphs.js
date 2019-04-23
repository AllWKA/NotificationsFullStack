onload = start;

var chart, refresh, dataToSee, applications, tokens, topics, message;

function start() {
    chart = document.getElementById("myCanvas").getContext('2d');
    dataToSee = document.getElementById("dataToSee");
    refresh = document.getElementById("refresh").addEventListener("click", refresh);
    applications = document.getElementById("selectApplication");
    tokens = document.getElementById("selectTokenFromApplication");
    topics = document.getElementById("selectTopic");
    message = document.getElementById("selectMessage");
}

function refresh(event) {
    // event.preventDefault();
    var dataSelected = dataToSee.options[dataToSee.selectedIndex].value;
    var applicationSelected = applications.options[applications.selectedIndex].value;
    var tokenSelected = tokens.options[tokens.selectedIndex].value;
    var topicSelected = topics.options[topics.selectedIndex].value;
    var messageSelected = message.options[message.selectedIndex].value;

    switch (dataSelected) {
        case "Message":
            console.log("peticion a message");
            break;
        case "Notification":
            console.log("peticion a Notifications");
            break;
        case "Application":
            console.log("peticion a Applications");
            break;

        case "Topics":
            console.log("peticion a Topics");
            break;
        default:
            alert("something went worng!!")
            break;
    }

}

function applicationChanged() {

}

function getApps(name) {
    var xhttp = new XMLHttpRequest(), method = "GET", url;
    if (name == "All") {
        url = "http://192.168.1.125:3000/apps";
    } else {
        url = "http://192.168.1.125:3000/app/" + name;
    }
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            applications = JSON.parse(xhttp.responseText);
            if (applications != null) {
                console.log(applications);
            }
        }
    };
    xhttp.open(method, url, true);
    xhttp.send();
}
function getTokens() {

}
function getTopics() {

}
function getMessages() {

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















// var labels = [];
// var datasets = [];

// let myChart = document.getElementById("myCanvas").getContext('2d');
// let options = {
//     scales: {
//         yAxes: [{
//             ticks: {
//                 beginAtZero: true
//             }
//         }]
//     }
// };

// function generateChart(htmldoc, type, labels, datasets, options) {

//     new Chart(htmldoc, {
//         type: type,
//         labels: labels,
//         data: {
//             labels: labels,
//             datasets: datasets
//         },
//         options: options
//     });
// }

// getSuccessFromApplication();
// function getSuccessFromApplication() {
//     var xhttp = new XMLHttpRequest(), method = "GET",
//         url = "http://192.168.1.125:3000/tokenNotificationFromApplicationSuccess/superApp";
//     xhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             // Typical action to be performed when the document is ready:
//             tokenNotifications = JSON.parse(xhttp.responseText);
//             if (tokenNotifications != null) {
//                 datasets.push({
//                     label: 'success',
//                     data: [tokenNotifications.length],
//                     backgroundColor: [
//                         'green'
//                     ],
//                     borderColor: [
//                         'rgba(255, 99, 132, 1)'
//                     ],
//                     borderWidth: 1
//                 })
//                 getFailedFromApplication()
//             }

//         }
//     };
//     xhttp.open(method, url, true);
//     xhttp.send();
// }

// function getFailedFromApplication() {
//     var xhttp = new XMLHttpRequest(), method = "GET",
//         url = "http://192.168.1.125:3000/tokenNotificationFromApplicationFailed/superApp";
//     xhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             // Typical action to be performed when the document is ready:
//             tokenNotifications = JSON.parse(xhttp.responseText);
//             if (tokenNotifications != null) {
//                 datasets.push({
//                     label: 'failed',
//                     data: [tokenNotifications.length],
//                     backgroundColor: [
//                         'red'
//                     ],
//                     borderColor: [
//                         'rgba(255, 99, 132, 1)'
//                     ],
//                     borderWidth: 1
//                 })
//                 generateChart(myChart, 'bar', [], datasets, options);
//             }
//         }
//     };
//     xhttp.open(method, url, true);
//     xhttp.send();
// }






