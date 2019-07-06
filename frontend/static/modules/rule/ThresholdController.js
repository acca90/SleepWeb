/**
 * SleepWeb
 * Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
 * Universidade de Passo Fundo - 2018/2019
 *
 * @author Matheus Hernandes
 * @since 08/06/2019
 * @namespace ThresholdController
 */
function ThresholdController(ruleFormController) {
    /**
     * Keeps reference active indicator
     * @memberOf ThresholdController
     */
    let activeIndicator = null;
    /**
     * Keeps reference for form controller
     * @memberOf ThresholdController
     */
    let controller = ruleFormController;
    /**
     * Map of elements from DOM
     * @memberOf ThresholdController
     */
    let elementsMap = {};
    /**
     * Populate form with data
     * @memberOf ThresholdController
     */
    const initElements = function () {
        elementsMap.modal = $('#threshold_modal');
        elementsMap.form = elementsMap.modal.find('form');
        elementsMap.indicator = $('#threshold_indicator');
        elementsMap.indicatorId = $('#threshold_indicator_id');
        elementsMap.stage = $('#threshold_stage');
        elementsMap.definition = $('#threshold_stage_definition');
        elementsMap.quality = $('#threshold_quality');
        elementsMap.begin = $('#threshold_begin');
        elementsMap.end = $('#threshold_end');
        elementsMap.include = $('#include');
        elementsMap.continue = $('#continue');
    };
    /**
     * Request data for composee form
     * @memberOf ThresholdController
     */
    const requestData = function () {
    };
    /**
     * Populate form with data
     * @memberOf ThresholdController
     */
    const populateForm = function (data) {
        if ($.isEmpty(data) || $.isEmpty(data.results) || elementsMap.stage.find('option').length > 1) {
            return;
        }
        data.results.forEach(stage => {
            elementsMap.stage.append(
                `<option value="${stage.id}" data-definition="${stage.definition}">${stage.description}</option>`
            );
        });
    };
    /**
     * Opens modal for include threshold
     * @memberOf ThresholdController
     */
    const showModal = function () {
        elementsMap.modal.modal('show');
    };
    /**
     * Set initial state for form
     * @memberOf ThresholdController
     */
    const clean = function (resetStage) {
        let $indicator = $(activeIndicator);
        elementsMap.indicator.val($indicator.attr('indicator'));
        elementsMap.indicatorId.val($indicator.attr('enum'));
        if (resetStage) {
            elementsMap.stage.val(elementsMap.stage.find('option:first').val());
        }
        elementsMap.quality.val(elementsMap.quality.find('option:first').val());
        elementsMap.definition.val('');
        elementsMap.begin.val('');
        elementsMap.end.val('');
        elementsMap.form.parsley().reset();
    };
    /**
     * Handles success after call for stage list
     * @memberOf ThresholdController
     */
    const callBackStageSuccess = async function (data) {
        await initElements();
        await requestData();
        await bindMask();
        await populateForm(data);
        await bindEvents();
    };
    /**
     * Bind masks for threshold
     * @memberOf ThresholdController
     */
    const bindMask = function () {
        elementsMap.begin.mask('000', {reverse: true});
        elementsMap.end.mask('000', {reverse: true});
    };
    /**
     * Bind events to DOM
     * @memberOf ThresholdController
     */
    const bindEvents = function () {
        elementsMap.stage.off('change').on('change', function () {
            let definition = '';
            if (!$.isEmpty($(this).val())) {
                definition = elementsMap.stage.find(`option[value="${$(this).val()}"]`).attr('data-definition');
            }
            elementsMap.definition.val(definition);
        });
        elementsMap.include.off('click').on('click', include);
        elementsMap.continue.off('click').on('click', include_continue);
    };
    /**
     * @memberOf ThresholdController
     */
    const include = function () {
        parsleyFieldValidated();
        parsleyFormError();
        parsleyFormValidated();
        parsleyFormSubmit(true);
        elementsMap.form.submit();
    };
    /**
     * @memberOf ThresholdController
     */
    const include_continue = function () {
        parsleyFieldValidated();
        parsleyFormError();
        parsleyFormValidated();
        parsleyFormSubmit(false);
        elementsMap.form.submit();
    };
    /**
     * Method responsable to apply events when field is validated
     * @memberOf ThresholdController
     */
    const parsleyFieldValidated = function () {
        elementsMap.form.parsley().on('field:validated', function () {
            if (this.validationResult) {
                this.$element.removeClass('is-invalid');
            } else {
                this.$element.addClass('is-invalid');
            }
        });
    };
    /**
     * Method responsable to apply events when form has error
     * @memberOf ThresholdController
     */
    const parsleyFormError = function () {
        elementsMap.form.parsley().on('form:error', function () {
            $.each(this.fields, function (key, field) {
                if (!field.validationResult) {
                    field.$element.addClass('is-invalid');
                }
            });
        });
    };
    /**
     * Method responsable to apply events when form is valited
     * @memberOf ThresholdController
     */
    const parsleyFormValidated = function () {
        elementsMap.form.parsley().on('form:validated', function () {
            if (this.validationResult) {
                $('.parsley-errors-list').removeClass('invalid-feedback');
            } else {
                $('.parsley-errors-list').addClass('invalid-feedback');
            }
        });
    };
    /**
     * Serialize to include on datatables
     * @memberOf ThresholdController
     */
    const serialize = function () {
        return {
            indicator: {
                id: elementsMap.indicatorId.val(),
                description: elementsMap.indicator.val()
            },
            stage: {
                id: elementsMap.stage.val(),
                description: elementsMap.stage.find('option:selected').text()
            },
            quality: elementsMap.quality.val(),
            begin: elementsMap.begin.val(),
            end: elementsMap.end.val(),
            weight: 1
        };
    };
    /**
     * Method responsable to apply events when form is submited
     * @memberOf ThresholdController
     */
    const parsleyFormSubmit = function (closeModal) {
        elementsMap.form.parsley().on('form:submit', function () {
            controller.addRow(serialize());
            clean(false);
            if (closeModal) {
                elementsMap.modal.modal('hide');
            } else {
                elementsMap.begin.focus();
            }
            return false;
        });
    };
    /**
     * Initialize modal for include threshold
     * @memberOf ThresholdController
     */
    this.init = function () {
        new AjaxController({
            url: 'stage',
            method: 'GET',
            data: {},
            success: callBackStageSuccess
        }).send(true);
        return this;
    };
    /**
     * Show modal for define a new threshold
     * @memberOf ThresholdController
     */
    this.show = function (indicator) {
        activeIndicator = indicator;
        clean(true);
        showModal();
    }
}