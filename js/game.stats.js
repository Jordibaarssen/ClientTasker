Game.Stats = (function () {

    let stateMap = {
        myChart: null,
        player1: [],
        player2: [],
    };

    function privateInit() {
        let ctx = $('#myChart');
        stateMap.myChart?.destroy();
        stateMap.myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: stateMap.player1.map((value, index) => index + 1),
                datasets: [{
                    label: 'Wit',
                    data: stateMap.player1,
                    fill: false,
                    borderColor: 'rgb(255,255,255)',
                    tension: 0.1
                }, {
                    label: 'Rood',
                    data: stateMap.player2,
                    fill: false,
                    borderColor: 'rgb(255,0,0)',
                    tension: 0.1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        color: 'rgb(255,255,255)',
                        grid: {
                            color: 'rgb(255,255,255)',
                        },
                        title: {
                            color: 'rgb(255,255,255)',
                        }
                    },
                    x: {
                        color: 'rgb(255,255,255)',
                        grid: {
                            color: 'rgb(255,255,255)',
                        },
                        title: {
                            color: 'rgb(255,255,255)',
                        }
                    }
                },
            }
        });
    }

    function updateChart(data) {
        let player1 = data.map(v => v.filter(l => l === 1).length).reduce((i1, i2) => i1 + i2);
        let player2 = data.map(v => v.filter(l => l === 2).length).reduce((i1, i2) => i1 + i2);

        stateMap.player1.push(player1);
        stateMap.player2.push(player2);

        privateInit();
    }

    return {
        init: privateInit,
        updateChart,
    }
})();