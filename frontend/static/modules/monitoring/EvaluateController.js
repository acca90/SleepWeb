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
     * Request API for bring user rules to populate select
     * @memberOf EvaluateController
     */
    const populateSelectWithUserRules = function () {
        new AjaxController({
            data: {},
            method: 'GET',
            url: 'rule',
            success: successInstitutionsHandler,
            error: errorInstitutionsHandler
        }).send(true);
        return this;
    };
    /**
     * Handle success on request
     * @memberOf EvaluateController
     */
    const successInstitutionsHandler = function (data) {
        if ($.isEmpty(data) || $.isEmpty(data.results)) {
            return;
        }
        data.results.forEach(rule => {
            $('#ruleForEvaluation').append(
                `<option value="${rule.id}">${rule.description}</option>`
            );
        });
    };
    /**
     * Handle erros on request
     * @memberOf EvaluateController
     */
    const errorInstitutionsHandler = function () {
        console.error("Could not populate rules")
    };
    /**
     * Initialize events for the evaluation form
     * @memberOf EvaluateController
     */
    const initializeEvents = function () {
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
        populateSelectWithUserRules();
        initializeEvents();
    };
}