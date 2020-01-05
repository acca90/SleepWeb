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
            {count: 2, date: "2020-01-17"},
            {count: 1, date: "2020-02-17"},
            {count: 4, date: "2020-03-17"},
            {count: 3, date: "2020-04-17"},
            {count: 3, date: "2020-05-17"},
        ];

        $("#heatmap").CalendarHeatmap(data, {
            // title of the calendar heatmap
            title: 'teste',
            months: 6,
            lastMonth: '05',
            lastYear: '2020',
            coloring: null,
            labels: {
                days: false,
                months: true,
                custom: {
                    weekDayLabels: null,
                    monthLabels: null
                }
            },
            legend: {
                show: true,
                align: "right",
                minLabel: "Bad",
                maxLabel: "Good"
            },
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