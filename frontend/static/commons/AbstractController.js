/**
 * SleepWeb
 * Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
 * Universidade de Passo Fundo - 2018/2019
 *
 * @author Matheus Hernandes
 * @since 09/03/2018
 * @namespace AbstractController
 * @param params Container for controller's DOM
 */
function AbstractController(params) {
    /**
     *
     * @memberOf AbortController
     */
    let isUpdate = false;
    /**
     * Map of elements
     * @memberOf AbortController
     */
    let DOM = {
        divs: {
            list: null,
            form: null
        },
        list: {
            alert: null,
            buttons: {
                new: null,
                edit: null,
                remove: null,
                refresh: null,
            },
            datatable: null
        },
        form: {
            alert: null,
            tagForm: null,
            pk: null,
            buttons: {
                save: null,
                cancel: null
            }
        }
    };
    /**
     * Initilize map of DOM's elements
     * @memberOf AbortController
     */
    const initMap = function () {
        DOM.divs.list = $('div#list', params.container);
        DOM.divs.form = $('div#form', params.container);
        DOM.list.buttons.new = $('#btnNew', params.container);
        DOM.list.buttons.edit = $('#btnEdit', params.container);
        DOM.list.buttons.remove = $('#btnRemove', params.container);
        DOM.list.buttons.refresh = $('#btnRefresh', params.container);
        DOM.list.alert = $('#listAlert', params.container);
        DOM.list.datatable = $('#datatable', params.container);
        DOM.form.tagForm = $('form', params.container);
        DOM.form.buttons.save = $('#btnSave', params.container);
        DOM.form.buttons.cancel = $('#btnCancel', params.container);
        DOM.form.alert = $('#formAlert', params.container);
        DOM.form.pk = $('[isPk]', DOM.form.tagForm);
    };
    /**
     * Iinitilize events for module navigation
     * @memberOf AbortController
     */
    const initEvents = function () {
        DOM.list.buttons.new.on('click', newRegister);
        DOM.list.buttons.edit.on('click', edit);
        DOM.list.buttons.remove.on('click', remove);
        DOM.list.buttons.refresh.on('click', refresh);
        DOM.form.buttons.save.on('click', save);
        DOM.form.buttons.cancel.on('click', cancel);
    };
    /**
     * Method responsable to toggle form for new registers
     * @memberOf AbstractController
     */
    const newRegister = function () {
        DOM.divs.list.hide();
        DOM.divs.form.show();
        clean();
    };
    /**
     * Method responsable to  toggle form for edit registers
     * @memberOf AbstractController
     */
    const edit = function () {
        let $tr = DOM.list.datatable.find('tr.selected');
        if ($tr.length) {
            return editForSelectedRow($tr);
        }
        fadeOutAlert(
            applyAlert(
                'warning',
                DOM.list.alert,
                params.message.editPickError
            ).show()
        );
    };
    /**
     * Get data for start edition
     * @memberOf AbstractController
     */
    const editForSelectedRow = function ($tr) {
        let data = DOM.list.datatable.DataTable().row($tr).data();
        new AjaxController({
            data: {pk: data.id},
            method: 'GET',
            url: params.apiUrl,
            success: editPickSuccess,
            error: editPickError
        }).send();
    };
    /**
     * Handle success on pick register to update
     * @memberOf AbstractController
     */
    const editPickSuccess = function (data) {
        if ($.isEmpty(data)) {
            fadeOutAlert(
                applyAlert(
                    'danger',
                    DOM.list.alert,
                    params.message.editAjaxError
                ).show()
            );
            return;
        }
        toForm(data[0]);
    };
    /**
     * Handle form transition for update
     * @memberOf AbstractController
     */
    const toForm = function (data) {
        clean();
        isUpdate = true;
        params.toForm(data);
        DOM.divs.list.hide();
        DOM.divs.form.show();
    };
    /**
     * Handle errors on pick register to update
     * @memberOf AbstractController
     */
    const editPickError = function () {
        fadeOutAlert(
            applyAlert(
                'warning',
                DOM.list.alert,
                params.message.editAjaxError
            ).show()
        );
    };
    /**
     * Method responsable to call remove option
     * @memberOf AbstractController
     */
    const remove = function () {
        alert('remove');
    };
    /**
     * Method responsable to submit form and save
     * @memberOf AbstractController
     */
    const save = function () {
        validate();
    };
    /**
     * Validate form for submit
     * @memberOf AbstractController
     */
    const validate = function () {
        parsleyFieldValidated();
        parsleyFormError();
        parsleyFormValidated();
        parsleyFormSubmit();
        DOM.form.tagForm.submit();
    };
    /**
     * Method responsable to apply events when field is validated
     * @memberOf AbstractController
     */
    const parsleyFieldValidated = function () {
        DOM.form.tagForm.parsley().on('field:validated', function () {
            if (this.validationResult === true) {
                this.$element.removeClass('is-invalid');
            } else {
                this.$element.addClass('is-invalid');
            }
        });
    };
    /**
     * Method responsable to apply events when form has error
     * @memberOf AbstractController
     */
    const parsleyFormError = function () {
        DOM.form.tagForm.parsley().on('form:error', function () {
            $.each(this.fields, function (key, field) {
                if (field.validationResult !== true) {
                    field.$element.addClass('is-invalid');
                }
            });
        });
    };
    /**
     * Method responsable to apply events when form is valited
     * @memberOf AbstractController
     */
    const parsleyFormValidated = function () {
        DOM.form.tagForm.parsley().on('form:validated', function () {
            if (this.validationResult === true) {
                $('.parsley-errors-list').removeClass('invalid-feedback');
            } else {
                $('.parsley-errors-list').addClass('invalid-feedback');
            }
        });
    };
    /**
     * Method responsable to apply events when form is submited
     * @memberOf AbstractController
     */
    const parsleyFormSubmit = function () {
        DOM.form.tagForm.parsley().on('form:submit', function () {
            serializeAndSubmit();
            return false;
        });
    };
    /**
     * Serialize form and submit for API persistence
     * @memberOf AbstractController
     */
    const serializeAndSubmit = function () {
        new AjaxController({
            data: params.serialize(),
            method: getMethodForPersistence(),
            url: getApiUrlForDefinedMethod(),
            success: submitSuccess,
            error: submitError
        }).send();
    };
    /**
     * Test condition of update flag to handle the correct method for persistence
     * @memberOf AbstractController
     */
    const getMethodForPersistence = function () {
        return isUpdate ? 'PUT' : 'POST'
    };
    /**
     * Test condition of update flag to handle the correct URL for persistence
     * @memberOf AbstractController
     */
    const getApiUrlForDefinedMethod = function () {
        return isUpdate ? params.apiUrl + getPk() + '/' : params.apiUrl
    };
    /**
     * Return PK for register in update
     * @memberOf AbstractController
     */
    const getPk = function () {
        return DOM.form.pk.val();
    };
    /**
     * Handle success after submit
     * @memberOf AbstractController
     */
    const submitSuccess = function () {
        DOM.divs.form.hide();
        DOM.divs.list.show();
        clean();
        showSuccess();
        refresh();
    };
    /**
     * Handle erros after submit
     * @memberOf AbstractController
     */
    const submitError = function () {
        applyAlert(
            'danger',
            DOM.form.alert,
            `Something went wrong, call administrators for more information`
        ).show();
    };
    /**
     * Show success alert after submit
     * @memberOf AbstractController
     */
    const showSuccess = function () {
        applyAlert(
            'success',
            DOM.list.alert,
            params.message.saveSuccess
        ).show();
        fadeOutAlert(DOM.list.alert);
    };
    /**
     * Fade out alert after a time
     * @memberOf AbstractController
     */
    const fadeOutAlert = function (alert) {
        setTimeout(() => {
            alert.fadeOut(3000);
        }, 30000)
    };
    /**
     * Method responsable to cancel and toggle to list
     * @memberOf AbstractController
     */
    const cancel = function () {
        DOM.divs.form.hide();
        DOM.divs.list.show();
        clean();
    };
    /**
     * Toggle classes for danger
     * @memberOf AbstractController
     */
    const applyAlert = function (type, alert, msg) {
        return alert.removeClass('alert-success alert-info alert-warning alert-danger').addClass('alert-' + type).html(msg);
    };
    /**
     * Clean form form back to original state
     * @memberOf AbstractController
     */
    const clean = function () {
        isUpdate = false;
        DOM.form.alert.hide();
        DOM.form.alert.html("");
        DOM.form.tagForm.find('textarea,input:not([type=radio]):not([type=checkbox])').val('');
        DOM.form.tagForm.find('input[type=radio],input[type=checkbox]').prop('checked', false);
        DOM.form.tagForm.find('select').val('');
        DOM.form.tagForm.find('.is-invalid').removeClass('is-invalid');
        DOM.form.tagForm.parsley().reset();
    };
    /**
     * Initialize datatable for module
     * @memberOf AbstractController
     */
    const initDatatable = function () {
        DOM.list.datatable.DataTable({
            serverSide: true,
            ajax: params.apiUrl + '?format=datatables',
            columns: params.datatableColumns
        });
    };
    /**
     *
     * @memberOf AbstractController
     */
    const initSelectedDatatable = function () {
        DOM.list.datatable.on('click', 'tbody > tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected')
            } else {
                $(this).addClass('selected').siblings('.selected').removeClass('selected');
            }
        });
    };
    /**
     * Refresh datatables
     * @memberOf AbstractController
     */
    const refresh = function () {
        DOM.list.datatable.DataTable().search('');
        DOM.list.datatable.DataTable().ajax.reload();
    };
    /**
     * Module Initialize
     * @memberOf AbstractController
     */
    this.init = function () {
        initMap();
        initEvents();
        initDatatable();
        initSelectedDatatable();
    };
}
