/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import '../css/app.css';
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/dist/js/bootstrap.min'

$(document).ready(function() {

    $(".js--formRegistration .form-group").on('click', function(){
        const field =  $(this).attr('id');
        if($(`#${field} input`).hasClass('alert-danger')) {
            $(`#${field} input`).removeClass('alert-danger');
            $(`#${field}`).removeClass('text-danger');
            $(`#${field} #error`).html('').removeClass('text-danger');
            if (field === 'password') {
                $(`#${field} input`).val('');
            }
        }
    });


    $('.js--formRegistration').on('submit', function (e) {
        e.preventDefault();
        $.ajax
        ({
            url: '/reg',
            data: $(this).serialize(),
            type: 'post',
            success: function(data)
            {
                if(data.status) {
                    const successPart = $('#js--ok');
                    successPart.find('span').text('User successfully registrated!');
                    $('.js--formRegistration')[0].reset();
                    successPart.fadeTo(2000, 500).slideDown(500, function(){
                        successPart.slideUp(500);
                    });
                }
                else {
                    addFormErrors(data);
                }
            }
        })
    });

    $('.js--formAuth').on('submit', function (e) {
        e.preventDefault();
        $.ajax
        ({
            url: '/auth',
            data: $(this).serialize(),
            type: 'post',
            success: function(data)
            {
                if(data.redirectUrl) {
                    location.href = data.redirectUrl;
                }
                else if(data.message){
                    const errorPart = $('#js--error');
                    errorPart.find('span').text(data.message);
                    errorPart.fadeTo(2500, 1000).slideDown(1000, function(){
                        errorPart.slideUp(500);
                    });
                    $(`#password input`).val('');
                }
            }
        })
    });

    function  addFormErrors(data) {
        for (const [field, msg] of Object.entries(data)) {
                $(`#${field} input`).addClass('alert-danger');
                $(`#${field}`).addClass('text-danger');
                $(`#${field} #error`).html(msg).addClass('text-danger');
        }
    }
});
