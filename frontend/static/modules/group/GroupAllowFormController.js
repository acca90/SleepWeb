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
    let datatableSettings = null;
    /**
     * Render for name
     * @memberOf GroupAllowFormController
     */
    const nameRender = function (data, type, row) {
        if (row.type === 'Researcher') {
            return row.first_name + ' ' + row.last_name;
        }
        return row.name;
    };
    /**
     * Initialize settings
     */
    const initSettings = function () {
        datatableSettings = [
            {th: 'Type', width: '120px', data: 'type', sDefaultContent: ''},
            {th: 'Name', data: 'name', sDefaultContent: '', render: nameRender}
        ];
        finderSettingsUser = {
            url: 'user',
            title: 'Find for Researchers',
            callBackConfirm: callBackUser
        };
        finderSettingsInstitution = {
            url: 'institution',
            title: 'Find for Institutions',
            callBackConfirm: callBackInstitution
        };
    };
    /**
     * CallBack for Users
     * @memberOf GroupAllowFormController
     */
    const callBackUser = function (data) {
        data.type = 'Researcher';
        datatable.addRow(data);
    };
    /**
     * CallBack for Institution
     * @memberOf GroupAllowFormController
     */
    const callBackInstitution = function (data) {
        data.type = 'Institution';
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
            .setOrder([1,'desc'])
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
    /**
     * Load form for allowed
     * @memberOf GroupAllowFormController
     */
    this.toForm = function (users, institutions) {
        // TODO
        return this;
    };
    /**
     * Clean form for allowed
     * @memberOf GroupAllowFormController
     */
    this.clean = function () {
        datatable
            .ajustColumns()
            .clear();

        return this;
    };
    /**
     * Initialize form
     * @memberOf GroupAllowFormController
     */
    this.init = function () {
        initSettings();
        initDatatable();
        initEvents();
        return this;
    };
}