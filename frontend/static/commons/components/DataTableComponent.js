/**
 * SleepWeb
 * Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
 * Universidade de Passo Fundo - 2018/2019
 *
 * @author Matheus Hernandes
 * @since 28/03/2019
 * @namespace DataTableComponent
 */
function DataTableComponent(settings) {
    /**
     * jQuery object for HTML table
     * @type {null}
     * @memberOf DataTableComponent
     */
    let $table = null;
    /**
     * Default order for Datatable
     * @memberOf DataTableComponent
     */
    let defaultOrder = null;
    /**
     * Default value for datatable search option
     * @memberOf DataTableComponent
     */
    let searchable = true;
    /**
     * Makes it width 100%
     * @memberOf DataTableComponent
     */
    this.strechtIt = function () {
        $table.css('width', '100%');
        $table.css('min-width', '1000px');
        return this;
    };
    /**
     * Mount HTML table follow headers
     * @memberOf DataTableComponent
     */
    this.buildTable = function () {
        $table = $('<table><thead><tr></tr></thead><tbody></tbody></table>');
        $table.addClass('table table-striped table-hover table-sm');
        settings.forEach(column => $table.find('thead').find('tr').append('<th>' + column.th + '</th>'));
        return this;
    };
    /**
     * Makes DataTable selectable
     * @memberOf DataTableComponent
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
     * @memberOf DataTableComponent
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
     * @memberOf DataTableComponent
     */
    this.place = function ($container) {
        $container.html($table);
        return this;
    };
    /**
     * Define default order for Datatable
     * @memberOf DataTableComponent
     */
    this.setOrder = function (column) {
        defaultOrder = column;
        return this;
    };
    /**
     * Defines if datatable is searchable
     * @memberOf DataTableComponent
     */
    this.searchable = function (isSearchable) {
        searchable = isSearchable;
        return this;
    };
    /**
     * Refresh DataTable
     * @memberOf DataTableComponent
     */
    this.refresh = function () {
        $table.DataTable().search('');
        $table.DataTable().ajax.reload();
        return this;
    };
    /**
     * Get row from DataTable
     * @memberOf DataTableComponent
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
     * @memberOf DataTableComponent
     */
    this.clear = function () {
        $table.DataTable().clear();
        return this;
    };
    /**
     * Ajust columns
     * @memberOf DataTableComponent
     */
    this.ajustColumns = function () {
        $table.DataTable().columns.adjust().draw();
        return this;
    };
    /**
     * Returns DataTable()
     * @memberOf DataTableComponent
     */
    this.getDataTable = function () {
        return $table.DataTable();
    };
    /**
     * Get selected row for DataTable
     * @DataTable DataTableComponent
     */
    this.getSelectedRow = function () {
        return $table.find('tr.selected');
    };
    /**
     * Add row to DataTable;
     * @memberOf DataTableComponent
     */
    this.addRow = function (data) {
        $table.DataTable().row.add(data).draw();
        return this;
    };
    /**
     * Returns DataTables data array
     * @memberOf DataTableComponent
     */
    this.getDataArray = function () {
        return $table.DataTable().rows().data().toArray();
    };
    /**
     * Returns DataTables data array
     * @memberOf DataTableComponent
     */
    this.setDataArray = function (dataArray) {
        $table.DataTable().rows.add(dataArray).draw();
        return this;
    };
    /**
     * Mount DataTable ajax
     * @memberOf DataTableComponent
     */
    this.mountAjax = function (url) {
        $table.DataTable({
            language: {
                url: '/json/datatables/'
            },
            order: ($.isEmpty(defaultOrder) ? [0, 'desc'] : defaultOrder),
            serverSide: true,
            ajax: url + '?format=datatables',
            columns: settings,
            scrollX: true,
            responsive: true,
            searching: searchable
        });
        return this;
    };
    /**
     * Mount DataTable static
     * @memberOf DataTableComponent
     */
    this.mountStatic = function () {
        $table.DataTable({
            language: {
                url: '/json/datatables/'
            },
            order: ($.isEmpty(defaultOrder) ? [0, 'desc'] : defaultOrder),
            columns: settings,
            scrollX: true,
            responsive: true,
            scrollY: '300px',
            scrollCollapse: false,
            searching: searchable,
            paging: false,
        });
        return this;
    };
    /**
     * Custom mount for datatables
     * @memberOf DataTableComponent
     */
    this.mountCustom = function (customMountFunction) {
        customMountFunction($table, settings, searchable);
        return this;
    };
}

