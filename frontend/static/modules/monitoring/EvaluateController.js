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
     * Initialize a map of elevents
     * @memberOf EvaluateController
     */
    const initElementsMap = function () {
        elementsMap.monitoringId = $('#monitoring_id');
        elementsMap.ruleForEvaluation = $('#ruleForEvaluation');
        elementsMap.indicator = $('#monitoringIndicators');
        elementsMap.showResult = $('#showResult');
        elementsMap.divAlert = $('#divAlert');
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
;    };
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
        elementsMap.ruleForEvaluation.on('change', function () {
            evaluate(this.value)
        });
        elementsMap.indicator.on('change', function () {
            thresholds(elementsMap.ruleForEvaluation.val(), this.value)
        });
    };
    /**
     * Evaluate monitoring with selected rule
     * @memberOf EvaluateController
     */
    const evaluate = function (rule) {
        fastClean();
        if ($.isEmpty(rule)) {
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
        graphController.updateOverall(data);
        populateIndicatorsSelect(data.results);
        showResult(data);
    };
    /**
     * Show alert informing the result of evaluation
     * @memberOf EvaluateController
     */
    const showResult = function ( data ) {
        elementsMap.showResult.show();
        let idx = parseInt(data.idx);
        elementsMap
            .divAlert
            .removeClass('alert-quality-0')
            .removeClass('alert-quality-1')
            .removeClass('alert-quality-2')
            .removeClass('alert-quality-3')
            .removeClass('alert-quality-4');


        if (idx == 10) {
            elementsMap.divAlert.html('Result index: ' + idx + ', no disturbs');
            elementsMap.divAlert.addClass('alert-quality-0')

        } else if (idx > 7 && idx <= 9) {
            elementsMap.divAlert.html('Result index: ' + idx + ', anormalities');
            elementsMap.divAlert.addClass('alert-quality-1')

        } else if (idx > 5 && idx <= 7) {
            elementsMap.divAlert.html('Result index: ' + idx + ', minor disturbs');
            elementsMap.divAlert.addClass('alert-quality-2')

        } else if (idx > 3 && idx <= 5) {
            elementsMap.divAlert.html('Result index: ' + idx + ', moderate disturbs');
            elementsMap.divAlert.addClass('alert-quality-3')

        } else if (idx <= 3) {
            elementsMap.divAlert.html('Result index: ' + idx + ', strong disturbs');
            elementsMap.divAlert.addClass('alert-quality-4')

        }
    };
    /**
     * Populate indicatros on select
     * @memberOf EvaluateController
     */
    const populateIndicatorsSelect = function ( results ) {
        $('.indicator').remove();
        results.forEach(result => {
            elementsMap.indicator.append(`
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
     * Request data for thresholds visualization
     * @memberOf EvaluateController
     */
    const thresholds = function ( rule, indicator ) {
        if ($.isEmpty(indicator) || $.isEmpty(rule)) {
            return;
        }
        let monitoring = elementsMap.monitoringId.val();
        new AjaxController({
            data: {},
            method: 'GET',
            url: `rule/thresholds/${rule}/${indicator}/${monitoring}`,
            success: successThresholdHandler,
            error: errorThresholdHandler
        }).send(true);
    };
    /**
     * @memberOf EvaluateController
     */
    const successThresholdHandler = function ( data ) {
        graphController.updateCurve(data);
    };
    /**
     * Handle erros from threhold request
     * @memberOf EvaluateController
     */
    const errorThresholdHandler = function () {
        moduleController.message('danger', 'Fail to request thresholds quality curve')
    };
    /**
     * Clean evaluation
     * @memberOf EvaluateController
     */
    const clean = function () {
        fastClean();
        elementsMap.ruleForEvaluation.val('');
        elementsMap.indicator.html('<option value="">Select</option>');
        elementsMap.indicator.val('');
    };
    /**
     * Clean fields keeping requested information
     * @memberOf EvaluateController
     */
    const fastClean = function () {
        graphController.clean();
        elementsMap.showResult.hide();
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
        return this;
    };
    /**
     * Expose clean function for public access
     * @memberOf EvaluateController
     */
    this.clean = clean;
}