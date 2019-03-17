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
     * Flag indicate if form is being updated
     * @memberOf AbstractController
     */
    let isUpdate = false;
    /**
     * Map of elements
     * @memberOf AbstractController
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
            },
            option: null
        }
    };
    /**
     * Initilize map of DOM's elements
     * @memberOf AbstractController
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
        DOM.form.option = $('#moduleOption', DOM.divs.form);
    };
    /**
     * Initialize module identity
     * @memberOf AbstractController
     */
    const initModuleIdentity = function () {
        $('#moduleIcon', DOM.divs.list).addClass(params.moduleIcon);
        $('#moduleName', DOM.divs.list).html(params.moduleName);
        $('#moduleIcon', DOM.divs.form).addClass(params.moduleIcon);
        $('#moduleName', DOM.divs.form).html(params.moduleName);
    };
    /**
     * Initilize date pickers
     * @memberOf AbstractController
     */
    const initDatePickers = function () {
        let datePickers = $('[isDatePicker]');
        datePickers.wrap('<div class="input-group"></div>');
        datePickers.parent('div').append(buildCalendarIcon());
        initClickCalendar();
        datePickers.datepicker({
            'autoclose': true
        });
    };
    /**
     * Build a calendar icon for input
     * @memberOf AbstractController
     */
    const buildCalendarIcon = function () {
        return `<div class="input-group-append calendar">
				    <span class="input-group-text">
					    <i class="fa fa-calendar"></i>
					</span>
				</div>`;
    };
    /**
     * Build a calendar icon for input
     * @memberOf AbstractController
     */
    const initClickCalendar = function () {
        $('.calendar').off('click').on('click', function () {
            $(this).parent('div').find('input').trigger('focus');
        });
    };
    /**
     * Iinitilize events for module navigation
     * @memberOf AbstractController
     */
    const initEvents = function () {
        DOM.list.buttons.new.on('click', newRegister);
        DOM.list.buttons.edit.on('click', edit);
        DOM.list.buttons.remove.on('click', remove);
        DOM.list.buttons.refresh.on('click', refresh);
        DOM.form.buttons.save.on('click', validate);
        DOM.form.buttons.cancel.on('click', cancel);
    };
    /**
     * Method responsable to toggle form for new registers
     * @memberOf AbstractController
     */
    const newRegister = function () {
        DOM.form.option.html('> New');
        DOM.divs.list.hide();
        DOM.divs.form.show();
        clean();
    };
    /**
     * Method responsable to  toggle form for edit registers
     * @memberOf AbstractController
     */
    const edit = function () {
        DOM.form.option.html('> Update');
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
        new AjaxController({
            data: {pk: getId($tr)},
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
     *
     * @memberOf AbstractController
     */
    const remove = function () {
        let $tr = DOM.list.datatable.find('tr.selected');
        if ($tr.length) {
            return removeSelected($tr);
        }
        fadeOutAlert(
            applyAlert(
                'warning',
                DOM.list.alert,
                params.message.removePickError
            ).show()
        );
    };
    /**
     * Method responsable to call remove option
     * @memberOf AbstractController
     */
    const removeSelected = function ($tr) {
        new ConfirmationController(
            'Need confirmation',
            params.message.removeConfirmationMsg,
            $modal => {
                $modal.modal('toggle');
                sendRemoveRequest($tr);
            },
            () => {
                console.log('dismiss');
            },
        ).open();
    };
    /**
     * Send remove request to back-end
     * @memberOf AbstractController
     */
    const sendRemoveRequest = function ($tr) {
        new AjaxController({
            data: params.serialize(),
            method: 'DELETE',
            url: params.apiUrl + getId($tr) + '/',
            success: removeSuccess,
            error: removeError
        }).send();
    };

    /**
     * Handle success when remove
     * @memberOf AbstractController
     */
    const removeSuccess = function () {
        refresh();
        fadeOutAlert(
            applyAlert(
                'success',
                DOM.list.alert,
                params.message.removeSuccess
            ).show()
        );
    };
    /**
     * Handle erro when remove
     * @memberOf AbstractController
     */
    const removeError = function () {
        fadeOutAlert(
            applyAlert(
                'danger',
                DOM.list.alert,
                params.message.removeError
            ).show()
        );
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
        return isUpdate ? 'PATCH' : 'POST'
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
    const submitSuccess = function (data) {
        if (!$.isEmpty(data.id)) {
            applyAlert(
                'danger',
                DOM.form.alert,
                `Something went wrong, call administrators for more information`
            ).show();
            return;
        }
        DOM.divs.form.hide();
        DOM.divs.list.show();
        showSuccess();
        clean();
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
            getMessageForSuccess()
        ).show();
        fadeOutAlert(DOM.list.alert);
    };
    /**
     * Return message of success based on method used
     * @memberOf AbstractController
     */
    const getMessageForSuccess = function () {
        return isUpdate ? params.message.editSuccess : params.message.saveSuccess;
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
        return alert
            .removeClass('alert-success alert-info alert-warning alert-danger')
            .addClass('alert-' + type)
            .html(msg);
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
        if (!$.isEmpty(params.clean)) {
            params.clean();
        }
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
     * Initialize row select for datatables
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
     * Return data for selected row
     * @memberOf AbstractController
     */
    const getId = function ($tr) {
        let rowData = DOM.list.datatable.DataTable().row($tr).data();
        return rowData.id;
    };
    /**
     * Module Initialize
     * @memberOf AbstractController
     */
    this.init = function () {
        initMap();
        initModuleIdentity();
        initDatePickers();
        initEvents();
        initDatatable();
        initSelectedDatatable();
    };
}
