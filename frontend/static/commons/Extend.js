/**
 * SleepWeb
 * Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
 * Universidade de Passo Fundo - 2018/2019
 *
 * @author Matheus Hernandes
 * @since 09/03/2018
 * @namespace InstitutionController
 */
jQuery.fn.extend({
    serializeToJson: function () {
        let $disabled = this.find(':disabled').prop('disabled', false);
        let pairs = this.serialize().split('&');
        $disabled.prop('disabled', true);
        let result = {};
        pairs.forEach(function (pair) {
            pair = pair.split('=');
            if (!$.isEmpty(pair[1])) {
                result[pair[0]] = decodeURIComponent(pair[1]);
            }
        });
        return JSON.parse(JSON.stringify(result));
    },

});
jQuery.extend({
     isEmpty: function ( value ) {
        return value === null ||
            value === undefined ||
            value === 'undefined' ||
            value === [] ||
            value === '';
    }
});
