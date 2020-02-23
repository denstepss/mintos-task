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

    let haveSame = false;
    $(".js--formRegistration .form-group").on('click', function(){
        const field =  $(this).attr('id');
        if ($(`#${field} input`).hasClass('alert-danger')) {
            $(`#${field} input`).removeClass('alert-danger');
            $(`#${field}`).removeClass('text-danger');
            $(`#${field} #error`).html('').removeClass('text-danger');
            if (field === 'password') {
                $(`#${field} input`).val('');
            }
            else if(field === 'email'){
                checkEmailOnFly($(`#${field} input`).val());
            }
        }
    });


    $('.js--formRegistration').on('submit', function (e) {
        e.preventDefault();
        if(!haveSame) {
            $.ajax
            ({
                url: '/reg',
                data: $(this).serialize(),
                type: 'post',
                success: function (data) {
                    if (data.status) {
                        const successPart = $('#js--ok');
                        successPart.find('span').text('User successfully registrated!');
                        $('.js--formRegistration')[0].reset();
                        successPart.fadeTo(2000, 500).slideDown(500, function () {
                            successPart.slideUp(500);
                        });
                    } else {
                        addFormErrors(data);
                    }
                }
            })
        }
    });
    $('.js--formRegistration #email input').on('input', function (e) {
        const email = $(this).val();
        checkEmailOnFly(email);
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

    function checkEmailOnFly(email) {
        const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email !== '' && regExp.test(String(email).toLowerCase()))
        {
            $.ajax
            ({
                url: '/check_email',
                data: { email : email},
                type: 'post',
                success: function(data)
                {
                    if(data.email) {
                        addFormErrors(data);
                        haveSame = true;
                    }
                    else{
                        haveSame = false;
                        $(`#email input`).removeClass('alert-danger');
                        $(`#email`).removeClass('text-danger');
                        $(`#email #error`).html('').removeClass('text-danger');
                    }
                }
            })
        }
    }

    function  addFormErrors(data) {
        for (const [field, msg] of Object.entries(data)) {
                $(`#${field} input`).addClass('alert-danger');
                $(`#${field}`).addClass('text-danger');
                $(`#${field} #error`).html(msg).addClass('text-danger');
        }
    }
});
