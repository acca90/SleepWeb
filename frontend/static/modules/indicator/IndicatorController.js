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
     * DataTable Settings
     * @namespace IndicatorController
     */
    const getDatatableSettings = function () {
        return [
            {th: '#', data: 'id', width: '60px'},
            {th: 'Initials', data: 'initials', width: '100px'},
            {th: 'Description', data: 'description', width: '200px'},
            {th: 'Definition', data: 'definition'},
        ]
    };
    /**
     * Return params for AbstractController
     * @memberOf IndicatorController
     */
    const getParams = function () {
        return {
            container: $container,
            apiUrl: 'indicator',
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
            datatableSettings: getDatatableSettings(),
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
        $('#indicatorInitials', $form).val(indicator.initials);
        $('#indicatorMeasurement', $form).val(indicator.measurement);
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
    /**
     * Load a modal datatables for search and pick registers
     * @memberOf IndicatorController
     */
    this.getSettings = function () {
        return {
            apiUrl: getParams().apiUrl,
            datatableSettings: getDatatableSettings()
        }
    };
}
