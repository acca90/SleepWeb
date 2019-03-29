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
        }).done(async function (html) {
            await $("#load").html(html);
            await initDatatable(getSettings());
            await $finder.modal('show');
        });
    };
    /**
     * Set title for finder
     * @namespace FinderController
     */
    const setTitle = function (title) {
        $finder.find('#titleArea').html(title);
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
    /**
     * Load a modal datatables for search and pick registers
     * @memberOf UserController
     */
    const initDatatable = function (param) {
        new DataTableController(param.datatableSettings)
            .buildTable()
            .place($finder.find('#container'))
            .strechtIt()
            .selectable()
            .dblClickEvent(() => {
                alert('todo')
            })
            .mountAjax(param.apiUrl);
    };
}