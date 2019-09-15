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
            {th: 'Patient', width: '', data: 'patient.first_name', render: renderPatient},
            {th: 'Date Begin', width: '140px', data: 'begin', render: renderDatetime},
            {th: 'Date End', width: '140px', data: 'end', render: renderDatetime}
        ]
    };
    /**
     * Render for patient
     * @memberOf MonitoringController
     */
    const renderPatient = function (data, type, full ) {
        return full.patient.first_name + " " + full.patient.last_name
    };
    /**
     * Render for datetime
     * @memberOf MonitoringController
     */
    const renderDatetime = function ( data ) {
        let string = data.replace("Z","");
        string = string.split("T");
        return (string[0].split("-").reverse().join("/")) + ' ' + string[1];
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
