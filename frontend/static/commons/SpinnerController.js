/**
 * SleepWeb
 * Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
 * Universidade de Passo Fundo - 2018/2019
 *
 * @author Matheus Hernandes
 * @since 21/03/2019
 * @namespace SpinnerController
 */
function SpinnerController() {
    /**
     * Modal spinner
     * @memberOf SpinnerController
     */
    let $modal = $('#spinner');
    /**
     * Open spinner
     * @memberOf SpinnerController
     */
    this.open = function () {
        $modal.modal({
            backdrop: 'static',
            keyboard: false
        })
    };
    /**
     * Close spinner
     * @memberOf SpinnerController
     */
    this.close = function () {
        $modal.modal('hide');
    };
    /**
     * Shows modal and close 1 second after
     * @memberOf SpinnerController
     */
    this.pop = function () {
        this.open();
        setTimeout(() => {
            this.close();
        }, 1000);
    };
}

