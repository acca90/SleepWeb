/**
 * SleepWeb
 * Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
 * Universidade de Passo Fundo - 2018/2019
 *
 * @author Matheus Hernandes
 * @since 10/03/2019
 * @namespace ConfirmationController
 */
function ConfirmationController(title, msg, confirmFunction, dismissFunction) {
    /**
     * Modal DOM object
     * @memberOf ConfirmationController
     */
    let $modal = $('#modalConfirmation');
    /**
     * Title DOM object
     * @memberOf ConfirmationController
     */
    let $titleArea = $('#titleArea', $modal);
    /**
     * Msg DOM object
     * @memberOf ConfirmationController
     */
    let $textArea = $('#textArea', $modal);
    /**
     * Button for confirmation
     * @memberOf ConfirmationController
     */
    let btnConfirm = $('#confirm', $modal);
    /**
     * Button for dismiss
     * @memberOf ConfirmationController
     */
    let btnDismiss = $('#dismiss', $modal);
    /**
     * Button for dismiss
     * @memberOf ConfirmationController
     */
    let btnDismissTitle = $('#dismissTitle', $modal);
    /**
     * Initialize events
     * @memberOf ConfirmationController
     */
    const initEvents = function () {
        btnConfirm.off('click').on('click', function () {
            confirmFunction($modal);
        });
        btnDismiss.off('click').on('click', function () {
            dismiss();
        });
        btnDismissTitle.off('click').on('click', function () {
            dismiss();
        });
    };
    /**
     * Default dismiss function
     * @memberOf ConfirmationController
     */
    const dismiss = function () {
        $modal.modal('hide');
        if ($.isEmpty(dismissFunction)) {
            return;
        }
        dismissFunction();
    };
    /**
     * Run confirmation modal
     * @memberOf ConfirmationController
     */
    this.open = function () {
        initEvents();
        $titleArea.html(title);
        $textArea.html(msg);
        $modal.modal('show');
    };
}