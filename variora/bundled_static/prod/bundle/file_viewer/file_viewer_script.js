!function(t){function n(o){if(e[o])return e[o].exports;var a=e[o]={i:o,l:!1,exports:{}};return t[o].call(a.exports,a,a.exports,n),a.l=!0,a.exports}var e={};n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:o})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},n.p="",n(n.s=650)}({101:function(t,n,e){"use strict";function o(){tinymce.init({menubar:!1,selector:"textarea",forced_root_block:!1,plugins:["advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker","searchreplace visualblocks visualchars codesample fullscreen insertdatetime media nonbreaking","save table contextmenu directionality emoticons template paste textcolor"],toolbar:["styleselect | bold italic codesample | link image | bullist numlist outdent indent | forecolor backcolor"],paste_as_text:!0,branding:!1,width:"calc(100% - 2px)",setup:function(t){t.on("change",function(){t.save()})}}),$(document).on("focusin",function(t){$(t.target).closest(".mce-window").length&&t.stopImmediatePropagation()})}Object.defineProperty(n,"__esModule",{value:!0}),n.tinymceInit=o},16:function(t,n,e){"use strict";function o(t,n){var e=t+"?";for(var o in n)e=e+o+"="+n[o]+"&";return e}function a(t){var n=null;if(document.cookie&&""!=document.cookie)for(var e=document.cookie.split(";"),o=0;o<e.length;o++){var a=e[o].trim();if(a.substring(0,t.length+1)==t+"="){n=decodeURIComponent(a.substring(t.length+1));break}}return n}function i(t,n){var e=setInterval(function(){t.complete&&(n(t),clearInterval(e))},8)}function r(t){var n=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;t=t.replace(n,function(t,n,e,o){return n+n+e+e+o+o});var e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return e?{r:parseInt(e[1],16),g:parseInt(e[2],16),b:parseInt(e[3],16)}:null}function s(t,n){return"/coteries/"+n+"/documents/"+t.title.replace(/\s/g,"-")+"/"+t.pk}function c(t){return"/documents/"+t.title.replace(/\s/g,"-")+"/"+t.pk}Object.defineProperty(n,"__esModule",{value:!0}),n.getCookie=a,n.getUrlFormat=o,n.imgLoad=i,n.hexToRgb=r,n.formatOpenCoterieDocumentUrl=s,n.formatOpenDocumentUrl=c},521:function(t,n,e){"use strict";function o(t){var n=".AnnotationDiv[annotation_id='"+t+"']";return $(n)}function a(t){o(t).remove(),$(".Annotation[annotation_id='"+t+"']").remove()}function i(t){for(var n=$(".AnnotationReplyBlock[annotation_reply_id='"+t+"']").toArray();n.length>0;){var e=$(n.shift()),o=e.attr("annotation_reply_id");n=n.concat($(".AnnotationReplyBlock[reply_to_annotation_reply='"+o+"']").toArray()),e.remove()}}function r(){s($(document))}function s(t){t.find("code").addClass("prettyprint"),PR.prettyPrint(),t.find(".AnnotationBlock").on("mouseover",function(){var t=$(this).attr("annotation_id"),n=$(".Annotation[annotation_id='"+t+"']");$(this).css("box-shadow","2px 3px 8px rgba(0, 0, 0, .25)"),n.css("box-shadow","2px 3px 8px rgba(0, 0, 0, .25)")}),t.find(".AnnotationBlock").on("mouseout",function(){var t=$(this).attr("annotation_id"),n=$(".Annotation[annotation_id='"+t+"']");$(this).css("box-shadow","none"),n.css("box-shadow","none")}),t.find(".AnnotationDirectButton").on("click",function(t){var n=$(this).parents(".AnnotationDiv").attr("annotation_id"),e=$(".Annotation[annotation_id='"+n+"']"),o=$("#file_viewer"),a=e.offset().top-o.offset().top+o.scrollTop()-.38*window.innerHeight+e.height()/2;o.animate({scrollTop:parseInt(a)},240)}),t.find(".PostReplyReplyButton").on("click",function(){if(is_authenticated){var t=!this.classList.contains("AnonymouslyPostReplyReplyButton"),n=$(this),e=layer.load(1,{shade:.18});$.ajax({type:"POST",url:"",data:{csrfmiddlewaretoken:(0,c.getCookie)("csrftoken"),operation:"reply_annotation",annotation_reply_content:n.parents("form").find("textarea[name='reply_reply_content']").val(),reply_to_annotation_id:n.parents(".AnnotationBlock").find(".PostAnnotationReplyButton").val(),reply_to_annotation_reply_id:n.val(),document_id:$("button[name='document_id']").val(),is_public:t},success:function(t){var o=$(t);$(".AnnotationBlock[annotation_id='"+n.parents(".AnnotationBlock").find(".PostAnnotationReplyButton").val(),NaN).append(o),$(".ReplyAnnotationButton").parents("footer").children("form").css("display","none"),tinyMCE.activeEditor.setContent(""),s(o),(0,l.tinymceInit)(),layer.close(e)}})}else layer.msg('You need to <a href="/sign-in" style="color: #ECECEC; text-decoration: underline">log in</a> first')}),t.find(".DeleteAnnotationReplyButton").on("click",function(){var t=layer.load(1,{shade:.18}),n=this.value;$.ajax({type:"POST",url:"",data:{csrfmiddlewaretoken:(0,c.getCookie)("csrftoken"),operation:"delete_annotation_reply",reply_id:n,document_id:$("button[name='document_id']").val()},success:function(e){i(n),layer.close(t)}})}),t.find(".PostAnnotationReplyButton").on("click",function(){if(is_authenticated){var t=!this.classList.contains("AnonymouslyPostAnnotationReplyButton"),n=$(this),e=layer.load(1,{shade:.18});$.ajax({type:"POST",url:"",data:{csrfmiddlewaretoken:(0,c.getCookie)("csrftoken"),operation:"reply_annotation",annotation_reply_content:n.parent("form").find("textarea[name='annotation_reply_content']").val(),reply_to_annotation_id:n.val(),document_id:$("button[name='document_id']").val(),is_public:t},success:function(t){var o=$(t);$(".AnnotationBlock[annotation_id='"+n.val()+"']").append(o),$(".ReplyAnnotationButton").parents("footer").children("form").css("display","none"),tinyMCE.activeEditor.setContent(""),s(o),(0,l.tinymceInit)(),layer.close(e)}})}else layer.msg('You need to <a href="/sign-in" style="color: #ECECEC; text-decoration: underline">log in</a> first')}),t.find(".DeleteAnnotationButton").on("click",function(){var t=layer.load(1,{shade:.18}),n=this.value;$.ajax({type:"POST",url:"",data:{csrfmiddlewaretoken:(0,c.getCookie)("csrftoken"),operation:"delete_annotation",annotation_id:this.value},success:function(){a(n),layer.close(t)}})}),t.find(".LikeAnnotationButton").on("click",function(){if(is_authenticated){var t=$(this),n=parseInt(t.next().text())+1;t.next().text(n.toString()),t.off("click"),t.css("color","#6495ED"),t.on("click",function(){layer.msg("already liked",{icon:6,time:800})}),$.ajax({type:"POST",url:"",data:{csrfmiddlewaretoken:(0,c.getCookie)("csrftoken"),operation:"like_annotation",annotation_id:t.attr("annotation_id")}})}else layer.msg('You need to <a href="/sign-in" style="color: #ECECEC; text-decoration: underline">log in</a> first')}),t.find(".LikeAnnotationReplyButton").on("click",function(){if(is_authenticated){var t=$(this),n=parseInt(t.next().text())+1;t.next().text(n.toString()),t.off("click"),t.css("color","#6495ED"),t.on("click",function(){layer.msg("already liked",{icon:6,time:800})}),$.ajax({type:"POST",url:"",data:{csrfmiddlewaretoken:(0,c.getCookie)("csrftoken"),operation:"like_annotation_reply",annotation_reply_id:t.attr("annotation_reply_id")}})}else layer.msg('You need to <a href="/sign-in" style="color: #ECECEC; text-decoration: underline">log in</a> first')}),t.find(".ReplyAnnotationButton").on("click",function(){var t=!$(this).css("display")==$(this).parents("footer").children("form").slideToggle({duration:180,start:function(){t||$(".ReplyAnnotationButton").parents("footer").children("form").not($(this)).slideUp(180).css("display","none")}})})}Object.defineProperty(n,"__esModule",{value:!0}),n.addAnnotationRelatedListener=void 0;var c=e(16),l=e(101);n.addAnnotationRelatedListener=r},522:function(t,n,e){"use strict";function o(t){for(var n=$(".CommentBlock[comment_id='"+t+"']").toArray();n.length>0;){var e=$(n.shift()),o=e.attr("comment_id");n=n.concat($(".CommentBlock[reply_to_comment_id='"+o+"']").toArray()),e.remove()}}function a(){(0,c.tinymceInit)(),$("code").addClass("prettyprint"),PR.prettyPrint(),$(".likeCommentButton").on("click",function(){if(is_authenticated){var t=$(this),n=parseInt(t.next().text())+1;t.next().text(n.toString()),t.off("click"),t.css("color","#6495ED"),t.on("click",function(){layer.msg("already liked",{icon:6,time:800})}),$.ajax({type:"POST",url:"",data:{csrfmiddlewaretoken:(0,s.getCookie)("csrftoken"),operation:"like_comment",comment_id:t.attr("comment_id")}})}else layer.msg('<span style="color: #ECECEC">You need to <a href="/sign-in" style="color: #ECECEC; text-decoration: underline">log in</a> first</span>')}),$(".delete_comment_button").on("click",function(){if(is_authenticated){var t=layer.load(0,{shade:.18}),n=this.value;$.ajax({type:"POST",url:"",data:{csrfmiddlewaretoken:(0,s.getCookie)("csrftoken"),operation:"delete_comment",comment_id:n,document_id:$("button[name='document_id']").val()},success:function(e){o(n),layer.close(t)}})}}),$(".reply_comment_button").on("click",function(){$(this).parents("blockquote").find(".reply_comment_form").slideToggle({duration:180,start:function(){$(this).is(":hidden")||$(".reply_comment_form").not($(this)).slideUp(180)}})}),$(".post_comment_reply_button").on("click",function(){if(is_authenticated){var t=!this.classList.contains("anonymously_post_comment_reply_button"),n=$(this),e=layer.load(0,{shade:.18});$.ajax({type:"POST",url:"",data:{csrfmiddlewaretoken:(0,s.getCookie)("csrftoken"),operation:"comment",comment_content:n.parents("form").find("textarea[name='comment_content']").val(),document_id:$("button[name='document_id']").val(),reply_to_comment_id:n.val(),is_public:t},success:function(t){$("#comment_update_div").html(t),a(),layer.close(e)}})}else layer.msg('<span style="color: #ECECEC">You need to <a href="/sign-in" style="color: #ECECEC; text-decoration: underline">log in</a> first</span>')})}function i(){$("#refresh_comment_button").on("click",function(){$.ajax({type:"POST",url:"",data:{csrfmiddlewaretoken:(0,s.getCookie)("csrftoken"),operation:"refresh",document_id:$("button[name='document_id']").val()},success:function(t){$("#comment_update_div").html(t),a()}})})}function r(){$(".post_comment_button").on("click",function(){if(is_authenticated){var t=!this.classList.contains("anonymously_post_comment_button"),n=layer.load(0,{shade:.18}),e=tinyMCE.activeEditor;$.ajax({type:"POST",url:"",data:{csrfmiddlewaretoken:(0,s.getCookie)("csrftoken"),operation:"comment",comment_content:$("textarea[name='comment_content']").val(),document_id:$("button[name='document_id']").val(),is_public:t},success:function(t){$("#comment_update_div").html(t),a(),e.setContent(""),layer.close(n)}})}else layer.msg('<span style="color: #ECECEC">You need to <a href="/sign-in" style="color: #ECECEC; text-decoration: underline">log in</a> first</span>')})}Object.defineProperty(n,"__esModule",{value:!0}),n.enablePostCommentButton=n.enableRefreshCommentButton=n.addCommentRelatedListener=void 0;var s=e(16),c=e(101);n.addCommentRelatedListener=a,n.enableRefreshCommentButton=i,n.enablePostCommentButton=r},523:function(t,n,e){"use strict";function o(){$("#collect_button").on("click",function(){var t=$(this).find(".fa");t.hasClass("fa-star-o")?(layer.msg("Collected"),t.removeClass("fa-star-o"),t.addClass("fa-star"),$.ajax({type:"POST",url:"",data:{csrfmiddlewaretoken:(0,a.getCookie)("csrftoken"),operation:"collect",document_id:$("button[name='document_id']").val()}})):t.hasClass("fa-star")&&(layer.msg("Uncollected"),t.removeClass("fa-star"),t.addClass("fa-star-o"),$.ajax({type:"POST",url:"",data:{csrfmiddlewaretoken:(0,a.getCookie)("csrftoken"),operation:"uncollect",document_id:$("button[name='document_id']").val()}}))}),$("#show_annotation_frame_button").on("click",function(){$(".Annotation").each(function(){$(this).slideDown(180)})}),$("#hide_annotation_frame_button").on("click",function(){$(".Annotation").each(function(){$(this).slideUp(180)})})}Object.defineProperty(n,"__esModule",{value:!0}),n.prepareNavbarFunction=void 0;var a=e(16);n.prepareNavbarFunction=o},650:function(t,n,e){"use strict";function o(t){if(C*=t,E.length>0){for(;E.length>1;)E.pop();E.push([E[0][0],"PENDING",null])}for(var n=0;n<P.length;n++){var e="page_canvas_"+P[n],o=document.getElementById(e);o.width=0,o.height=0,E.push([P[n],"PENDING",null])}P=[],A||d(E,P,C);var a=$("#file_viewer")[0].scrollHeight;m*=t,h*=t,$(".page_div").each(function(){var t=$(this);t.css("width",m+"px"),t.css("height",h+"px")}),i(t);var r=$("#file_viewer")[0].scrollHeight/a;$("#file_viewer").scrollTop(parseFloat($("#file_viewer").scrollTop())*r)}function a(){var t="rgba(0,0,0,0.18)";_.on("change",function(n){var e=(0,v.hexToRgb)(n);t="rgba("+e.r+","+e.g+","+e.b+",0.18)"}),$("#annotation_color_buttons_div").find(".ColorSelectorButton").on("click",function(){t=$(this).css("background-color")}),$(".PageDiv, .page_div").on("mousedown",function(n){if(!$(n.target).hasClass("ui-draggable")&&!$(n.target).hasClass("ui-resizable-handle")){layer.closeAll(),$(".ui-draggable.Annotation").remove();var e=$(this).find(".PageImg, .PageCanvas"),o=n.pageX,a=n.pageY,i=e.offset().left,r=e.offset().top,s=o-i,c=a-r,l=$("<div class='Annotation'></div>");e.parents(".page_div, .PageDiv").append(l),l.css({background:t,position:"absolute",width:"1px",height:"1px",left:s,top:c}),$(".PageImg, .PageCanvas, .Annotation").on("mousemove",function(t){var n=t.pageX,o=t.pageY,a=e.offset().left,i=e.offset().top,r=n-a,d=o-i;l.css({width:Math.abs(r-s),height:Math.abs(d-c),left:Math.min(s,r),top:Math.min(c,d)}),t.stopPropagation()}),$("body").on("mouseup",function(n){if($(n.target).hasClass("PageImg")||$(n.target).hasClass("PageCanvas")||$(n.target).hasClass("Annotation")){var o=e.height(),a=e.width(),i=parseFloat(l.css("top"))/o,r=parseFloat(l.css("left"))/a,s=parseFloat(l.css("height"))/o,c=parseFloat(l.css("width"))/a;l.draggable({containment:"parent"}).resizable({containment:"parent"});var d=layer.open({type:1,title:"Post Annotation",shadeClose:!0,shade:!1,maxmin:!0,zIndex:800,fixed:!1,content:'<form id="annotation_form">                        <textarea name="annotation_content" class="form-control" rows="8" style="resize: vertical"></textarea>                        <button type="button" class="post_annotation_button anonymously_post_annotation_button btn" name="document_id" value="{{ document.id }}" style="margin: 8px; float: right; border-radius: 0; color: white; background-color: #636e72">                          <i class="fa fa-user-secret"></i> &nbsp post anonymously                        </button>                        <button type="button" class="post_annotation_button btn " name="document_id" value="{{ document.id }}" style="margin: 8px; float: right; border-radius: 0; color: white; background-color: #1BA39C">post annotation</button>                    </form>',success:function(){(0,k.tinymceInit)()},cancel:function(){l.remove()}}),u=$(".layui-layer[times="+d+"]");u.find(".post_annotation_button").on("click",function(){if(is_authenticated){var n=!this.classList.contains("anonymously_post_annotation_button");$.ajax({type:"POST",url:"",data:{csrfmiddlewaretoken:(0,v.getCookie)("csrftoken"),operation:"annotate",annotation_content:u.find("textarea[name='annotation_content']").val(),page_id:e.attr("id"),top_percent:i,left_percent:r,height_percent:s,width_percent:c,frame_color:t,document_id:$("button[name='document_id']").val(),is_public:n},success:function(t){l.draggable("destroy").resizable("destroy"),$("#annotation_update_div").html(t.new_annotations_html),(0,y.addAnnotationRelatedListener)(),(0,k.tinymceInit)(),l.attr("annotation_id",t.new_annotation_id),layer.close(d)}}),u.find(".post_annotation_button").attr("disabled",!0)}else layer.msg('You need to <a href="/sign-in" style="color: #ECECEC; text-decoration: underline">log in</a> first')}),$(".PageImg, .PageCanvas, .Annotation").off("mousemove"),$("body").off("mouseup"),u.find(".post_annotation_button").attr("disabled",!1)}else l.remove(),$(".PageImg, .PageCanvas, .Annotation").off("mousemove"),$("body").off("mouseup");n.stopPropagation()}),n.stopPropagation()}})}function i(t){$(".Annotation").each(function(){$(this).css("top",parseFloat($(this).css("top"))*t+"px"),$(this).css("left",parseFloat($(this).css("left"))*t+"px"),$(this).css("width",parseFloat($(this).css("width"))*t+"px"),$(this).css("height",parseFloat($(this).css("height"))*t+"px")})}function r(t){var n=$("#file_viewer"),e=t.offset().top-n.offset().top+n.scrollTop();n.animate({scrollTop:parseInt(e)},240)}function s(){var t=$("#scroll_page_into_view_div").children("input"),n=$("#scroll_page_into_view_div").children("button");t.attr("min","1"),t.attr("max",x.toString()),n.on("click",function(){var n=t.val(),e="page_div_"+n;r($("#"+e))})}function c(){var t=$("#wrapper"),n=$("#file_viewer");t.css("height",document.body.clientHeight-28+"px"),t.css("width",document.body.clientWidth),n.css("height",t.height()+"px"),n.css("width",.6*parseInt(t.css("width"))+"px"),$("#annotation_update_div").css("height",t.height()+"px"),$("#annotation_update_div").css("width",t.width()-3.8-n.width()+"px"),$("#horizontal_draggable").css("height",t.height()+"px"),$(".PageImg").css("width",n.width()-24+"px"),$(".PageDiv").each(function(){var t=$(this),n=t.children(".PageImg");(0,v.imgLoad)(n[0],function(){t.css("width",n.width()+"px"),t.css("height",n.height()+"px")})})}function l(){$("#buttonForLarger").on("click",function(){o(w)}),$("#buttonForSmaller").on("click",function(){o(1/w)})}function d(t,n,e){if(t.length>0){A=!0,$("#buttonForLarger, #buttonForSmaller").attr("disabled",!0);var o=t[0][0];f.getPage(o).then(function(a){var i="page_canvas_"+o,r=document.getElementById(i),s=r.getContext("2d"),c=a.getViewport(I*e);r.height=c.height,r.width=c.width,r.style.height=c.height/I+"px",r.style.width=c.width/I+"px";var l={canvasContext:s,viewport:c};t[0][2]=a.render(l),t[0][1]="RENDERING",t[0][2].promise.then(function(){t.shift(),n.push(o),A=!1,$("#buttonForLarger, #buttonForSmaller").attr("disabled",!1),d(t,n,e)},function(t){console.log("rejected because of this reason: "+t)})})}}function u(){var t=1;$("#file_viewer").scroll(function(){var n=this.scrollTop/this.scrollHeight,e=Math.ceil(n*x);if(e!=t){t=e;for(var o=[!0,!0,!0,!0,!0],a=0,i=P.length,r=0;r<i;r++)if(P[a]-e>=-1&&P[a]-e<=3)o[P[a]-e+1]=!1,a+=1;else{var s="page_canvas_"+P[a],c=document.getElementById(s);c.width=0,c.height=0,P.splice(a,1)}for(;E.length>1;)E.pop();for(var r=0;r<5;r++)1==o[r]&&E.push([Math.min(x,Math.max(1,e+r-1)),"PENDING",null]);A||d(E,P,C)}})}function p(t){PDFJS.workerSrc="/static/pdfjs/pdf.worker.js";var n=layer.load(1,{shade:!1,offset:"48%"});PDFJS.getDocument(t).then(function(t){layer.close(n),f=t,x=f.numPages,s(),f.getPage(x).then(function(t){C=.66*$("#file_viewer").width()/t.getViewport(1).width;var n="";h=t.getViewport(C).height,m=t.getViewport(C).width;for(var e=1;e<=f.numPages;e++){n+="<div class='page_div' id='"+("page_div_"+e)+"'><canvas class='PageCanvas' id='"+("page_canvas_"+e)+"'></canvas></div><br>"}$("#file_viewer").append(n),$(".page_div").css("height",h+"px"),$(".page_div").css("width",m+"px"),a(),drawAllExistingAnnotationFrame(),E.push([Math.min(x,1),"PENDING",null]),E.push([Math.min(x,2),"PENDING",null]),E.push([Math.min(x,3),"PENDING",null]),E.push([Math.min(x,4),"PENDING",null]),E.push([Math.min(x,5),"PENDING",null]),d(E,P,C),u()})})}var f,m,h,_,g=e(522),v=e(16),y=e(521),b=e(523),k=e(101),x=0,w=1.08,C=1,P=[],E=[],A=!1,I=1.8;$(document).ready(function(){p($("#file-url").val()),(0,k.tinymceInit)(),(0,g.enablePostCommentButton)(),(0,g.enableRefreshCommentButton)(),l(),(0,b.prepareNavbarFunction)(),$(window).resize(function(){c();var t=parseFloat($(".PageImg").css("width"));i(parseFloat($(".PageImg").css("width"))/t)}),_=new Huebee(".color-picker",{notation:"hex",saturations:2}),(0,g.addCommentRelatedListener)(),(0,y.addAnnotationRelatedListener)(),c();var t=$("#wrapper"),n=$("#file_viewer");$("#horizontal_draggable").draggable({axis:"x",containment:"#containment-wrapper",revert:!0,revertDuration:0,stop:function(e,o){var a=o.offset.left;n.css("width",a+"px"),$("#annotation_update_div").css("width",t.width()-3-n.width()+"px")}})})}});