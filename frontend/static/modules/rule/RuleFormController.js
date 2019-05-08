/**
 * SleepWeb
 * Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
 * Universidade de Passo Fundo - 2018/2019
 *
 * @author Matheus Hernandes
 * @since 06/05/2019
 */
function RuleFormController() {
    this.init = function () {
        datatablePatients = new DataTableComponent([
                {th: 'Stage', data: 'stage'},
                {th: 'Quality', data: 'quality', width: '200px'},
                {th: 'Max', data: 'top', width: '100px'},
                {th: 'Min', data: 'bottom', width: '200px'},
                {th: 'Weight', data: 'weight', width: '100px', sDefaultContent: 'Not Available',},
            ])
            .buildTable()
            .place($('#containerSE'))
            .setOrder([1, 'desc'])
            .searchable(false)
            .strechtIt()
            .selectable()
            .mountRowGroup('stage');

        datatablePatients.addRow({
            stage: 'sss',
            quality: 'aaaa',
            top: 'aaaa',
            bottom: 'aaaa'
        });

        datatablePatients.addRow({
            stage: 'sss',
            quality: 'aaaa',
            top: 'aaaa',
            bottom: 'aaaa'
        });

        datatablePatients.addRow({
            stage: 'sss',
            quality: 'aaaa',
            top: 'aaaa',
            bottom: 'aaaa'
        });

        datatablePatients.addRow({
            stage: 'ddd',
            quality: 'aaaa',
            top: 'aaaa',
            bottom: 'aaaa'
        });

        datatablePatients.addRow({
            stage: 'ddd',
            quality: 'aaaa',
            top: 'aaaa',
            bottom: 'aaaa'
        });

        datatablePatients.addRow({
            stage: 'ddd',
            quality: 'aaaa',
            top: 'aaaa',
            bottom: 'aaaa'
        });


    };
}
