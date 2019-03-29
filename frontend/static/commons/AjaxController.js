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
            data: Object.assign(
                params.data,
                {
                    csrfmiddlewaretoken: $("input[name='csrfmiddlewaretoken']").val()
                }
            ),
            success: function (response) {
                params.success(response)
            },
            error: function (response) {
                params.error(response)
            }
        });
    };
}

