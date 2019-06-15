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
    let formController = null;
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
            container: $container,
            apiUrl: 'group',
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
        $('#groupId', $form).val(group.id);
        $('#groupName', $form).val(group.name);
        $('#groupDetails', $form).val(group.details);
        formController.load(
            group.users,
            group.institutions,
            group.patients,
        );
    };
    /**
     * Serialize form for API submit
     * @memberOf GroupController
     */
    const serialize = function () {
        let form = {};
        let group = $('form').serializeToJson();
        let allowed = formController.serialize();
        $.extend(form, group, allowed);
        return form;
    };
    /**
     * Extend clean functionality on AbstractController
     * @memberOf GroupController
     */
    const clean = function () {
        formController.clean();
        return this;
    };
    /**
     * Module Initialize
     * @memberOf GroupController
     */
    this.init = function () {
        new AbstractController(getParams()).init();
        formController = new GroupFormController().init();
        return this;
    };
}


