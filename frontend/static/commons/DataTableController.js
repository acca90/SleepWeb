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
     * @memberOf DataTableController
     */
    let $table = null;
    /**
     * Default order for Datatable
     * @memberOf DataTableController
     */
    let defaultOrder = null;
    /**
     * Mount HTML table follow headers
     * @memberOf DataTableController
     */
    this.buildTable = function () {
        $table = $('<table><thead><tr></tr></thead><tbody></tbody></table>');
        $table.addClass('table table-striped table-hover table-sm');
        settings.forEach(column => $table.find('thead').find('tr').append(`<th>${column.th}</th>`));
        return this;
    };

    /**
     * Makes it width 100%
     * @memberOf DataTableController
     */
    this.strechtIt = function () {
        $table.css('width', '100%');
        $table.css('min-width', '1000px');
        return this;
    };
    /**
     * Makes DataTable selectable
     * @memberOf DataTableController
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
     * @memberOf DataTableController
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
     * @memberOf DataTableController
     */
    this.place = function ($container) {
        $container.html($table);
        return this;
    };
    /**
     * Define default order for Datatable
     * @memberOf DataTableController
     */
    this.setOrder = function (column) {
        defaultOrder = column;
        return this;
    };
    /**
     * Refresh DataTable
     * @memberOf DataTableController
     */
    this.refresh = function () {
        $table.DataTable().search('');
        $table.DataTable().ajax.reload();
        return this;
    };
    /**
     * Get row from DataTable
     * @memberOf DataTableController
     */
    this.getRowData = function ($tr) {
        if ($.isEmpty($tr) || $tr.length < 1) {
            $tr = $table.find('tbody > tr.selected');
        }
        if ($tr.length < 1) {
            return null;
        }
        return $table.DataTable().row($tr).data();
    };
    /**
     * Clear DataTables
     * @memberOf DataTableController
     */
    this.clear = function () {
        $table.DataTable().clear();
        return this;
    };
    /**
     * Ajust columns
     * @memberOf DataTableController
     */
    this.ajustColumns = function () {
        $table.DataTable().columns.adjust().draw();
        return this;
    };
    /**
     * Returns DataTable()
     * @memberOf DataTableController
     */
    this.getDataTable = function () {
        return $table.DataTable();
    };
    /**
     * Get selected row for DataTable
     * @DataTable DataTableController
     */
    this.getSelectedRow = function () {
        return $table.find('tr.selected');
    };
    /**
     * Add row to DataTable;
     * @memberOf DataTableController
     */
    this.addRow = function (data) {
        $table.DataTable().row.add(data).draw();
        return this;
    };
    /**
     * Mount DataTable ajax
     * @memberOf DataTableController
     */
    this.mountAjax = function (url) {
        $table.DataTable({
            order: ($.isEmpty(defaultOrder) ? [0, 'desc'] : defaultOrder),
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
     * @memberOf DataTableController
     */
    this.mountStatic = function () {
        $table.DataTable({
            order: ($.isEmpty(defaultOrder) ? [0, 'desc'] : defaultOrder),
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

