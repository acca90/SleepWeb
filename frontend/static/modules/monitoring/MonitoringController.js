/**
 * SleepWeb
 * Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
 * Universidade de Passo Fundo - 2018/2019
 *
 * @author Matheus Hernandes
 * @since 17/07/2019
 * @namespace MonitoringController
 */
function MonitoringController($container) {
    /**
     * DataTable Settings
     * @namespace MonitoringController
     */
    const getDatatableSettings = function () {
        return [
            {th: 'Patient', width: '', data: 'patient'},
            {th: 'Date Begin', width: '100px', data: 'begin'},
            {th: 'Date End', width: '100px', data: 'end'},
            {th: 'Quality', width: '100px', data: 'quality'}
        ]
    };
    /**
     * Return params for AbstractController
     * @memberOf MonitoringController
     */
    const getParams = function () {
        return {
            container: $container,
            apiUrl: 'monitoring',
            message: {
                editPickError: `Select a monitoring to analyse information`,
                editAjaxError: `Something went wrong with request, call administrators`,
            },
            datatableSettings: getDatatableSettings(),
            serialize: null,
            toForm: null,
            clean: null
        };
    };
    /**
     * Module Initialize
     * @memberOf MonitoringController
     */
    this.init = function () {
        new AbstractController(getParams()).init();
    };
    /**
     * Load a modal datatables for search and pick registers
     * @memberOf MonitoringController
     */
    this.getSettings = function () {
        return {
            apiUrl: getParams().apiUrl,
            datatableSettings: getDatatableSettings()
        }
    };
}
