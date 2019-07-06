/**
 * SleepWeb
 * Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
 * Universidade de Passo Fundo - 2018/2019
 *
 * @author Matheus Hernandes
 * @since 08/06/2019
 * @namespace ThresholdController
 */
function ThresholdController(indicator) {
    /**
     * Keeps active indicator for reference
     * @memberOf ThresholdController
     */
    let activeIndicator = indicator;
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
    const setInitialState = function () {
        let $indicator = $(activeIndicator);
        elementsMap.indicator.val($indicator.attr('indicator'));
        elementsMap.indicatorId.val($indicator.attr('enum'));
        elementsMap.stage.val(elementsMap.stage.find('option:first').val());
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
        elementsMap.begin.mask('000.00', {reverse: true});
        elementsMap.end.mask('000.00', {reverse: true});
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
        parsleyFormSubmit();
        elementsMap.form.submit();
    };
    /**
     * @memberOf ThresholdController
     */
    const include_continue = function () {

    };
    /**
     * Method responsable to apply events when field is validated
     * @memberOf AbstractController
     */
    const parsleyFieldValidated = function () {
        elementsMap.form.parsley().on('field:validated', function () {
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
        elementsMap.form.parsley().on('form:error', function () {
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
        elementsMap.form.parsley().on('form:validated', function () {
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
        elementsMap.form.parsley().on('form:submit', function () {
            console.log('foi');
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
        setInitialState();
        showModal();
    }
}