!function(t){var n={};function e(o){if(n[o])return n[o].exports;var a=n[o]={i:o,l:!1,exports:{}};return t[o].call(a.exports,a,a.exports,e),a.l=!0,a.exports}e.m=t,e.c=n,e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:o})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(e.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var a in t)e.d(o,a,function(n){return t[n]}.bind(null,a));return o},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=638)}({10:function(t,n,e){"use strict";var o=e(33),a=e(70),i=Object.prototype.toString;function r(t){return"[object Array]"===i.call(t)}function s(t){return null!==t&&"object"==typeof t}function c(t){return"[object Function]"===i.call(t)}function u(t,n){if(null!==t&&void 0!==t)if("object"==typeof t||r(t)||(t=[t]),r(t))for(var e=0,o=t.length;e<o;e++)n.call(null,t[e],e,t);else for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&n.call(null,t[a],a,t)}t.exports={isArray:r,isArrayBuffer:function(t){return"[object ArrayBuffer]"===i.call(t)},isBuffer:a,isFormData:function(t){return"undefined"!=typeof FormData&&t instanceof FormData},isArrayBufferView:function(t){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(t):t&&t.buffer&&t.buffer instanceof ArrayBuffer},isString:function(t){return"string"==typeof t},isNumber:function(t){return"number"==typeof t},isObject:s,isUndefined:function(t){return void 0===t},isDate:function(t){return"[object Date]"===i.call(t)},isFile:function(t){return"[object File]"===i.call(t)},isBlob:function(t){return"[object Blob]"===i.call(t)},isFunction:c,isStream:function(t){return s(t)&&c(t.pipe)},isURLSearchParams:function(t){return"undefined"!=typeof URLSearchParams&&t instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:u,merge:function t(){var n={};function e(e,o){"object"==typeof n[o]&&"object"==typeof e?n[o]=t(n[o],e):n[o]=e}for(var o=0,a=arguments.length;o<a;o++)u(arguments[o],e);return n},extend:function(t,n,e){return u(n,function(n,a){t[a]=e&&"function"==typeof n?o(n,e):n}),t},trim:function(t){return t.replace(/^\s*/,"").replace(/\s*$/,"")}}},18:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.getCookie=function(t){var n=null;if(document.cookie&&""!=document.cookie)for(var e=document.cookie.split(";"),o=0;o<e.length;o++){var a=e[o].trim();if(a.substring(0,t.length+1)==t+"="){n=decodeURIComponent(a.substring(t.length+1));break}}return n},n.getUrlFormat=function(t,n){var e=t+"?";for(var o in n)e=e+o+"="+n[o]+"&";return e},n.imgLoad=function(t,n){var e=setInterval(function(){t.complete&&(n(t),clearInterval(e))},8)},n.hexToRgb=function(t){t=t.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(t,n,e,o){return n+n+e+e+o+o});var n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return n?{r:parseInt(n[1],16),g:parseInt(n[2],16),b:parseInt(n[3],16)}:null},n.formatOpenCoterieDocumentUrl=function(t,n){return"/coteries/"+n+"/documents/"+t.slug+"/"+t.title.replace(/\s/g,"-")},n.formatOpenDocumentUrl=function(t){return"/documents/"+t.slug+"/"+t.title.replace(/\s/g,"-")},n.getValFromUrlParam=function(t){return new URL(window.location.href).searchParams.get(t)}},22:function(t,n,e){"use strict";(function(n){var o=e(10),a=e(67),i={"Content-Type":"application/x-www-form-urlencoded"};function r(t,n){!o.isUndefined(t)&&o.isUndefined(t["Content-Type"])&&(t["Content-Type"]=n)}var s={adapter:function(){var t;return"undefined"!=typeof XMLHttpRequest?t=e(32):void 0!==n&&(t=e(32)),t}(),transformRequest:[function(t,n){return a(n,"Content-Type"),o.isFormData(t)||o.isArrayBuffer(t)||o.isBuffer(t)||o.isStream(t)||o.isFile(t)||o.isBlob(t)?t:o.isArrayBufferView(t)?t.buffer:o.isURLSearchParams(t)?(r(n,"application/x-www-form-urlencoded;charset=utf-8"),t.toString()):o.isObject(t)?(r(n,"application/json;charset=utf-8"),JSON.stringify(t)):t}],transformResponse:[function(t){if("string"==typeof t)try{t=JSON.parse(t)}catch(t){}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};o.forEach(["delete","get","head"],function(t){s.headers[t]={}}),o.forEach(["post","put","patch"],function(t){s.headers[t]=o.merge(i)}),t.exports=s}).call(this,e(68))},23:function(t,n,e){t.exports=e(71)},29:function(t,n,e){"use strict";function o(t){this.message=t}o.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},o.prototype.__CANCEL__=!0,t.exports=o},30:function(t,n,e){"use strict";t.exports=function(t){return!(!t||!t.__CANCEL__)}},31:function(t,n,e){"use strict";var o=e(65);t.exports=function(t,n,e,a,i){var r=new Error(t);return o(r,n,e,a,i)}},32:function(t,n,e){"use strict";var o=e(10),a=e(66),i=e(64),r=e(63),s=e(62),c=e(31),u="undefined"!=typeof window&&window.btoa&&window.btoa.bind(window)||e(61);t.exports=function(t){return new Promise(function(n,l){var f=t.data,d=t.headers;o.isFormData(f)&&delete d["Content-Type"];var p=new XMLHttpRequest,h="onreadystatechange",m=!1;if("undefined"==typeof window||!window.XDomainRequest||"withCredentials"in p||s(t.url)||(p=new window.XDomainRequest,h="onload",m=!0,p.onprogress=function(){},p.ontimeout=function(){}),t.auth){var g=t.auth.username||"",v=t.auth.password||"";d.Authorization="Basic "+u(g+":"+v)}if(p.open(t.method.toUpperCase(),i(t.url,t.params,t.paramsSerializer),!0),p.timeout=t.timeout,p[h]=function(){if(p&&(4===p.readyState||m)&&(0!==p.status||p.responseURL&&0===p.responseURL.indexOf("file:"))){var e="getAllResponseHeaders"in p?r(p.getAllResponseHeaders()):null,o={data:t.responseType&&"text"!==t.responseType?p.response:p.responseText,status:1223===p.status?204:p.status,statusText:1223===p.status?"No Content":p.statusText,headers:e,config:t,request:p};a(n,l,o),p=null}},p.onerror=function(){l(c("Network Error",t,null,p)),p=null},p.ontimeout=function(){l(c("timeout of "+t.timeout+"ms exceeded",t,"ECONNABORTED",p)),p=null},o.isStandardBrowserEnv()){var y=e(60),_=(t.withCredentials||s(t.url))&&t.xsrfCookieName?y.read(t.xsrfCookieName):void 0;_&&(d[t.xsrfHeaderName]=_)}if("setRequestHeader"in p&&o.forEach(d,function(t,n){void 0===f&&"content-type"===n.toLowerCase()?delete d[n]:p.setRequestHeader(n,t)}),t.withCredentials&&(p.withCredentials=!0),t.responseType)try{p.responseType=t.responseType}catch(n){if("json"!==t.responseType)throw n}"function"==typeof t.onDownloadProgress&&p.addEventListener("progress",t.onDownloadProgress),"function"==typeof t.onUploadProgress&&p.upload&&p.upload.addEventListener("progress",t.onUploadProgress),t.cancelToken&&t.cancelToken.promise.then(function(t){p&&(p.abort(),l(t),p=null)}),void 0===f&&(f=null),p.send(f)})}},33:function(t,n,e){"use strict";t.exports=function(t,n){return function(){for(var e=new Array(arguments.length),o=0;o<e.length;o++)e[o]=arguments[o];return t.apply(n,e)}}},476:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.prepareNavbarFunction=void 0;var o=e(18);n.prepareNavbarFunction=function(){$("#collect_button").on("click",function(){var t=$(this).find(".fa");t.hasClass("fa-star-o")?(layer.msg("Collected"),t.removeClass("fa-star-o"),t.addClass("fa-star"),$.ajax({type:"POST",url:"",data:{csrfmiddlewaretoken:(0,o.getCookie)("csrftoken"),operation:"collect",document_id:$("button[name='document_id']").val()}})):t.hasClass("fa-star")&&(layer.msg("Uncollected"),t.removeClass("fa-star"),t.addClass("fa-star-o"),$.ajax({type:"POST",url:"",data:{csrfmiddlewaretoken:(0,o.getCookie)("csrftoken"),operation:"uncollect",document_id:$("button[name='document_id']").val()}}))}),$("#show_annotation_frame_button").on("click",function(){$(".Annotation").each(function(){$(this).slideDown(180)})}),$("#hide_annotation_frame_button").on("click",function(){$(".Annotation").each(function(){$(this).slideUp(180)})}),$("#instruction_button").on("click",function(){layer.photos({photos:{data:[{src:"/media/images/gif/how_to_create_annotation.gif",alt:"How to create an annotation"}]},shift:5,tab:function(t,n){$(".layui-layer-imgsee").find("em").remove()}})})}},477:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.enablePostCommentButton=n.enableRefreshCommentButton=n.addCommentRelatedListener=void 0;var o=e(18),a=e(92);function i(){(0,a.tinymceInit)(),$("code").addClass("prettyprint"),PR.prettyPrint(),$(".likeCommentButton").on("click",function(){if(is_authenticated){var t=$(this),n=parseInt(t.next().text())+1;t.next().text(n.toString()),t.off("click"),t.css("color","#6495ED"),t.on("click",function(){layer.msg("already liked",{icon:6,time:800})}),$.ajax({type:"POST",url:"",data:{csrfmiddlewaretoken:(0,o.getCookie)("csrftoken"),operation:"like_comment",comment_id:t.attr("comment_id")}})}else layer.msg('<span style="color: #ECECEC">You need to <a href="/sign-in" style="color: #ECECEC; text-decoration: underline">log in</a> first</span>')}),$(".delete_comment_button").on("click",function(){if(is_authenticated){var t=layer.load(0,{shade:.18}),n=this.value;$.ajax({type:"POST",url:"",data:{csrfmiddlewaretoken:(0,o.getCookie)("csrftoken"),operation:"delete_comment",comment_id:n,document_id:$("button[name='document_id']").val()},success:function(e){!function(t){for(var n=$(".CommentBlock[comment_id='"+t+"']").toArray();n.length>0;){var e=$(n.shift()),o=e.attr("comment_id");n=n.concat($(".CommentBlock[reply_to_comment_id='"+o+"']").toArray()),e.remove()}}(n),layer.close(t)}})}}),$(".reply_comment_button").on("click",function(){$(this).parents("blockquote").find(".reply_comment_form").slideToggle({duration:180,start:function(){$(this).is(":hidden")||$(".reply_comment_form").not($(this)).slideUp(180)}})}),$(".post_comment_reply_button").on("click",function(){if(is_authenticated){var t=!this.classList.contains("anonymously_post_comment_reply_button"),n=$(this),e=layer.load(0,{shade:.18});$.ajax({type:"POST",url:"",data:{csrfmiddlewaretoken:(0,o.getCookie)("csrftoken"),operation:"comment",comment_content:n.parents("form").find('textarea[name="comment_content"]').val(),document_id:$('button[name="document_id"]').val(),reply_to_comment_id:n.val(),is_public:t},success:function(t){$("#comment_update_div").html(t),i(),layer.close(e)}})}else layer.msg('<span style="color: #ECECEC">You need to <a href="/sign-in" style="color: #ECECEC; text-decoration: underline">log in</a> first</span>')})}n.addCommentRelatedListener=i,n.enableRefreshCommentButton=function(){$("#refresh_comment_button").on("click",function(){$.ajax({type:"POST",url:"",data:{csrfmiddlewaretoken:(0,o.getCookie)("csrftoken"),operation:"refresh",document_id:$("button[name='document_id']").val()},success:function(t){$("#comment_update_div").html(t),i()}})})},n.enablePostCommentButton=function(){$(".post_comment_button").on("click",function(){if(is_authenticated){var t=!this.classList.contains("anonymously_post_comment_button"),n=layer.load(0,{shade:.18}),e=tinyMCE.activeEditor;$.ajax({type:"POST",url:"",data:{csrfmiddlewaretoken:(0,o.getCookie)("csrftoken"),operation:"comment",comment_content:$("textarea[name='comment_content']").val(),document_id:$("button[name='document_id']").val(),is_public:t},success:function(t){$("#comment_update_div").html(t),i(),e.setContent(""),layer.close(n)}})}else layer.msg('<span style="color: #ECECEC">You need to <a href="/sign-in" style="color: #ECECEC; text-decoration: underline">log in</a> first</span>')}),window.hasOwnProperty("MathJax")&&MathJax.Hub.Queue(["Typeset",MathJax.Hub])}},478:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.findTargetAnnotation=n.scrollAnnotationIntoView=n.scrollAnnotationDivIntoView=n.addAnnotationRelatedListenerWithin=n.addAnnotationRelatedListener=void 0;var o=e(18),a=e(92);function i(t){(function(t){return $(".AnnotationDiv[annotation_id='"+t+"']")})(t).remove(),$(".Annotation[annotation_id='"+t+"']").remove()}function r(t){return parseFloat($(t).css("left"))}function s(t){return parseFloat($(t).css("left"))+$(t).width()}function c(t){return parseFloat($(t).css("top"))}function u(t){return parseFloat($(t).css("top"))+$(t).height()}function l(t){var n=$("#file_viewer"),e=t.offset().top-n.offset().top+n.scrollTop()-.38*window.innerHeight+t.height()/2;n.animate({scrollTop:parseInt(e)},240)}function f(t,n,e){var o=n.filter(function(n){return function(t,n,e){var o=n.pageX-e.offset().left,a=n.pageY-e.offset().top;return r(t)<=o&&s(t)>=o&&c(t)<=a&&u(t)>=a}(n,t,e)}),a=o.sort(function(t,n){return s(t)>s(n)});return s(a[1])-s(a[0])<9&&r((a=o.sort(function(t,n){return r(t)<r(n)}))[0])-r(a[1])<9&&u((a=o.sort(function(t,n){return u(t)>u(n)}))[1])-u(a[0])<9&&(a=o.sort(function(t,n){return c(t)<c(n)})),$(a[0])}function d(t){t.find("code").addClass("prettyprint"),PR.prettyPrint(),t.find(".AnnotationBlock").on("mouseover",function(){var t=$(this).attr("annotation_id"),n=$(".Annotation[annotation_id='"+t+"']");$(this).css("box-shadow","3px 3px 8px rgba(0, 0, 0, .38)"),n.css("box-shadow","3px 3px 8px rgba(0, 0, 0, .38)")}),t.find(".AnnotationBlock").on("mouseout",function(){var t=$(this).attr("annotation_id"),n=$(".Annotation[annotation_id='"+t+"']");$(this).css("box-shadow","none"),n.css("box-shadow","none")}),t.find(".AnnotationDirectButton").on("click",function(t){var n=$(this).parents(".AnnotationDiv").attr("annotation_id");l($(".Annotation[annotation_id='"+n+"']"))}),t.find(".PostReplyReplyButton").on("click",function(){if(is_authenticated){var t=!this.classList.contains("AnonymouslyPostReplyReplyButton"),n=$(this),e=layer.load(1,{shade:.18});$.ajax({type:"POST",url:"",data:{csrfmiddlewaretoken:(0,o.getCookie)("csrftoken"),operation:"reply_annotation",annotation_reply_content:n.parents("form").find("textarea[name='reply_reply_content']").val(),reply_to_annotation_id:n.parents(".AnnotationBlock").find(".PostAnnotationReplyButton").val(),reply_to_annotation_reply_id:n.val(),document_id:$("button[name='document_id']").val(),is_public:t},success:function(t){var o=$(t);$(".AnnotationBlock[annotation_id='"+n.parents(".AnnotationBlock").find(".PostAnnotationReplyButton").val(),NaN).append(o),$(".ReplyAnnotationButton").parents("footer").children("form").css("display","none"),tinyMCE.activeEditor.setContent(""),d(o),(0,a.tinymceInit)(),layer.close(e)}})}else layer.msg('You need to <a href="/sign-in" style="color: #ECECEC; text-decoration: underline">log in</a> first')}),t.find(".DeleteAnnotationReplyButton").on("click",function(){var t=layer.load(1,{shade:.18}),n=this.value;$.ajax({type:"POST",url:"",data:{csrfmiddlewaretoken:(0,o.getCookie)("csrftoken"),operation:"delete_annotation_reply",reply_id:n,document_id:$('button[name="document_id"]').val()},success:function(e){!function(t){for(var n=$(".AnnotationReplyBlock[annotation_reply_id='"+t+"']").toArray();n.length>0;){var e=$(n.shift()),o=e.attr("annotation_reply_id");n=n.concat($(".AnnotationReplyBlock[reply_to_annotation_reply='"+o+"']").toArray()),e.remove()}}(n),layer.close(t)}})}),t.find(".PostAnnotationReplyButton").on("click",function(){if(is_authenticated){var t=!this.classList.contains("AnonymouslyPostAnnotationReplyButton"),n=$(this),e=layer.load(1,{shade:.18});$.ajax({type:"POST",url:"",data:{csrfmiddlewaretoken:(0,o.getCookie)("csrftoken"),operation:"reply_annotation",annotation_reply_content:n.parent("form").find("textarea[name='annotation_reply_content']").val(),reply_to_annotation_id:n.val(),document_id:$("button[name='document_id']").val(),is_public:t},success:function(t){var o=$(t);$(".AnnotationBlock[annotation_id='"+n.val()+"']").append(o),$(".ReplyAnnotationButton").parents("footer").children("form").css("display","none"),tinyMCE.activeEditor.setContent(""),d(o),(0,a.tinymceInit)(),layer.close(e)}})}else layer.msg('You need to <a href="/sign-in" style="color: #ECECEC; text-decoration: underline">log in</a> first')}),t.find(".DeleteAnnotationButton").on("click",function(){var t=layer.load(1,{shade:.18}),n=this.value;$.ajax({type:"POST",url:"",data:{csrfmiddlewaretoken:(0,o.getCookie)("csrftoken"),operation:"delete_annotation",annotation_id:this.value},success:function(){i(n),layer.close(t)}})}),t.find(".LikeAnnotationButton").on("click",function(){if(is_authenticated){var t=$(this),n=parseInt(t.find(".num_like").text())+1;t.find(".num_like").text(n.toString()),t.off("click"),t.css("color","#6495ED"),t.on("click",function(){layer.msg("already liked",{icon:6,time:800})}),$.ajax({type:"POST",url:"",data:{csrfmiddlewaretoken:(0,o.getCookie)("csrftoken"),operation:"like_annotation",annotation_id:t.attr("annotation_id")}})}else layer.msg('You need to <a href="/sign-in" style="color: #ECECEC; text-decoration: underline">log in</a> first')}),t.find(".LikeAnnotationReplyButton").on("click",function(){if(is_authenticated){var t=$(this),n=parseInt(t.find(".num_like").text())+1;t.find(".num_like").text(n.toString()),t.off("click"),t.css("color","#6495ED"),t.on("click",function(){layer.msg("already liked",{icon:6,time:800})}),$.ajax({type:"POST",url:"",data:{csrfmiddlewaretoken:(0,o.getCookie)("csrftoken"),operation:"like_annotation_reply",annotation_reply_id:t.attr("annotation_reply_id")}})}else layer.msg('You need to <a href="/sign-in" style="color: #ECECEC; text-decoration: underline">log in</a> first')}),t.find(".ReplyAnnotationButton").on("click",function(){var t="none"===!$(this).css("display");$(this).parents("footer").children("form").slideToggle({duration:180,start:function(){t||$(".ReplyAnnotationButton").parents("footer").children("form").not($(this)).slideUp(180).css("display","none"),tinyMCE.get($(this).find("textarea").attr("id")).focus()}})}),t.find(".Annotation").addBack(".Annotation").on("mouseover",function(){var n=$(this).parent(".page_div").children(".PageCanvas"),e=$(this).parent(".page_div").find(".Annotation").toArray(),o=void 0;t.find(".Annotation").addBack(".Annotation").on("mousemove",function(t){if(0==t.which){var a=f(t,e,n);a!=o&&(void 0!=o&&(o.css("box-shadow","none"),$(".AnnotationBlock[annotation_id='"+$(o).attr("annotation_id")+"']").css("box-shadow","none")),a.css("box-shadow","3px 3px 8px rgba(0, 0, 0, .38)"),$(".AnnotationBlock[annotation_id='"+$(a).attr("annotation_id")+"']").css("box-shadow","3px 3px 8px rgba(0, 0, 0, .38)"),o=a)}else{var i=!0,r=!1,s=void 0;try{for(var c,u=e[Symbol.iterator]();!(i=(c=u.next()).done);i=!0){var l=c.value;$(l).css("box-shadow","none"),$(".AnnotationBlock[annotation_id='"+$(l).attr("annotation_id")+"']").css("box-shadow","none")}}catch(t){r=!0,s=t}finally{try{!i&&u.return&&u.return()}finally{if(r)throw s}}}})}),t.find(".Annotation").addBack(".Annotation").on("mouseout",function(t){if(0==t.which){var n=$(this).parent(".page_div").find(".Annotation").toArray(),e=!0,o=!1,a=void 0;try{for(var i,r=n[Symbol.iterator]();!(e=(i=r.next()).done);e=!0){var s=i.value;$(s).css("box-shadow","none"),$(".AnnotationBlock[annotation_id='"+$(s).attr("annotation_id")+"']").css("box-shadow","none"),$(s).off("mousemove")}}catch(t){o=!0,a=t}finally{try{!e&&r.return&&r.return()}finally{if(o)throw a}}}}),window.hasOwnProperty("MathJax")&&MathJax.Hub.Queue(["Typeset",MathJax.Hub])}n.addAnnotationRelatedListener=function(){d($(document))},n.addAnnotationRelatedListenerWithin=d,n.scrollAnnotationDivIntoView=function(t){var n=$("#annotation_update_div"),e=t.offset().top-n.offset().top+n.scrollTop();n.animate({scrollTop:parseInt(e)},240)},n.scrollAnnotationIntoView=l,n.findTargetAnnotation=f},53:function(t,n,e){"use strict";t.exports=function(t){return function(n){return t.apply(null,n)}}},54:function(t,n,e){"use strict";var o=e(29);function a(t){if("function"!=typeof t)throw new TypeError("executor must be a function.");var n;this.promise=new Promise(function(t){n=t});var e=this;t(function(t){e.reason||(e.reason=new o(t),n(e.reason))})}a.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},a.source=function(){var t;return{token:new a(function(n){t=n}),cancel:t}},t.exports=a},55:function(t,n,e){"use strict";t.exports=function(t,n){return n?t.replace(/\/+$/,"")+"/"+n.replace(/^\/+/,""):t}},56:function(t,n,e){"use strict";t.exports=function(t){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(t)}},57:function(t,n,e){"use strict";var o=e(10);t.exports=function(t,n,e){return o.forEach(e,function(e){t=e(t,n)}),t}},58:function(t,n,e){"use strict";var o=e(10),a=e(57),i=e(30),r=e(22);function s(t){t.cancelToken&&t.cancelToken.throwIfRequested()}t.exports=function(t){return s(t),t.headers=t.headers||{},t.data=a(t.data,t.headers,t.transformRequest),t.headers=o.merge(t.headers.common||{},t.headers[t.method]||{},t.headers||{}),o.forEach(["delete","get","head","post","put","patch","common"],function(n){delete t.headers[n]}),(t.adapter||r.adapter)(t).then(function(n){return s(t),n.data=a(n.data,n.headers,t.transformResponse),n},function(n){return i(n)||(s(t),n&&n.response&&(n.response.data=a(n.response.data,n.response.headers,t.transformResponse))),Promise.reject(n)})}},59:function(t,n,e){"use strict";var o=e(10);function a(){this.handlers=[]}a.prototype.use=function(t,n){return this.handlers.push({fulfilled:t,rejected:n}),this.handlers.length-1},a.prototype.eject=function(t){this.handlers[t]&&(this.handlers[t]=null)},a.prototype.forEach=function(t){o.forEach(this.handlers,function(n){null!==n&&t(n)})},t.exports=a},60:function(t,n,e){"use strict";var o=e(10);t.exports=o.isStandardBrowserEnv()?{write:function(t,n,e,a,i,r){var s=[];s.push(t+"="+encodeURIComponent(n)),o.isNumber(e)&&s.push("expires="+new Date(e).toGMTString()),o.isString(a)&&s.push("path="+a),o.isString(i)&&s.push("domain="+i),!0===r&&s.push("secure"),document.cookie=s.join("; ")},read:function(t){var n=document.cookie.match(new RegExp("(^|;\\s*)("+t+")=([^;]*)"));return n?decodeURIComponent(n[3]):null},remove:function(t){this.write(t,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},61:function(t,n,e){"use strict";var o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";function a(){this.message="String contains an invalid character"}a.prototype=new Error,a.prototype.code=5,a.prototype.name="InvalidCharacterError",t.exports=function(t){for(var n,e,i=String(t),r="",s=0,c=o;i.charAt(0|s)||(c="=",s%1);r+=c.charAt(63&n>>8-s%1*8)){if((e=i.charCodeAt(s+=.75))>255)throw new a;n=n<<8|e}return r}},62:function(t,n,e){"use strict";var o=e(10);t.exports=o.isStandardBrowserEnv()?function(){var t,n=/(msie|trident)/i.test(navigator.userAgent),e=document.createElement("a");function a(t){var o=t;return n&&(e.setAttribute("href",o),o=e.href),e.setAttribute("href",o),{href:e.href,protocol:e.protocol?e.protocol.replace(/:$/,""):"",host:e.host,search:e.search?e.search.replace(/^\?/,""):"",hash:e.hash?e.hash.replace(/^#/,""):"",hostname:e.hostname,port:e.port,pathname:"/"===e.pathname.charAt(0)?e.pathname:"/"+e.pathname}}return t=a(window.location.href),function(n){var e=o.isString(n)?a(n):n;return e.protocol===t.protocol&&e.host===t.host}}():function(){return!0}},63:function(t,n,e){"use strict";var o=e(10);t.exports=function(t){var n,e,a,i={};return t?(o.forEach(t.split("\n"),function(t){a=t.indexOf(":"),n=o.trim(t.substr(0,a)).toLowerCase(),e=o.trim(t.substr(a+1)),n&&(i[n]=i[n]?i[n]+", "+e:e)}),i):i}},638:function(t,n,e){"use strict";var o,a,i,r,s=e(478),c=e(477),u=e(18),l=e(476),f=e(92),d=0,p=1.08,h=1,m=[],g=[],v=!1,y=1.8;function _(t){if(h*=t,g.length>0){for(;g.length>1;)g.pop();g.push([g[0][0],"PENDING",null])}for(var n=0;n<m.length;n++){var e="page_canvas_"+m[n],o=document.getElementById(e);o.width=0,o.height=0,g.push([m[n],"PENDING",null])}m=[],v||k(g,m,h);var r=$("#file_viewer")[0].scrollHeight;a*=t,i*=t,$(".page_div").each(function(){var t=$(this);t.css("width",a+"px"),t.css("height",i+"px")}),w(t);var s=$("#file_viewer")[0].scrollHeight/r;$("#file_viewer").scrollTop(parseFloat($("#file_viewer").scrollTop())*s)}function w(t){$(".Annotation").each(function(){$(this).css("top",parseFloat($(this).css("top"))*t+"px"),$(this).css("left",parseFloat($(this).css("left"))*t+"px"),$(this).css("width",parseFloat($(this).css("width"))*t+"px"),$(this).css("height",parseFloat($(this).css("height"))*t+"px")})}function b(){var t=$("#scroll_page_into_view_div").children("input"),n=$("#scroll_page_into_view_div").children("button");t.attr("min","1"),t.attr("max",d.toString()),n.on("click",function(){var n=t.val();if(n<1||n>d)return layer.msg("Input page index out of bounds"),!1;!function(t){var n=$("#file_viewer"),e=t.offset().top-n.offset().top+n.scrollTop();n.animate({scrollTop:parseInt(e)},240)}($("#"+("page_div_"+n)))})}function x(){var t=$("#wrapper"),n=$("#file_viewer");t.css("height",document.body.clientHeight-28+"px"),t.css("width",document.body.clientWidth),n.css("height",t.height()+"px"),n.css("width",.6*parseInt(t.css("width"))+"px"),$("#annotation_update_div").css("height",t.height()+"px"),$("#annotation_update_div").css("width",t.width()-3.8-n.width()+"px"),$("#horizontal_draggable").css("height",t.height()+"px"),$(".PageImg").css("width",n.width()-24+"px"),$(".PageDiv").each(function(){var t=$(this),n=t.children(".PageImg");(0,u.imgLoad)(n[0],function(){t.css("width",n.width()+"px"),t.css("height",n.height()+"px")})})}function k(t,n,e){if(t.length>0){v=!0,$("#buttonForLarger, #buttonForSmaller").attr("disabled",!0);var a=t[0][0];o.getPage(a).then(function(o){var i="page_canvas_"+a,r=document.getElementById(i),s=r.getContext("2d"),c=o.getViewport(y*e);r.height=c.height,r.width=c.width,r.style.height=c.height/y+"px",r.style.width=c.width/y+"px";var u={canvasContext:s,viewport:c};t[0][2]=o.render(u),t[0][1]="RENDERING",t[0][2].promise.then(function(){t.shift(),n.push(a),v=!1,$("#buttonForLarger, #buttonForSmaller").attr("disabled",!1),k(t,n,e)},function(t){console.log("rejected because of this reason: "+t)})})}}$(document).ready(function(){!function(t){PDFJS.workerSrc="/static/pdfjs/pdf.worker.js";var n=layer.load(1,{shade:!1,offset:"48%"});PDFJS.getDocument(t).then(function(t){layer.close(n),d=(o=t).numPages,b(),o.getPage(d).then(function(t){h=.66*$("#file_viewer").width()/t.getViewport(1).width;var n="";i=t.getViewport(h).height,a=t.getViewport(h).width;for(var e=1;e<=o.numPages;e++){var c="page_div_"+e,l="page_canvas_"+e,p="<div class='page_div' id='"+c+"'><canvas class='PageCanvas' id='"+l+"'></canvas></div><br>";n+=p}$("#file_viewer").append(n),$(".page_div").css("height",i+"px"),$(".page_div").css("width",a+"px"),function(){var t="rgba(0,0,0,0.18)";r.on("change",function(n){var e=(0,u.hexToRgb)(n);t="rgba("+e.r+","+e.g+","+e.b+",0.18)"}),$("#annotation_color_buttons_div").find(".ColorSelectorButton").on("click",function(){t=$(this).css("background-color")}),$(".PageDiv, .page_div").on("mousedown",function(n){if(!$(n.target).hasClass("ui-draggable")&&!$(n.target).hasClass("ui-resizable-handle")){layer.closeAll(),$(".ui-draggable.Annotation").remove();var e=$(this).find(".PageImg, .PageCanvas"),o=n.pageX,a=n.pageY,i=o-e.offset().left,r=a-e.offset().top,c=$("<div class='Annotation'></div>");e.parents(".page_div, .PageDiv").append(c),c.css({background:t,position:"absolute",width:"1px",height:"1px",left:i,top:r}),$(".PageImg, .PageCanvas, .Annotation").on("mousemove",function(t){var n=t.pageX,o=t.pageY,a=n-e.offset().left,s=o-e.offset().top;c.css({width:Math.abs(a-i),height:Math.abs(s-r),left:Math.min(i,a),top:Math.min(r,s)}),t.stopPropagation()}),$("body").on("mouseup",function(n){if($(n.target).hasClass("PageImg")||$(n.target).hasClass("PageCanvas")||$(n.target).hasClass("Annotation")){var o=e.height(),a=e.width(),i=parseFloat(c.css("top"))/o,r=parseFloat(c.css("left"))/a,l=parseFloat(c.css("height"))/o,d=parseFloat(c.css("width"))/a;if(i+l>1||r+d>1)return c.remove(),$(".PageImg, .PageCanvas, .Annotation").off("mousemove"),$("body").off("mouseup"),void n.stopPropagation();if(l<.008&&d<.008){var p=c.parent(".page_div");c.remove();var h=p.find(".Annotation").toArray(),m=(0,s.findTargetAnnotation)(n,h,p);return void 0!=m[0]&&(0,s.scrollAnnotationDivIntoView)($(".AnnotationDiv[annotation_id='"+m.attr("annotation_id")+"']")),$(".PageImg, .PageCanvas, .Annotation").off("mousemove"),$("body").off("mouseup"),void n.stopPropagation()}c.draggable({containment:"parent"}).resizable({containment:"parent"});var g=layer.open({type:1,title:"Post Annotation",shadeClose:!0,shade:!1,maxmin:!0,zIndex:800,fixed:!1,content:'<form id="annotation_form">                        <textarea name="annotation_content" class="form-control" rows="8" style="resize: vertical"></textarea>                        <button type="button" class="post_annotation_button anonymously_post_annotation_button btn" name="document_id" value="{{ document.id }}" style="margin: 8px; float: right; border-radius: 0; color: white; background-color: #636e72">                          <i class="fa fa-user-secret"></i> &nbsp post anonymously                        </button>                        <button type="button" class="post_annotation_button btn " name="document_id" value="{{ document.id }}" style="margin: 8px; float: right; border-radius: 0; color: white; background-color: #1BA39C">post annotation</button>                    </form>',success:function(){(0,f.tinymceInit)()},cancel:function(){c.remove()}}),v=$(".layui-layer[times="+g+"]");v.find(".post_annotation_button").on("click",function(){if(is_authenticated){var n=!this.classList.contains("anonymously_post_annotation_button");$.ajax({type:"POST",url:"",data:{csrfmiddlewaretoken:(0,u.getCookie)("csrftoken"),operation:"annotate",annotation_content:v.find("textarea[name='annotation_content']").val(),page_id:e.attr("id"),top_percent:i,left_percent:r,height_percent:l,width_percent:d,frame_color:t,document_id:$("button[name='document_id']").val(),is_public:n},success:function(t){c.draggable("destroy").resizable("destroy");var n=$(t.new_annotationdiv_html),e=$($(".AnnotationDiv").toArray().find(function(t){return parseInt(t.getAttribute("page"))>=parseInt(n.attr("page"))}));void 0==e[0]?$("#annotation_update_div").append(n):n.insertBefore(e),(0,s.addAnnotationRelatedListenerWithin)(n),(0,s.addAnnotationRelatedListenerWithin)(c),(0,f.tinymceInit)(),c.attr("annotation_id",t.new_annotation_id),c.attr("annotation_uuid",t.new_annotation_uuid),(0,s.scrollAnnotationDivIntoView)(n),setTimeout(function(){var t=n.find(".AnnotationBlock");t.css("background-color","#bdede5"),t.animate({backgroundColor:"white"},1800)},180),layer.close(g)}}),v.find(".post_annotation_button").attr("disabled",!0)}else layer.msg('You need to <a href="/sign-in" style="color: #ECECEC; text-decoration: underline">log in</a> first')}),$(".PageImg, .PageCanvas, .Annotation").off("mousemove"),$("body").off("mouseup"),v.find(".post_annotation_button").attr("disabled",!1)}else c.remove(),$(".PageImg, .PageCanvas, .Annotation").off("mousemove"),$("body").off("mouseup");n.stopPropagation()}),n.stopPropagation()}})}(),drawAllExistingAnnotationFrame(),(0,s.addAnnotationRelatedListener)(),g.push([Math.min(d,1),"PENDING",null]),g.push([Math.min(d,2),"PENDING",null]),g.push([Math.min(d,3),"PENDING",null]),g.push([Math.min(d,4),"PENDING",null]),g.push([Math.min(d,5),"PENDING",null]),k(g,m,h),function(){var t=1;$("#file_viewer").scroll(function(){var n=this.scrollTop/this.scrollHeight,e=Math.ceil(n*d);if(e!=t){t=e;for(var o=[!0,!0,!0,!0,!0],a=0,i=m.length,r=0;r<i;r++)if(m[a]-e>=-1&&m[a]-e<=3)o[m[a]-e+1]=!1,a+=1;else{var s="page_canvas_"+m[a],c=document.getElementById(s);c.width=0,c.height=0,m.splice(a,1)}for(;g.length>1;)g.pop();for(var r=0;r<5;r++)1==o[r]&&g.push([Math.min(d,Math.max(1,e+r-1)),"PENDING",null]);v||k(g,m,h)}})}(),function(){var t=(0,u.getValFromUrlParam)("annotation");if(null!=t){t=t.replace(/-/g,"");var n=$('.AnnotationDiv[annotation_uuid="'+t+'"]'),e=$(".Annotation[annotation_uuid='"+t+"']");(0,s.scrollAnnotationDivIntoView)(n),(0,s.scrollAnnotationIntoView)(e),n.find(".AnnotationBlock").prepend($('<span class="badge" style="background-color: #1BA39C; margin-bottom: 6px">highlighted annotation</span>')),setTimeout(function(){var t=n.find(".AnnotationBlock");t.css("background-color","#bdede5"),t.animate({backgroundColor:"white"},1800)},380)}}()})})}($("#file-url").val()),(0,f.tinymceInit)(),(0,c.enablePostCommentButton)(),(0,c.enableRefreshCommentButton)(),$("#buttonForLarger").on("click",function(){_(p)}),$("#buttonForSmaller").on("click",function(){_(1/p)}),(0,l.prepareNavbarFunction)(),$(window).resize(function(){x();var t=parseFloat($(".PageImg").css("width"));w(parseFloat($(".PageImg").css("width"))/t)}),r=new Huebee(".color-picker",{notation:"hex",saturations:2}),(0,c.addCommentRelatedListener)(),x();var t=$("#wrapper"),n=$("#file_viewer");$("#horizontal_draggable").draggable({axis:"x",containment:"#containment-wrapper",revert:!0,revertDuration:0,stop:function(e,o){var a=o.offset.left;n.css("width",a+"px"),$("#annotation_update_div").css("width",t.width()-3-n.width()+"px")}})})},64:function(t,n,e){"use strict";var o=e(10);function a(t){return encodeURIComponent(t).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}t.exports=function(t,n,e){if(!n)return t;var i;if(e)i=e(n);else if(o.isURLSearchParams(n))i=n.toString();else{var r=[];o.forEach(n,function(t,n){null!==t&&void 0!==t&&(o.isArray(t)&&(n+="[]"),o.isArray(t)||(t=[t]),o.forEach(t,function(t){o.isDate(t)?t=t.toISOString():o.isObject(t)&&(t=JSON.stringify(t)),r.push(a(n)+"="+a(t))}))}),i=r.join("&")}return i&&(t+=(-1===t.indexOf("?")?"?":"&")+i),t}},65:function(t,n,e){"use strict";t.exports=function(t,n,e,o,a){return t.config=n,e&&(t.code=e),t.request=o,t.response=a,t}},66:function(t,n,e){"use strict";var o=e(31);t.exports=function(t,n,e){var a=e.config.validateStatus;e.status&&a&&!a(e.status)?n(o("Request failed with status code "+e.status,e.config,null,e.request,e)):t(e)}},67:function(t,n,e){"use strict";var o=e(10);t.exports=function(t,n){o.forEach(t,function(e,o){o!==n&&o.toUpperCase()===n.toUpperCase()&&(t[n]=e,delete t[o])})}},68:function(t,n){var e,o,a=t.exports={};function i(){throw new Error("setTimeout has not been defined")}function r(){throw new Error("clearTimeout has not been defined")}function s(t){if(e===setTimeout)return setTimeout(t,0);if((e===i||!e)&&setTimeout)return e=setTimeout,setTimeout(t,0);try{return e(t,0)}catch(n){try{return e.call(null,t,0)}catch(n){return e.call(this,t,0)}}}!function(){try{e="function"==typeof setTimeout?setTimeout:i}catch(t){e=i}try{o="function"==typeof clearTimeout?clearTimeout:r}catch(t){o=r}}();var c,u=[],l=!1,f=-1;function d(){l&&c&&(l=!1,c.length?u=c.concat(u):f=-1,u.length&&p())}function p(){if(!l){var t=s(d);l=!0;for(var n=u.length;n;){for(c=u,u=[];++f<n;)c&&c[f].run();f=-1,n=u.length}c=null,l=!1,function(t){if(o===clearTimeout)return clearTimeout(t);if((o===r||!o)&&clearTimeout)return o=clearTimeout,clearTimeout(t);try{o(t)}catch(n){try{return o.call(null,t)}catch(n){return o.call(this,t)}}}(t)}}function h(t,n){this.fun=t,this.array=n}function m(){}a.nextTick=function(t){var n=new Array(arguments.length-1);if(arguments.length>1)for(var e=1;e<arguments.length;e++)n[e-1]=arguments[e];u.push(new h(t,n)),1!==u.length||l||s(p)},h.prototype.run=function(){this.fun.apply(null,this.array)},a.title="browser",a.browser=!0,a.env={},a.argv=[],a.version="",a.versions={},a.on=m,a.addListener=m,a.once=m,a.off=m,a.removeListener=m,a.removeAllListeners=m,a.emit=m,a.prependListener=m,a.prependOnceListener=m,a.listeners=function(t){return[]},a.binding=function(t){throw new Error("process.binding is not supported")},a.cwd=function(){return"/"},a.chdir=function(t){throw new Error("process.chdir is not supported")},a.umask=function(){return 0}},69:function(t,n,e){"use strict";var o=e(22),a=e(10),i=e(59),r=e(58),s=e(56),c=e(55);function u(t){this.defaults=t,this.interceptors={request:new i,response:new i}}u.prototype.request=function(t){"string"==typeof t&&(t=a.merge({url:arguments[0]},arguments[1])),(t=a.merge(o,this.defaults,{method:"get"},t)).method=t.method.toLowerCase(),t.baseURL&&!s(t.url)&&(t.url=c(t.baseURL,t.url));var n=[r,void 0],e=Promise.resolve(t);for(this.interceptors.request.forEach(function(t){n.unshift(t.fulfilled,t.rejected)}),this.interceptors.response.forEach(function(t){n.push(t.fulfilled,t.rejected)});n.length;)e=e.then(n.shift(),n.shift());return e},a.forEach(["delete","get","head","options"],function(t){u.prototype[t]=function(n,e){return this.request(a.merge(e||{},{method:t,url:n}))}}),a.forEach(["post","put","patch"],function(t){u.prototype[t]=function(n,e,o){return this.request(a.merge(o||{},{method:t,url:n,data:e}))}}),t.exports=u},70:function(t,n){function e(t){return!!t.constructor&&"function"==typeof t.constructor.isBuffer&&t.constructor.isBuffer(t)}
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
t.exports=function(t){return null!=t&&(e(t)||function(t){return"function"==typeof t.readFloatLE&&"function"==typeof t.slice&&e(t.slice(0,0))}(t)||!!t._isBuffer)}},71:function(t,n,e){"use strict";var o=e(10),a=e(33),i=e(69),r=e(22);function s(t){var n=new i(t),e=a(i.prototype.request,n);return o.extend(e,i.prototype,n),o.extend(e,n),e}var c=s(r);c.Axios=i,c.create=function(t){return s(o.merge(r,t))},c.Cancel=e(29),c.CancelToken=e(54),c.isCancel=e(30),c.all=function(t){return Promise.all(t)},c.spread=e(53),t.exports=c,t.exports.default=c},92:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.tinymceInit=void 0;e(18);var o=function(t){return t&&t.__esModule?t:{default:t}}(e(23));n.tinymceInit=function(){tinymce.init({menubar:!1,selector:"textarea",forced_root_block:!1,plugins:["advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker","searchreplace visualblocks visualchars codesample fullscreen insertdatetime media nonbreaking","save table contextmenu directionality emoticons template paste textcolor"],toolbar:["styleselect | bold italic codesample | link image | bullist numlist outdent indent | forecolor | formula"],indent:!1,paste_as_text:!0,branding:!1,width:"calc(100% - 2px)",images_upload_handler:function(t,n,e){var a=t.filename(),i="."+a.split(".")[a.split(".").length-1];new File([t.blob()],function(t){for(var n="",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",o=0;o<t;o++)n+=e.charAt(Math.floor(Math.random()*e.length));return n}(16)+i),o.default.post("https://api.imgur.com/3/upload",{image:t.base64()},{headers:{Authorization:"Client-ID a1f3b6d766ac1cc"}}).then(function(t){n(t.data.data.link)})},setup:function(t){t.on("change",function(){t.save()}),t.addButton("formula",{text:"Formula",icon:!1,onclick:function(){t.insertContent("$$ write LATEX here $$")}})}}),$(document).on("focusin",function(t){$(t.target).closest(".mce-window").length&&t.stopImmediatePropagation()})}}});