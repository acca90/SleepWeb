/**
 * SleepWeb
 * Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
 * Universidade de Passo Fundo - 2018/2019
 *
 * @author Matheus Hernandes
 * @since 27/03/2019
 * @namespace GroupController
 */
function GroupController($container) {
    /**
     * Return params for AbstractController
     * @memberOf GroupController
     */
    const getParams = function () {
        return {
            moduleName: 'Share Groups',
            moduleIcon: 'fa fa-group',
            container: $container,
            apiUrl: '/api/group/',
            message: {
                saveSuccess: `Group successfully registered`,
                editPickError: `Select a group to update`,
                editAjaxError: `Something went wrong with request, call administrators`,
                editSuccess: `Group successfully updated`,
                removePickError: `Select a group to remove`,
                removeConfirmationMsg: `Are you sure to remove this group? You cannot revert if it is done.`,
                removeSuccess: `Group successfully removed`,
                removeError: `Something went wrong with request, call administrators`,
            },
            datatableColumns: [
                {width: '50px', data: 'id'},
                {width: '', data: 'name'},
                {width: '', data: 'owner', name:'owner__first_name'}
            ],
            serialize: serialize,
            toForm: toForm,
            clean: null
        };
    };

    /**
     * Fill form fields for update data
     * @memberOf GroupController
     */
    const toForm = function (group) {
        let $form = $('form', $container);
        alert(JSON.stringify(group));
    };
    /**
     * Serialize form for API submit
     * @memberOf GroupController
     */
    const serialize = function () {
        return $('form').serializeToJson();
    };
    /**
     * Module Initialize
     * @memberOf GroupController
     */
    this.init = function () {
        new AbstractController(getParams()).init();
    };
}