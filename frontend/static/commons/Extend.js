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
    /**
     * Check if value is empty
     */
    isEmpty: function (value) {
        return value === null ||
            value === undefined ||
            value === 'undefined' ||
            value === [] ||
            value === '';
    },
    /**
     * Format default django date format
     */
    dateFormat: function (value) {
        let splitted = value.split('-');
        return (splitted.reverse()).join('/');
    },
    /**
     * Calculate the age from birth date
     */
    calcAge: function (date) {
        let DOB = new Date(date);
        let today = new Date();
        let age = today.getTime() - DOB.getTime();
        let elapsed = new Date(age);
        let year = elapsed.getYear() - 70;
        let month = elapsed.getMonth();
        if (year > 0) {
            return year + ' years';
        }
        return month + ' Months';
    }
});
