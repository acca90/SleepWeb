/**
 * SleepWeb
 * Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
 * Universidade de Passo Fundo - 2018/2019
 *
 * @author Matheus Hernandes
 * @since 09/03/2018
 * @namespace InstitutionController
 */
function PatientController($container) {
    /**
     * Return params for AbstractController
     * @memberOf PatientController
     */
    const getParams = function () {
        return {
            moduleName: 'Patients',
            moduleIcon: 'fa fa-building',
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
            datatableColumns: [
                {data: 'id'},
                {data: 'name'},
                {data: 'country'}
            ],
            serialize: serialize,
            toForm: toForm,
            clean: null
        };
    };
    /**
     * Fill form fields for update data
     * @memberOf PatientController
     */
    const toForm = function (patient) {
        let $form = $('form', $container);
    };
    /**
     * Serialize form for API submit
     * @memberOf PatientController
     */
    const serialize = function () {
        return $('form').serializeToJson();
    };
    /**
     * Module Initialize
     * @memberOf PatientController
     */
    this.init = function () {
        new AbstractController(getParams()).init();
    };
}