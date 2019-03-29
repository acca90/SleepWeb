/**
 * SleepWeb
 * Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
 * Universidade de Passo Fundo - 2018/2019
 *
 * @author Matheus Hernandes
 * @since 28/03/2019
 * @namespace FinderController
 */
function FinderController() {
    /**
     * Finder modal
     * @namespace FinderController
     */
    let $finder = $('#finder');
    /**
     * Load module for Finder
     * @namespace FinderController
     */
    const load = async function (url, callBacks) {
        $.ajax({
            url: url,
            dataType: "html",
        }).done(html => $("#load").html(html));
    };
    /**
     * Set title for finder
     * @namespace FinderController
     */
    const setTitle = function ( title ) {
        $finder.find('#titleArea').html(title);
    };
    /**
     * Return finder container
     * @namespace FinderController
     */
    this.getContainer = function () {
        return $finder.find('#container');
    };
    /**
     * Opens finder
     * @namespace FinderController
     */
    this.show = function () {
        $finder.modal('show');
    };
    /**
     * Run finder for user
     * @namespace FinderController
     */
    this.find = async function (param) {
        setTitle(param.title);
        await load('/finder/' + param.url, {
            callBackConfirm: param.callBackConfirm,
            callBackClose: param.callBackClose
        });
    };

}