/**
 * SleepWeb
 * Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
 * Universidade de Passo Fundo - 2018/2019
 *
 * @author Matheus Hernandes
 * @since 09/03/2019
 * @namespace AjaxController
 */
function AjaxController(params) {
    /**
     * Execute request for defined parameters
     * @memberOf AjaxController
     */
    this.send = function () {
        if (!params) {
            console.error('No parameters informed for submit');
            return;
        }
        $.ajax({
            url: params.url,
            method: params.method,
            headers: {"X-CSRFToken": $("input[name='csrfmiddlewaretoken']").val()},
            data: params.data,
            success: function (response) {
                params.success(response)
            },
            error: function (response) {
                params.error(response)
            }
        });
    };
        /**
     * Execute request for defined parameters
     * @memberOf AjaxController
     */
    this.submit = function () {
        if (!params) {
            console.error('No parameters informed for submit');
            return;
        }
        $.ajax({
            url: params.url,
            method: params.method,
            headers: {"X-CSRFToken": $("input[name='csrfmiddlewaretoken']").val()},
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(params.data),
            success: function (response) {
                params.success(response)
            },
            error: function (response) {
                params.error(response)
            }
        });
    };
}

