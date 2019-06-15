/**
 * SleepWeb
 * Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
 * Universidade de Passo Fundo - 2018/2019
 *
 * @author Matheus Hernandes
 * @since 09/03/2019
 * @namespace InstitutionController
 */
function InstitutionController($container) {
    /**
     * DataTable Settings
     * @namespace StageController
     */
    const getDatatableSettings = function () {
        return [
            {th: '#', data: 'id'},
            {th: 'Name', data: 'name'},
            {th: 'Contry', data: 'country'}
        ];
    };
    /**
     * Return params for AbstractController
     * @memberOf InstitutionController
     */
    const getParams = function () {
        return {
            container: $container,
            apiUrl: 'institution',
            message: {
                saveSuccess: `Institution successfully registered`,
                editPickError: `Select a institution to update`,
                editAjaxError: `Something went wrong with request, call administrators`,
                editSuccess: `Institution successfully updated`,
                removePickError: `Select a institution to remove`,
                removeConfirmationMsg: `Are you sure to remove this institution? You cannot revert if it is done.`,
                removeSuccess: `Institution successfully removed`,
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
     * @memberOf InstitutionController
     */
    const toForm = function (institution) {
        let $form = $('form', $container);
        $('#institution\\.id', $form).val(institution.id);
        $('#institution\\.name', $form).val(institution.name);
        $('#institution\\.country', $form).val(institution.country);
    };
    /**
     * Serialize form for API submit
     * @memberOf InstitutionController
     */
    const serialize = function () {
        return $('form').serializeToJson();
    };
    /**
     * Module Initialize
     * @memberOf InstitutionController
     */
    this.init = function () {
        new AbstractController(getParams()).init();
    };
    /**
     * Load a settings for modal datatables
     * @memberOf InstitutionController
     */
    this.getSettings = function () {
        return {
            apiUrl: getParams().apiUrl,
            datatableSettings: getDatatableSettings()
        }
    };
}