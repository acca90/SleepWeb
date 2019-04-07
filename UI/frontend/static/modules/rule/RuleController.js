/**
 * SleepWeb
 * Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
 * Universidade de Passo Fundo - 2018/2019
 *
 * @author Matheus Hernandes
 * @since 07/04/2019
 * @namespace RuleController
 */
function RuleController($container) {
    /**
     * DataTable Settings
     * @namespace RuleController
     */
    const getDatatableSettings = function () {
        return [
            {th: '#', data: 'id', width: '60px'},
            {th: 'Description', data: 'description'},
        ]
    };
    /**
     * Return params for AbstractController
     * @memberOf RuleController
     */
    const getParams = function () {
        return {
            moduleName: 'Rules',
            moduleIcon: 'fa fa-gavel',
            container: $container,
            apiUrl: '/api/rule/',
            message: {
                saveSuccess: `Rule successfully registered`,
                editPickError: `Select a rule to update`,
                editAjaxError: `Something went wrong with request, call administrators`,
                editSuccess: `Rule successfully updated`,
                removePickError: `Select a rule to remove`,
                removeConfirmationMsg: `Are you sure to remove this rule? You cannot revert if it is done.`,
                removeSuccess: `Rule successfully removed`,
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
     * @memberOf RuleController
     */
    const toForm = function (rule) {
        let $form = $('form', $container);
    };
    /**
     * Serialize form for API submit
     * @memberOf RuleController
     */
    const serialize = function () {
        return $('form').serializeToJson();
    };
    /**
     * Module Initialize
     * @memberOf RuleController
     */
    this.init = function () {
        new AbstractController(getParams()).init();
    };
    /**
     * Load a modal datatables for search and pick registers
     * @memberOf RuleController
     */
    this.getSettings = function () {
        return {
            apiUrl: getParams().apiUrl,
            datatableSettings: getDatatableSettings()
        }
    };
}
