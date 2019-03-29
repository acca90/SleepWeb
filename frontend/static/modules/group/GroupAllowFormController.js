/**
 * SleepWeb
 * Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
 * Universidade de Passo Fundo - 2018/2019
 *
 * @author Matheus Hernandes
 * @since 29/03/2019
 * @namespace GroupAllowFormController
 */
function GroupAllowFormController() {
    /**
     * Datatable with allowed researchers (users) and institutions
     * @memberOf GroupAllowFormController
     */
    let datatable = null;
    /**
     * Datatables settings for
     */
    const datatableSettings = [
        {th: 'Name', data: 'name', sDefaultContent: '',},
        {th: 'Type', data: 'type', sDefaultContent: ''},
    ];
    /**
     * Initialize DataTable
     * @memberOf GroupAllowFormController
     */
    const initDatatable = function () {
        datatable = new DataTableController(datatableSettings)
            .buildTable()
            .place($('#datatableAllowContainer'))
            .strechtIt()
            .selectable()
            .mountStatic();
    };
    /**
     * Initilize click events
     * @memberOf GroupAllowFormController
     */
    const initEvents = function () {

    };
    this.toForm = function () {
        // TODO
    };
    this.clean = function () {
        // TODO
    };
    /**
     * Initialize form
     * @memberOf GroupAllowFormController
     */
    this.init = function () {
        initDatatable();
        initEvents();
    };
}