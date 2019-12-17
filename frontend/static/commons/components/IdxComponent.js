/**
 * SleepWeb
 * Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
 * Universidade de Passo Fundo - 2018/2019
 *
 * @author Matheus Hernandes
 * @since 28/03/2019
 * @namespace IdxComponent
 */
function IdxComponent() {
    /**
     * Keeps map of elements from DOM
     * @memberOf IdxComponent
     */
    let elementsMap = {};
    /**
     * Initialize map of elements
     * @memberOf IdxComponent
     */
    const initElementsMap = function () {
        elementsMap.level10 = $('#level10');
        elementsMap.level8 = $('#level8');
        elementsMap.level6 = $('#level6');
        elementsMap.level4 = $('#level4');
        elementsMap.level0 = $('#level0');
    };
    /**
     * Set index for 10
     * @memberOf
     */
    const setIndex10 = function (index) {
        if (index === 10) {
            elementsMap.level10.addClass('that').find('td:first').html('X')
        }
    };
    /**
     * Set index for under 10
     * @memberOf
     */
    const setIndex8 = function (index) {
        if (index >= 8 && index < 10) {
            elementsMap.level8.addClass('that').find('td:first').html('X')
        }
    };
    /**
     * Set index for under 8
     * @memberOf
     */
    const setIndex6 = function (index) {
        if (index >= 6 && index < 8) {
            elementsMap.level6.addClass('that').find('td:first').html('X')
        }
    };
    /**
     * Set index for under 6
     * @memberOf
     */
    const setIndex4 = function (index) {
        if (index > 3 && index < 6) {
            elementsMap.level4.addClass('that').find('td:first').html('X')
        }
    };
    /**
     * Set index for numbers under 4
     * @memberOf
     */
    const setIndex0 = function (index) {
        if (index <= 3) {
            elementsMap.level0.addClass('that').find('td:first').html('X')
        }
    };
    /**
     * Clean component for its original state
     * @memberOf IdxComponent
     */
    this.clean = function () {
        elementsMap.level10.removeClass('that').find('td:first').html('');
        elementsMap.level8.removeClass('that').find('td:first').html('');
        elementsMap.level6.removeClass('that').find('td:first').html('');
        elementsMap.level4.removeClass('that').find('td:first').html('');
        elementsMap.level0.removeClass('that').find('td:first').html('');
        return this;
    };
    /**
     * Load table with informed index
     * @memberOf IdxComponent
     */
    this.load = function ( index ) {
        setIndex10(index);
        setIndex8(index);
        setIndex6(index);
        setIndex4(index);
        setIndex0(index);
        return this;
    };
    /**
     * Initilize component
     * @memberOf IdxComponent
     */
    this.init = function () {
        initElementsMap();
        return this;
    }
}