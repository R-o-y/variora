!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=486)}({19:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),String.prototype.format=function(){var e=this;for(var t in arguments)e=e.replace("{"+t+"}",arguments[t]);return e},t.groupAvatarColors=["#1BA39C","#1abc9c","#2ecc71","#3498db","#9b59b6","#34495e","#f1c40f","#e67e22","#e74c3c"],t.getCookie=function(e){var t=null;if(document.cookie&&""!=document.cookie)for(var n=document.cookie.split(";"),r=0;r<n.length;r++){var o=n[r].trim();if(o.substring(0,e.length+1)==e+"="){t=decodeURIComponent(o.substring(e.length+1));break}}return t},t.copyToClipboard=function(e){var t=document.createElement("input");t.style.hidden=!0,document.body.appendChild(t),t.value=e,t.select(),document.execCommand("copy"),document.body.removeChild(t)},t.getUrlFormat=function(e,t){var n=e+"?";for(var r in t)n=n+r+"="+t[r]+"&";return n},t.hexToRgb=function(e){e=e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(e,t,n,r){return t+t+n+n+r+r});var t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?{r:parseInt(t[1],16),g:parseInt(t[2],16),b:parseInt(t[3],16)}:null},t.formatOpenCoterieDocumentUrl=function(e,t){return"/coteries/"+t+"/documents/"+e.slug+"/"+e.title.replace(/\s/g,"-")},t.formatOpenDocumentUrl=function(e){return"/documents/"+e.slug+"/"+e.title.replace(/\s/g,"-")},t.getValFromUrlParam=function(e){return new URL(window.location.href).searchParams.get(e)},t.renderMathJax=function(){window.hasOwnProperty("MathJax")&&MathJax.Hub.Queue(["Typeset",MathJax.Hub])},t.range=function(e){return Array(e-0).fill().map(function(e,t){return 0+t})}},486:function(e,t,n){"use strict";var r,o,i,a=n(19);$(document).ready(function(){$.backstretch("/static/assets/img/backgrounds/1.jpg"),$("#top-navbar-1").on("shown.bs.collapse",function(){$.backstretch("resize")}),$("#top-navbar-1").on("hidden.bs.collapse",function(){$.backstretch("resize")}),$(".registration-form:first-child fieldset").fadeIn("slow"),$('.registration-form input[type="text"], .registration-form input[type="password"], .registration-form input[type="email"]').on("focus",function(){$(this).removeClass("input-error")}),$(".registration-form").on("submit",function(e){var t=!0;$(this).find('input[type="text"], input[type="password"], input[type="email"]').each(function(){""==$(this).val()?(e.preventDefault(),$(this).addClass("input-error"),t=!1):$(this).removeClass("input-error")}),t&&"for_submit_refresh"==$(this).attr("target")&&(o=layer.load(0,{shade:.18}),i=layer.msg("we are sending the verification code to your email address, this will take a while.",{title:"message",icon:6,skin:"layui-layer-molv",shift:1,offset:"0px",area:["auto","auto"],time:0}))}),$(".registration-form .btn-next").on("click",function(){var e=$(this).parents(".registration-form");e.find("iframe").on("load",function(){layer.close(o),layer.close(i),layer.msg("email successfullly sent, please check",{icon:1,offset:1.8,time:3800,shift:4}),r=e.find('input[type="email"]').val(),e.children("fieldset").fadeOut(400,function(){e.next().children("fieldset").fadeIn()})})}),$("#sign_me_up_button").on("click",function(e){$(this).parents(".registration-form").find('input[type="text"], input[type="password"], input[type="email"]').each(function(){""==$(this).val()?$(this).addClass("input-error"):($(this).removeClass("input-error"),$.ajax({type:"POST",url:"/handle_sign_up",data:{csrfmiddlewaretoken:(0,a.getCookie)("csrftoken"),verification_code:$("input[name='verification_code']").val(),email_address:r},success:function(e){"wrong"==e?document.getElementById("message2").innerHTML="<span color='red'>verification code is incorrect</span>":window.location.href="/"}}))})}),$(window).on("unload",function(){$.ajax({type:"POST",url:"/handle_sign_up",data:{csrfmiddlewaretoken:(0,a.getCookie)("csrftoken"),leave:"yes",email_address:r}})}),$(".registration-form .btn-clear").on("click",function(){$(this).parents(".form-bottom").find("input").val("")}),$(".registration-form[target='for_submit_refresh']").find("input[name='password_confirm']").keyup(function(){var e=document.getElementsByName("password")[0].value,t=document.getElementsByName("password_confirm")[0].value;t.length<6?(document.getElementById("message").innerHTML="<span color='red'>Password must be longer than or equal to 6 digts.</span>",document.getElementById("next_button").disabled=!0):/^(?=.*[a-z])[a-z0-9]+/gi.test(t)?e==t?(document.getElementById("message").innerHTML="<span color='green'>Password confirmed.</span>",document.getElementById("next_button").disabled=!1):(document.getElementById("message").innerHTML="<span color='red'>Passwords mismatch.</span>",document.getElementById("next_button").disabled=!0):(document.getElementById("message").innerHTML="<span color='red'>Password may contain only letters or numbers.</span>",document.getElementById("next_button").disabled=!0)})})}});