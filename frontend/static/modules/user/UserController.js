/**
 * SleepWeb
 * Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
 * Universidade de Passo Fundo - 2018/2019
 *
 * @author Matheus Hernandes
 * @since 09/03/2018
 * @namespace UserController
 */
function UserController($container) {
    /**
     * Return params for AbstractController
     * @memberOf UserController
     */
    const getParams = function () {
        return {
            container: $container,
            apiUrl: '/api/user/',
            message: {
                saveSuccess: `User successfully registered`,
                editPickError: `Select a user to update`,
                editAjaxError: `Something went wrong with request, call administrators`,
                editSuccess: `User successfully updated`,
                removeConfirmationMsg: `Are you sure to remove this user? You cannot revert if it is done.`,
                removePickError: `Select a user to remove`,
                removeError: `Something went wrong with request, call administrators`,
                removeSuccess: `User successfully removed`,
            },
            datatableColumns: [
                {data: 'id'},
                {data: 'username'},
                {data: 'first_name'},
                {data: 'email'},
                {data: 'institution_name'}
            ],
            serialize: serialize,
            toForm: toForm
        };
    };
    /**
     * Fill form fields for update data
     * @memberOf UserController
     */
    const toForm = function (user) {
        let $form = $('form', $container);

    };
    /**
     * Serialize form for API submit
     * @memberOf UserController
     */
    const serialize = function () {
        return $('form').serializeToJson();
    };
    /**
     * Module Initialize
     * @memberOf UserController
     */
    this.init = function () {
        new AbstractController(getParams()).init();
    };
}

$(document).ready(function () {
    new UserController($('#user')).init();
});