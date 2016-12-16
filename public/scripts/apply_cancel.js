$('.application-form').on('submit', function (ev) {
    ev.preventDefault()

    var $form = $(this).closest('form')

    $.ajax({
        url: '/ajax' + $form.attr('action'),
        method: 'POST',
        data: $form.serializeArray(),
        dataType: 'json'
    })
    .done(function (result) {
        window.location.reload()
    })
})
