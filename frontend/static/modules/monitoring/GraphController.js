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
        '#cdffd2',
        '#fffcb6',
        '#99c4ff',
        '#d9baff',
        '#ffc1f4',
        '#ffab00',
        '#cd87ff',
        '#bbf1ff',
        '#9584ff',
        '#e2ffc8',
        '#b8ffe0'
    ];
    /**
     * Border colors
     * @memberOf GraphController
     */
    const borderColor = [
        '#e4425b',
        '#42ff5a',
        '#ffff0c',
        '#0065ff',
        '#9711ff',
        '#ff20df',
        '#ffab00',
        '#cd87ff',
        '#14e9ff',
        '#4a1aff',
        '#d4ff0b',
        '#06ffa2'
    ];
    /**
     * Load indicator
     * @memberOf GraphController
     */
    this.loadCurve = function () {
        let data = {
            labels: [
            ],
            datasets: [{
                data: [
                    50, 0, 100, 100, 50, 0
                ],
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                label: 'Monitoring'
            }],
        };
        let options = {
            responsive: false,
            tooltips: {
                enabled: false
            },
            legend: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        callback: function (value) {
                            if (value == 100) {
                                return "Appropriated";
                            } else if (value == 50) {
                                return "Uncertain";
                            } else if (value == 0) {
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
            responsive: false,
            tooltips: {
                enabled: false
            },
            legend: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        callback: function (value) {
                            if (value == 100) {
                                return "Appropriated";
                            } else if (value == 50) {
                                return "Uncertain";
                            } else if (value == 0) {
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
     * Initialize graph controller
     * @memberOf GraphController
     */
    this.init = function () {
        this.loadOverall();
        this.loadCurve();
    }
}