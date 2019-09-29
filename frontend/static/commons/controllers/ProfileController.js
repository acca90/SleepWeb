/**
 * SleepWeb
 * Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
 * Universidade de Passo Fundo - 2018/2019
 *
 * @author Matheus Hernandes
 * @since 20/09/2019
 * @namespace AbstractController
 */
function ProfileController($paramContainer) {
    /**
     * Map of elements from profile
     * @memberOf AbstractController
     */
    let elementMap = {};
    /**
     * Profile container
     * @memberOf AbstractController
     */
    const $container = $paramContainer;
    /**
     * Initialize map of elements
     * @memberOf AbstractController
     */
    const initElementMap = function () {
        elementMap.title = $('#profile_title', $container);
        elementMap.first_name = $('#profile\\.first_name', $container);
        elementMap.last_name = $('#profile\\.last_name', $container);
        elementMap.gender = $('#profile\\.gender', $container);
        elementMap.birth_date = $('#profile\\.birth_date', $container);
        elementMap.details = $('#profile\\.details', $container);
    };
    /**
     * Convert gender to string
     * @memberOf AbstractController
     */
    const gender = function (gender) {
        if ($.isEmpty(gender)) {
            return undefined;
        }
        return gender == 1 ? 'M' : "F";
    };
    /**
     * Format date to default string format
     * @memberOf AbstractController
     */
    const dateFormat = function (date) {
        if ($.isEmpty(date)) {
            return undefined;
        }
        return (date.split("-").reverse().join("/"))
    };
    /**
     * Initialize controller for profile
     * @memberOf AbstractController
     */
    this.init = function () {
        initElementMap();
        return this;
    };
    /**
     * Load data for profile
     * @memberOf AbstractController
     */
    this.load = function (patient) {
        elementMap.title.html("Patient");
        elementMap.first_name.html(patient.first_name || "-");
        elementMap.last_name.html(patient.last_name || "-");
        elementMap.gender.html(gender(patient.gender) || "-");
        elementMap.birth_date.html(dateFormat(patient.birth_date) || "-");
        elementMap.details.html(patient.obs || "-");
        return this;
    };
    /**
     * Clean profile
     * @memberOf AbstractController
     */
    this.clean = function () {
        return this;
    };
}