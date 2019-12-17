/**
 * SleepWeb
 * Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
 * Universidade de Passo Fundo - 2018/2019
 *
 * @author Matheus Hernandes
 * @since 10/11/2019
 * @namespace EvaluateController
 */
function EvaluateController(controller) {
    /**
     * Map of elements
     * @memberOf EvaluateController
     */
    let elementsMap = {};
    /**
     * Graph controller
     * @memberOf EvaluateController
     */
    const graphController = new GraphController();
    /**
     * Module controller
     * @memberOf EvaluateController
     */
    const moduleController = controller;
    /**
     * Indx controller
     * @memberOf EvaluateController
     */
    const idx = new IdxComponent();
    /**
     * Initialize a map of elevents
     * @memberOf EvaluateController
     */
    const initElementsMap = function () {
        elementsMap.monitoringId = $('#monitoring_id');
        elementsMap.ruleForEvaluation = $('#ruleForEvaluation');
        elementsMap.indicators = $('#monitoringIndicators');
        //elementsMap.id = $('#');
        //elementsMap.id = $('#');
    };
    /**
     * Request API for bring user rules to populate select
     * @memberOf EvaluateController
     */
    const initUserRules = function () {
        new AjaxController({
            data: {},
            method: 'GET',
            url: 'rule',
            success: successPopulateRuleHandler,
            error: errorPopulateRuleHandler
        }).send(true);
    };
    /**
     * Handle success on request
     * @memberOf EvaluateController
     */
    const successPopulateRuleHandler = function (data) {
        if ($.isEmpty(data) || $.isEmpty(data.results)) {
            return;
        }
        data.results.forEach(rule => {
            elementsMap.ruleForEvaluation.append(
                `<option class="rule" value="${rule.id}">${rule.description}</option>`
            );
        });
    };
    /**
     * Handle erros on request
     * @memberOf EvaluateController
     */
    const errorPopulateRuleHandler = function () {
        console.error("Could not populate rules")
    };
    /**
     * Initialize events for the evaluation form
     * @memberOf EvaluateController
     */
    const initEvents = function () {
        $('#ruleForEvaluation').on('change', function () {
            evaluate(this.value)
        });
    };
    /**
     * Evaluate monitoring with selected rule
     * @memberOf EvaluateController
     */
    const evaluate = function (rule) {
        if ($.isEmpty(rule)) {
            clean();
            return;
        }
        ajaxEvaluate(elementsMap.monitoringId.val(), rule);
    };
    /**
     * Execute ajax request to bring evaluated data
     * @memberOf EvaluateController
     */
    const ajaxEvaluate = function ( monitoring, rule ) {
        new AjaxController({
            data: {},
            method: 'GET',
            url: `monitoring/evaluate/${monitoring}/${rule}`,
            success: successEvaluateHandler,
            error: errorEvaluateHandler
        }).send(true);
    };
    /**
     * Handle success from evaluate request
     * @memberOf EvaluateController
     */
    const successEvaluateHandler = function (data) {
        if ($.isEmpty(data)) {
            return;
        }
        populateIndicatorsSelect(data.results);
        idx.clean().load(data.idx);
    };
    /**
     * Populate indicatros on select
     * @memberOf EvaluateController
     */
    const populateIndicatorsSelect = function ( results ) {
        $('.indicator').remove();
        results.forEach(result => {
            elementsMap.indicators.append(`
                <option class="indicator" value="${result.indicator.id}">
                    ${result.indicator.initials} - ${result.indicator.description}
                </option>
            `)
        })
    };
    /**
     * Handle erros from evaluate request
     * @memberOf EvaluateController
     */
    const errorEvaluateHandler = function () {
        moduleController.message('danger', 'Fail to evaluate this monitoring with selected rule')
    };
    /**
     * Clean evaluation
     * @memberOf EvaluateController
     */
    this.clean = function () {
        idx.clean();
        elementsMap.ruleForEvaluation.val('');
        elementsMap.indicator.html('<option value="">Select</option>');
        elementsMap.indicator.val('');
    };
    /**
     * Initialize controller
     * @memberOf EvaluateController
     */
    this.init = function () {
        initElementsMap();
        initUserRules();
        initEvents();
        graphController.init();
        idx.init();
        return this;
    };
}