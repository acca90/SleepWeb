/**
 * SleepWeb
 * Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
 * Universidade de Passo Fundo - 2018/2019
 *
 * @author Matheus Hernandes
 * @since 09/03/2019
 * @namespace UserController
 */
function UserController($container) {
    /**
     * DataTable Settings
     * @namespace UserController
     */
    const getDatatableSettings = function () {
        return [
            {th: '#', width: '50px', data: 'id', sDefaultContent: '',},
            {th: 'Username', width: '120px', data: 'username', sDefaultContent: '',},
            {th: 'Name', data: 'first_name', sDefaultContent: '', render: nameRender},
            {th: 'E-mail', data: 'email', sDefaultContent: '',},
            {
                th: 'Institution',
                data: 'institution',
                name: 'institution__name',
                sDefaultContent: 'Not Available',
                render: renderInstitution
            },
            {
                th: 'Is Active',
                width: '70px',
                data: 'is_active',
                sDefaultContent: 'Not Available',
                render: userActiveRender
            }
        ];
    };
    /**
     * Return params for AbstractController
     * @memberOf UserController
     */
    const getParams = function () {
        return {
            moduleName: 'Users',
            moduleIcon: 'fa fa-user',
            container: $container,
            apiUrl: '/api/user/',
            message: {
                saveSuccess: `User successfully registered`,
                editPickError: `Select a user to update`,
                editAjaxError: `Something went wrong with request, call administrators`,
                editSuccess: `User successfully updated`,
                removePickError: `Select a user to remove`,
                removeConfirmationMsg: `Are you sure to remove this user? You cannot revert if it is done.`,
                removeSuccess: `User successfully removed`,
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
     * @memberOf UserController
     */
    const nameRender = function (data, type, row) {
        return data + " " + row.last_name;
    };
    /**
     * Render for institution
     * @memberOf UserController
     */
    const renderInstitution = function (data) {
        return $.isEmpty(data) ? 'Not Available' : data.name
    };
    /**
     * Render for user active situation
     * @memberOf UserController
     */
    const userActiveRender = function (data) {
        return data ? 'Active' : 'Inactive'
    };
    /**
     * Fill form fields for update data
     * @memberOf UserController
     */
    const toForm = function (user) {
        let $form = $('form', $container);
        $('#userId', $form).val(user.id);
        $('#userFirstName', $form).val(user.first_name);
        $('#userLastName', $form).val(user.last_name);
        $('#userUsername', $form).val(user.username);
        $('#userEmail', $form).val(user.email);
        $('#userInstitution', $form).val($.isEmpty(user.institution) ? '' : user.institution.id);
        $('#userPassword', $form).removeAttr('required');
        $('#userPasswordConfirm', $form).removeAttr('required');
        $('#is_active', $form).prop('checked', user.is_active);
    };
    /**
     * Serialize form for API submit
     * @memberOf UserController
     */
    const serialize = function () {
        return $('form').serializeToJson();
    };
    /**
     * Extend default clean functionality
     */
    const clean = function () {
        $('#userPassword', $container).attr('required', '');
        $('#userPasswordConfirm', $container).attr('required', '');
    };
    /**
     * Module Initialize
     * @memberOf UserController
     */
    this.init = function () {
        //console.log(getParams());
        new AbstractController(getParams()).init();
        let userService = new UserService();
        userService.findInstitutions();
    };
    /**
     * Load a modal datatables for search and pick registers
     * @memberOf UserController
     */
    this.getSettings = function () {
        return {
            apiUrl: getParams().apiUrl,
            datatableSettings: getDatatableSettings()
        }
    };
}


