!function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=340)}({340:function(e,t,n){"use strict";function r(){$(".EditDocTitleButton").on("click",function(){var e=$(this).parents("td"),t=e.find("span").text();e.html("<input type='text'></input>&nbsp<i class='fa fa-check-circle' style='cursor: pointer' aria-hidden='true'></i>"),"administrated_coterie_page"==userDashboardPageType?e.find("input").css("width",String(e.width()-e.find("i").width()-80)+"px"):e.find("input").css("width",String(e.width()-e.find("i").width()-28)+"px"),e.find("input").val(t),e.find("i").on("click",function(){var n=e.find("input").val();if(n!=t){if("documents_page"==userDashboardPageType)var i="/file_viewer/edit_doc_title";else if("administrated_coterie_page"==userDashboardPageType)var i="/coterie/edit_coteriedoc_title";$.ajax({type:"POST",url:i,data:{csrfmiddlewaretoken:(0,o.default)("csrftoken"),document_id:e.parents("tr").find("button[name='document_id']").val(),new_doc_title:n}})}e.html('<i class="fa fa-pencil-square-o EditDocTitleButton" style="cursor: pointer" aria-hidden="true"></i>&nbsp<span>'+n+"</span>"),r()})})}var i=n(36),o=function(e){return e&&e.__esModule?e:{default:e}}(i);$(document).ready(function(){$(".pe-7s-plus").on("click",function(){var e=layer.open({type:1,title:"Create a new group",skin:"layui-layer-demo",closeBtn:1,shift:4,area:["380px","280px"],shadeClose:!0,content:'                <form id="create_group_form" style="margin-left: auto; margin-right: auto; margin-top: 28px; width: 200px;">                    <input name="coterie_name" type="text" class="form-control" placeholder="name"><br>                    <textarea name="coterie_description" type="text" class="form-control" rows="2" placeholder="description"></textarea><br>                    <button class="btn btn-info" type="button" style="float: right;">create</button>                </form>            '});$("#create_group_form").find("button").on("click",function(){var t=$("#create_group_form");$(this).css("disabled","true"),$.ajax({type:"POST",url:"/coterie/handle_create_coterie",data:{csrfmiddlewaretoken:(0,o.default)("csrftoken"),coterie_name:t.find("input").val(),coterie_description:t.find("textarea").val()},success:function(){layer.close(e),window.location.reload()}})})}),$("tbody").each(function(){for(var e=$(this),t=e.children("tr").length,n=0;n<t;n++)$(e.children("tr")[n]).children("td:first").text(n+1)}),$(".FileDeleteBtn").on("click",function(){var e=$(this);layer.confirm("confirm delete?",{btn:["yes"],title:!1,shadeClose:!0},function(){layer.msg("delete successfully",{icon:1}),$.ajax({type:"DELETE",url:e.attr("action-link"),beforeSend:function(e){e.setRequestHeader("X-CSRFToken",(0,o.default)("csrftoken"))},success:function(){window.location.reload()}})})}),$(".MemberRemoveForm").find("button").on("click",function(){var e=$(this);layer.confirm("confirm remove this member?",{btn:["yes"],title:!1,shadeClose:!0},function(){layer.msg("remove successfully",{icon:1}),e.parents(".MemberRemoveForm").submit()})}),r()})},36:function(e,t,n){"use strict";function r(e){var t=null;if(document.cookie&&""!=document.cookie)for(var n=document.cookie.split(";"),r=0;r<n.length;r++){var i=jQuery.trim(n[r]);if(i.substring(0,e.length+1)==e+"="){t=decodeURIComponent(i.substring(e.length+1));break}}return t}e.exports=r}});