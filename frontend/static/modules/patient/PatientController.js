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
     * DataTable Settings
     * @namespace PatientController
     */
    const getDatatableSettings = function () {
        return [
            {th: '#', data: 'id', width: '60px'},
            {th: 'Name', data: 'first_name', render: renderFullName},
            {th: 'Brith Date', data: 'birth_date', render: renderBirthDateAndAge, width: '200px'},
            {th: 'Gender', data: 'gender', render: renderGender, width: '100px'},
            {th: 'Stage', data: 'stage', sDefaultContent: '', width: '120px'}
        ];
    };
    /**
     * Return params for AbstractController
     * @memberOf PatientController
     */
    const getParams = function () {
        return {
            moduleName: 'Patients',
            moduleIcon: 'fa fa-address-card-o',
            container: $container,
            apiUrl: '/api/patient/',
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
            clean: null
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
    };
    /**
     * Serialize form for API submit
     * @memberOf PatientController
     */
    const serialize = function () {
        let $form = $('form', $container);
        let json = $form.serializeToJson();
        if ($.isEmpty($('#patientObs', $form).val())) {
            json.obs = '';
        }
        return json;
    };
    /**
     * Module Initialize
     * @memberOf PatientController
     */
    this.init = function () {
        new AbstractController(getParams()).init();
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