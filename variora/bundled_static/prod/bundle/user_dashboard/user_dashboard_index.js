!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=602)}({20:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getCookie=function(e){var t=null;if(document.cookie&&""!=document.cookie)for(var n=document.cookie.split(";"),r=0;r<n.length;r++){var o=n[r].trim();if(o.substring(0,e.length+1)==e+"="){t=decodeURIComponent(o.substring(e.length+1));break}}return t},t.getUrlFormat=function(e,t){var n=e+"?";for(var r in t)n=n+r+"="+t[r]+"&";return n},t.imgLoad=function(e,t){var n=setInterval(function(){e.complete&&(t(e),clearInterval(n))},8)},t.hexToRgb=function(e){e=e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(e,t,n,r){return t+t+n+n+r+r});var t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?{r:parseInt(t[1],16),g:parseInt(t[2],16),b:parseInt(t[3],16)}:null},t.formatOpenCoterieDocumentUrl=function(e,t){return"/coteries/"+t+"/documents/"+e.title.replace(/\s/g,"-")+"/"+e.pk},t.formatOpenDocumentUrl=function(e){return"/documents/"+e.title.replace(/\s/g,"-")+"/"+e.pk}},602:function(e,t,n){"use strict";var r=n(20);$(document).ready(function(){$(".pe-7s-plus").on("click",function(){var e=layer.open({type:1,title:"Create a new group",skin:"layui-layer-demo",closeBtn:1,shift:4,area:["380px","280px"],shadeClose:!0,content:'                <form id="create_group_form" style="margin-left: auto; margin-right: auto; margin-top: 28px; width: 200px;">                    <input name="coterie_name" type="text" class="form-control" placeholder="name"><br>                    <textarea name="coterie_description" type="text" class="form-control" rows="2" placeholder="description"></textarea><br>                    <button class="btn btn-info" type="button" style="float: right;">create</button>                </form>            '});$("#create_group_form").find("button").on("click",function(){var t=$("#create_group_form");$(this).css("disabled","true"),$.ajax({type:"POST",url:"/coterie/handle_create_coterie",data:{csrfmiddlewaretoken:(0,r.getCookie)("csrftoken"),coterie_name:t.find("input").val(),coterie_description:t.find("textarea").val()},success:function(){layer.close(e),window.location.reload()}})})}),$("tbody").each(function(){for(var e=$(this),t=e.children("tr").length,n=0;n<t;n++)$(e.children("tr")[n]).children("td:first").text(n+1)}),$(".FileDeleteBtn").on("click",function(){var e=$(this);layer.confirm("confirm delete?",{btn:["yes"],title:!1,shadeClose:!0},function(){layer.msg("delete successfully",{icon:1}),$.ajax({type:"DELETE",url:e.attr("action-link"),beforeSend:function(e){e.setRequestHeader("X-CSRFToken",(0,r.getCookie)("csrftoken"))},success:function(){window.location.reload()}})})}),$(".MemberRemoveForm").find("button").on("click",function(){var e=$(this);layer.confirm("confirm remove this member?",{btn:["yes"],title:!1,shadeClose:!0},function(){layer.msg("remove successfully",{icon:1}),e.parents(".MemberRemoveForm").submit()})}),function e(){$(".EditDocTitleButton").on("click",function(){var t=$(this).parents("td"),n=t.find("span").text();t.html("<input type='text'></input>&nbsp<i class='fa fa-check-circle' style='cursor: pointer' aria-hidden='true'></i>"),"administrated_coterie_page"==userDashboardPageType?t.find("input").css("width",String(t.width()-t.find("i").width()-80)+"px"):t.find("input").css("width",String(t.width()-t.find("i").width()-28)+"px"),t.find("input").val(n),t.find("i").on("click",function(){var o=t.find("input").val();if(o!=n){if("documents_page"==userDashboardPageType)var i="/file_viewer/edit_doc_title";else"administrated_coterie_page"==userDashboardPageType&&(i="/coterie/edit_coteriedoc_title");$.ajax({type:"POST",url:i,data:{csrfmiddlewaretoken:(0,r.getCookie)("csrftoken"),document_id:t.parents("tr").find("button[name='document_id']").val(),new_doc_title:o}})}t.html('<i class="fa fa-pencil-square-o EditDocTitleButton" style="cursor: pointer" aria-hidden="true"></i>&nbsp<span>'+o+"</span>"),e()})})}()})}});