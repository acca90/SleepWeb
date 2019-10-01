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
     * Containers for each table
     * @memberOf RuleFormController
     */
    let containers = [
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
                        .append('<td colspan="1">' + makeForm(group, rows) + '</td>')
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
    const makeForm = function (group, rows) {
        let value = '';
        if (!$.isEmpty(rows.data()) && !$.isEmpty(rows.data()[0])) {
            value = rows.data()[0].weight;
        }
        return `<input type="text" 
                       stage="${group}" 
                       class="form-control form-control-sm weight" 
                       value="${value}"
                       placeholder="Weight">`
    };
    /**
     * Initialize datatables for each tab
     * @memberOf RuleFormController
     */
    const initDatatables = function () {
        let settings = [
            {th: 'Stage', data: 'stage', orderable: false, render: renderStage},
            {th: 'Begin', data: 'begin', width: '100px', orderable: false},
            {th: 'End', data: 'end', width: '100px', orderable: false},
            {th: 'Quality', data: 'quality', width: '100px', orderable: false, render: renderQuality},
            {th: 'Weight', data: 'weight', width: '100px', sDefaultContent: 'Not Available', orderable: false},

        ];
        containers.forEach($this => {
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
        containers.forEach($container => bindWeightChangeEvent($container));
    };
    /**
     * Bind event for weight change on container
     * @memberOf RuleFormController
     */
    const bindWeightChangeEvent = function ($container) {
        let ref = $container.attr('id');
        $container.on('change', '.weight', function () {
            let $this = $(this);
            updateWeightDt(ref, $this.val(), $this.attr('stage'));
        })
    };
    /**
     * Update weight value on datatables
     * @param dt datatables changed
     * @param value Value changed
     * @param stage Stage changed
     * @memberOf RuleFormController
     */
    const updateWeightDt = function (dt, value, stage) {
        let table = elementMap.dt[dt].getDataTable();
        table.rows().every(function () {
            let data = this.data();
            if (stage == data.stage.description) {
                data.weight = value;
                table.row(this).data(data).draw();
            }
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
     * Returns the name of active indicator
     * @memberOf RuleFormController
     */
    const getActiveIndicator = function () {
        return activeIndicator.replace(/#/g, '');
    };
    /**
     * Check rows of same life stage to get correct weight
     * @memberOf RuleFormController
     */
    const completeData = function (table, newRow) {
        let dataArray = table.getDataArray();
        for (let row of dataArray) {
            if (newRow.stage.description == row.stage.description) {
                newRow.weight = row.weight;
                break;
            }
        }
        return newRow;
    };
    /**
     * Returns an array of all datatables
     * @memberOf RuleFormController
     */
    const superDataArray = function () {
        let array = [];
        for (let dt in elementMap.dt) {
            let dataArray = elementMap.dt[dt].getDataArray();
            if (dataArray.length > 0)
                array = array.concat(dataArray);
        }
        return array;
    };
    /**
     * Serialize data for submit
     * @memberOf RuleFormController
     */
    this.serialize = function () {
        return superDataArray().map(threshold => {
            return {
                begin: threshold.begin,
                end: threshold.end,
                indicator: threshold.indicator.id,
                stage: threshold.stage.id,
                quality: threshold.quality,
                weight: threshold.weight
            }
        });
    };
    /**
     * Clean tables to initial state
     * @memberOf RuleFormController
     */
    this.clean = function () {
        for (let dt in elementMap.dt) {
            elementMap.dt[dt].clear();
        }
        return this;
    };
    /**
     * Load thresholds to each table
     * @memberOf RuleFormController
     */
    this.load = function (thresholds) {
        thresholds.forEach(threshold => {
            let element = containers[threshold.indicator - 1];
            elementMap.dt[element.attr('id')].addRow(threshold);
        });
        return this;
    };
    /**
     * Add row to active datatables
     * @memberOf RuleFormController
     */
    this.addRow = function (row) {
        let table = elementMap.dt[getActiveIndicator()];
        table.addRow(completeData(table, row));
        return this;
    };
    /**
     * Ajust columns for its header
     * @memberOf RuleFormController
     */
    this.ajustColumns = function () {
        for (let dt in elementMap.dt) {
            elementMap.dt[dt].ajustColumns();
        }
        return this;
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
