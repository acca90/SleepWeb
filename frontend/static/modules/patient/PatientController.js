/**
 * SleepWeb
 * Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
 * Universidade de Passo Fundo - 2018/2019
 *
 * @author Matheus Hernandes
 * @since 09/03/2019
 * @namespace InstitutionController
 */
function PatientController($container) {
    /**
     * Instance of AbstractController
     * @memberOf PatientController
     */
    let abstractController = null;
    /**
     * Form controller
     * @memberOf PatientController
     */
    let formController = null;
    /**
     * Patient reference controller
     * @memberOf PatientController
     */
    let patientReferenceController = null;
    /**
     * Serivce for patient
     * @memberOf PatientController
     */
    let service = null;
    /**
     * DataTable Settings
     * @memberOf PatientController
     */
    const getDatatableSettings = function () {
        return [
            {th: '#', data: 'id', width: '60px'},
            {th: 'Name', data: 'first_name', render: renderFullName},
            {th: 'Birth Date', data: 'birth_date', render: renderBirthDateAndAge, width: '200px'},
            {th: 'Gender', data: 'gender', render: renderGender, width: '100px'},
            {
                th: 'Stage',
                data: 'stage',
                name: 'stage__description',
                sDefaultContent: '',
                render: renderStage,
                width: '200px'
            }
        ];
    };
    /**
     * Return params for AbstractController
     * @memberOf PatientController
     */
    const getParams = function () {
        return {
            container: $container,
            apiUrl: 'patient',
            message: {
                saveSuccess: `Patient successfully registered`,
                editPickError: `Select a patient to update`,
                editAjaxError: `Something went wrong with request, call administrators`,
                editSuccess: `Patient successfully updated`,
                removePickError: `Select a patient to remove`,
                removeConfirmationMsg: `Are you sure to remove this patient? You cannot revert if it is done.`,
                removeSuccess: `Patient successfully removed`,
                removeError: `Something went wrong with request, call administrators`,
            },
            datatableSettings: getDatatableSettings(),
            serialize: serialize,
            toForm: toForm,
            clean: clean
        };
    };
    /**
     * Render for name
     * @memberOf PatientController
     */
    const renderFullName = function (data, type, row) {
        return data + " " + row.last_name;
    };
    /**
     * Render for birth date and age
     * @memberOf PatientController
     */
    const renderBirthDateAndAge = function (data) {
        return $.dateFormat(data) + ` (${$.calcAge(data)})`;
    };
    /**
     * Render for gender
     * @memberOf PatientController
     */
    const renderGender = function (data) {
        return data === 1 ? 'Masculine' : 'Feminine';
    };
    /**
     * Render for stage
     * @memberOf PatientController
     */
    const renderStage = function (data) {
        return $.isEmpty(data) ? 'Not Defined' : data.description;
    };
    /**
     * Fill form fields for update data
     * @memberOf PatientController
     */
    const toForm = function (patient) {
        let $form = $('form', $container);
        $('#patientId', $form).val(patient.id);
        $('#patientFirstName', $form).val(patient.first_name);
        $('#patientLastName', $form).val(patient.last_name);
        $('#patientBirthDate', $form).val($.dateFormat(patient.birth_date));
        $('#patientGender', $form).val(patient.gender);
        $('#patientObs', $form).val(patient.obs);
        formController.load(patient.institutions);
    };
    /**
     * Serialize form for API submit
     * @memberOf PatientController
     */
    const serialize = function () {
        let form = {};
        let patient = $('form', $container).serializeToJson();
        let allowed = formController.serialize();
        $.extend(form, patient, allowed);
        return form;
    };
    /**
     * Extend clean functionality on AbstractController
     * @memberOf PatientController
     */
    const clean = function () {
        let $form = $('form', $container);
        let gender = $('#patientGender', $form);
        gender.val(gender.find('option:first').val());
        formController.clean();
        return this;
    };
    /**
     * Initialize controllers
     * @memberOf PatientController
     */
    const initControllers = function () {
        abstractController = new AbstractController(getParams()).init();
        formController = new PatientFormController().init();
        patientReferenceController = new PatientReferenceController(abstractController).init();
    };
    /**
     * Initialize services
     * @memberOf PatientController
     */
    const initServices = function () {
        service = new PatientService();
    };
    /**
     * Initialize events
     * @memberOf PatientController
     */
    const initEvents = function () {
        $('#btnSendPatient').off('click').on('click', function () {
            send_patient();
        });
        $('#btnReference').off('click').on('click', function () {
            let rowData =  abstractController.getModuleDataTable().getRowData();
            if ($.isEmpty(rowData)) {
                return;
            }
            patientReferenceController.load(rowData);
        });
    };
    /**
     * Send patient to its institutions instances
     * @memberOf PatientController
     */
    const send_patient = function () {
        let dataTable = abstractController.getModuleDataTable();
        let rowData = dataTable.getRowData();
        if ($.isEmpty(rowData)) {
            return;
        }
        new ConfirmationController(
            'Need confirmation',
            'Send patient for its institutions',
            $modal => {
                $modal.modal('toggle');
                service.submit_patient(rowData.id);
            },
            null
        ).open();
    };
    /**
     * Module Initialize
     * @memberOf PatientController
     */
    this.init = function () {
        initControllers();
        initServices();
        initEvents();
    };
    /**
     * Load a modal datatables for search and pick registers
     * @memberOf PatientController
     */
    this.getSettings = function () {
        return {
            apiUrl: getParams().apiUrl,
            datatableSettings: getDatatableSettings()
        }
    };
}