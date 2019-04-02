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
     * @memberOf FinderController
     */
    let $finder = $('#finder');
    /**
     * Finder DataTable
     * @memberOf FinderController
     */
    let dataTable = null;
    /**
     * Load module for Finder
     * @memberOf FinderController
     */
    const load = async function (url, callBacks) {
        $.ajax({
            url: url,
            dataType: "html",
        }).done(async function (html) {
            await $("#load").html(html);
            await initDatatable(getSettings(), callBacks);
            await $finder.modal({
                backdrop: 'static',
                keyboard: false
            });
            await updateBindButtonEvents(callBacks);
        });
    };
    /**
     * Update bind of finder's buttons
     * @memberOf FinderController
     */
    const updateBindButtonEvents = function (callBacks) {
        $('#finderConfirm').off('click').on('click', function () {
            if ($.isEmpty(callBacks) || $.isEmpty(callBacks.callBackConfirm)) {

            }
            let rowData = dataTable.getRowData();
            if ($.isEmpty(rowData)) {
                return;
            }
            callBacks.callBackConfirm(rowData);
            $finder.modal('hide');
        })
    };
    /**
     * Set title for finder
     * @memberOf FinderController
     */
    const setTitle = function (title) {
        $finder.find('#titleArea').html(title);
    };
    /**
     * Load a modal datatables for search and pick registers
     * @memberOf FinderController
     */
    const initDatatable = function (param, callBacks) {
        dataTable = new DataTableController(param.datatableSettings)
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
     * @memberOf FinderController
     */
    this.show = function () {
        $finder.modal('show');
        return this;
    };
    /**
     * Run finder for user
     * @memberOf FinderController
     */
    this.find = async function () {
        setTitle(param.title);
        await load('/finder/' + param.url, {
            callBackConfirm: param.callBackConfirm,
            callBackClose: param.callBackClose
        });
        return this;
    };
}