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
     * Settings for find users
     * @memberOf GroupAllowFormController
     */
    let finderSettingsUser = null;
    /**
     * Settings for find institutions
     * @memberOf GroupAllowFormController
     */
    let finderSettingsInstitution = null;
    /**
     * Datatables settings for
     * @memberOf GroupAllowFormController
     */
    const datatableSettings = [
        {th: 'Name', data: 'name', sDefaultContent: '',},
        {th: 'Type', data: 'type', sDefaultContent: ''},
    ];
    /**
     * Initialize settings
     */
    const initSettings = function () {
        finderSettingsUser = {
            url: 'user',
            callBackConfirm: callBackUser
        };
        finderSettingsInstitution = {
            url: 'institution',
            callBackConfirm: callBackInstitution
        };
    };
    /**
     * CallBack for Users
     * @memberOf GroupAllowFormController
     */
    const callBackUser = function (data) {
        datatable.addRow(data);
    };
    /**
     * CallBack for Institution
     * @memberOf GroupAllowFormController
     */
    const callBackInstitution = function (data) {
        datatable.addRow(data);
    };
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
        $('#addResearchers').on('click', function () {
            new FinderController(finderSettingsUser).find();
        });
        $('#addInstitutions').on('click', function () {
            new FinderController(finderSettingsInstitution).find();
        });
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
        initSettings();
    };
}