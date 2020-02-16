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
     * Color palete for index
     * @memberOf GraphController
     */
    let colorBgIdx = {
        0: '#ff8c87',
        1: '#ffb089',
        2: '#ffd390',
        3: '#f1ff97',
        4: '#00df25',
    };
    let colorBorderIdx = {
        0: '#c56c68',
        1: '#d49372',
        2: '#c1a06d',
        3: '#bac872',
        4: '#03b521',
    };
    /**
     * Pick color for background on overall graph
     * @memberOf GraphController
     */
    const pickOverallBackground = function (result) {
        if (result.fa == 0) {
            return colorBgIdx[0];
        }
        if (result.fa == result.fc) {
            return colorBgIdx[4];
        }
        return colorBgIdx[2];
    };
    /**
     * Pick color for border on overall graph
     * @memberOf GraphController
     */
    const pickOverallBorder = function (result) {
        if (result.fa == 0) {
            return colorBorderIdx[0];
        }
        if (result.fa == result.fc) {
            return colorBorderIdx[4];
        }
        return colorBorderIdx[2];
    };
    /**
     * Pick color for background on curve graph
     * @memberOf GraphController
     */
    const pickCurveBackground = function (threshold) {
        if (threshold.quality == 0) {
            return colorBgIdx[0];
        }
        if (threshold.quality == threshold.weight) {
            return colorBgIdx[4];
        }
        return colorBgIdx[2];
    };
    /**
     * Pick color for border on curve graph
     * @memberOf GraphController
     */
    const pickCurveBorder = function (threshold) {
        if (threshold.quality == 0) {
            return colorBorderIdx[0];
        }
        if (threshold.quality == threshold.weight) {
            return colorBorderIdx[4];
        }
        return colorBorderIdx[2];
    };
    /**
     * Pick color for bg on curve dto graph
     *
     * @memberOf GraphController
     */
    const pickCurveDotBgColor = function (value, thresholds) {
        return pickCurveBackground(
            thresholds.filter(threshold => threshold.begin <= value && value <= threshold.end)[0]
        )
    };
    /**
     * Pick color for border on curve dot graph
     * @memberOf GraphController
     */
    const pickCurveDotBorderColor = function (value, thresholds) {
        return pickCurveBorder(
            thresholds.filter(threshold => threshold.begin <= value && value <= threshold.end)[0]
        )
    };
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
                    backgroundColor: [],
                    borderColor: [],
                    label: 'Quality Curve',
                    pointRadius: 5,
                    pointHoverRadius: 5,
                },
                {
                    data: [],
                    fill: true,
                    backgroundColor: '#0088ff',
                    borderColor: '#0074d9',
                    label: 'Result',
                    pointRadius: 10,
                    pointHoverRadius: 10,
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
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [],
                borderColor: [],
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
    const cleanGraph = function (chart, update = true ) {
        chart.data.labels = [];
        chart.data.datasets.forEach(dataset => dataset.data = []);
        chart.data.datasets[0].backgroundColor = [];
        chart.data.datasets[0].borderColor = [];
        if (update) {
            chart.update();
        }
    };
    /**
     * Method defined to get quality result
     * @memberOf GraphController
     */
    const getQualityResult = function (value, thresholds) {
        return thresholds
            .filter(threshold => threshold.begin <= value && value <= threshold.end)[0].quality;
    };
    /**
     * Method defined to update overall graph
     * @memberOf GraphController
     */
    this.updateOverall = function ( data ) {
        cleanGraph(overall, false);
        if ($.isEmpty(data.results) || data.results.length === 0) {
            return;
        }
        data.results.forEach(result => {
            overall.data.labels.push(result.indicator.description);
            overall.data.datasets[0].data.push(result.fa);
            overall.data.datasets[0].backgroundColor.push(pickOverallBackground(result));
            overall.data.datasets[0].borderColor.push(pickOverallBorder(result));
        });
        overall.update();
    };
    /**
     * Method defined to update quality curve
     * @memberOf GraphController
     */
    this.updateCurve = function ( data ) {
        cleanGraph(curve, false);
        let intervals = [];
        data.thresholds.forEach(threshold => {
            intervals.push(threshold.quality);
            curve.data.datasets[0].data.push(threshold.quality);
            curve.data.datasets[0].backgroundColor.push(pickCurveBackground(threshold));
            curve.data.datasets[0].borderColor.push(pickCurveBorder(threshold));
        });
        curve.data.labels = intervals;
        let quality = data.monitoring_quality[0].value;
        curve.data.datasets[1].backgroundColor = [];
        curve.data.datasets[1].borderColor = [];
        curve.data.datasets[1].backgroundColor.push(pickCurveDotBgColor(quality, data.thresholds));
        curve.data.datasets[1].borderColor.push(pickCurveDotBorderColor(quality, data.thresholds));
        curve.data.datasets[1].data.push({
            x: getQualityResult(quality, data.thresholds),
            y: quality
        });
        curve.update();
    };
    /**
     * Method defined to clear graphics
     * @memberOf GraphController
     */
    this.clean = function () {
        cleanGraph(overall);
        cleanGraph(curve);
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