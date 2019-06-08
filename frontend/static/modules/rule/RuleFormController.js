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
     * Initialize module form
     * @memberOf RuleFormController
     */
    this.init = function () {
        datatablePatients = new DataTableComponent([
            {th: 'Stage', data: 'stage', orderable: false},
            {th: 'Quality', data: 'quality', width: '100px', orderable: false},
            {th: 'Max', data: 'top', width: '100px', orderable: false},
            {th: 'Min', data: 'bottom', width: '100px', orderable: false},
            {th: 'Weight', data: 'weight', width: '100px', sDefaultContent: 'Not Available', orderable: false},
        ])
            .buildTable()
            .place($('#containerSE'))
            .setOrder([1, 'desc'])
            .searchable(false)
            .strechtIt()
            .selectable()
            .mountCustom(customMountFunction);

        datatablePatients.addRow({
            stage: 'Infant',
            quality: 'aaaa',
            top: 'aaaa',
            bottom: 'aaaa'
        });

        datatablePatients.addRow({
            stage: 'Infant',
            quality: 'aaaa',
            top: 'aaaa',
            bottom: 'aaaa'
        });

        datatablePatients.addRow({
            stage: 'Infant',
            quality: 'aaaa',
            top: 'aaaa',
            bottom: 'aaaa'
        });

        datatablePatients.addRow({
            stage: 'Toddler',
            quality: 'aaaa',
            top: 'aaaa',
            bottom: 'aaaa'
        });

        datatablePatients.addRow({
            stage: 'Toddler',
            quality: 'aaaa',
            top: 'aaaa',
            bottom: 'aaaa'
        });

        datatablePatients.addRow({
            stage: 'Toddler',
            quality: 'aaaa',
            top: 'aaaa',
            bottom: 'aaaa'
        });

        datatablePatients.addRow({
            stage: 'Teenage',
            quality: 'aaaa',
            top: 'aaaa',
            bottom: 'aaaa'
        });

        datatablePatients.addRow({
            stage: 'Adult',
            quality: 'aaaa',
            top: 'aaaa',
            bottom: 'aaaa'
        });

        datatablePatients.addRow({
            stage: 'Adult',
            quality: 'aaaa',
            top: 'aaaa',
            bottom: 'aaaa'
        });

    };
}
