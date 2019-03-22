/**
 * SleepWeb
 * Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
 * Universidade de Passo Fundo - 2018/2019
 *
 * @author Matheus Hernandes
 * @since 21/03/2019
 * @namespace IndicatorController
 */
function IndicatorController($container) {
    /**
     * Return params for AbstractController
     * @memberOf IndicatorController
     */
    const getParams = function () {
        return {
            moduleName: 'Indicators',
            moduleIcon: 'fa fa-heart',
            container: $container,
            apiUrl: '/api/indicator/',
            message: {
                saveSuccess: `Indicator successfully registered`,
                editPickError: `Select a indicator to update`,
                editAjaxError: `Something went wrong with request, call administrators`,
                editSuccess: `Indicator successfully updated`,
                removePickError: `Select a indicator to remove`,
                removeConfirmationMsg: `Are you sure to remove this indicator? You cannot revert if it is done.`,
                removeSuccess: `Indicator successfully removed`,
                removeError: `Something went wrong with request, call administrators`,
            },
            datatableColumns: [
                {data: 'id',width:'60px'},
                {data: 'description'},
                {data: 'definition'},
            ],
            serialize: serialize,
            toForm: toForm,
            clean: null
        };
    };
    /**
     * Fill form fields for update data
     * @memberOf IndicatorController
     */
    const toForm = function (indicator) {
        let $form = $('form', $container);
        $('#indicatorId', $form).val(indicator.id);
        $('#indicatorDescription', $form).val(indicator.description);
        $('#indicatorDefinition', $form).val(indicator.definition);
    };
    /**
     * Serialize form for API submit
     * @memberOf IndicatorController
     */
    const serialize = function () {
        return $('form').serializeToJson();
    };
    /**
     * Module Initialize
     * @memberOf IndicatorController
     */
    this.init = function () {
        new AbstractController(getParams()).init();
    };
}
