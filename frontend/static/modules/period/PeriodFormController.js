/**
 * SleepWeb
 * Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
 * Universidade de Passo Fundo - 2018/2019
 *
 * @author Matheus Hernandes
 * @since 14/12/2019
 * @namespace PeriodFormController
 */
function PeriodFormController() {
    /**
     * Settings for patient finder
     * @memberOf GroupFormController
     */
    let finderSettings = null;
    /**
     * Keeps elements from DOM
     * @memberOf PeriodFormController
     */
    let elementsMap = {};
    /**
     * Calls patient finder
     * @memberOf PeriodFormController
     */
    const findPatient = function () {
        new FinderComponent(finderSettings).find();
    };
    /**
     * CallBack for Patients
     * @memberOf PeriodFormController
     */
    const callBackPatient = function (data) {
        if ($.isEmpty(data)) {
            elementsMap.patientField.val('');
            elementsMap.patientId.val('');
            return;
        }
        elementsMap.patientId.val(data.id);
        elementsMap.patientField.val(
            data.first_name + ' ' + data.last_name
        );
    };
    /**
     * Initialize finder
     * @memberOf PeriodFormController
     */
    const initFinder = function () {
        finderSettings = {
            url: 'patient',
            title: 'Find for Patients',
            callBackConfirm: callBackPatient
        };
    };
    /**
     * Initialize map of elements from DOM
     * @memberOf PeriodFormController
     */
    const initElementsMap = function () {
        elementsMap.container = $('#divPatient');
        elementsMap.finderBtn = $('#findPatient', elementsMap.container)
        elementsMap.patientField = $('#patientField', elementsMap.container)
        elementsMap.patientId = $('#patientId', elementsMap.container)
    };
    /**
     * Initialize events for the form
     * @memberOf PeriodFormController
     */
    const initEvents = function () {
        elementsMap.finderBtn.on('click', findPatient)
    };
    /**
     * Initializa form controller for monitoring periods form
     * @memberOf PeriodController
     */
    this.init = function () {
        initFinder();
        initElementsMap();
        initEvents();
    };
}