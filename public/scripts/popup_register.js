var $loginButton = $('#btnRegister')
$loginButton.on('click', function (ev) {
    ev.preventDefault()

    var $loginModal = $(
    `<div class="modal fade confirm-modal" tabindex="-1" role="dialog" id="loginModal">
        <div class="modal-dialog modal-md" role="document">
            <div class="modal-content">
            <div class="modal-header">Belépés</div>
            <div class="modal-body">
                <div class="alert alert-danger"></div>
                <div class="form-area"></div>
            </div>
            </div>
        </div>
      </div>`)

    var $errorBox = $loginModal.find('.alert')
    $errorBox.text('Rossz felhasználói adatok.').hide()
    
    var $formArea = $loginModal.find('.form-area')
    $formArea.load('/registration #registerform', function () {
        var $loginForm = $formArea.find('form')
        $loginForm.on('submit', function (ev) {
            ev.preventDefault();
            $errorBox.hide();

            $.ajax({
                url: '/ajax/registration',
                method: 'POST',
                data: $(this).serializeArray(),
                dataType: 'json'
            })
            .done(function (json) {
                if (json.success) {
                    location.assign('/')
                } else {
                    $errorBox.show()
                }
            })
        });

        $loginModal.modal('show')
    })
})