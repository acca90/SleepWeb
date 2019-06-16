/**
 * SleepWeb
 * Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
 * Universidade de Passo Fundo - 2018/2019
 *
 * @author Matheus Hernandes
 * @since 08/06/2019
 * @namespace ThresholdController
 */
function ThresholdController() {
    /**
     * Collected indicators
     * @memberOf ThresholdController
     */
    let indicators = null;
    /**
     * Collected stages
     * @memberOf ThresholdController
     */
    let stages = null;
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
        elementsMap.indicator = $('#threshold_indicator');
        elementsMap.stage = $('#threshold_stage');
        elementsMap.definition = $('#threshold_stage_definition');
        elementsMap.quality = $('#threshold_quality');
        elementsMap.begin = $('#threshold_begin');
        elementsMap.end = $('#threshold_end');
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
     */
    const setInitialState = function () {
        elementsMap.stage.val(elementsMap.stage.find('option:first').val());
        elementsMap.quality.val(elementsMap.quality.find('option:first').val())
    };
    /**
     * Handles success after call for stage list
     * @memberOf ThresholdController
     */
    const callBackSucess = async function (data) {
        await initElements();
        await requestData();
        await populateForm(data);
        await bindEvents();
        await setInitialState();
        await showModal();
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
            success: callBackSucess
        }).send(true);
    };
}