!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=511)}({511:function(e,t,n){"use strict";var r="VA-0.0.3-0.0.9",o=[];self.addEventListener("install",function(e){e.waitUntil(caches.open(r).then(function(e){return console.log("SW: installed and cache data"),e.addAll(o).then(function(){return self.skipWaiting()})}))}),self.addEventListener("activate",function(e){console.log("SW: active and control this domain"),e.waitUntil(self.clients.claim().then(function(){caches.keys().then(function(e){return Promise.all(e.map(function(e){if(e!==r)return console.log("SW: clearing old cache"),caches.delete(e)}))})}))}),self.addEventListener("fetch",function(e){e.request.url.includes("/static/")&&"GET"===e.request.method&&e.respondWith(caches.open(r).then(function(t){return t.match(e.request.url)}).then(function(t){return t||fetch(e.request).then(function(t){var n=t.clone();return e.request.url.includes("/static/")&&caches.open(r).then(function(t){t.put(e.request.url,n)}),t})}))})}});