/**
 * SleepWeb
 * Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
 * Universidade de Passo Fundo - 2018/2019
 *
 * @author Matheus Hernandes
 * @since 16/03/2019
 * @namespace UserService
 */
function UserService() {
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
                '<option value="'+result.id+'">'+result.name+'</option>'
            );
        }
    };
    /**
     * Handle erros on request
     * @memberOf UserService
     */
    const errorInstitutionsHandler = function () {
    };
    /**
     * Method that find institutions
     * @memberOf UserService
     */
    this.init = function () {
        new AjaxController({
            data: {},
            method: 'GET',
            url: 'institution',
            success: successInstitutionsHandler,
            error: errorInstitutionsHandler
        }).send(true);
    };
}