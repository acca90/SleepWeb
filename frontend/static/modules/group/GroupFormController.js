/**
 * SleepWeb
 * Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
 * Universidade de Passo Fundo - 2018/2019
 *
 * @author Matheus Hernandes
 * @since 29/03/2019
 * @namespace GroupFormController
 */
function GroupFormController() {
    /**
     * Datatable with allowed researchers (users) and institutions.json
     * @memberOf GroupFormController
     */
    let datatableAllowed = null;
    /**
     * Datatable with allowed patients
     * @memberOf GroupFormController
     */
    let datatablePatients = null;
    /**
     * Settings for find users
     * @memberOf GroupFormController
     */
    let finderSettingsUser = null;
    /**
     * Settings for find institutions.json
     * @memberOf GroupFormController
     */
    let finderSettingsInstitution = null;
    /**
     * Settings for find patients
     * @memberOf GroupFormController
     */
    let finderSettingsPatients = null;
    /**
     * Datatables settings for allowed
     * @memberOf GroupFormController
     */
    let datatableAllowedSettings = null;
    /**
     * Datatables settings for patients
     * @memberOf GroupFormController
     */
    let datatablePatientsSettings = null;
    /**
     * Tab for allowed
     * @memberOf GroupFormController
     */
    let sharewith = null;
    /**
     * Tab for patients
     * @memberOf GroupFormController
     */
    let patientstab = null;
    /**
     * Messages fro easy internacionalization
     * @memberOf GroupFormController
     */
    let msg = {
        SELECT_ROW_TO_REMOVE: 'Select at least one row to remove from list',
        NEED_CONFIRMATION: 'Need confirmation',
        CONFIRM_REMOVE_ITEM_FROM_LIST: 'Are you sure to remove this item from list?'
    };
    /**
     * Render for name
     * @memberOf GroupFormController
     */
    const nameRender = function (data, type, row) {
        if (row.type === 'Researcher') {
            return row.first_name + ' ' + row.last_name;
        }
        return row.name;
    };
    /**
     * Render for name
     * @memberOf GroupFormController
     */
    const renderFullName = function (data, type, row) {
        return data + " " + row.last_name;
    };
    /**
     * Render for birth date and age
     * @memberOf GroupFormController
     */
    const renderBirthDateAndAge = function (data) {
        return $.dateFormat(data) + ` (${$.calcAge(data)})`;
    };
    /**
     * Render for gender
     * @memberOf GroupFormController
     */
    const renderGender = function (data) {
        return data === 1 ? 'Masculine' : 'Feminine';
    };
    /**
     * Initialize settings
     */
    const initSettings = function () {
        datatableAllowedSettings = [
            {th: 'Type', width: '120px', data: 'type', sDefaultContent: ''},
            {th: 'Name', data: 'name', sDefaultContent: '', render: nameRender},
        ];
        datatablePatientsSettings = [
            {th: '#', data: 'id', width: '60px'},
            {th: 'Name', data: 'first_name', render: renderFullName},
            {th: 'Brith Date', data: 'birth_date', render: renderBirthDateAndAge, width: '200px'},
            {th: 'Gender', data: 'gender', render: renderGender, width: '100px'},
            {th: 'Stage', data: 'stage', sDefaultContent: '', width: '120px'},
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
        finderSettingsPatients = {
            url: 'patient',
            title: 'Find for Patients',
            callBackConfirm: callBackPatient
        };
    };
    /**
     * CallBack for Users
     * @memberOf GroupFormController
     */
    const callBackUser = function (data) {
        data.type = 'Researcher';
        if (isAllowedInTable(data)) {
            return;
        }
        datatableAllowed.addRow(data);
    };
    /**
     * CallBack for Institution
     * @memberOf GroupFormController
     */
    const callBackInstitution = function (data) {
        data.type = 'Institution';
        if (isAllowedInTable(data)) {
            return;
        }
        datatableAllowed.addRow(data);
    };
    /**
     * CallBack for Patients
     * @memberOf GroupFormController
     */
    const callBackPatient = function (data) {
        if (isPatientInTable(data)) {
            return;
        }
        datatablePatients.addRow(data);
    };
    /**
     * Initialize DataTable
     * @memberOf GroupFormController
     */
    const initDatatable = function () {
        datatableAllowed = new DataTableComponent(datatableAllowedSettings)
            .buildTable()
            .place($('#datatableAllowContainer'))
            .setOrder([1, 'desc'])
            .searchable(false)
            .strechtIt()
            .selectable()
            .mountStatic();

        datatablePatients = new DataTableComponent(datatablePatientsSettings)
            .buildTable()
            .place($('#datatablePatientsContainer'))
            .setOrder([1, 'desc'])
            .searchable(false)
            .strechtIt()
            .selectable()
            .mountStatic();
    };
    /**
     * Corrects datatables column alignment
     * @memberOf GroupFormController
     */
    const initTabCorrections = function () {
        sharewith = $('#sharewith');
        sharewith.on('shown.bs.tab', function () {
            datatableAllowed.ajustColumns();
        });
        patientstab = $('#patientstab');
        patientstab.on('shown.bs.tab', function () {
            datatablePatients.ajustColumns();
        });
    };
    /**
     * Initilize click events
     * @memberOf GroupFormController
     */
    const initEvents = function () {
        $('#addResearchers').on('click', function () {
            new FinderComponent(finderSettingsUser).find();
        });
        $('#addInstitutions').on('click', function () {
            new FinderComponent(finderSettingsInstitution).find();
        });
        $('#addPatients').on('click', function () {
            new FinderComponent(finderSettingsPatients).find();
        });
        $('#removeAllowed').on('click', function () {
            removeAllowed();
        });
        $('#removePatient').on('click', function () {
            removePatient();
        });
    };
    /**
     * Remove allowed agent from the list
     * @memberOf GroupFormController
     */
    const removeAllowed = function () {
        let $tr = datatableAllowed.getSelectedRow();
        if (!$tr.length) {
            alert(msg.SELECT_ROW_TO_REMOVE);
            return;
        }
        removeSelectedAllowed($tr);
    };
    /**
     * Remove selected allowed from the list
     * @memberOf GroupFormController
     */
    const removeSelectedAllowed = function ($tr) {
        new ConfirmationController(
            msg.NEED_CONFIRMATION,
            msg.CONFIRM_REMOVE_ITEM_FROM_LIST,
            $modal => {
                datatableAllowed.removeRow($tr);
                $modal.modal('toggle');
            },
            () => {
            },
        ).open();
    };
    /**
     * Remove patient from the list
     * @memberOf GroupFormController
     */
    const removePatient = function () {
        let $tr = datatablePatients.getSelectedRow();
        if (!$tr.length) {
            alert(msg.SELECT_ROW_TO_REMOVE);
            return;
        }
        removeSelectedPatient($tr);
    };
    /**
     * Remove selected patient from the list
     * @memberOf GroupFormController
     */
    const removeSelectedPatient = function ($tr) {
        new ConfirmationController(
            msg.NEED_CONFIRMATION,
            msg.CONFIRM_REMOVE_ITEM_FROM_LIST,
            $modal => {
                datatablePatients.removeRow($tr);
                $modal.modal('toggle');
            },
            () => {
            },
        ).open();
    };
    /**
     * Load form for allowed
     * @memberOf GroupFormController
     */
    this.load = function (users, institutions, patients) {
        let allowed = [];
        users.forEach(user => {
            user.type = 'Researcher';
            user.name = user.first_name;
            allowed.push(user);
        });
        institutions.forEach(institution => {
            institution.type = 'Institution';
            allowed.push(institution);
        });
        datatableAllowed.setDataArray(allowed);
        datatablePatients.setDataArray(patients);
        return this;
    };
    /**
     * Clean form for allowed
     * @memberOf GroupFormController
     */
    this.clean = function () {
        sharewith.trigger('click');

        datatableAllowed
            .ajustColumns()
            .clear();

        datatablePatients
            .ajustColumns()
            .clear();

        return this;
    };
    /**
     * Serialize allowed for submit
     * @memberOf GroupFormController
     */
    const serializeAllowed = function (form) {
        let rows = datatableAllowed.getDataArray();
        rows.forEach(row => {
            if (row.type === 'Researcher') {
                form.users.push(row.id)
            } else {
                form.institutions.push(row.id)
            }
        });
        return form;
    };
    /**
     * Serialize patients for submit
     * @memberOf GroupFormController
     */
    const serializePatients = function (form) {
        let rows = datatablePatients.getDataArray();
        rows.forEach(row => form.patients.push(row.id));
        return form
    };
    /**
     * Check if user or institution is already in datatable
     * @memberOf GroupFormController
     */
    const isPatientInTable = function (patient) {
        let isInTable = false;
        for (let row of datatablePatients.getDataArray()) {
            if (row.id === patient.id) {
                isInTable = true;
                break;
            }
        }
        return isInTable;
    };
    /**
     * Check if patient is already in datatable
     * @memberOf GroupFormController
     */
    const isAllowedInTable = function (allowed) {
        let isInTable = false;
        for (let row of datatableAllowed.getDataArray()) {
            if (row.id === allowed.id && row.type === allowed.type) {
                isInTable = true;
                break;
            }
        }
        return isInTable;
    };
    /**
     * Serialize data for submit
     * @memberOf GroupFormController
     */
    this.serialize = function () {
        return serializePatients(
            serializeAllowed({
                users: [],
                institutions: [],
                patients: []
            })
        );
    };
    /**
     * Initialize form
     * @memberOf GroupFormController
     */
    this.init = function () {
        initSettings();
        initDatatable();
        initTabCorrections();
        initEvents();
        return this;
    };
}