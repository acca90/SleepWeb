/**
 * SleepWeb
 * Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
 * Universidade de Passo Fundo - 2018/2019
 *
 * @author Matheus Hernandes
 * @since 28/03/2019
 * @namespace DataTableController
 */
function DataTableController(settings) {
    /**
     * jQuery object for HTML table
     * @type {null}
     * @namespace DataTableController
     */
    let $table = null;
    /**
     * Mount HTML table follow headers
     * @namespace DataTableController
     */
    this.buildTable = function () {
        $table = $('<table><thead><tr></tr></thead><tbody></tbody></table>');
        $table.addClass('table table-striped table-hover table-sm');
        settings.forEach(column => $table.find('thead').find('tr').append(`<th>${column.th}</th>`));
        return this;
    };

    /**
     * Makes it width 100%
     * @namespace DataTableController
     */
    this.strechtIt = function () {
        $table.css('width', '100%');
        $table.css('min-width', '1000px');
        return this;
    };
    /**
     * Makes DataTable selectable
     * @namespace DataTableController
     */
    this.dblClickEvent = function (event) {
        $table.on('dblclick', 'tbody > tr', function () {
            $(this)
                .addClass('selected')
                .siblings('.selected')
                .removeClass('selected');

            event($table.DataTable().row($(this)).data());
        });
        return this;
    };
    /**
     * Make DataTable selectable
     * @namespace DataTableController
     */
    this.selectable = function () {
        $table.on('click', 'tbody > tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected')
            } else {
                if ($(this).find('.dataTables_empty').length > 0) {
                    return;
                }
                $(this)
                    .addClass('selected')
                    .siblings('.selected')
                    .removeClass('selected');
            }
        });
        return this;
    };
    /**
     * Place DataTable inside of informed container
     * @namespace DataTableController
     */
    this.place = function ($container) {
        $container.html($table);
        return this;
    };
    /**
     * Refresh DataTable
     * @namespace DataTableController
     */
    this.refresh = function () {
        $table.DataTable().search('');
        $table.DataTable().ajax.reload();
    };
    /**
     * Get row from DataTable
     * @namespace DataTableController
     */
    this.getRowData = function ($tr) {
        return $table.DataTable().row($tr).data();
    };
    /**
     * Get selected row for DataTable
     * @namespace DataTableController
     */
    this.getSelectedRow = function () {
        return $table.find('tr.selected');
    };
    /**
     * Add row to DataTable;
     * @namespace DataTableController
     */
    this.addRow = function (data) {
        $table.DataTable().row.add(data).draw();
        return this;
    };
    /**
     * Mount DataTable ajax
     * @namespace DataTableController
     */
    this.mountAjax = function (url) {
        $table.DataTable({
            serverSide: true,
            ajax: url + '?format=datatables',
            columns: settings,
            scrollX: true,
            responsive: true
        });
        return this;
    };
    /**
     * Mount DataTable static
     */
    this.mountStatic = function () {
        $table.DataTable({
            columns: settings,
            scrollX: true,
            responsive: true,
            scrollY: '300px',
            scrollCollapse: false,
            paging: false
        });
        return this;
    };
}

