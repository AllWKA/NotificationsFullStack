console.log("hola");

let myChart = document.getElementById("myCanvas").getContext('2d');


let massPopChart = new Chart(myChart, {
    type: 'line',
    data: {
        labels: ['a', 'b', 'a', 'b', 'a', 'b', 'a', 'b'],
        datasets: [{
            label: 'kasdaskld',
            data: [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]
        }, {
            label: 'kasdaskld',
            data: [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]
        }, {
            label: 'kasdaskld',
            data: [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]
        }, {
            label: 'kasdaskld',
            data: [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]
        }, {
            label: 'kasdaskld',
            data: [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]
        }, {
            label: 'kasdaskld',
            data: [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]
        }]
    }
});