!function(t){var n={};function e(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,e),r.l=!0,r.exports}e.m=t,e.c=n,e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:o})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(e.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var r in t)e.d(o,r,function(n){return t[n]}.bind(null,r));return o},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=370)}({100:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.tinymceInit=void 0;e(17);var o=function(t){return t&&t.__esModule?t:{default:t}}(e(21));n.tinymceInit=function(){tinymce.init({menubar:!1,selector:"textarea",forced_root_block:!1,plugins:["advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker","searchreplace visualblocks visualchars codesample fullscreen insertdatetime media nonbreaking","save table contextmenu directionality emoticons template paste textcolor"],toolbar:["styleselect | bold italic codesample | link image | bullist numlist outdent indent | forecolor | formula"],entity_encoding:"raw",indent:!1,paste_as_text:!0,branding:!1,width:"calc(100% - 2px)",images_upload_handler:function(t,n,e){var r=t.filename(),i="."+r.split(".")[r.split(".").length-1];new File([t.blob()],function(t){for(var n="",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",o=0;o<t;o++)n+=e.charAt(Math.floor(Math.random()*e.length));return n}(16)+i),o.default.post("https://api.imgur.com/3/upload",{image:t.base64()},{headers:{Authorization:"Client-ID a1f3b6d766ac1cc"}}).then(function(t){n(t.data.data.link)})},setup:function(t){t.on("change",function(){t.save()}),t.addButton("formula",{text:"Formula",icon:!1,onclick:function(){t.insertContent("$$ write LATEX here $$")}})}}),$(document).on("focusin",function(t){$(t.target).closest(".mce-window").length&&t.stopImmediatePropagation()})}},17:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),String.prototype.format=function(){var t=this;for(var n in arguments)t=t.replace("{"+n+"}",arguments[n]);return t},n.getCookie=function(t){var n=null;if(document.cookie&&""!=document.cookie)for(var e=document.cookie.split(";"),o=0;o<e.length;o++){var r=e[o].trim();if(r.substring(0,t.length+1)==t+"="){n=decodeURIComponent(r.substring(t.length+1));break}}return n},n.copyToClipboard=function(t){var n=document.createElement("input");n.style.hidden=!0,document.body.appendChild(n),n.value=t,n.select(),document.execCommand("copy"),document.body.removeChild(n)},n.getUrlFormat=function(t,n){var e=t+"?";for(var o in n)e=e+o+"="+n[o]+"&";return e},n.hexToRgb=function(t){t=t.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(t,n,e,o){return n+n+e+e+o+o});var n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return n?{r:parseInt(n[1],16),g:parseInt(n[2],16),b:parseInt(n[3],16)}:null},n.formatOpenCoterieDocumentUrl=function(t,n){return"/coteries/"+n+"/documents/"+t.slug+"/"+t.title.replace(/\s/g,"-")},n.formatOpenDocumentUrl=function(t){return"/documents/"+t.slug+"/"+t.title.replace(/\s/g,"-")},n.getValFromUrlParam=function(t){return new URL(window.location.href).searchParams.get(t)},n.renderMathJax=function(){window.hasOwnProperty("MathJax")&&MathJax.Hub.Queue(["Typeset",MathJax.Hub])}},21:function(t,n,e){t.exports=e(72)},22:function(t,n,e){"use strict";(function(n){var o=e(9),r=e(68),i={"Content-Type":"application/x-www-form-urlencoded"};function a(t,n){!o.isUndefined(t)&&o.isUndefined(t["Content-Type"])&&(t["Content-Type"]=n)}var s={adapter:function(){var t;return"undefined"!=typeof XMLHttpRequest?t=e(31):void 0!==n&&(t=e(31)),t}(),transformRequest:[function(t,n){return r(n,"Content-Type"),o.isFormData(t)||o.isArrayBuffer(t)||o.isBuffer(t)||o.isStream(t)||o.isFile(t)||o.isBlob(t)?t:o.isArrayBufferView(t)?t.buffer:o.isURLSearchParams(t)?(a(n,"application/x-www-form-urlencoded;charset=utf-8"),t.toString()):o.isObject(t)?(a(n,"application/json;charset=utf-8"),JSON.stringify(t)):t}],transformResponse:[function(t){if("string"==typeof t)try{t=JSON.parse(t)}catch(t){}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};o.forEach(["delete","get","head"],function(t){s.headers[t]={}}),o.forEach(["post","put","patch"],function(t){s.headers[t]=o.merge(i)}),t.exports=s}).call(this,e(69))},28:function(t,n,e){"use strict";function o(t){this.message=t}o.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},o.prototype.__CANCEL__=!0,t.exports=o},29:function(t,n,e){"use strict";t.exports=function(t){return!(!t||!t.__CANCEL__)}},30:function(t,n,e){"use strict";var o=e(66);t.exports=function(t,n,e,r,i){var a=new Error(t);return o(a,n,e,r,i)}},31:function(t,n,e){"use strict";var o=e(9),r=e(67),i=e(65),a=e(64),s=e(63),c=e(30),u="undefined"!=typeof window&&window.btoa&&window.btoa.bind(window)||e(62);t.exports=function(t){return new Promise(function(n,f){var l=t.data,d=t.headers;o.isFormData(l)&&delete d["Content-Type"];var p=new XMLHttpRequest,h="onreadystatechange",m=!1;if("undefined"==typeof window||!window.XDomainRequest||"withCredentials"in p||s(t.url)||(p=new window.XDomainRequest,h="onload",m=!0,p.onprogress=function(){},p.ontimeout=function(){}),t.auth){var y=t.auth.username||"",v=t.auth.password||"";d.Authorization="Basic "+u(y+":"+v)}if(p.open(t.method.toUpperCase(),i(t.url,t.params,t.paramsSerializer),!0),p.timeout=t.timeout,p[h]=function(){if(p&&(4===p.readyState||m)&&(0!==p.status||p.responseURL&&0===p.responseURL.indexOf("file:"))){var e="getAllResponseHeaders"in p?a(p.getAllResponseHeaders()):null,o={data:t.responseType&&"text"!==t.responseType?p.response:p.responseText,status:1223===p.status?204:p.status,statusText:1223===p.status?"No Content":p.statusText,headers:e,config:t,request:p};r(n,f,o),p=null}},p.onerror=function(){f(c("Network Error",t,null,p)),p=null},p.ontimeout=function(){f(c("timeout of "+t.timeout+"ms exceeded",t,"ECONNABORTED",p)),p=null},o.isStandardBrowserEnv()){var g=e(61),w=(t.withCredentials||s(t.url))&&t.xsrfCookieName?g.read(t.xsrfCookieName):void 0;w&&(d[t.xsrfHeaderName]=w)}if("setRequestHeader"in p&&o.forEach(d,function(t,n){void 0===l&&"content-type"===n.toLowerCase()?delete d[n]:p.setRequestHeader(n,t)}),t.withCredentials&&(p.withCredentials=!0),t.responseType)try{p.responseType=t.responseType}catch(n){if("json"!==t.responseType)throw n}"function"==typeof t.onDownloadProgress&&p.addEventListener("progress",t.onDownloadProgress),"function"==typeof t.onUploadProgress&&p.upload&&p.upload.addEventListener("progress",t.onUploadProgress),t.cancelToken&&t.cancelToken.promise.then(function(t){p&&(p.abort(),f(t),p=null)}),void 0===l&&(l=null),p.send(l)})}},32:function(t,n,e){"use strict";t.exports=function(t,n){return function(){for(var e=new Array(arguments.length),o=0;o<e.length;o++)e[o]=arguments[o];return t.apply(n,e)}}},370:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.getPageDividerJQ=n.findTargetAnnotation=n.scrollAnnotationIntoView=n.scrollAnnotationDivIntoView=n.addAnnotationRelatedListenerWithin=n.addAnnotationRelatedListener=void 0;var o=e(17),r=e(100);function i(t){return $('     <div class="PageDivider" page="'+t+'" style="height: 9px; border-bottom: 1px solid #eeeeee; margin: 18px 36px; text-align: center;">       <span style="font-size: 14px; background-color: white; padding: 0 30px; font-weight: 400; color: grey;">     Page '+t+"       </span>     </div>   ")}function a(t){var n=$('.AnnotationDiv[annotation_id="{0}"]'.format(t)).attr("page");if(function(t){var n='.AnnotationDiv[annotation_id="{0}"]'.format(t);return $(n)}(t).remove(),$('.Annotation[annotation_id="{0}"]'.format(t)).remove(),$('.AnnotationDiv[page="{0}"]'.format(n)).toArray().length>0){var e=$('.AnnotationDiv[page="{0}"]'.format(n)).first();void 0!=e.find("hr")[0]&&e.children("hr").replaceWith(i(n))}}function s(t){return parseFloat($(t).css("left"))}function c(t){return parseFloat($(t).css("left"))+$(t).width()}function u(t){return parseFloat($(t).css("top"))}function f(t){return parseFloat($(t).css("top"))+$(t).height()}function l(t){var n=$("#file_viewer"),e=t.offset().top-n.offset().top+n.scrollTop()-.38*window.innerHeight+t.height()/2;n.animate({scrollTop:parseInt(e)},240)}function d(t,n,e){var o=n.filter(function(n){return function(t,n,e){var o=n.pageX-e.offset().left,r=n.pageY-e.offset().top;return s(t)<=o&&c(t)>=o&&u(t)<=r&&f(t)>=r}(n,t,e)}),r=o.sort(function(t,n){return c(t)>c(n)});return c(r[1])-c(r[0])<9&&s((r=o.sort(function(t,n){return s(t)<s(n)}))[0])-s(r[1])<9&&f((r=o.sort(function(t,n){return f(t)>f(n)}))[1])-f(r[0])<9&&(r=o.sort(function(t,n){return u(t)<u(n)})),$(r[0])}function p(t){var n=window.location.pathname.split("/")[1];t.find("code").addClass("prettyprint"),PR.prettyPrint(),t.find(".AnnotationBlock").on({mouseover:function(){var t=$(this).attr("annotation_id"),n=$('.Annotation[annotation_id="{0}"]'.format(t));$(this).css("box-shadow","3px 3px 8px rgba(0, 0, 0, .38)"),n.css("box-shadow","3px 3px 8px rgba(0, 0, 0, .38)")},mouseout:function(){var t=$(this).attr("annotation_id"),n=$('.Annotation[annotation_id="{0}"]'.format(t));$(this).css("box-shadow","none"),n.css("box-shadow","none")}}),t.find(".AnnotationDirectButton").on("click",function(t){var n=$(this).parents(".AnnotationDiv").attr("annotation_id");l($('.Annotation[annotation_id="{0}"]'.format(n)))}),t.find(".PostReplyReplyButton").on("click",function(){if(is_authenticated){var t=!this.classList.contains("AnonymouslyPostReplyReplyButton"),n=$(this),e=layer.load(1,{shade:.18});$.post({url:"",data:{csrfmiddlewaretoken:(0,o.getCookie)("csrftoken"),operation:"reply_annotation",annotation_reply_content:n.parents("form").find('textarea[name="reply_reply_content"]').val(),reply_to_annotation_id:n.parents(".AnnotationBlock").find(".PostAnnotationReplyButton").val(),reply_to_annotation_reply_id:n.val(),document_id:$('button[name="document_id"]').val(),is_public:t},success:function(t){var o=$(t);$('.AnnotationBlock[annotation_id="{0}"]'.format(n.parents(".AnnotationBlock").find(".PostAnnotationReplyButton").val())).append(o),$(".ReplyAnnotationButton").parents("footer").children("form").css("display","none"),tinyMCE.activeEditor.setContent(""),p(o),(0,r.tinymceInit)(),layer.close(e)}})}else layer.msg('You need to <a href="/sign-in" style="color: #ECECEC; text-decoration: underline">log in</a> first')}),t.find(".DeleteAnnotationReplyButton").on("click",function(){var t=layer.load(1,{shade:.18}),n=this.value;$.post({url:"",data:{csrfmiddlewaretoken:(0,o.getCookie)("csrftoken"),operation:"delete_annotation_reply",reply_id:n,document_id:$('button[name="document_id"]').val()},success:function(e){!function(t){for(var n=$('.annotation-reply-block[annotation_reply_id="{0}"]'.format(t)).toArray();n.length>0;){var e=$(n.shift()),o=e.attr("annotation_reply_id");n=n.concat($('.annotation-reply-block[reply_to_annotation_reply="{0}"]'.format(o)).toArray()),e.remove()}}(n),layer.close(t)}})}),t.find(".PostAnnotationReplyButton").on("click",function(){if(is_authenticated){var t=!this.classList.contains("AnonymouslyPostAnnotationReplyButton"),n=$(this),e=layer.load(1,{shade:.18});$.post({url:"",data:{csrfmiddlewaretoken:(0,o.getCookie)("csrftoken"),operation:"reply_annotation",annotation_reply_content:n.parent("form").find('textarea[name="annotation_reply_content"]').val(),reply_to_annotation_id:n.val(),document_id:$('button[name="document_id"]').val(),is_public:t},success:function(t){var o=$(t);$('.AnnotationBlock[annotation_id="{0}"]'.format(n.val())).append(o),$(".ReplyAnnotationButton").parents("footer").children("form").css("display","none"),tinyMCE.activeEditor.setContent(""),p(o),(0,r.tinymceInit)(),layer.close(e)}})}else layer.msg('You need to <a href="/sign-in" style="color: #ECECEC; text-decoration: underline">log in</a> first')}),t.find(".delete-annotation-btn").on("click",function(){var t=layer.load(1,{shade:.18}),n=this.value;$.post({url:"",data:{csrfmiddlewaretoken:(0,o.getCookie)("csrftoken"),operation:"delete_annotation",annotation_id:this.value},success:function(){a(n),layer.close(t)}})}),t.find(".share-annotation-btn").on("click",function(){var t=$(this).parents(".AnnotationDiv").attr("annotation_uuid"),n=[location.protocol,"//",location.host,location.pathname].join("")+"?annotation="+t;layer.confirm('<span style="color: #37b">'+n+"<span>",{title:!1,skin:"layui-layer-molv",btn:["copy URL"],closeBtn:0,shade:.18,shadeClose:!0},function(){(0,o.copyToClipboard)(n),layer.msg("URL copied",{time:1228})})}),t.find(".like-annotation-btn").on("click",function(){if(is_authenticated){var t=$(this),n=parseInt(t.find(".num_like").text())+1;t.find(".num_like").text(n.toString()),t.off("click"),t.css("color","#6495ED"),t.on("click",function(){layer.msg("already liked",{icon:6,time:666})}),$.post({url:"",data:{csrfmiddlewaretoken:(0,o.getCookie)("csrftoken"),operation:"like_annotation",annotation_id:t.attr("annotation_id")}})}else layer.msg('You need to <a href="/sign-in" style="color: #ECECEC; text-decoration: underline">log in</a> first')}),t.find(".like-annotation-reply-btn").on("click",function(){if(is_authenticated){var t=$(this),n=parseInt(t.find(".num_like").text())+1;t.find(".num_like").text(n.toString()),t.off("click"),t.css("color","#6495ED"),t.on("click",function(){layer.msg("already liked",{icon:6,time:666})}),$.post({url:"",data:{csrfmiddlewaretoken:(0,o.getCookie)("csrftoken"),operation:"like_annotation_reply",annotation_reply_id:t.attr("annotation_reply_id")}})}else layer.msg('You need to <a href="/sign-in" style="color: #ECECEC; text-decoration: underline">log in</a> first')}),t.find(".ReplyAnnotationButton").on("click",function(){var t="none"===!$(this).css("display");$(this).parents("footer").children("form").slideToggle({duration:180,start:function(){t||$(".ReplyAnnotationButton").parents("footer").children("form").not($(this)).slideUp(180).css("display","none"),tinyMCE.get($(this).find("textarea").attr("id")).focus()}})}),t.find(".EditFormToggleButton").on("click",function(){var t=$(this);t.parents(".AnnotationDiv").find(".AnnotationBlock").css("display","none"),t.parents(".AnnotationDiv").find(".AnnotationEditForm").fadeIn(666);var e=tinyMCE.get($(this).parents(".AnnotationDiv").find(".AnnotationEditForm").find("textarea").attr("id"));$.get({url:"/"+n+"/api/annotations/"+t.attr("annotation_id")+"/content",data:{csrfmiddlewaretoken:(0,o.getCookie)("csrftoken")},success:function(t){e.setContent(t),e.focus()}})}),t.find(".annotation-reply-edit-form-toggle-btn").on("click",function(){var t=$(this);t.parents(".annotation-reply-div").find(".annotation-reply-block").css("display","none"),t.parents(".annotation-reply-div").find(".annotation-reply-edit-form").fadeIn(666);var e=tinyMCE.get($(this).parents(".annotation-reply-div").find(".annotation-reply-edit-form").find("textarea").attr("id"));$.get({url:"/"+n+"/api/annotationreplies/"+t.attr("annotation_reply_id")+"/content",data:{csrfmiddlewaretoken:(0,o.getCookie)("csrftoken")},success:function(t){e.setContent(t),e.focus()}})}),t.find(".cancel-annotation-edit-btn").on("click",function(){var t=$(this).parents(".AnnotationDiv");t.find(".AnnotationBlock").css("display","block"),t.find(".AnnotationEditForm").css("display","none"),tinyMCE.get(t.find(".AnnotationEditForm").find("textarea").attr("id")).setContent("")}),t.find(".cancel-annotation-reply-edit-btn").on("click",function(){var t=$(this);t.parents(".annotation-reply-div").find(".annotation-reply-block").css("display","block"),t.parents(".annotation-reply-div").find(".annotation-reply-edit-form").css("display","none"),tinyMCE.get($(this).parents(".annotation-reply-div").find(".annotation-reply-edit-form").find("textarea").attr("id")).setContent("")}),t.find(".PostAnnotationEditButton").on("click",function(){var t=$(this),e=tinyMCE.get($(this).parents(".AnnotationDiv").find(".AnnotationEditForm").find("textarea").attr("id")),i=t.parents(".AnnotationEditForm").find('textarea[name="annotation_edit_content"]').val();$.post({url:"/"+n+"/api/annotations/"+t.attr("annotation_id")+"/edit",data:{csrfmiddlewaretoken:(0,o.getCookie)("csrftoken"),new_content:i},success:function(){var n=t.parents(".AnnotationDiv");n.find(".annotation-content").html(i),n.find(".annotation-time-span").text("edited"),n.find(".AnnotationEditForm").css("display","none"),n.find(".AnnotationBlock").fadeIn(666),n.find(".AnnotationBlock").css("display","block"),e.setContent(""),(0,o.renderMathJax)(),(0,r.tinymceInit)()}})}),t.find(".PostAnnotationReplyEditButton").on("click",function(){var t=$(this),e=tinyMCE.get($(this).parents(".annotation-reply-div").find(".annotation-reply-edit-form").find("textarea").attr("id")),i=t.parents(".annotation-reply-edit-form").find('textarea[name="annotation_reply_edit_content"]').val();$.post({url:"/"+n+"/api/annotationreplies/"+t.attr("annotation_reply_id")+"/edit",data:{csrfmiddlewaretoken:(0,o.getCookie)("csrftoken"),new_content:i},success:function(){var n=t.parents(".annotation-reply-div");n.find(".annotation-reply-content").html(i),n.find(".annotation-reply-time-span").text("edited"),n.find(".annotation-reply-edit-form").css("display","none"),n.find(".annotation-reply-block").fadeIn(666),n.find(".annotation-reply-block").css("display","block"),e.setContent(""),(0,o.renderMathJax)(),(0,r.tinymceInit)()}})}),t.find(".Annotation").addBack(".Annotation").on("mouseover",function(){var n=$(this).parent(".page_div").children(".PageCanvas"),e=$(this).parent(".page_div").find(".Annotation").toArray(),o=void 0;t.find(".Annotation").addBack(".Annotation").on("mousemove",function(t){if(0==t.which){var r=d(t,e,n);r!=o&&(void 0!=o&&(o.css("box-shadow","none"),$('.AnnotationBlock[annotation_id="{0}"]'.format($(o).attr("annotation_id"))).css("box-shadow","none")),r.css("box-shadow","3px 3px 8px rgba(0, 0, 0, .38)"),$('.AnnotationBlock[annotation_id="{0}"]'.format($(r).attr("annotation_id"))).css("box-shadow","3px 3px 8px rgba(0, 0, 0, .38)"),o=r)}else{var i=!0,a=!1,s=void 0;try{for(var c,u=e[Symbol.iterator]();!(i=(c=u.next()).done);i=!0){var f=c.value;$(f).css("box-shadow","none"),$('.AnnotationBlock[annotation_id="{0}"]'.format($(f).attr("annotation_id"))).css("box-shadow","none")}}catch(t){a=!0,s=t}finally{try{!i&&u.return&&u.return()}finally{if(a)throw s}}}})}),t.find(".Annotation").addBack(".Annotation").on("mouseout",function(t){if(0==t.which){var n=$(this).parent(".page_div").find(".Annotation").toArray(),e=!0,o=!1,r=void 0;try{for(var i,a=n[Symbol.iterator]();!(e=(i=a.next()).done);e=!0){var s=i.value;$(s).css("box-shadow","none"),$('.AnnotationBlock[annotation_id="{0}"]'.format($(s).attr("annotation_id"))).css("box-shadow","none"),$(s).off("mousemove")}}catch(t){o=!0,r=t}finally{try{!e&&a.return&&a.return()}finally{if(o)throw r}}}}),(0,o.renderMathJax)()}n.addAnnotationRelatedListener=function(){p($(document))},n.addAnnotationRelatedListenerWithin=p,n.scrollAnnotationDivIntoView=function(t){var n=$("#annotation-update-div"),e=t.offset().top-n.offset().top+n.scrollTop();n.animate({scrollTop:parseInt(e)},240)},n.scrollAnnotationIntoView=l,n.findTargetAnnotation=d,n.getPageDividerJQ=i},54:function(t,n,e){"use strict";t.exports=function(t){return function(n){return t.apply(null,n)}}},55:function(t,n,e){"use strict";var o=e(28);function r(t){if("function"!=typeof t)throw new TypeError("executor must be a function.");var n;this.promise=new Promise(function(t){n=t});var e=this;t(function(t){e.reason||(e.reason=new o(t),n(e.reason))})}r.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},r.source=function(){var t;return{token:new r(function(n){t=n}),cancel:t}},t.exports=r},56:function(t,n,e){"use strict";t.exports=function(t,n){return n?t.replace(/\/+$/,"")+"/"+n.replace(/^\/+/,""):t}},57:function(t,n,e){"use strict";t.exports=function(t){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(t)}},58:function(t,n,e){"use strict";var o=e(9);t.exports=function(t,n,e){return o.forEach(e,function(e){t=e(t,n)}),t}},59:function(t,n,e){"use strict";var o=e(9),r=e(58),i=e(29),a=e(22);function s(t){t.cancelToken&&t.cancelToken.throwIfRequested()}t.exports=function(t){return s(t),t.headers=t.headers||{},t.data=r(t.data,t.headers,t.transformRequest),t.headers=o.merge(t.headers.common||{},t.headers[t.method]||{},t.headers||{}),o.forEach(["delete","get","head","post","put","patch","common"],function(n){delete t.headers[n]}),(t.adapter||a.adapter)(t).then(function(n){return s(t),n.data=r(n.data,n.headers,t.transformResponse),n},function(n){return i(n)||(s(t),n&&n.response&&(n.response.data=r(n.response.data,n.response.headers,t.transformResponse))),Promise.reject(n)})}},60:function(t,n,e){"use strict";var o=e(9);function r(){this.handlers=[]}r.prototype.use=function(t,n){return this.handlers.push({fulfilled:t,rejected:n}),this.handlers.length-1},r.prototype.eject=function(t){this.handlers[t]&&(this.handlers[t]=null)},r.prototype.forEach=function(t){o.forEach(this.handlers,function(n){null!==n&&t(n)})},t.exports=r},61:function(t,n,e){"use strict";var o=e(9);t.exports=o.isStandardBrowserEnv()?{write:function(t,n,e,r,i,a){var s=[];s.push(t+"="+encodeURIComponent(n)),o.isNumber(e)&&s.push("expires="+new Date(e).toGMTString()),o.isString(r)&&s.push("path="+r),o.isString(i)&&s.push("domain="+i),!0===a&&s.push("secure"),document.cookie=s.join("; ")},read:function(t){var n=document.cookie.match(new RegExp("(^|;\\s*)("+t+")=([^;]*)"));return n?decodeURIComponent(n[3]):null},remove:function(t){this.write(t,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},62:function(t,n,e){"use strict";var o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";function r(){this.message="String contains an invalid character"}r.prototype=new Error,r.prototype.code=5,r.prototype.name="InvalidCharacterError",t.exports=function(t){for(var n,e,i=String(t),a="",s=0,c=o;i.charAt(0|s)||(c="=",s%1);a+=c.charAt(63&n>>8-s%1*8)){if((e=i.charCodeAt(s+=.75))>255)throw new r;n=n<<8|e}return a}},63:function(t,n,e){"use strict";var o=e(9);t.exports=o.isStandardBrowserEnv()?function(){var t,n=/(msie|trident)/i.test(navigator.userAgent),e=document.createElement("a");function r(t){var o=t;return n&&(e.setAttribute("href",o),o=e.href),e.setAttribute("href",o),{href:e.href,protocol:e.protocol?e.protocol.replace(/:$/,""):"",host:e.host,search:e.search?e.search.replace(/^\?/,""):"",hash:e.hash?e.hash.replace(/^#/,""):"",hostname:e.hostname,port:e.port,pathname:"/"===e.pathname.charAt(0)?e.pathname:"/"+e.pathname}}return t=r(window.location.href),function(n){var e=o.isString(n)?r(n):n;return e.protocol===t.protocol&&e.host===t.host}}():function(){return!0}},64:function(t,n,e){"use strict";var o=e(9);t.exports=function(t){var n,e,r,i={};return t?(o.forEach(t.split("\n"),function(t){r=t.indexOf(":"),n=o.trim(t.substr(0,r)).toLowerCase(),e=o.trim(t.substr(r+1)),n&&(i[n]=i[n]?i[n]+", "+e:e)}),i):i}},65:function(t,n,e){"use strict";var o=e(9);function r(t){return encodeURIComponent(t).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}t.exports=function(t,n,e){if(!n)return t;var i;if(e)i=e(n);else if(o.isURLSearchParams(n))i=n.toString();else{var a=[];o.forEach(n,function(t,n){null!==t&&void 0!==t&&(o.isArray(t)&&(n+="[]"),o.isArray(t)||(t=[t]),o.forEach(t,function(t){o.isDate(t)?t=t.toISOString():o.isObject(t)&&(t=JSON.stringify(t)),a.push(r(n)+"="+r(t))}))}),i=a.join("&")}return i&&(t+=(-1===t.indexOf("?")?"?":"&")+i),t}},66:function(t,n,e){"use strict";t.exports=function(t,n,e,o,r){return t.config=n,e&&(t.code=e),t.request=o,t.response=r,t}},67:function(t,n,e){"use strict";var o=e(30);t.exports=function(t,n,e){var r=e.config.validateStatus;e.status&&r&&!r(e.status)?n(o("Request failed with status code "+e.status,e.config,null,e.request,e)):t(e)}},68:function(t,n,e){"use strict";var o=e(9);t.exports=function(t,n){o.forEach(t,function(e,o){o!==n&&o.toUpperCase()===n.toUpperCase()&&(t[n]=e,delete t[o])})}},69:function(t,n){var e,o,r=t.exports={};function i(){throw new Error("setTimeout has not been defined")}function a(){throw new Error("clearTimeout has not been defined")}function s(t){if(e===setTimeout)return setTimeout(t,0);if((e===i||!e)&&setTimeout)return e=setTimeout,setTimeout(t,0);try{return e(t,0)}catch(n){try{return e.call(null,t,0)}catch(n){return e.call(this,t,0)}}}!function(){try{e="function"==typeof setTimeout?setTimeout:i}catch(t){e=i}try{o="function"==typeof clearTimeout?clearTimeout:a}catch(t){o=a}}();var c,u=[],f=!1,l=-1;function d(){f&&c&&(f=!1,c.length?u=c.concat(u):l=-1,u.length&&p())}function p(){if(!f){var t=s(d);f=!0;for(var n=u.length;n;){for(c=u,u=[];++l<n;)c&&c[l].run();l=-1,n=u.length}c=null,f=!1,function(t){if(o===clearTimeout)return clearTimeout(t);if((o===a||!o)&&clearTimeout)return o=clearTimeout,clearTimeout(t);try{o(t)}catch(n){try{return o.call(null,t)}catch(n){return o.call(this,t)}}}(t)}}function h(t,n){this.fun=t,this.array=n}function m(){}r.nextTick=function(t){var n=new Array(arguments.length-1);if(arguments.length>1)for(var e=1;e<arguments.length;e++)n[e-1]=arguments[e];u.push(new h(t,n)),1!==u.length||f||s(p)},h.prototype.run=function(){this.fun.apply(null,this.array)},r.title="browser",r.browser=!0,r.env={},r.argv=[],r.version="",r.versions={},r.on=m,r.addListener=m,r.once=m,r.off=m,r.removeListener=m,r.removeAllListeners=m,r.emit=m,r.prependListener=m,r.prependOnceListener=m,r.listeners=function(t){return[]},r.binding=function(t){throw new Error("process.binding is not supported")},r.cwd=function(){return"/"},r.chdir=function(t){throw new Error("process.chdir is not supported")},r.umask=function(){return 0}},70:function(t,n,e){"use strict";var o=e(22),r=e(9),i=e(60),a=e(59),s=e(57),c=e(56);function u(t){this.defaults=t,this.interceptors={request:new i,response:new i}}u.prototype.request=function(t){"string"==typeof t&&(t=r.merge({url:arguments[0]},arguments[1])),(t=r.merge(o,this.defaults,{method:"get"},t)).method=t.method.toLowerCase(),t.baseURL&&!s(t.url)&&(t.url=c(t.baseURL,t.url));var n=[a,void 0],e=Promise.resolve(t);for(this.interceptors.request.forEach(function(t){n.unshift(t.fulfilled,t.rejected)}),this.interceptors.response.forEach(function(t){n.push(t.fulfilled,t.rejected)});n.length;)e=e.then(n.shift(),n.shift());return e},r.forEach(["delete","get","head","options"],function(t){u.prototype[t]=function(n,e){return this.request(r.merge(e||{},{method:t,url:n}))}}),r.forEach(["post","put","patch"],function(t){u.prototype[t]=function(n,e,o){return this.request(r.merge(o||{},{method:t,url:n,data:e}))}}),t.exports=u},71:function(t,n){function e(t){return!!t.constructor&&"function"==typeof t.constructor.isBuffer&&t.constructor.isBuffer(t)}
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
t.exports=function(t){return null!=t&&(e(t)||function(t){return"function"==typeof t.readFloatLE&&"function"==typeof t.slice&&e(t.slice(0,0))}(t)||!!t._isBuffer)}},72:function(t,n,e){"use strict";var o=e(9),r=e(32),i=e(70),a=e(22);function s(t){var n=new i(t),e=r(i.prototype.request,n);return o.extend(e,i.prototype,n),o.extend(e,n),e}var c=s(a);c.Axios=i,c.create=function(t){return s(o.merge(a,t))},c.Cancel=e(28),c.CancelToken=e(55),c.isCancel=e(29),c.all=function(t){return Promise.all(t)},c.spread=e(54),t.exports=c,t.exports.default=c},9:function(t,n,e){"use strict";var o=e(32),r=e(71),i=Object.prototype.toString;function a(t){return"[object Array]"===i.call(t)}function s(t){return null!==t&&"object"==typeof t}function c(t){return"[object Function]"===i.call(t)}function u(t,n){if(null!==t&&void 0!==t)if("object"==typeof t||a(t)||(t=[t]),a(t))for(var e=0,o=t.length;e<o;e++)n.call(null,t[e],e,t);else for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&n.call(null,t[r],r,t)}t.exports={isArray:a,isArrayBuffer:function(t){return"[object ArrayBuffer]"===i.call(t)},isBuffer:r,isFormData:function(t){return"undefined"!=typeof FormData&&t instanceof FormData},isArrayBufferView:function(t){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(t):t&&t.buffer&&t.buffer instanceof ArrayBuffer},isString:function(t){return"string"==typeof t},isNumber:function(t){return"number"==typeof t},isObject:s,isUndefined:function(t){return void 0===t},isDate:function(t){return"[object Date]"===i.call(t)},isFile:function(t){return"[object File]"===i.call(t)},isBlob:function(t){return"[object Blob]"===i.call(t)},isFunction:c,isStream:function(t){return s(t)&&c(t.pipe)},isURLSearchParams:function(t){return"undefined"!=typeof URLSearchParams&&t instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:u,merge:function t(){var n={};function e(e,o){"object"==typeof n[o]&&"object"==typeof e?n[o]=t(n[o],e):n[o]=e}for(var o=0,r=arguments.length;o<r;o++)u(arguments[o],e);return n},extend:function(t,n,e){return u(n,function(n,r){t[r]=e&&"function"==typeof n?o(n,e):n}),t},trim:function(t){return t.replace(/^\s*/,"").replace(/\s*$/,"")}}}});