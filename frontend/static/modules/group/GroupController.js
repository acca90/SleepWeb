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
     * AllowForm Controller
     * @memberOf GroupController
     */
    let allowForm = null;
    /**
     * DataTable Settings
     * @memberOf GroupController
     */
    const getDatatableSettings = function () {
        return [
            {th: '#', width: '50px', data: 'id'},
            {th: 'Name', width: '', data: 'name'},
            {th: 'Owner', width: '', data: 'owner', name: 'owner__first_name'}
        ]
    };
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
            datatableSettings: getDatatableSettings(),
            serialize: serialize,
            toForm: toForm,
            clean: clean
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
        let form = {};
        let group = $('form').serializeToJson();
        let allowed = allowForm.serialize();
        $.extend(form, group, allowed);
        return form;
    };
    /**
     * Extend clean functionality on AbstractController
     * @memberOf GroupController
     */
    const clean = function () {
        allowForm.clean();
        return this;
    };
    /**
     * Module Initialize
     * @memberOf GroupController
     */
    this.init = function () {
        new AbstractController(getParams()).init();
        allowForm = new GroupAllowFormController().init();
        return this;
    };
}


