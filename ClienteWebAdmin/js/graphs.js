var labels = [];
var datasets = [];

let myChart = document.getElementById("myCanvas").getContext('2d');
let options = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
};

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

getSuccessFromApplication();
function getSuccessFromApplication() {
    var xhttp = new XMLHttpRequest(), method = "GET",
        url = "http://192.168.1.111:3000/tokenNotificationFromApplicationSuccess/superApp";
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            tokenNotifications = JSON.parse(xhttp.responseText);
            if (tokenNotifications != null) {
                datasets.push({
                    label: 'success',
                    data: [tokenNotifications.length],
                    backgroundColor: [
                        'green'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 1
                })
                getFailedFromApplication()
            }

        }
    };
    xhttp.open(method, url, true);
    xhttp.send();
}

function getFailedFromApplication() {
    var xhttp = new XMLHttpRequest(), method = "GET",
        url = "http://192.168.1.111:3000/tokenNotificationFromApplicationFailed/superApp";
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            tokenNotifications = JSON.parse(xhttp.responseText);
            if (tokenNotifications != null) {
                datasets.push({
                    label: 'failed',
                    data: [tokenNotifications.length],
                    backgroundColor: [
                        'red'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 1
                })
                generateChart(myChart, 'bar', [], datasets, options);
            }
        }
    };
    xhttp.open(method, url, true);
    xhttp.send();
}






