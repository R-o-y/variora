!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=600)}({12:function(e,t,n){"use strict";var r=n(46),o=n(96),i=Object.prototype.toString;function a(e){return"[object Array]"===i.call(e)}function s(e){return null!==e&&"object"==typeof e}function c(e){return"[object Function]"===i.call(e)}function u(e,t){if(null!==e&&void 0!==e)if("object"==typeof e||a(e)||(e=[e]),a(e))for(var n=0,r=e.length;n<r;n++)t.call(null,e[n],n,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}e.exports={isArray:a,isArrayBuffer:function(e){return"[object ArrayBuffer]"===i.call(e)},isBuffer:o,isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:s,isUndefined:function(e){return void 0===e},isDate:function(e){return"[object Date]"===i.call(e)},isFile:function(e){return"[object File]"===i.call(e)},isBlob:function(e){return"[object Blob]"===i.call(e)},isFunction:c,isStream:function(e){return s(e)&&c(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:u,merge:function e(){var t={};function n(n,r){"object"==typeof t[r]&&"object"==typeof n?t[r]=e(t[r],n):t[r]=n}for(var r=0,o=arguments.length;r<o;r++)u(arguments[r],n);return t},extend:function(e,t,n){return u(t,function(t,o){e[o]=n&&"function"==typeof t?r(t,n):t}),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}}},146:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.tinymceInit=void 0;n(19);var r=function(e){return e&&e.__esModule?e:{default:e}}(n(23));t.tinymceInit=function(){tinymce.init({menubar:!1,selector:"textarea",forced_root_block:!1,plugins:["advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker","searchreplace visualblocks visualchars codesample fullscreen insertdatetime media nonbreaking","save table contextmenu directionality emoticons template paste textcolor"],toolbar:["styleselect | bold italic codesample | link image | bullist numlist outdent indent | forecolor"],indent:!1,paste_as_text:!0,branding:!1,width:"calc(100% - 2px)",images_upload_handler:function(e,t,n){var o=e.filename(),i="."+o.split(".")[o.split(".").length-1];new File([e.blob()],function(e){for(var t="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",r=0;r<e;r++)t+=n.charAt(Math.floor(Math.random()*n.length));return t}(16)+i),r.default.post("https://api.imgur.com/3/upload",{image:e.base64()},{headers:{Authorization:"Client-ID a1f3b6d766ac1cc"}}).then(function(e){t(e.data.data.link)})},setup:function(e){e.on("change",function(){e.save()})}}),$(document).on("focusin",function(e){$(e.target).closest(".mce-window").length&&e.stopImmediatePropagation()})}},19:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getCookie=function(e){var t=null;if(document.cookie&&""!=document.cookie)for(var n=document.cookie.split(";"),r=0;r<n.length;r++){var o=n[r].trim();if(o.substring(0,e.length+1)==e+"="){t=decodeURIComponent(o.substring(e.length+1));break}}return t},t.getUrlFormat=function(e,t){var n=e+"?";for(var r in t)n=n+r+"="+t[r]+"&";return n},t.imgLoad=function(e,t){var n=setInterval(function(){e.complete&&(t(e),clearInterval(n))},8)},t.hexToRgb=function(e){e=e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(e,t,n,r){return t+t+n+n+r+r});var t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?{r:parseInt(t[1],16),g:parseInt(t[2],16),b:parseInt(t[3],16)}:null},t.formatOpenCoterieDocumentUrl=function(e,t){return"/coteries/"+t+"/documents/"+e.slug+"/"+e.title.replace(/\s/g,"-")},t.formatOpenDocumentUrl=function(e){return"/documents/"+e.slug+"/"+e.title.replace(/\s/g,"-")},t.getValFromUrlParam=function(e){return new URL(window.location.href).searchParams.get(e)}},23:function(e,t,n){e.exports=n(97)},26:function(e,t,n){"use strict";(function(t){var r=n(12),o=n(93),i={"Content-Type":"application/x-www-form-urlencoded"};function a(e,t){!r.isUndefined(e)&&r.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var s={adapter:function(){var e;return"undefined"!=typeof XMLHttpRequest?e=n(45):void 0!==t&&(e=n(45)),e}(),transformRequest:[function(e,t){return o(t,"Content-Type"),r.isFormData(e)||r.isArrayBuffer(e)||r.isBuffer(e)||r.isStream(e)||r.isFile(e)||r.isBlob(e)?e:r.isArrayBufferView(e)?e.buffer:r.isURLSearchParams(e)?(a(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):r.isObject(e)?(a(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};r.forEach(["delete","get","head"],function(e){s.headers[e]={}}),r.forEach(["post","put","patch"],function(e){s.headers[e]=r.merge(i)}),e.exports=s}).call(this,n(94))},42:function(e,t,n){"use strict";function r(e){this.message=e}r.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},r.prototype.__CANCEL__=!0,e.exports=r},43:function(e,t,n){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},44:function(e,t,n){"use strict";var r=n(91);e.exports=function(e,t,n,o,i){var a=new Error(e);return r(a,t,n,o,i)}},45:function(e,t,n){"use strict";var r=n(12),o=n(92),i=n(90),a=n(89),s=n(88),c=n(44),u="undefined"!=typeof window&&window.btoa&&window.btoa.bind(window)||n(87);e.exports=function(e){return new Promise(function(t,f){var l=e.data,d=e.headers;r.isFormData(l)&&delete d["Content-Type"];var p=new XMLHttpRequest,m="onreadystatechange",h=!1;if("undefined"==typeof window||!window.XDomainRequest||"withCredentials"in p||s(e.url)||(p=new window.XDomainRequest,m="onload",h=!0,p.onprogress=function(){},p.ontimeout=function(){}),e.auth){var y=e.auth.username||"",v=e.auth.password||"";d.Authorization="Basic "+u(y+":"+v)}if(p.open(e.method.toUpperCase(),i(e.url,e.params,e.paramsSerializer),!0),p.timeout=e.timeout,p[m]=function(){if(p&&(4===p.readyState||h)&&(0!==p.status||p.responseURL&&0===p.responseURL.indexOf("file:"))){var n="getAllResponseHeaders"in p?a(p.getAllResponseHeaders()):null,r={data:e.responseType&&"text"!==e.responseType?p.response:p.responseText,status:1223===p.status?204:p.status,statusText:1223===p.status?"No Content":p.statusText,headers:n,config:e,request:p};o(t,f,r),p=null}},p.onerror=function(){f(c("Network Error",e,null,p)),p=null},p.ontimeout=function(){f(c("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED",p)),p=null},r.isStandardBrowserEnv()){var g=n(86),w=(e.withCredentials||s(e.url))&&e.xsrfCookieName?g.read(e.xsrfCookieName):void 0;w&&(d[e.xsrfHeaderName]=w)}if("setRequestHeader"in p&&r.forEach(d,function(e,t){void 0===l&&"content-type"===t.toLowerCase()?delete d[t]:p.setRequestHeader(t,e)}),e.withCredentials&&(p.withCredentials=!0),e.responseType)try{p.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&p.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&p.upload&&p.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){p&&(p.abort(),f(e),p=null)}),void 0===l&&(l=null),p.send(l)})}},46:function(e,t,n){"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},600:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.enablePostCommentButton=t.enableRefreshCommentButton=t.addCommentRelatedListener=void 0;var r=n(19),o=n(146);function i(){(0,o.tinymceInit)(),$("code").addClass("prettyprint"),PR.prettyPrint(),$(".likeCommentButton").on("click",function(){if(is_authenticated){var e=$(this),t=parseInt(e.next().text())+1;e.next().text(t.toString()),e.off("click"),e.css("color","#6495ED"),e.on("click",function(){layer.msg("already liked",{icon:6,time:800})}),$.ajax({type:"POST",url:"",data:{csrfmiddlewaretoken:(0,r.getCookie)("csrftoken"),operation:"like_comment",comment_id:e.attr("comment_id")}})}else layer.msg('<span style="color: #ECECEC">You need to <a href="/sign-in" style="color: #ECECEC; text-decoration: underline">log in</a> first</span>')}),$(".delete_comment_button").on("click",function(){if(is_authenticated){var e=layer.load(0,{shade:.18}),t=this.value;$.ajax({type:"POST",url:"",data:{csrfmiddlewaretoken:(0,r.getCookie)("csrftoken"),operation:"delete_comment",comment_id:t,document_id:$("button[name='document_id']").val()},success:function(n){!function(e){for(var t=$(".CommentBlock[comment_id='"+e+"']").toArray();t.length>0;){var n=$(t.shift()),r=n.attr("comment_id");t=t.concat($(".CommentBlock[reply_to_comment_id='"+r+"']").toArray()),n.remove()}}(t),layer.close(e)}})}}),$(".reply_comment_button").on("click",function(){$(this).parents("blockquote").find(".reply_comment_form").slideToggle({duration:180,start:function(){$(this).is(":hidden")||$(".reply_comment_form").not($(this)).slideUp(180)}})}),$(".post_comment_reply_button").on("click",function(){if(is_authenticated){var e=!this.classList.contains("anonymously_post_comment_reply_button"),t=$(this),n=layer.load(0,{shade:.18});$.ajax({type:"POST",url:"",data:{csrfmiddlewaretoken:(0,r.getCookie)("csrftoken"),operation:"comment",comment_content:t.parents("form").find("textarea[name='comment_content']").val(),document_id:$("button[name='document_id']").val(),reply_to_comment_id:t.val(),is_public:e},success:function(e){$("#comment_update_div").html(e),i(),layer.close(n)}})}else layer.msg('<span style="color: #ECECEC">You need to <a href="/sign-in" style="color: #ECECEC; text-decoration: underline">log in</a> first</span>')})}t.addCommentRelatedListener=i,t.enableRefreshCommentButton=function(){$("#refresh_comment_button").on("click",function(){$.ajax({type:"POST",url:"",data:{csrfmiddlewaretoken:(0,r.getCookie)("csrftoken"),operation:"refresh",document_id:$("button[name='document_id']").val()},success:function(e){$("#comment_update_div").html(e),i()}})})},t.enablePostCommentButton=function(){$(".post_comment_button").on("click",function(){if(is_authenticated){var e=!this.classList.contains("anonymously_post_comment_button"),t=layer.load(0,{shade:.18}),n=tinyMCE.activeEditor;$.ajax({type:"POST",url:"",data:{csrfmiddlewaretoken:(0,r.getCookie)("csrftoken"),operation:"comment",comment_content:$("textarea[name='comment_content']").val(),document_id:$("button[name='document_id']").val(),is_public:e},success:function(e){$("#comment_update_div").html(e),i(),n.setContent(""),layer.close(t)}})}else layer.msg('<span style="color: #ECECEC">You need to <a href="/sign-in" style="color: #ECECEC; text-decoration: underline">log in</a> first</span>')})}},79:function(e,t,n){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},80:function(e,t,n){"use strict";var r=n(42);function o(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(e){t=e});var n=this;e(function(e){n.reason||(n.reason=new r(e),t(n.reason))})}o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.source=function(){var e;return{token:new o(function(t){e=t}),cancel:e}},e.exports=o},81:function(e,t,n){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},82:function(e,t,n){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},83:function(e,t,n){"use strict";var r=n(12);e.exports=function(e,t,n){return r.forEach(n,function(n){e=n(e,t)}),e}},84:function(e,t,n){"use strict";var r=n(12),o=n(83),i=n(43),a=n(26);function s(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){return s(e),e.headers=e.headers||{},e.data=o(e.data,e.headers,e.transformRequest),e.headers=r.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),r.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t]}),(e.adapter||a.adapter)(e).then(function(t){return s(e),t.data=o(t.data,t.headers,e.transformResponse),t},function(t){return i(t)||(s(e),t&&t.response&&(t.response.data=o(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)})}},85:function(e,t,n){"use strict";var r=n(12);function o(){this.handlers=[]}o.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},o.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},o.prototype.forEach=function(e){r.forEach(this.handlers,function(t){null!==t&&e(t)})},e.exports=o},86:function(e,t,n){"use strict";var r=n(12);e.exports=r.isStandardBrowserEnv()?{write:function(e,t,n,o,i,a){var s=[];s.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&s.push("expires="+new Date(n).toGMTString()),r.isString(o)&&s.push("path="+o),r.isString(i)&&s.push("domain="+i),!0===a&&s.push("secure"),document.cookie=s.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},87:function(e,t,n){"use strict";var r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";function o(){this.message="String contains an invalid character"}o.prototype=new Error,o.prototype.code=5,o.prototype.name="InvalidCharacterError",e.exports=function(e){for(var t,n,i=String(e),a="",s=0,c=r;i.charAt(0|s)||(c="=",s%1);a+=c.charAt(63&t>>8-s%1*8)){if((n=i.charCodeAt(s+=.75))>255)throw new o;t=t<<8|n}return a}},88:function(e,t,n){"use strict";var r=n(12);e.exports=r.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");function o(e){var r=e;return t&&(n.setAttribute("href",r),r=n.href),n.setAttribute("href",r),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}return e=o(window.location.href),function(t){var n=r.isString(t)?o(t):t;return n.protocol===e.protocol&&n.host===e.host}}():function(){return!0}},89:function(e,t,n){"use strict";var r=n(12);e.exports=function(e){var t,n,o,i={};return e?(r.forEach(e.split("\n"),function(e){o=e.indexOf(":"),t=r.trim(e.substr(0,o)).toLowerCase(),n=r.trim(e.substr(o+1)),t&&(i[t]=i[t]?i[t]+", "+n:n)}),i):i}},90:function(e,t,n){"use strict";var r=n(12);function o(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,n){if(!t)return e;var i;if(n)i=n(t);else if(r.isURLSearchParams(t))i=t.toString();else{var a=[];r.forEach(t,function(e,t){null!==e&&void 0!==e&&(r.isArray(e)&&(t+="[]"),r.isArray(e)||(e=[e]),r.forEach(e,function(e){r.isDate(e)?e=e.toISOString():r.isObject(e)&&(e=JSON.stringify(e)),a.push(o(t)+"="+o(e))}))}),i=a.join("&")}return i&&(e+=(-1===e.indexOf("?")?"?":"&")+i),e}},91:function(e,t,n){"use strict";e.exports=function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e}},92:function(e,t,n){"use strict";var r=n(44);e.exports=function(e,t,n){var o=n.config.validateStatus;n.status&&o&&!o(n.status)?t(r("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n)}},93:function(e,t,n){"use strict";var r=n(12);e.exports=function(e,t){r.forEach(e,function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])})}},94:function(e,t){var n,r,o=e.exports={};function i(){throw new Error("setTimeout has not been defined")}function a(){throw new Error("clearTimeout has not been defined")}function s(e){if(n===setTimeout)return setTimeout(e,0);if((n===i||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:i}catch(e){n=i}try{r="function"==typeof clearTimeout?clearTimeout:a}catch(e){r=a}}();var c,u=[],f=!1,l=-1;function d(){f&&c&&(f=!1,c.length?u=c.concat(u):l=-1,u.length&&p())}function p(){if(!f){var e=s(d);f=!0;for(var t=u.length;t;){for(c=u,u=[];++l<t;)c&&c[l].run();l=-1,t=u.length}c=null,f=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===a||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function m(e,t){this.fun=e,this.array=t}function h(){}o.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];u.push(new m(e,t)),1!==u.length||f||s(p)},m.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=h,o.addListener=h,o.once=h,o.off=h,o.removeListener=h,o.removeAllListeners=h,o.emit=h,o.prependListener=h,o.prependOnceListener=h,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},95:function(e,t,n){"use strict";var r=n(26),o=n(12),i=n(85),a=n(84),s=n(82),c=n(81);function u(e){this.defaults=e,this.interceptors={request:new i,response:new i}}u.prototype.request=function(e){"string"==typeof e&&(e=o.merge({url:arguments[0]},arguments[1])),(e=o.merge(r,this.defaults,{method:"get"},e)).method=e.method.toLowerCase(),e.baseURL&&!s(e.url)&&(e.url=c(e.baseURL,e.url));var t=[a,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});t.length;)n=n.then(t.shift(),t.shift());return n},o.forEach(["delete","get","head","options"],function(e){u.prototype[e]=function(t,n){return this.request(o.merge(n||{},{method:e,url:t}))}}),o.forEach(["post","put","patch"],function(e){u.prototype[e]=function(t,n,r){return this.request(o.merge(r||{},{method:e,url:t,data:n}))}}),e.exports=u},96:function(e,t){function n(e){return!!e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
e.exports=function(e){return null!=e&&(n(e)||function(e){return"function"==typeof e.readFloatLE&&"function"==typeof e.slice&&n(e.slice(0,0))}(e)||!!e._isBuffer)}},97:function(e,t,n){"use strict";var r=n(12),o=n(46),i=n(95),a=n(26);function s(e){var t=new i(e),n=o(i.prototype.request,t);return r.extend(n,i.prototype,t),r.extend(n,t),n}var c=s(a);c.Axios=i,c.create=function(e){return s(r.merge(a,e))},c.Cancel=n(42),c.CancelToken=n(80),c.isCancel=n(43),c.all=function(e){return Promise.all(e)},c.spread=n(79),e.exports=c,e.exports.default=c}});