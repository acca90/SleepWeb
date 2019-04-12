/**
 * SleepWeb
 * Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
 * Universidade de Passo Fundo - 2018/2019
 *
 * @author Matheus Hernandes
 * @since 21/03/2019
 * @namespace UserController
 */
function MSystemController($container) {
    /**
     * DataTable Settings
     * @namespace MSystemController
     */
    const getDatatableSettings = function () {
        return [
            {th: '#', data: 'id', width: '50px', sDefaultContent: ''},
            {th: 'Name', data: 'name', sDefaultContent: ''},
            {th: 'URL', data: 'url', sDefaultContent: ''}
        ]
    };
    /**
     * Return params for AbstractController
     * @memberOf MSystemController
     */
    const getParams = function () {
        return {
            container: $container,
            apiUrl: '/api/msystem/',
            message: {
                saveSuccess: gettext(`Monitoring System successfully registered`),
                editPickError: `Select a user to update`,
                editAjaxError: `Something went wrong with request, call administrators`,
                editSuccess: `Monitoring System successfully updated`,
                removePickError: `Select a monitoring systems to remove`,
                removeConfirmationMsg: `Are you sure to remove this monitoring system? You cannot revert if it is done.`,
                removeSuccess: `Monitoring System successfully removed`,
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
     * @memberOf MSystemController
     */
    const toForm = function (msystem) {
        let $form = $('form', $container);
        $('#msystemId', $form).val(msystem.id);
        $('#msystemName', $form).val(msystem.name);
        $('#msystemUrl', $form).val(msystem.url);
        $('#msystemDescription', $form).val(msystem.description);

    };
    /**
     * Serialize form for API submit
     * @memberOf MSystemController
     */
    const serialize = function () {
        return $('form').serializeToJson();
    };
    /**
     * Module Initialize
     * @memberOf MSystemController
     */
    this.init = function () {
        new AbstractController(getParams()).init();
    };
}