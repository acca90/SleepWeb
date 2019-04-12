/**
 * SleepWeb
 * Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
 * Universidade de Passo Fundo - 2018/2019
 *
 * @author Matheus Hernandes
 * @since 12/03/2019
 * @namespace LoginController
 */
function LoginController() {
    /**
     * Method responsable to apply events when field is validated
     * @memberOf LoginController
     */
    const parsleyFieldValidated = function ($form) {
        $form.parsley().on('field:validated', function () {
            if (this.validationResult === true) {
                this.$element.removeClass('is-invalid');
            } else {
                this.$element.addClass('is-invalid');
            }
        });
    };
    /**
     * Method responsable to apply events when form has error
     * @memberOf LoginController
     */
    const parsleyFormError = function ($form) {
        $form.parsley().on('form:error', function () {
            $.each(this.fields, function (key, field) {
                if (field.validationResult !== true) {
                    field.$element.addClass('is-invalid');
                }
            });
        });
    };
    /**
     * Method responsable to apply events when form is valited
     * @memberOf LoginController
     */
    const parsleyFormValidated = function ($form) {
        $form.parsley().on('form:validated', function () {
            if (this.validationResult === true) {
                $('.parsley-errors-list').removeClass('invalid-feedback');
            } else {
                $('.parsley-errors-list').addClass('invalid-feedback');
            }
        });
    };
    /**
     * Method responsable to apply events when form is submited
     * @memberOf LoginController
     */
    const parsleyFormSubmit = function ($form) {
        $form.parsley().on('form:submit', function () {
            submit();
            return false;
        });
    };
    /**
     * Submit form for auth
     * @memberOf LoginController
     */
    const submit = function () {
        new AjaxController({
            data: {
                username: $('#username').val(),
                password: $('#password').val(),
            },
            method: 'POST',
            url: '/api/rest-auth/login/',
            success: submitSuccess,
            error: submitError
        }).send();
    };
    /**
     * Handle success on auth request
     * @memberOf LoginController
     */
    const submitSuccess = function () {
        window.location.href = '/';
    };
    /**
     * Handle erros on auth request
     * @memberOf LoginController
     */
    const submitError = function (response) {
        const responseJSON = response.responseJSON;
        if (!$.isEmpty(responseJSON.non_field_errors)) {
            applyAlert(
                'danger',
                responseJSON.non_field_errors[0]
            ).show();
            return false;
        }
        applyAlert(
            'danger',
            `Something went wrong, call administrators for more information`
        ).show();
    };
    /**
     * Toggle classes for danger
     * @memberOf LoginController
     */
    const applyAlert = function (type, msg) {
        return $('#loginAlert')
            .removeClass('alert-success alert-info alert-warning alert-danger')
            .addClass('alert-' + type)
            .html(msg);
    };
    /**
     * Initialize events in the DOM
     * @memberOf LoginController
     */
    const initEvents = function () {
        let $form = $('form');
        parsleyFieldValidated($form);
        parsleyFormError($form);
        parsleyFormValidated($form);
        parsleyFormSubmit($form);
        $('#login').off('click').on('click', function () {
            $('#loginAlert').hide();
            $form.submit();
        });
        $('#username').off('keyup').on('keyup', function (e) {
            if (e.which === 13) {
                $('#password').focus();
            }
        });
        $('#password').off('keyup').on('keyup', function (e) {
            if (e.which === 13) {
                $('#login').trigger('click')
            }
        });
    };
    /**
     * Show logout alert
     * @memberOf LoginController
     */
    const showAlertIfLogout = function (isLogout) {
        if (!isLogout) {
            return;
        }
        applyAlert(
            'success',
            `Successfully logged out.`
        ).show();
    };
    /**
     * Check if user is not auth and show alert
     * @param isNotAuth
     */
    const showAlertIfNotAuth = function (isNotAuth) {
        if (isNotAuth) {
            return;
        }
        applyAlert(
            'danger',
            `You are not authorized`
        ).show();
    };
    /**
     * Initialize controller
     * @memberOf LoginController
     */
    this.init = function (params) {
        initEvents();
        showAlertIfLogout(params.isLogout);
        showAlertIfNotAuth(params.isNotAuth);
    };
}