/**
 * SleepWeb
 * Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
 * Universidade de Passo Fundo - 2018/2019
 *
 * @author Matheus Hernandes
 * @since 09/03/2018
 * @namespace InstitutionController
 */
function InstitutionController($container) {
    /**
     * Return params for AbstractController
     * @memberOf InstitutionController
     */
    const getParams = function () {
        return {
            container: $container,
            apiUrl: '/api/institution/',
            message: {
                saveSuccess: `Institution successfully registered`,
                editPickError: `Select a institution to update`,
                editAjaxError: `Something went wrong with request, call administrators`,
                editSuccess: `Institution successfully updated`,
                removeConfirmationMsg: `Are you sure to remove this institution? You cannot revert if it is done.`,
                removePickError: `Select a institution to remove`,
                removeError: `Something went wrong with request, call administrators`,
                removeSuccess: `Institution successfully removed`,
            },
            datatableColumns: [
                {data: 'id'},
                {data: 'name'},
                {data: 'country'}
            ],
            serialize: serialize,
            toForm: toForm
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
}

$(document).ready(function () {
    new InstitutionController($('#institution')).init();
});