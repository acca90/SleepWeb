/**
 * SleepWeb
 * Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
 * Universidade de Passo Fundo - 2018/2019
 *
 * @author Matheus Hernandes
 * @since 09/03/2019
 * @namespace HomeController
 */
function HomeController() {
    /**
     * Initialize controller
     * @memberOf HomeController
     */
    this.init = async function () {
        new HomeMonitoringController().init();
        new HomeAlertController().init();
    };
}