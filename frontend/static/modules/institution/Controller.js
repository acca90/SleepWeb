/**
 * SleepWeb
 * Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
 * Universidade de Passo Fundo - 2018/2019
 *
 * @author Matheus Hernandes
 * @since 09/03/2018
 * @namespace InstitutionController
 */
function Controller($container) {
    /**
     * Return params for AbstractController
     * @memberOf InstitutionController
     */
    const getParams = function () {
        return {
            container: $container,
            apiUrl: '/api/institution/',
            serialize: serialize,
            message: {
                saveSuccess: `Institution successfully registered`,
                editPickError: `Select a institution to update`,
                editAjaxError: 'Something went wrong with request, call administrators'
            },
            datatableColumns: [
                {data: 'id'},
                {data: 'name'},
                {data: 'country'}
            ],
            toForm: toForm
        };
    };
    /**
     * Fill form fields for update data
       * @memberOf InstitutionController
   */
    const toForm = function (institution) {
        let $form = $('form',$container);
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
    new Controller($('#institution')).init();
});