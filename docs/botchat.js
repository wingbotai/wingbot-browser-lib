!function(t){var n={};function e(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,e),r.l=!0,r.exports}e.m=t,e.c=n,e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:o})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(e.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var r in t)e.d(o,r,function(n){return t[n]}.bind(null,r));return o},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="/",e(e.s=994)}({994:function(t,n,e){"use strict";function o(t,n){return function(t){if(Array.isArray(t))return t}(t)||function(t,n){var e=[],o=!0,r=!1,i=void 0;try{for(var c,a=t[Symbol.iterator]();!(o=(c=a.next()).done)&&(e.push(c.value),!n||e.length!==n);o=!0);}catch(t){r=!0,i=t}finally{try{o||null==a.return||a.return()}finally{if(r)throw i}}return e}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function r(t,n){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"/",o=arguments.length>3&&void 0!==arguments[3]&&arguments[3]?";secure":"";document.cookie="".concat(t,"=").concat(n,";path=").concat(e,";expires=Fri, 31 Dec 9999 23:59:59 GMT;").concat(o,"sameSite=lax;")}function i(t,n,e){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:function(){},c=(document.cookie||"").match(/wingbotCid=([^&;\s]+)/i),a=null;if(t.conversationID)r("wingbotCid",a=t.conversationID,t.path,t.secure);else if(c){a=o(c,2)[1]}return function t(n,e,o,i){var c=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null,a=!1,u=!1,l=c,s={secret:n.secret};n.restoreConversation&&l&&(s.conversationId=l,s.watermark=1,a=!0);var f=new window.BotChat.DirectLine(s),d=[];function v(){u||(u=!0,d.forEach(function(t){var n=t.activity,e=t.callback;f.postActivity(n).subscribe(e||function(t){console.log("sent",t)})}))}if(f.postBack=function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,o={type:"event",name:"postBack",value:{action:t,data:n}};u?this.postActivity(o).subscribe(e||function(t){console.log("sent",t)}):d.push({activity:o,callback:e})},n.initAction&&!a?f.connectionStatus$.subscribe(function(r){4===r?t(n,e,o,i):2===r&&(v(),a||(a=!0,i(f),f.postBack(n.initAction,n.initData,n.onInit)))}):o&&f.connectionStatus$.subscribe(function(r){4===r?t(n,e,o,i):2===r&&(v(),i(f))}),n.restoreConversation&&f.activity$.subscribe(function(t){!l&&t.conversation&&r("wingbotCid",l=t.conversation.id,n.path,n.secure)}),o){for(;o.firstChild;)o.removeChild(o.firstChild);var p=document.createElement("div");o.appendChild(p);var b=e||{};b.user={name:n.userName||"You"},b.botConnection=f,window.BotChat.App(b,p)}return i(f),f}(t,n,e,i,a)}e.r(n),window.wingbotBotChat=i;n.default=i}});