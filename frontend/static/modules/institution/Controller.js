/**
 * SleepWeb
 * Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
 * Universidade de Passo Fundo - 2018/2019
 *
 * @author Matheus Hernandes
 * @since 09/03/2018
 * @namespace InstitutionController
 */
function Controller() {
    /**
     * Return params for AbstractController
     * @memberOf InstitutionController
     */
    const getParams = function () {
        return {
            container: $('#institution'),
            apiUrl: '/api/institution/',
            serialize: serialize,
            successMessage: `Institution successfully registered`

        };
    };
    /**
     * Serialize form for API submit
     * @memberOf InstitutionController
     */
    const serialize = function () {
        return $('form').serializeToJson();
    };
    /**
     * Module Initialize
     * @memberOf InstitutionController
     */
    this.init = function () {
        new AbstractController(getParams()).init();
    };
}

$(document).ready(function () {
    new Controller().init();
});
