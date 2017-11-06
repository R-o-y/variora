import getCookie from 'getcookies'

var email_address;
var loadingLayer;
var messageLayer;

$(document).ready(function() {

    // Fullscreen background
    $.backstretch("/static/assets/img/backgrounds/1.jpg");

    $('#top-navbar-1').on('shown.bs.collapse', function(){
    	$.backstretch("resize");
    });
    $('#top-navbar-1').on('hidden.bs.collapse', function(){
    	$.backstretch("resize");
    });

    // Form
    $('.registration-form:first-child fieldset').fadeIn('slow');
    
    $('.registration-form input[type="text"], .registration-form input[type="password"], .registration-form input[type="email"]').on('focus', function() {
    	$(this).removeClass('input-error');
    });
    
    // submit
    $('.registration-form').on('submit', function(e) {
        var next = true;
        $(this).find('input[type="text"], input[type="password"], input[type="email"]').each(function() {
            if( $(this).val() == "" ) {
                e.preventDefault();
                $(this).addClass('input-error');
                next = false;
            } else
                $(this).removeClass('input-error');
        });

        // first step submit
        if (next) {
            if ($(this).attr("target") == "for_submit_refresh") {
                loadingLayer = layer.load(0, {shade: 0.18}); //0代表加载的风格，支持0-2
                messageLayer = layer.msg('we are sending the verification code to your email address, this will take a while.', {
                    title: "message",
                    icon: 6,
                    skin: 'layui-layer-molv', 
                    shift: 1,
                    offset: '0px',
                    area: ['auto', 'auto'],
                    time: 0,
                });
            }
        }
    });

    // first step's next step
    $(".registration-form .btn-next").on("click", function() {
    	var parentRegistrationForm = $(this).parents('.registration-form');
       
        parentRegistrationForm.find("iframe").on("load", function() {
            layer.close(loadingLayer);
            layer.close(messageLayer);
            layer.msg('email successfullly sent, please check', {icon: 1, offset: 1.8, time: 3800, shift: 4});
            
            email_address = parentRegistrationForm.find('input[type="email"]').val();

            parentRegistrationForm.children('fieldset').fadeOut(400, function() {
                parentRegistrationForm.next().children("fieldset").fadeIn();
            });
        });
    });

    // second step
    $("#sign_me_up_button").on("click", function(e) {
        var parentRegistrationForm = $(this).parents('.registration-form');
        parentRegistrationForm.find('input[type="text"], input[type="password"], input[type="email"]').each(function() {
            if( $(this).val() == "" ) {
                $(this).addClass('input-error');
            } else {
                $(this).removeClass('input-error');
                $.ajax({
                    type: "POST",
                    url: "/handle_sign_up",
                    data: {
                        csrfmiddlewaretoken: getCookie('csrftoken'),
                        verification_code: $("input[name='verification_code']").val(),
                        email_address: email_address,
                    },
                    success: function (data) {
                        if (data == "wrong") {
                            document.getElementById("message2").innerHTML = "<span color='red'>verification code is incorrect</span>";
                        } else {
                            window.location.href = "/";  // return to home page
                        }
                    },
                })
            }
        });
    });

    // when leave sign_up_page,
    // send information to the server to delete the temporary information for this signing up
    $(window).on("unload", function() {
        $.ajax({
            type: "POST",
            url: "/handle_sign_up",
            data: {
                csrfmiddlewaretoken: getCookie("csrftoken"),
                leave: "yes",
                email_address: email_address,
            },
        })
    });

    // clear the content in all the input box
    $('.registration-form .btn-clear').on("click", function() {
        $(this).parents('.form-bottom').find('input').val("");
    });

    // password validate
    $(".registration-form[target='for_submit_refresh']").find("input[name='password_confirm']").keyup(function () {
        var pw1 = document.getElementsByName("password")[0].value;
        var pw2 = document.getElementsByName("password_confirm")[0].value;
        if (pw2.length < 6){
            document.getElementById("message").innerHTML="<span color='red'>Password must be longer than or equal to 6 digts.</span>";
            document.getElementById("next_button").disabled = true;
        } else if (! /^(?=.*[a-z])[a-z0-9]+/ig.test(pw2)){
            document.getElementById("message").innerHTML="<span color='red'>Password may contain only letters or numbers.</span>";
            document.getElementById("next_button").disabled = true;
        } else if (pw1 == pw2) {
            document.getElementById("message").innerHTML="<span color='green'>Password confirmed.</span>";
            document.getElementById("next_button").disabled = false;
        } else {
            document.getElementById("message").innerHTML="<span color='red'>Passwords mismatch.</span>";
            document.getElementById("next_button").disabled = true;
        }
    });
    
});
