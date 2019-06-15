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
     * Current version for API
     * @memberOf AbstractController
     */
    const apiVersion = 'v1';
    /**
     * Build URL for API consume
     * @memberOf AbstractController
     */
    this.mountUrl = function (url, pk) {
        if ($.isEmpty(pk)) {
            return `/api/${apiVersion}/${url}/`;
        }
        return `/api/${apiVersion}/${url}/${pk}/`;
    };
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
            url: this.mountUrl(params.url, params.pk),
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
            url: this.mountUrl(params.url, param.pk),
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

