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
    const populateForm = function () {

    };
    /**
     * Opens modal for include threshold
     * @memberOf ThresholdController
     */
    const showModal = function () {
        elementsMap.modal.modal('show');
    };
    /**
     * Initialize modal for include threshold
     * @memberOf ThresholdController
     */
    this.init = async function () {
        await initElements();
        await requestData();
        await populateForm();
        await showModal();
    };
}