/**
 * SleepWeb
 * Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
 * Universidade de Passo Fundo - 2018/2019
 *
 * @author Matheus Hernandes
 * @since 11/11/2019
 * @namespace EvaluateController
 */
function GraphController() {
    /**
     * Reference for overall graph
     * @memberOf GraphController
     */
    let overall = null;
    /**
     * Reference for indicator graph
     * @memberOf GraphController
     */
    let curve = null;
    /**
     * Background colors
     * @memberOf GraphController
     */
    const backgroundColor = [
        '#e48f98',
        '#ffab00',
        '#99c4ff',
        '#fffcb6',
        '#d9baff',
        '#ffc1f4',
        '#cd87ff',
        '#bbf1ff',
        '#9584ff',
        '#e2ffc8',
        '#b8ffe0',
        '#cdffd2',
    ];
    /**
     * Border colors
     * @memberOf GraphController
     */
    const borderColor = [
        '#e4425b',
        '#ffab00',
        '#0065ff',
        '#ffff0c',
        '#9711ff',
        '#ff20df',
        '#cd87ff',
        '#14e9ff',
        '#4a1aff',
        '#d4ff0b',
        '#06ffa2',
        '#42ff5a',
    ];
    /**
     * Load indicator
     * @memberOf GraphController
     */
    const initCurve = function (values = [] ) {
        let data = {
            labels: [],
            datasets: [
                {
                    data: values,
                    fill: false,
                    backgroundColor: backgroundColor,
                    borderColor: borderColor,
                    label: 'Quality Curve'
                },
                {
                    data: [],
                    fill: true,
                    backgroundColor: '#0088ff',
                    borderColor: '#0074d9',
                    label: 'Result'
                }
            ],
        };
        let options = {
            backgroundColor: '#FF0000',
            responsive: true,
            tooltips: {
                enabled: false
            },
            scales: {
                yAxes: [{
                    ticks: {
                        display: true,
                        beginAtZero: true,
                    }
                }],
                xAxes: [{
                    ticks: {
                        display: true,
                        position: 'bottom',
                        beginAtZero: true,
                        autoSkip: true,
                        callback: function (value) {
                            if (value === 100) {
                                return "Appropriated";
                            } else if (value === 50) {
                                return "Uncertain";
                            } else if (value === 0) {
                                return "Unappropriated";
                            }
                            return "";
                        }
                    }
                }]
            }
        };
        curve = new Chart(document.getElementById('curve').getContext('2d'), {
            type: 'line',
            data: data,
            options: options
        });
    };
    /**
     * Load overall
     * @memberOf GraphController
     */
    this.loadOverall = function () {
        let data = {
            labels: [
                'Sleep Eficiency',
                'Sleep Latency',
                'Awakenings',
                'REM Sleep',
                'NREM 1-2',
                'NREM 3-4'
            ],
            datasets: [{
                data: [
                    50, 50, 100, 50, 100, 100
                ],
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                label: 'Monitoring'
            }],
        };
        let options = {
            responsive: true,
            tooltips: {
                enabled: false
            },
            legend: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        callback: function (value) {
                            if (value === 100) {
                                return "Appropriated";
                            } else if (value === 50) {
                                return "Uncertain";
                            } else if (value === 0) {
                                return "Unappropriated";
                            }
                            return "";
                        }
                    }
                }]
            }
        };
        overall = new Chart(document.getElementById('overall').getContext('2d'), {
            type: 'bar',
            data: data,
            options: options
        });
    };
    /**
     * Method defined to clear graph
     * @memberOf GraphController
     */
    const clearGraph = function ( chart, update = true ) {
        chart.data.labels = [];
        chart.data.datasets.forEach(dataset => dataset.data = []);
        if (update) {
            chart.update();
        }
    };
    /**
     * Method defined to update quality curve
     * @memberOf GraphController
     */
    this.updateCurve = function ( data ) {
        clearGraph(curve, false);
        let intervals = []

        data.thresholds.forEach(threshold => {
            intervals.push(threshold.quality);
            curve.data.datasets[0].data.push(threshold.quality)
        });

        curve.data.labels = intervals;
        value = data.monitoring_quality[0].value;
        curve.data.datasets[1].data.push({
            x: 100,
            y: value
        });
        curve.update();
    };
    /**
     * Method defined to clear graphics
     * @memberOf GraphController
     */
    this.clear = function () {
        clearGraph();
    };
    /**
     * Initialize graph controller
     * @memberOf GraphController
     */
    this.init = function () {
        this.loadOverall();
        initCurve();
    };
}