/**
 * SleepWeb
 * Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
 * Universidade de Passo Fundo - 2018/2019
 *
 * @author Matheus Hernandes
 * @since 02/09/2019
 * @namespace PatientService
 */
function PatientService() {
        /**
     * Handle success on request
     * @memberOf PatientService
     */
    const successInstitutionsHandler = function (data, id) {
        console.log(id);
    };
    /**
     * Handle erros on request
     * @memberOf PatientService
     */
    const errorInstitutionsHandler = function () {
        console.error("Could not populate institutions")
    };
    /**
     * Submit patient for external instances
     * @memberOf PatientService
     */
    this.submit_patient = function (id) {
         new AjaxController({
            data: {},
            method: 'POST',
            url: 'patient/send/' + id,
            success: function (data) {
                successInstitutionsHandler(data, id)
            },
            error: errorInstitutionsHandler
        }).send(true);
        return this;
    };
}