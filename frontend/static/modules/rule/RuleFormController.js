/**
 * SleepWeb
 * Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
 * Universidade de Passo Fundo - 2018/2019
 *
 * @author Matheus Hernandes
 * @since 06/05/2019
 * @namespace RuleFormController
 */
function RuleFormController() {
    /**
     * Reference for controller
     * @memberOf RuleFormController
     */
    let self = this;
    /**
     * Keeps map of elements from DOM
     * @memberOf RuleFormController
     */
    let elementMap = {};
    /**
     * Keeps the active indicator for threshold definitions
     * @memberOf RuleFormController
     */
    let activeIndicator = '#SLEEP_EFFICIENCY';
    /**
     * Controller for threshold
     * @memberOf RuleFormController
     */
    let thresholdController = new ThresholdController(self).init();
    /**
     * Render for Stage
     * @memberOf RuleFormController
     */
    const renderStage = function (data) {
        return data.description;
    };
    /**
     * Render for quality
     * @memberOf RuleFormController
     */
    const renderQuality = function (data) {
        let quality, color;
        if (data == 1) {
            color = 'text-success';
            quality = "Appropriate";
        } else if (data == 0) {
            color = 'text-warning';
            quality = "Uncertain";
        } else {
            color = 'text-danger';
            quality = "Unappropriate";
        }
        return `<b class="${color}">${quality}</b>`
    };
    /**
     * Custom datatables mount
     * @memberOf RuleFormController
     */
    const customMountFunction = function ($table, settings, searchable) {
        let collapsedGroups = {};
        $table.on('click', 'button.control', function (e) {
            let name = $(this).closest('tr').data('name');
            collapsedGroups[name] = !collapsedGroups[name];
            $table.DataTable().draw();
            e.stopPropagation();
            e.preventDefault();

        }).DataTable({
            language: {
                url: '/json/datatables/'
            },
            columns: settings,
            scrollX: true,
            responsive: true,
            scrollY: '300px',
            scrollCollapse: false,
            orderable: false,
            searching: searchable,
            paging: false,
            bInfo: false,
            rowGroup: {
                dataSrc: 'stage.description',
                startRender: function (rows, group) {
                    let collapsed = !!collapsedGroups[group];

                    rows.nodes().each(function (r) {
                        r.style.display = collapsed ? 'none' : '';
                    });

                    // Add category name to the <tr>. NOTE: Hardcoded colspan
                    return $('<tr/>')
                        .append('<td colspan="' + (settings.length - 1) + '"> ' + makeButton(group) + '</td>')
                        .append('<td colspan="1">' + makeForm() + '</td>')
                        .attr('data-name', group)
                        .toggleClass('collapsed', collapsed);
                }
            }
        });
    };
    /**
     * Make button for expand and collapse rows
     * @memberOf RuleFormController
     */
    const makeButton = function (group) {
        return `
            <div style="display: inline">
                <button class="control" onclick="">
                    <i class="fa"></i>
                </button>
                <span>${group}</span>
            </div>
        `;
    };
    /**
     * Mount form for weight for indicator
     * @memberOf RuleFormController
     */
    const makeForm = function () {
        return `<input type="text" class="form-control form-control-sm" placeholder="Weight">`
    };
    /**
     * Initialize datatables for each tab
     * @memberOf RuleFormController
     */
    const initDatatables = function () {
        let tables = [
            $('#SLEEP_EFFICIENCY'),
            $('#SLEEP_LATENCY'),
            $('#REM_SLEEP_PERC'),
            $('#NON_REM_SLEEP_1_2_PERC'),
            $('#NON_REM_SLEEP_3_4_PERC'),
            $('#NAP_EPISODE'),
            $('#NAP_DURATION'),
            $('#NAP_FREQUENCY'),
            $('#AROUSALS'),
            $('#AWAKENINGS '),
            $('#WASO')
        ];
        let settings = [
            {th: 'Stage', data: 'stage', orderable: false, render: renderStage},
            {th: 'Quality', data: 'quality', width: '100px', orderable: false, render: renderQuality},
            {th: 'Begin', data: 'begin', width: '100px', orderable: false},
            {th: 'End', data: 'end', width: '100px', orderable: false},
            {th: 'Weight', data: 'weight', width: '100px', sDefaultContent: 'Not Available', orderable: false},

        ];
        tables.forEach($this => {
            elementMap.dt[$this.attr('id')] = new DataTableComponent(settings)
                .buildTable()
                .place($this)
                .setOrder([1, 'desc'])
                .searchable(false)
                .strechtIt()
                .selectable()
                .mountCustom(customMountFunction);
        });
    };
    /**
     * Initialize elements map
     * @memberOf RuleFormController
     */
    const initElementsMap = function () {
        elementMap.dt = {};
        elementMap.datatableCards = $('#datatableCards');
        elementMap.btnAddThreshold = $('#btnAddThreshold');
    };
    /**
     * Initialize events
     * @memberOf RuleFormController
     */
    const initEvents = function () {
        elementMap.datatableCards.find('.nav-link').on('shown.bs.tab', function () {
            manageIndicator($(this));
            self.ajustColumns();
        });
        elementMap.btnAddThreshold.on('click', function () {
            thresholdController.show(activeIndicator);
        });
    };
    /**
     * Save indicator for reference
     * @memberOf RuleFormController
     */
    const manageIndicator = function (indicator) {
        activeIndicator = indicator.attr('href');
    };
    /**
     * Add row to active datatables
     * @memberOf RuleFormController
     */
    this.addRow = function (row) {
        elementMap.dt[activeIndicator.replace(/#/g, '')].addRow(row);
    };
    /**
     * Ajust columns for its header
     * @memberOf RuleFormController
     */
    this.ajustColumns = function () {
        for (let dt in elementMap.dt) {
            elementMap.dt[dt].ajustColumns();
        }
    };
    /**
     * Initialize module form
     * @memberOf RuleFormController
     */
    this.init = function () {
        initElementsMap();
        initDatatables();
        initEvents();
        return self;
    };
}
