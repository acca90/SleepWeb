/**
 * SleepWeb
 * Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
 * Universidade de Passo Fundo - 2018/2019
 *
 * @author Matheus Hernandes
 * @since 16/03/2018
 * @namespace UserService
 */
function UserService() {
    /**
     * Method that find institutions
     * @memberOf UserService
     */
    this.institutions = function () {
        new AjaxController({
            data: {},
            method: 'GET',
            url: '/api/institution/',
            success: successInstitutionsHandler,
            error: errorInstitutionsHandler
        }).send();
    };
    /**
     * Handle success on request
     * @memberOf UserService
     */
    const successInstitutionsHandler = function (data) {
        let $userInstitution = $('#userInstitution');
        if ($.isEmpty(data) || $.isEmpty(data.results)) {
            return;
        }
        for (let result of data.results) {
            $userInstitution.append(
                `<option value="${result.id}">${result.name}</option>`
            );
        }
    };
    /**
     * Handle erros on request
     * @memberOf UserService
     */
    const errorInstitutionsHandler = function () {
    };
}