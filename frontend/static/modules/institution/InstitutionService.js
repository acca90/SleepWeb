/**
 * SleepWeb
 * Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
 * Universidade de Passo Fundo - 2018/2019
 *
 * @author Matheus Hernandes
 * @since 16/03/2019
 * @namespace InstitutionService
 */
function InstitutionService() {
    /**
     * Handle success on request
     * @memberOf InstitutionService
     */
    const successInstitutionsHandler = function (data, id) {
        let $userInstitution = $(id);
        if ($.isEmpty(data) || $.isEmpty(data.results)) {
            return;
        }
        for (let result of data.results) {
            $userInstitution.append(
                '<option value="' + result.id + '">' + result.name + '</option>'
            );
        }
    };
    /**
     * Handle erros on request
     * @memberOf InstitutionService
     */
    const errorInstitutionsHandler = function () {
        console.error("Could not populate institutions")
    };
    /**
     * Method that find institutions.json
     * @memberOf InstitutionService
     */
    this.populate = function (id) {
        new AjaxController({
            data: {},
            method: 'GET',
            url: 'institution',
            success: function (data) {
                successInstitutionsHandler(data, id)
            },
            error: errorInstitutionsHandler
        }).send(true);
    };
    /**
     * Render for institutions
     * @memberOf InstitutionService
     */
    this.render = function (data) {
        return $.isEmpty(data) ? 'Not Available' : data.name;
    };
}