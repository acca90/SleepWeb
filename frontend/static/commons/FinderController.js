/**
 * SleepWeb
 * Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
 * Universidade de Passo Fundo - 2018/2019
 *
 * @author Matheus Hernandes
 * @since 28/03/2019
 * @namespace FinderController
 */
function FinderController(param) {
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
            await initDatatable(getSettings(), callBacks);
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
     * Load a modal datatables for search and pick registers
     * @memberOf FinderController
     */
    const initDatatable = function (param, callBacks) {
        new DataTableController(param.datatableSettings)
            .buildTable()
            .place($finder.find('#container'))
            .strechtIt()
            .selectable()
            .dblClickEvent($tr => {
                customDblClickEvent($tr, callBacks)
            })
            .mountAjax(param.apiUrl);
    };
    /**
     * Custom double click for fiender
     * @memberOf FinderController
     */
    const customDblClickEvent = function (rowData, callBacks) {
        if ($.isEmpty(callBacks) || $.isEmpty(callBacks.callBackConfirm)) {
            return
        }
        callBacks.callBackConfirm(rowData);
        $finder.modal('hide');
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
    this.find = async function () {
        setTitle(param.title);
        await load('/finder/' + param.url, {
            callBackConfirm: param.callBackConfirm,
            callBackClose: param.callBackClose
        });
    };
}