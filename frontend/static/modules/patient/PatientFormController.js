/**
 * SleepWeb
 * Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
 * Universidade de Passo Fundo - 2018/2019
 *
 * @author Matheus Hernandes
 * @since 29/03/2019
 * @namespace PatientFormController
 */
function PatientFormController() {
    /**
     * Datatable with institutions
     * @memberOf PatientFormController
     */
    let datatableInstitutions = null;
    /**
     * Datatables settings for allowed
     * @memberOf PatientFormController
     */
    let datatableInstitutionSettings = null;
    /**
     * Settings for find institutions.json
     * @memberOf PatientFormController
     */
    let finderSettingsInstitution = null;
    /**
     * Tab for allowed
     * @memberOf PatientFormController
     */
    let institutions = null;
    /**
     * Messages fro easy internacionalization
     * @memberOf PatientFormController
     */
    let msg = {
        SELECT_ROW_TO_REMOVE: 'Select at least one row to remove from list',
        NEED_CONFIRMATION: 'Need confirmation',
        CONFIRM_REMOVE_ITEM_FROM_LIST: 'Are you sure to remove this item from list?'
    };
    /**
     * Initialize settings
     * @memberOf PatientFormController
     */
    const initSettings = function () {
        datatableInstitutionSettings = [
            {th: '#', data: 'id'},
            {th: 'Name', data: 'name'},
            {th: 'Contry', data: 'country'}
        ];
        finderSettingsInstitution = {
            url: 'institution',
            title: 'Find for Institutions',
            callBackConfirm: callBackInstitution
        };
    };
    /**
     * Initialize DataTable
     * @memberOf PatientFormController
     */
    const initDatatable = function () {
        datatableInstitutions = new DataTableComponent(datatableInstitutionSettings)
            .buildTable()
            .place($('#datatableInstitutions'))
            .setOrder([1, 'desc'])
            .searchable(false)
            .strechtIt()
            .selectable()
            .mountStatic();
    };
    /**
     * Corrects datatables column alignment
     * @memberOf PatientFormController
     */
    const initTabCorrections = function () {
        institutions = $('#tab_institutions');
        institutions.on('shown.bs.tab', function () {
            datatableInstitutions.ajustColumns();
        });
    };
    /**
     * Initilize click events
     * @memberOf PatientFormController
     */
    const initEvents = function () {
        $('#addInstitutions').on('click', function () {
            new FinderComponent(finderSettingsInstitution).find();
        });
        $('#removeAllowed').on('click', function () {
            removeInstitution();
        });
    };
    /**
     * Check if patient is already in datatable
     * @memberOf PatientFormController
     */
    const isInstitutionInTable = function (institution) {
        let isInTable = false;
        for (let row of datatableInstitutions.getDataArray()) {
            if (row.id === institution.id) {
                isInTable = true;
                break;
            }
        }
        return isInTable;
    };
    /**
     * CallBack for Institution
     * @memberOf PatientFormController
     */
    const callBackInstitution = function (data) {
        if (isInstitutionInTable(data)) {
            return;
        }
        datatableInstitutions.addRow(data);
    };
    /**
     * Remove institution from the list
     * @memberOf PatientFormController
     */
    const removeInstitution = function () {
        let $tr = datatableInstitutions.getSelectedRow();
        if (!$tr.length) {
            alert(msg.SELECT_ROW_TO_REMOVE);
            return;
        }
        removeSelectedInstitution($tr);
    };
    /**
     * Remove selected allowed from the list
     * @memberOf PatientFormController
     */
    const removeSelectedInstitution = function ($tr) {
        new ConfirmationController(
            msg.NEED_CONFIRMATION,
            msg.CONFIRM_REMOVE_ITEM_FROM_LIST,
            $modal => {
                datatableInstitutions.removeRow($tr);
                $modal.modal('toggle');
            }
        ).open();
    };
    /**
     * Clean form for allowed
     * @memberOf PatientFormController
     */
    this.clean = function () {
        institutions.trigger('click');
        datatableInstitutions.ajustColumns().clear();
        return this;
    };
    /**
     * Serialize patients for submit
     * @memberOf PatientFormController
     */
    const serializeInstitution = function (form) {
        let rows = datatableInstitutions.getDataArray();
        rows.forEach(row => form.institutions.push(row.id));
        return form
    };
    /**
     * Load institutions
     * @memberOf PatientFormController
     */
    this.load = function (institutions) {
        datatableInstitutions.setDataArray(institutions);
        return this;
    };
    /**
     * Serialize data for submit
     * @memberOf PatientFormController
     */
    this.serialize = function () {
        return serializeInstitution({institutions: []});
    };
    /**
     * Initialize form
     * @memberOf PatientFormController
     */
    this.init = function () {
        initSettings();
        initDatatable();
        initTabCorrections();
        initEvents();
        return this;
    };
}