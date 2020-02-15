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
     * Controller for profile
     * @memberOf MonitoringController
     */
    let profileController = new ProfileController($('#profile_container'));
    /**
     * Evaluate controller
     * @memberOf MonitoringController
     */
    let evaluateController = null;
    /**
     * DataTable Settings
     * @memberOf MonitoringController
     */
    const getDatatableSettings = function () {
        return [
            {th: 'Patient', width: '', data: 'reference', render: renderPatient},
            {th: 'Date Begin', width: '140px', data: 'begin', render: renderDatetime},
            {th: 'Date End', width: '140px', data: 'end', render: renderDatetime}
        ]
    };
    /**
     * Render for patient
     * @memberOf MonitoringController
     */
    const renderPatient = function (data, type, full) {
        return full.reference.patient.first_name + " " + full.reference.patient.last_name
    };
    /**
     * Render for datetime
     * @memberOf MonitoringController
     */
    const renderDatetime = function (data) {
        let string = data.replace("Z", "");
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
            toForm: toForm,
            clean: clean
        };
    };
    /**
     * Clean form to its original state
     * @memberOf MonitoringController
     */
    const clean = function () {
        $('#indicators').html("");
        evaluateController.clean();
    };
    /**
     * Load form for monitoring view
     * @memberOf MonitoringController
     */
    const toForm = function ( monitoring ) {
        let $indicators = $('#indicators');
        profileController.clean().load(monitoring.reference.patient);
        $("#monitoring_id").val(monitoring.id);
        $("#monitoring_begin").html(renderDatetime(monitoring.begin));
        $("#monitoring_end").html(renderDatetime(monitoring.end));
        $("#monitoring_system").html(monitoring.reference.system.name);

        monitoring.indicators.forEach(indicator => {
            $indicators.append(`
                <li>
                    ${indicator.indicator.description}:
                     <b class="text-info">${indicator.value}</b>
                </li>
            `)
        });
    };
    /**
     * Initialize events
     * @memberOf MonitoringController
     */
    const initEvents = function () {
        $('#btnRequestMonitoring').on('click', function () {
            new AjaxController({
                data: {},
                method: 'POST',
                url: 'monitoring/sync',
                success: function ( data ) {
                    console.log('ok', data)
                },
                error:  function () {
                    console.log('not ok')
                }
            }).send(true);
        });
    };
    /**
     * Module Initialize
     * @memberOf MonitoringController
     */
    this.init = function () {
        let controller = new AbstractController(getParams()).init(true);
        evaluateController = new EvaluateController(controller).init();
        profileController.init();
        initEvents();
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
