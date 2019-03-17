/**
 * SleepWeb
 * Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
 * Universidade de Passo Fundo - 2018/2019
 *
 * @author Matheus Hernandes
 * @since 09/03/2019
 * @namespace StageController
 */
function StageController($container) {
    /**
     * Return params for AbstractController
     * @memberOf StageController
     */
    const getParams = function () {
        return {
            moduleName: 'Stages',
            moduleIcon: 'fa fa-building',
            container: $container,
            apiUrl: '/api/stage/',
            message: {
                saveSuccess: `Stage successfully registered`,
                editPickError: `Select a stage to update`,
                editAjaxError: `Something went wrong with request, call administrators`,
                editSuccess: `Stage successfully updated`,
                removePickError: `Select a stage to remove`,
                removeConfirmationMsg: `Are you sure to remove this stage? You cannot revert if it is done.`,
                removeSuccess: `Stage successfully removed`,
                removeError: `Something went wrong with request, call administrators`,
            },
            datatableColumns: [
                {data: 'id',width:'60px'},
                {data: 'description'},
            ],
            serialize: serialize,
            toForm: toForm,
            clean: null
        };
    };
    /**
     * Fill form fields for update data
     * @memberOf StageController
     */
    const toForm = function (stage) {
        let $form = $('form', $container);
        $('#stage\\.id', $form).val(stage.id);
        $('#stage\\.description', $form).val(stage.description);
        $('#stage\\.definition', $form).val(stage.definition);
    };
    /**
     * Serialize form for API submit
     * @memberOf StageController
     */
    const serialize = function () {
        return $('form').serializeToJson();
    };
    /**
     * Module Initialize
     * @memberOf StageController
     */
    this.init = function () {
        new AbstractController(getParams()).init();
    };
}
