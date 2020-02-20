/**
 * SleepWeb
 * Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
 * Universidade de Passo Fundo - 2018/2019
 *
 * @author Matheus Hernandes
 * @since 18/01/2020
 * @namespace PatientReferenceController
 */
function PatientReferenceController(abstractController) {
    /**
     * Main controller
     * @memberOf PatientReferenceController
     */
    const mainController = abstractController;
    /**
     * Settings for datatables
     * @memberOf PatientReferenceController
     */
    let dtSettings = null;
    /**
     * Map of elements
     * @memberOf PatientReferenceController
     */
    let elementsMap = {};
    /**
     * Initialize settings for datatable
     * @memberOf PatientReferenceController
     */
    const initSettings = function () {
        dtSettings = [
            {
                th: 'Patient name / description',
                data: 'name',
                sDefaultContent: '',
            },
            {
                th: 'Monitoring System',
                data: 'system__description',
                sDefaultContent: '',
            },
            {
                th: 'Monitoring System Institution',
                data: 'system__institution__name',
                sDefaultContent: '',
            },
        ];
    };
    /**
     * Initialize map of elements
     * @memberOf PatientReferenceController
     */
    const initElementsMap = function () {
        elementsMap.list = $('#list');
        elementsMap.reference = $('#reference');
        elementsMap.patient = $('#patientid');
        elementsMap.btnCancel = $('#btnCancel', elementsMap.reference);
        elementsMap.btnSave = $('#btnSave', elementsMap.reference);
        elementsMap.patientname = $('b#patientname', elementsMap.reference);
        elementsMap.dt = new DataTableComponent(dtSettings)
            .buildTable()
            .place($('#dtcontainer'))
            .setOrder([1, 'desc'])
            .searchable(false)
            .multiSelectable()
            .strechtIt()
            .mountStatic();
    };
    /**
     * Initialzie form events
     * @memberOf PatientReferenceController
     */
    const initEvents = function () {
        elementsMap.btnCancel.on('click', function () {
            elementsMap.list.show();
            elementsMap.reference.hide();
            elementsMap.dt.clear();
        });
        elementsMap.btnSave.on('click', function () {
            save();
        });
    };
    /**
     * Save selected references linking with selected patient
     * @memberOf PatientReferenceController
     */
    const save = function () {
        let uuids = elementsMap.dt.getSelectedRowData().map(row => {
            return row.uuid
        });
        new AjaxController({
            pk: elementsMap.patient.val(),
            data: {
                pk: elementsMap.patient.val(),
                references: uuids
            },
            method: 'PUT',
            url: 'patient/remote',
            success: callBackReferenceSaveSuccess,
            error: callBackReferenceSaveError
        }).send(true);
    };
    /**
     * Handle success in save references
     * @memberOf PatientReferenceController
     */
    const callBackReferenceSaveSuccess = function () {
        elementsMap.list.show();
        elementsMap.reference.hide();
        elementsMap.dt.clear();
        mainController.messageList('success','Reference for patient successfully linked');
    };
    /**
     * Handle erros in save references
     * @memberOf PatientReferenceController
     */
    const callBackReferenceSaveError = function () {
        mainController.message('error','Fail to save reference');
    };
    /**
     * Succes request for referecnes
     * @memberOf PatientReferenceController
     */
    const callBackReferenceSuccess = function ( data, rowData ) {
        if (data.length === 0) {
            mainController.messageList('warning','No references found to link');
            return
        }
        elementsMap.list.hide();
        elementsMap.reference.show();
        elementsMap.dt.clear().setDataArray(data).ajustColumns();
        elementsMap.patient.val(rowData.id);
        elementsMap.patientname.html(rowData.first_name + ' ' + rowData.last_name);
    };
    /**
     * Handler for errors
     * @memberOf PatientReferenceController
     */
    const callBackReferenceError = function () {
    };
    /**
     * Clean form reference
     * @memberOf PatientReferenceController
     */
    this.clean = function () {
        elementsMap.dt
            .ajustColumns()
            .clear();
        return this;
    };
    /**
     * Load data for patient
     * @memberOf PatientReferenceController
     */
    this.load = function ( rowData ) {
        new AjaxController({
            pk: rowData.id,
            data: { pk: rowData.id },
            method: 'GET',
            url: 'patient/remote',
            success: function ( data ) {
                callBackReferenceSuccess(data, rowData)
            },
            error:  callBackReferenceError
        }).send(true);
        return this;
    };
    /**
     * Initialize controller
     * @memberOf PatientReferenceController
     */
    this.init = function () {
        initSettings();
        initElementsMap();
        initEvents();
        return this;
    };
}