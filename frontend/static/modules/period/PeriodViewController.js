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
     * Initialize map of elements
     * @memberOf PeriodViewController
     */
    let initElementsMap =  function () {
        elementsMap.divs = {};
        elementsMap.divs.list = $('div#list');
        elementsMap.divs.view = $('div#view');
    };
    /**
     * Call period for analyzis
     * @memberOf PeriodViewController
     */
    this.analyze = function ( period ) {
        elementsMap.divs.list.hide();
        elementsMap.divs.view.show();
        console.log('aaa');


        var data = [
            {count: 2, date: "2017-09-23"},
            {count: 1, date: "2017-10-23"},
            {count: 4, date: "2017-11-11"},
            {count: 5, date: "2017-11-13"},
            {count: 3, date: "2017-11-21"},
        ];

        $("#heatmap").CalendarHeatmap(data, {
            // title of the calendar heatmap
            title: null,
            // the number of months to display
            months: 12,
            // last month
            lastMonth: moment().month() + 1,
            // last year
            lastYear: moment().year(),
            // color gradients
            coloring: null,

            labels: {
                days: false,
                months: true,
                custom: {
                    weekDayLabels: null,
                    monthLabels: null
                }
            },
            // custom legend
            legend: {
                show: true,
                align: "right",
                minLabel: "Less",
                maxLabel: "More"
            },
            // custom tooltips
            // requires <a href="https://www.jqueryscript.net/tags.php?/Bootstrap/">Bootstrap</a>
            tooltips: {
                show: false,
                options: {}
            }
        });


    };
    /**
     * Initialize controller for period data vizualization
     * @memberOf PeriodViewController
     */
    this.init = function () {
        initElementsMap();
        return this;
    };
}