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
     * Form controller reference
     * @memberOf RuleController
     */
    let formController = null;
    /**
     * DataTable Settings
     * @memberOf RuleController
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
            clean: clean
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
     * Clean method that set form for its default state
     * @memberOf RuleController
     */
    const clean = function () {
        formController.ajustColumns();
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
        formController = new RuleFormController().init();
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
