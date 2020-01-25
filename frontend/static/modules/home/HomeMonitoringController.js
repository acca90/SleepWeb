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
    const apiUrl = 'dashboard/monitoring';
    /**
     * Render for patient name
     * @memberOf HomeMonitoringController
     */
    const renderPatientName = function (data, type, full) {
        return full.reference.patient.first_name + " " + full.reference.patient.last_name
    };
    /**
     * Render for datetime
     * @memberOf HomeMonitoringController
     */
    const renderDatetime = function (data) {
        let string = data.replace("Z", "");
        string = string.split("T");
        return (string[0].split("-").reverse().join("/")) + ' ' + string[1];
    };
    /**
     * Settings for datatable
     * @memberOf HomeMonitoringController
     */
    const datatableSettings = [
        {
            th: 'Patient',
            width: '',
            data: 'reference',
            render: renderPatientName,
            sDefaultContent: '',
        },
        {
            th: 'Date Begin',
            width: '140px',
            data: 'begin',
            render: renderDatetime,
            sDefaultContent: '',
        },
        {
            th: 'Date End',
            width: '140px',
            data: 'end',
            render: renderDatetime,
            sDefaultContent: '',
        }
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