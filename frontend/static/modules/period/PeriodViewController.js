/**
 * SleepWeb
 * Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
 * Universidade de Passo Fundo - 2018/2019
 *
 * @author Matheus Hernandes
 * @since 02/12/2020
 * @namespace PeriodViewController
 */
function PeriodViewController() {
    /**
     * Map of elements
     * @memberOf PeriodViewController
     */
    let elementsMap = {};
    /**
     * Reference for line chart
     * @memberOf PeriodViewController
     */
    let lineChart = null;
    /**
     * Initialize map of elements
     * @memberOf PeriodViewController
     */
    let initElementsMap =  function () {
        elementsMap.divs = {};
        elementsMap.divs.list = $('div#list');
        elementsMap.divs.view = $('div#view');
        elementsMap.btnReturn = $('#btnReturn');
        elementsMap.calendar = $("#heatmap");
        elementsMap.lineChart = $("#lineChart");
    };
    /**
     * Initialize calendar
     * @memberOf PeriodViewController
     */
    const initCalendar = function ( param ) {
        let $div = $('<div class="col-md-12"></div>');
        elementsMap.calendar.html("").append($div);
        $div.CalendarHeatmap(param.data, {
            // title of the calendar heatmap
            months: param.months,
            lastMonth: param.lastMonth,
            lastYear: param.lastYear,
            coloring: "quality",
            labels: {
                days: true,
                months: true,
            },
            legend: {
                show: true,
                align: "right",
                minLabel: "Worse",
                maxLabel: "Better"
            }
        });
    };
    /**
     * Call period for analyzis
     * @memberOf PeriodViewController
     */
    this.analyze = function ( period ) {
        new AjaxController({
            pk: period.id,
            data: { pk: period.id },
            method: 'POST',
            url: 'period/analyze',
            success: callBackAnalyzeSuccess,
            error:  callBackAnalyzeError
        }).send(true);
    };
    /**
     * Callback for handle success request
     * @memberOf PeriodViewController
     */
    const callBackAnalyzeSuccess = function ( data ) {
        initCalendar({
            months: processMonths(data.begin,data.end),
            lastMonth: data.end.split('-')[1],
            lastYear: data.end.split('-')[0],
            data: processDayEvaluations(data.data)
        });
        updateOverall(processDataForLineGraph(data.data));
        elementsMap.divs.list.hide();
        elementsMap.divs.view.show();
    };
    /**
     * Calculates quantity of months in period
     * @memberOf PeriodViewController
     */
    const processMonths = function ( begin, end ) {
        const d1 = new Date(begin);
        const d2 = new Date(end);
        let months;
        months = (d2.getFullYear() - d1.getFullYear()) * 12;
        months -= d1.getMonth() + 1;
        months += d2.getMonth();
        return months+1;
    };
    /**
     * Method defined to process day sleep evaluations
     * @memberOf PeriodViewController
     */
    const processDayEvaluations = function ( data ) {
        let newDataArray = [];
        data.forEach(monitoring => {
            newDataArray.push({
                count: monitoring.idx/2,
                date: monitoring.end.split('T')[0]
            });
        });
        return newDataArray;
    };
    /**
     * Callback for handle error request
     * @memberOf PeriodViewController
     */
    const callBackAnalyzeError = function () {
    };
    /**
     * Method defined to normalize data for line graph
     * @memberOf PeriodViewController
     */
    const processDataForLineGraph = function ( data ) {
        return data.map(result => {
            return {
                idx: result.idx,
                date: result.end.split('T')[0].split('-').reverse().join("/")
            }
        });
    };
    /**
     * Method defined to update overall graph
     * @memberOf PeriodViewController
     */
    const updateOverall = function ( data ) {
        cleanLineChart(false);
        data.forEach(result => {
            lineChart.data.labels.push(result.date);
            lineChart.data.datasets[0].data.push(result.idx)
        });
        lineChart.update();
    };
    /**
     * Method defined to clean line chart
     * @memberOf PeriodViewController
     */
    const cleanLineChart = function ( update = true ) {
        lineChart.data.labels = [];
        lineChart.data.datasets.forEach(dataset => dataset.data = []);
        if (update) {
            lineChart.update();
        }
    };
    /**
     * Method defined to initialize chart
     * @memberOf PeriodViewController
     */
    const initChart = function () {
        lineChart = new Chart(document.getElementById('lineChart').getContext('2d'), {
            type: 'line',
            data: {
                labels: [],
                datasets: [
                    {
                        data: [],
                        fill: false,
                        backgroundColor: '#ff8b89',
                        borderColor:  '#FF0000',
                        label: 'Quality Curve'
                    }
                ],
            },
            options: {
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
                            stepSize: 1,
                            suggestedMin: 0,
                            suggestedMax: 10,
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            display: true,
                            position: 'bottom',
                            beginAtZero: true,
                            autoSkip: true,
                        }
                    }]
                }
            }
        });
    };
    /**
     * Initialize events
     * @memberOf PeriodViewController
     */
    const initEvents = function () {
        elementsMap.btnReturn.on('click', function () {
            elementsMap.divs.list.show();
            elementsMap.divs.view.hide();
        });
    };
    /**
     * Initialize controller for period data vizualization
     * @memberOf PeriodViewController
     */
    this.init = function () {
        initElementsMap();
        initEvents();
        initChart();
        return this;
    };
}