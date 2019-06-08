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
     * Keeps datatable settings for rules
     * @memberOf RuleFormController
     */
    let datatableSettings = [
        {th: 'Stage', data: 'stage', orderable: false},
        {th: 'Quality', data: 'quality', width: '100px', orderable: false},
        {th: 'Begin', data: 'begin', width: '100px', orderable: false},
        {th: 'End', data: 'end', width: '100px', orderable: false},
        {th: 'Weight', data: 'weight', width: '100px', sDefaultContent: 'Not Available', orderable: false},
    ];
    /**
     * Datatables that keeps rules for Sleep Efficiency
     * @memberOf RuleFormController
     */
    let datatable_se = null;
    /**
     * Datatables that keeps rules for Sleep Latency
     * @memberOf RuleFormController
     */
    let datatable_sl = null;
    /**
     * Datatables that keeps rules for REM sleep %
     * @memberOf RuleFormController
     */
    let datatable_rem = null;
    /**
     * Datatables that keeps rules for non-REM sleep 1-2 %
     * @memberOf RuleFormController
     */
    let datatable_nr12 = null;
    /**
     * Datatables that keeps rules for non-REM sleep 3-4 %
     * @memberOf RuleFormController
     */
    let datatable_nr34 = null;
    /**
     * Datatables that keeps rules for arousals
     * @memberOf RuleFormController
     */
    let datatable_aro = null;
    /**
     * Datatables that keeps rules for awakenings
     * @memberOf RuleFormController
     */
    let datatable_aw = null;
    /**
     * Datatables that keeps rules for wake after sleep onset
     * @memberOf RuleFormController
     */
    let datatable_waso = null;
    /**
     * Datatables that keeps rules for nap episodes during 24 hours
     * @memberOf RuleFormController
     */
    let datatable_napq = null;
    /**
     * Datatables that keeps rules for nap duration
     * @memberOf RuleFormController
     */
    let datatable_napt = null;
    /**
     * Datatables that keeps rules for number of days with naps in a week
     * @memberOf RuleFormController
     */
    let datatable_napd = null;
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
                dataSrc: 'stage',
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
        datatable_se = new DataTableComponent(datatableSettings)
            .buildTable()
            .place($('#containerSE'))
            .setOrder([1, 'desc'])
            .searchable(false)
            .strechtIt()
            .selectable()
            .mountCustom(customMountFunction);

        datatable_sl = new DataTableComponent(datatableSettings)
            .buildTable()
            .place($('#containerSL'))
            .setOrder([1, 'desc'])
            .searchable(false)
            .strechtIt()
            .selectable()
            .mountCustom(customMountFunction);

        datatable_rem = new DataTableComponent(datatableSettings)
            .buildTable()
            .place($('#containerREM'))
            .setOrder([1, 'desc'])
            .searchable(false)
            .strechtIt()
            .selectable()
            .mountCustom(customMountFunction);

        datatable_nr12 = new DataTableComponent(datatableSettings)
            .buildTable()
            .place($('#containerNR12'))
            .setOrder([1, 'desc'])
            .searchable(false)
            .strechtIt()
            .selectable()
            .mountCustom(customMountFunction);

        datatable_nr34 = new DataTableComponent(datatableSettings)
            .buildTable()
            .place($('#containerNR34'))
            .setOrder([1, 'desc'])
            .searchable(false)
            .strechtIt()
            .selectable()
            .mountCustom(customMountFunction);

        datatable_aro = new DataTableComponent(datatableSettings)
            .buildTable()
            .place($('#containerARO'))
            .setOrder([1, 'desc'])
            .searchable(false)
            .strechtIt()
            .selectable()
            .mountCustom(customMountFunction);

        datatable_aw = new DataTableComponent(datatableSettings)
            .buildTable()
            .place($('#containerAW'))
            .setOrder([1, 'desc'])
            .searchable(false)
            .strechtIt()
            .selectable()
            .mountCustom(customMountFunction);

        datatable_waso = new DataTableComponent(datatableSettings)
            .buildTable()
            .place($('#containerWASO'))
            .setOrder([1, 'desc'])
            .searchable(false)
            .strechtIt()
            .selectable()
            .mountCustom(customMountFunction);

        datatable_napq = new DataTableComponent(datatableSettings)
            .buildTable()
            .place($('#containerNAPQ'))
            .setOrder([1, 'desc'])
            .searchable(false)
            .strechtIt()
            .selectable()
            .mountCustom(customMountFunction);

        datatable_napt = new DataTableComponent(datatableSettings)
            .buildTable()
            .place($('#containerNAPT'))
            .setOrder([1, 'desc'])
            .searchable(false)
            .strechtIt()
            .selectable()
            .mountCustom(customMountFunction);

        datatable_napd = new DataTableComponent(datatableSettings)
            .buildTable()
            .place($('#containerNAPD'))
            .setOrder([1, 'desc'])
            .searchable(false)
            .strechtIt()
            .selectable()
            .mountCustom(customMountFunction);

    };
    /**
     * Initialize elements map
     * @memberOf RuleFormController
     */
    const initElementsMap = function () {
        elementMap.datatableCards = $('#datatableCards');
        elementMap.btnAddThreshold = $('#btnAddThreshold');
    };
    /**
     * Initialize events
     * @memberOf RuleFormController
     */
    const initEvents = function () {
        elementMap.datatableCards.find('.nav-link').on('shown.bs.tab', () => {
            self.ajustColumns();
        });
        elementMap.btnAddThreshold.on('click', () => {
            new ThresholdController().init();
        });
    };
    /**
     * Ajust columns for its header
     * @memberOf RuleFormController
     */
    this.ajustColumns = function () {
        datatable_se.ajustColumns();
        datatable_sl.ajustColumns();
        datatable_rem.ajustColumns();
        datatable_nr12.ajustColumns();
        datatable_nr34.ajustColumns();
        datatable_aro.ajustColumns();
        datatable_aw.ajustColumns();
        datatable_waso.ajustColumns();
        datatable_napq.ajustColumns();
        datatable_napt.ajustColumns();
        datatable_napd.ajustColumns();
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
