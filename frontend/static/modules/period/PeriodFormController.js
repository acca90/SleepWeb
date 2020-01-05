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
    let finderPatientSettings = null;
    /**
     * Settings for rule finder
     * @memberOf GroupFormController
     */
    let finderRuleSettings = null;
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
        new FinderComponent(finderPatientSettings).find();
    };
    /**
     * Calls rule finder
     * @memberOf PeriodFormController
     */
    const findRule = function () {
        new FinderComponent(finderRuleSettings).find();
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
     * CallBack for Rule
     * @memberOf PeriodFormController
     */
    const callBackRule = function (data) {
        if ($.isEmpty(data)) {
            elementsMap.ruleField.val('');
            elementsMap.ruleId.val('');
            return;
        }
        elementsMap.ruleId.val(data.id);
        elementsMap.ruleField.val(data.description);
    };
    /**
     * Initialize finder
     * @memberOf PeriodFormController
     */
    const initFinder = function () {
        finderPatientSettings = {
            url: 'patient',
            title: 'Find for Patients',
            callBackConfirm: callBackPatient
        };
        finderRuleSettings = {
            url: 'rule',
            title: 'Find for Rule',
            callBackConfirm: callBackRule
        };
    };
    /**
     * Initialize map of elements from DOM
     * @memberOf PeriodFormController
     */
    const initElementsMap = function () {
        let containerPatient = $('#divPatient');
        let containerRule = $('#divRule');
        elementsMap.patientFinderBtn = $('#findPatient', containerPatient);
        elementsMap.patientField = $('#patientField', containerPatient);
        elementsMap.patientId = $('#patientId', containerPatient);
        elementsMap.ruleFinderBtn = $('#findRule', containerRule);
        elementsMap.ruleField = $('#ruleField', containerRule);
        elementsMap.ruleId = $('#ruleId', containerRule);
    };
    /**
     * Initialize events for the form
     * @memberOf PeriodFormController
     */
    const initEvents = function () {
        elementsMap.patientFinderBtn.on('click', findPatient);
        elementsMap.ruleFinderBtn.on('click', findRule);
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