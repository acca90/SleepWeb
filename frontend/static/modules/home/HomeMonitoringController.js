/**
 * SleepWeb
 * Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
 * Universidade de Passo Fundo - 2018/2019
 *
 * @author Matheus Hernandes
 * @since 15/06/2019
 * @namespace HomeMonitoringController
 */
function HomeMonitoringController() {
    /**
     * URL for data monitoring
     * @memberOf HomeMonitoringController
     */
    const apiUrl = 'monitoring';
    /**
     * Settings for datatable
     * @memberOf HomeMonitoringController
     */
    const datatableSettings = [
        {th: 'Date Begin', width: '100px', data: 'begin'},
        {th: 'Date End', width: '100px', data: 'end'},
        {th: 'Patient', width: '', data: 'patient'},
    ];
    /**
     * Initialize controller
     * @memberOf HomeMonitoringController
     */
    this.init = function () {
        new DataTableComponent(datatableSettings)
            .buildTable()
            .place($('div#monitoringDatatable'))
            .searchable(false)
            .paginated(false)
            .scrollX(false)
            .mountAjax(apiUrl)
            .ajustColumns();
    };
}