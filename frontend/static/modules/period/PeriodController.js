/**
 * SleepWeb
 * Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
 * Universidade de Passo Fundo - 2018/2019
 *
 * @author Matheus Hernandes
 * @since 14/12/2019
 * @namespace PeriodController
 */
function PeriodController($container) {
    /**
     * DataTable Settings
     * @namespace PeriodController
     */
    const getDatatableSettings = function () {
        return [
            {th: '#', width: '50px', data: 'id'},
            {th: 'Patient', width: '', data: 'patient.last_name', render: renderPatient},
            {th: 'begin',  width: '180px', data: 'begin'},
            {th: 'end',  width: '180px', data: 'end'},
        ];
    };
    /**
     * Render for patient
     * @memberOf MonitoringController
     */
    const renderPatient = function (data, type, full) {
        return full.patient.first_name + " " + full.patient.last_name
    };
    /**
     * Return params for AbstractController
     * @memberOf PeriodController
     */
    const getParams = function () {
        return {
            container: $container,
            apiUrl: 'period',
            message: {
                saveSuccess: `Period successfully registered`,
                editPickError: `Select a period to update`,
                editAjaxError: `Something went wrong with request, call administrators`,
                editSuccess: `Period successfully updated`,
                removePickError: `Select a period to remove`,
                removeConfirmationMsg: `Are you sure to remove this period? You cannot revert if it is done.`,
                removeSuccess: `Period successfully removed`,
                removeError: `Something went wrong with request, call administrators`,
            },
            datatableSettings: getDatatableSettings(),
            serialize: serialize,
            toForm: toForm,
            clean: null
        };
    };
    /**
     * Fill form fields for update data
     * @memberOf PeriodController
     */
    const toForm = function (period) {
        let $form = $('form', $container);
        $('#period\\.id', $form).val(period.id);
        $('#periodStartDate', $form).val($.dateFormat(period.begin));
        $('#periodEndDate', $form).val($.dateFormat(period.end));
        $('#patientId', $form).val(period.patient.id);
        $('#patientField', $form).val(
            period.patient.first_name + " " + period.patient.last_name
        );
    };
    /**
     * Serialize form for API submit
     * @memberOf PeriodController
     */
    const serialize = function () {
        return $('form').serializeToJson();
    };
    /**
     * Module Initialize
     * @memberOf PeriodController
     */
    this.init = function () {
        new AbstractController(getParams()).init();
        new PeriodFormController().init();
    };
    /**
     * Load a settings for modal datatables
     * @memberOf PeriodController
     */
    this.getSettings = function () {
        return {
            apiUrl: getParams().apiUrl,
            datatableSettings: getDatatableSettings()
        }
    };
}