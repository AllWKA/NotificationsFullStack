console.log("hola");

var labels = [];
var datasets = [];

let myChart = document.getElementById("myCanvas").getContext('2d');

var xhttp = new XMLHttpRequest(), method = "GET", url = "http://localhost:3000/tokenNotifications";
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        tokenNotifications = JSON.parse(xhttp.responseText);
        if (tokenNotifications != null) {
            console.log(JSON.stringify(tokenNotifications));

            for (var i = 0; i < tokenNotifications.length; i++) {
                labels.push(tokenNotifications[i].createdAt.substring(5, 10));
                // if (tokenNotifications[i].success) {
                //     datasets.push({
                //         data: 1
                //     });
                // } else {
                //     datasets.push({
                //         data: 0
                //     });
                // }

            }
            console.log(labels, datasets);

            let massPopChart = new Chart(myChart, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: datasets
                }
            });
        }
    }
};
xhttp.open(method, url, true);
xhttp.send();

