/**
 * SleepWeb
 * Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
 * Universidade de Passo Fundo - 2018/2019
 *
 * @author Matheus Hernandes
 * @since 10/11/2019
 * @namespace EvaluateController
 */
function EvaluateController() {
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
     * Initialize a map of elevents
     * @memberOf EvaluateController
     */
    const initElementsMap = function () {
        elementsMap.monitoringId = $('#monitoring_id');
        elementsMap.ruleForEvaluation = $('#ruleForEvaluation');
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
        console.log(data);
    };
    /**
     * Handle erros from evaluate request
     * @memberOf EvaluateController
     */
    const errorEvaluateHandler = function (data) {
        console.error(data);
    };
    /**
     * Clean evaluation
     * @memberOf EvaluateController
     */
    const clean = function () {
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
    };
}