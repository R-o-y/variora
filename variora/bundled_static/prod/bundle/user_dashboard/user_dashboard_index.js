!function(e){function t(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=629)}({21:function(e,t,n){"use strict";function i(e,t){var n=e+"?";for(var i in t)n=n+i+"="+t[i]+"&";return n}function r(e){var t=null;if(document.cookie&&""!=document.cookie)for(var n=document.cookie.split(";"),i=0;i<n.length;i++){var r=n[i].trim();if(r.substring(0,e.length+1)==e+"="){t=decodeURIComponent(r.substring(e.length+1));break}}return t}Object.defineProperty(t,"__esModule",{value:!0}),t.getCookie=r,t.getUrlFormat=i},629:function(e,t,n){"use strict";function i(){$(".EditDocTitleButton").on("click",function(){var e=$(this).parents("td"),t=e.find("span").text();e.html("<input type='text'></input>&nbsp<i class='fa fa-check-circle' style='cursor: pointer' aria-hidden='true'></i>"),"administrated_coterie_page"==userDashboardPageType?e.find("input").css("width",String(e.width()-e.find("i").width()-80)+"px"):e.find("input").css("width",String(e.width()-e.find("i").width()-28)+"px"),e.find("input").val(t),e.find("i").on("click",function(){var n=e.find("input").val();if(n!=t){if("documents_page"==userDashboardPageType)var o="/file_viewer/edit_doc_title";else if("administrated_coterie_page"==userDashboardPageType)var o="/coterie/edit_coteriedoc_title";$.ajax({type:"POST",url:o,data:{csrfmiddlewaretoken:(0,r.getCookie)("csrftoken"),document_id:e.parents("tr").find("button[name='document_id']").val(),new_doc_title:n}})}e.html('<i class="fa fa-pencil-square-o EditDocTitleButton" style="cursor: pointer" aria-hidden="true"></i>&nbsp<span>'+n+"</span>"),i()})})}var r=n(21);$(document).ready(function(){$(".pe-7s-plus").on("click",function(){var e=layer.open({type:1,title:"Create a new group",skin:"layui-layer-demo",closeBtn:1,shift:4,area:["380px","280px"],shadeClose:!0,content:'                <form id="create_group_form" style="margin-left: auto; margin-right: auto; margin-top: 28px; width: 200px;">                    <input name="coterie_name" type="text" class="form-control" placeholder="name"><br>                    <textarea name="coterie_description" type="text" class="form-control" rows="2" placeholder="description"></textarea><br>                    <button class="btn btn-info" type="button" style="float: right;">create</button>                </form>            '});$("#create_group_form").find("button").on("click",function(){var t=$("#create_group_form");$(this).css("disabled","true"),$.ajax({type:"POST",url:"/coterie/handle_create_coterie",data:{csrfmiddlewaretoken:(0,r.getCookie)("csrftoken"),coterie_name:t.find("input").val(),coterie_description:t.find("textarea").val()},success:function(){layer.close(e),window.location.reload()}})})}),$("tbody").each(function(){for(var e=$(this),t=e.children("tr").length,n=0;n<t;n++)$(e.children("tr")[n]).children("td:first").text(n+1)}),$(".FileDeleteBtn").on("click",function(){var e=$(this);layer.confirm("confirm delete?",{btn:["yes"],title:!1,shadeClose:!0},function(){layer.msg("delete successfully",{icon:1}),$.ajax({type:"DELETE",url:e.attr("action-link"),beforeSend:function(e){e.setRequestHeader("X-CSRFToken",(0,r.getCookie)("csrftoken"))},success:function(){window.location.reload()}})})}),$(".MemberRemoveForm").find("button").on("click",function(){var e=$(this);layer.confirm("confirm remove this member?",{btn:["yes"],title:!1,shadeClose:!0},function(){layer.msg("remove successfully",{icon:1}),e.parents(".MemberRemoveForm").submit()})}),i()})}});