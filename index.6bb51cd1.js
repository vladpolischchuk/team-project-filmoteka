function t(t){return t&&t.__esModule?t.default:t}const e={openModalBtn:document.querySelectorAll("[data-film-modal-open]"),closeModalBtn:document.querySelector("[data-film-modal-close]"),modal:document.querySelector("[data-film-modal]")};function n(){e.modal.classList.toggle("is-hidden")}e.openModalBtn.forEach((t=>{t.addEventListener("click",n)})),e.closeModalBtn.addEventListener("click",n),document.addEventListener("keydown",(function(t){"Escape"===t.key&&n()}));var i,a={};
/*!
 * TOAST UI Pagination
 * @version 3.4.1
 * @author NHN FE Development Team <dl_javascript@nhn.com>
 * @license MIT
 */window,i=function(){return function(t){var e={};function n(i){if(e[i])return e[i].exports;var a=e[i]={i:i,l:!1,exports:{}};return t[i].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)n.d(i,a,function(e){return t[e]}.bind(null,a));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="dist",n(n.s=10)}([function(t,e,n){t.exports=function(t,e){var n,i,a,o,s=Object.prototype.hasOwnProperty;for(a=1,o=arguments.length;a<o;a+=1)for(i in n=arguments[a])s.call(n,i)&&(t[i]=n[i]);return t}},function(t,e,n){t.exports=function(t){return void 0===t}},function(t,e,n){t.exports=function(t){return t instanceof Array}},function(t,e,n){var i=n(2),a=n(17),o=n(6);t.exports=function(t,e,n){i(t)?a(t,e,n):o(t,e,n)}},function(t,e,n){t.exports=function(t){return"string"==typeof t||t instanceof String}},function(t,e,n){t.exports=function(t){return t instanceof Function}},function(t,e,n){t.exports=function(t,e,n){var i;for(i in n=n||null,t)if(t.hasOwnProperty(i)&&!1===e.call(n,t[i],i,t))break}},function(t,e,n){var i=n(18),a=n(0);t.exports=function(t,e){var n;return e||(e=t,t=null),n=e.init||function(){},t&&i(n,t),e.hasOwnProperty("static")&&(a(n,e.static),delete e.static),a(n.prototype,e),n}},function(t,e,n){var i=n(2);t.exports=function(t,e,n){var a,o;if(n=n||0,!i(e))return-1;if(Array.prototype.indexOf)return Array.prototype.indexOf.call(e,t,n);for(o=e.length,a=n;n>=0&&a<o;a+=1)if(e[a]===t)return a;return-1}},function(t,e,n){var i=n(29),a=n(30),o=n(5),s={capitalizeFirstLetter:function(t){return t.substring(0,1).toUpperCase()+t.substring(1,t.length)},isContained:function(t,e){return!!e&&(t===e||e.contains(t))},createElementByTemplate:function(t,e){var n=document.createElement("div"),a=o(t)?t(e):i(t,e);return n.innerHTML=a,n.firstChild},bind:function(t,e){var n,i=Array.prototype.slice;return t.bind?t.bind.apply(t,i.call(arguments,1)):(n=i.call(arguments,2),function(){return t.apply(e,n.length?n.concat(i.call(arguments)):arguments)})},sendHostName:function(){a("pagination","UA-129987462-1")}};t.exports=s},function(t,e,n){n(11),t.exports=n(12)},function(t,e,n){},function(t,e,n){var i=n(13),a=n(7),o=n(0),s=n(1),r=n(20),c=n(9),u={totalItems:10,itemsPerPage:10,visiblePages:10,page:1,centerAlign:!1,firstItemClassName:"tui-first-child",lastItemClassName:"tui-last-child",usageStatistics:!0},l=a({init:function(t,e){this._options=o({},u,e),this._currentPage=0,this._view=new r(t,this._options,c.bind(this._onClickHandler,this)),this._paginate(),this._options.usageStatistics&&c.sendHostName()},_setCurrentPage:function(t){this._currentPage=t||this._options.page},_getLastPage:function(){var t=Math.ceil(this._options.totalItems/this._options.itemsPerPage);return t||1},_getPageIndex:function(t){var e;return this._options.centerAlign?(e=t-Math.floor(this._options.visiblePages/2),e=Math.max(e,1),e=Math.min(e,this._getLastPage()-this._options.visiblePages+1)):Math.ceil(t/this._options.visiblePages)},_getRelativePage:function(t){var e="prev"===t,n=this.getCurrentPage();return e?n-1:n+1},_getMorePageIndex:function(t){var e=this._getPageIndex(this.getCurrentPage()),n=this._options.visiblePages,i="prev"===t;return this._options.centerAlign?i?e-1:e+n:i?(e-1)*n:e*n+1},_convertToValidPage:function(t){var e=this._getLastPage();return t=Math.max(t,1),t=Math.min(t,e)},_paginate:function(t){var e=this._makeViewData(t||this._options.page);this._setCurrentPage(t),this._view.update(e)},_makeViewData:function(t){var e={},n=this._getLastPage(),i=this._getPageIndex(t),a=this._getPageIndex(n),o=this._getEdge(t);return e.leftPageNumber=o.left,e.rightPageNumber=o.right,e.prevMore=i>1,e.nextMore=i<a,e.page=t,e.currentPageIndex=t,e.lastPage=n,e.lastPageListIndex=n,e},_getEdge:function(t){var e,n,i,a=this._getLastPage(),o=this._options.visiblePages,s=this._getPageIndex(t);return this._options.centerAlign?(i=Math.floor(o/2),(n=(e=Math.max(t-i,1))+o-1)>a&&(e=Math.max(a-o+1,1),n=a)):(e=(s-1)*o+1,n=s*o,n=Math.min(n,a)),{left:e,right:n}},_onClickHandler:function(t,e){switch(t){case"first":e=1;break;case"prev":e=this._getRelativePage("prev");break;case"next":e=this._getRelativePage("next");break;case"prevMore":e=this._getMorePageIndex("prev");break;case"nextMore":e=this._getMorePageIndex("next");break;case"last":e=this._getLastPage();break;default:if(!e)return}this.movePageTo(e)},reset:function(t){s(t)&&(t=this._options.totalItems),this._options.totalItems=t,this._paginate(1)},movePageTo:function(t){t=this._convertToValidPage(t),this.invoke("beforeMove",{page:t})&&(this._paginate(t),this.fire("afterMove",{page:t}))},setTotalItems:function(t){this._options.totalItems=t},setItemsPerPage:function(t){this._options.itemsPerPage=t},getCurrentPage:function(){return this._currentPage||this._options.page}});i.mixin(l),t.exports=l},function(t,e,n){var i=n(0),a=n(14),o=n(4),s=n(16),r=n(2),c=n(5),u=n(3),l=/\s+/g;function p(){this.events=null,this.contexts=null}p.mixin=function(t){i(t.prototype,p.prototype)},p.prototype._getHandlerItem=function(t,e){var n={handler:t};return e&&(n.context=e),n},p.prototype._safeEvent=function(t){var e,n=this.events;return n||(n=this.events={}),t&&((e=n[t])||(e=[],n[t]=e),n=e),n},p.prototype._safeContext=function(){var t=this.contexts;return t||(t=this.contexts=[]),t},p.prototype._indexOfContext=function(t){for(var e=this._safeContext(),n=0;e[n];){if(t===e[n][0])return n;n+=1}return-1},p.prototype._memorizeContext=function(t){var e,n;a(t)&&(e=this._safeContext(),(n=this._indexOfContext(t))>-1?e[n][1]+=1:e.push([t,1]))},p.prototype._forgetContext=function(t){var e,n;a(t)&&(e=this._safeContext(),(n=this._indexOfContext(t))>-1&&(e[n][1]-=1,e[n][1]<=0&&e.splice(n,1)))},p.prototype._bindEvent=function(t,e,n){var i=this._safeEvent(t);this._memorizeContext(n),i.push(this._getHandlerItem(e,n))},p.prototype.on=function(t,e,n){var i=this;o(t)?(t=t.split(l),u(t,(function(t){i._bindEvent(t,e,n)}))):s(t)&&(n=e,u(t,(function(t,e){i.on(e,t,n)})))},p.prototype.once=function(t,e,n){var i=this;if(s(t))return n=e,void u(t,(function(t,e){i.once(e,t,n)}));this.on(t,(function a(){e.apply(n,arguments),i.off(t,a,n)}),n)},p.prototype._spliceMatches=function(t,e){var n,i=0;if(r(t))for(n=t.length;i<n;i+=1)!0===e(t[i])&&(t.splice(i,1),n-=1,i-=1)},p.prototype._matchHandler=function(t){var e=this;return function(n){var i=t===n.handler;return i&&e._forgetContext(n.context),i}},p.prototype._matchContext=function(t){var e=this;return function(n){var i=t===n.context;return i&&e._forgetContext(n.context),i}},p.prototype._matchHandlerAndContext=function(t,e){var n=this;return function(i){var a=t===i.handler,o=e===i.context,s=a&&o;return s&&n._forgetContext(i.context),s}},p.prototype._offByEventName=function(t,e){var n=this,i=c(e),a=n._matchHandler(e);t=t.split(l),u(t,(function(t){var e=n._safeEvent(t);i?n._spliceMatches(e,a):(u(e,(function(t){n._forgetContext(t.context)})),n.events[t]=[])}))},p.prototype._offByHandler=function(t){var e=this,n=this._matchHandler(t);u(this._safeEvent(),(function(t){e._spliceMatches(t,n)}))},p.prototype._offByObject=function(t,e){var n,i=this;this._indexOfContext(t)<0?u(t,(function(t,e){i.off(e,t)})):o(e)?(n=this._matchContext(t),i._spliceMatches(this._safeEvent(e),n)):c(e)?(n=this._matchHandlerAndContext(e,t),u(this._safeEvent(),(function(t){i._spliceMatches(t,n)}))):(n=this._matchContext(t),u(this._safeEvent(),(function(t){i._spliceMatches(t,n)})))},p.prototype.off=function(t,e){o(t)?this._offByEventName(t,e):arguments.length?c(t)?this._offByHandler(t):s(t)&&this._offByObject(t,e):(this.events={},this.contexts=[])},p.prototype.fire=function(t){this.invoke.apply(this,arguments)},p.prototype.invoke=function(t){var e,n,i,a;if(!this.hasListener(t))return!0;for(e=this._safeEvent(t),n=Array.prototype.slice.call(arguments,1),i=0;e[i];){if(!1===(a=e[i]).handler.apply(a.context,n))return!1;i+=1}return!0},p.prototype.hasListener=function(t){return this.getListenerLength(t)>0},p.prototype.getListenerLength=function(t){return this._safeEvent(t).length},t.exports=p},function(t,e,n){var i=n(1),a=n(15);t.exports=function(t){return!i(t)&&!a(t)}},function(t,e,n){t.exports=function(t){return null===t}},function(t,e,n){t.exports=function(t){return t===Object(t)}},function(t,e,n){t.exports=function(t,e,n){var i=0,a=t.length;for(n=n||null;i<a&&!1!==e.call(n,t[i],i,t);i+=1);}},function(t,e,n){var i=n(19);t.exports=function(t,e){var n=i(e.prototype);n.constructor=t,t.prototype=n}},function(t,e,n){t.exports=function(t){function e(){}return e.prototype=t,new e}},function(t,e,n){var i=n(3),a=n(7),o=n(21),s=n(22),r=n(24),c=n(25),u=n(0),l=n(4),p=n(28),f=n(9),h={page:'<a href="#" class="tui-page-btn">{{page}}</a>',currentPage:'<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',moveButton:'<a href="#" class="tui-page-btn tui-{{type}}"><span class="tui-ico-{{type}}">{{type}}</span></a>',disabledMoveButton:'<span class="tui-page-btn tui-is-disabled tui-{{type}}"><span class="tui-ico-{{type}}">{{type}}</span></span>',moreButton:'<a href="#" class="tui-page-btn tui-{{type}}-is-ellip"><span class="tui-ico-ellip">...</span></a>'},d=["first","prev","next","last"],g=["prev","next"],m=a({init:function(t,e,n){this._containerElement=null,this._firstItemClassName=e.firstItemClassName,this._lastItemClassName=e.lastItemClassName,this._template=u({},h,e.template),this._buttons={},this._enabledPageElements=[],this._setRootElement(t),this._setMoveButtons(),this._setDisabledMoveButtons(),this._setMoreButtons(),this._attachClickEvent(n)},_setRootElement:function(t){if(l(t)?t=document.getElementById(t)||document.querySelector(t):t.jquery&&(t=t[0]),!p(t))throw new Error("The container element is invalid.");this._containerElement=t},_setMoveButtons:function(){i(d,(function(t){this._buttons[t]=f.createElementByTemplate(this._template.moveButton,{type:t})}),this)},_setDisabledMoveButtons:function(){i(d,(function(t){var e="disabled"+f.capitalizeFirstLetter(t);this._buttons[e]=f.createElementByTemplate(this._template.disabledMoveButton,{type:t})}),this)},_setMoreButtons:function(){i(g,(function(t){var e=t+"More";this._buttons[e]=f.createElementByTemplate(this._template.moreButton,{type:t})}),this)},_getContainerElement:function(){return this._containerElement},_appendFirstButton:function(t){var e;e=t.page>1?this._buttons.first:this._buttons.disabledFirst,this._getContainerElement().appendChild(e)},_appendPrevButton:function(t){var e;e=t.currentPageIndex>1?this._buttons.prev:this._buttons.disabledPrev,this._getContainerElement().appendChild(e)},_appendNextButton:function(t){var e;e=t.currentPageIndex<t.lastPageListIndex?this._buttons.next:this._buttons.disabledNext,this._getContainerElement().appendChild(e)},_appendLastButton:function(t){var e;e=t.page<t.lastPage?this._buttons.last:this._buttons.disabledLast,this._getContainerElement().appendChild(e)},_appendPrevMoreButton:function(t){var e;t.prevMore&&(e=this._buttons.prevMore,c(e,this._firstItemClassName),this._getContainerElement().appendChild(e))},_appendNextMoreButton:function(t){var e;t.nextMore&&(e=this._buttons.nextMore,c(e,this._lastItemClassName),this._getContainerElement().appendChild(e))},_appendPages:function(t){var e,n,i=t.leftPageNumber,a=t.rightPageNumber;for(n=i;n<=a;n+=1)n===t.page?e=f.createElementByTemplate(this._template.currentPage,{page:n}):(e=f.createElementByTemplate(this._template.page,{page:n}),this._enabledPageElements.push(e)),n!==i||t.prevMore||c(e,this._firstItemClassName),n!==a||t.nextMore||c(e,this._lastItemClassName),this._getContainerElement().appendChild(e)},_attachClickEvent:function(t){var e=this._getContainerElement();s(e,"click",(function(e){var n,i,a=o(e);r(e),(i=this._getButtonType(a))||(n=this._getPageNumber(a)),t(i,n)}),this)},_getButtonType:function(t){var e,n=this._buttons;return i(n,(function(n,i){return!f.isContained(t,n)||(e=i,!1)}),this),e},_getPageNumber:function(t){var e,n=this._findPageElement(t);return n&&(e=parseInt(n.innerText,10)),e},_findPageElement:function(t){for(var e,n=0,i=this._enabledPageElements.length;n<i;n+=1)if(e=this._enabledPageElements[n],f.isContained(t,e))return e;return null},_empty:function(){this._enabledPageElements=[],i(this._buttons,(function(t,e){this._buttons[e]=t.cloneNode(!0)}),this),this._getContainerElement().innerHTML=""},update:function(t){this._empty(),this._appendFirstButton(t),this._appendPrevButton(t),this._appendPrevMoreButton(t),this._appendPages(t),this._appendNextMoreButton(t),this._appendNextButton(t),this._appendLastButton(t)}});t.exports=m},function(t,e,n){t.exports=function(t){return t.target||t.srcElement}},function(t,e,n){var i=n(4),a=n(3),o=n(23);function s(t,e,n,i){function s(e){n.call(i||t,e||window.event)}"addEventListener"in t?t.addEventListener(e,s):"attachEvent"in t&&t.attachEvent("on"+e,s),function(t,e,n,i){var s=o(t,e),r=!1;a(s,(function(t){return t.handler!==n||(r=!0,!1)})),r||s.push({handler:n,wrappedHandler:i})}(t,e,n,s)}t.exports=function(t,e,n,o){i(e)?a(e.split(/\s+/g),(function(e){s(t,e,n,o)})):a(e,(function(e,i){s(t,i,e,n)}))}},function(t,e,n){var i="_feEventKey";t.exports=function(t,e){var n,a=t[i];return a||(a=t[i]={}),(n=a[e])||(n=a[e]=[]),n}},function(t,e,n){t.exports=function(t){t.preventDefault?t.preventDefault():t.returnValue=!1}},function(t,e,n){var i=n(3),a=n(8),o=n(26),s=n(27);t.exports=function(t){var e,n=Array.prototype.slice.call(arguments,1),r=t.classList,c=[];r?i(n,(function(e){t.classList.add(e)})):((e=o(t))&&(n=[].concat(e.split(/\s+/),n)),i(n,(function(t){a(t,c)<0&&c.push(t)})),s(t,c))}},function(t,e,n){var i=n(1);t.exports=function(t){return t&&t.className?i(t.className.baseVal)?t.className:t.className.baseVal:""}},function(t,e,n){var i=n(2),a=n(1);t.exports=function(t,e){e=(e=i(e)?e.join(" "):e).replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,""),a(t.className.baseVal)?t.className=e:t.className.baseVal=e}},function(t,e,n){t.exports=function(t){return"object"==typeof HTMLElement?t&&(t instanceof HTMLElement||!!t.nodeType):!(!t||!t.nodeType)}},function(t,e,n){var i=n(8),a=n(3),o=n(2),s=n(4),r=n(0),c=/{{\s?|\s?}}/g,u=/^[a-zA-Z0-9_@]+\[[a-zA-Z0-9_@"']+\]$/,l=/\[\s?|\s?\]/,p=/^[a-zA-Z_]+\.[a-zA-Z_]+$/,f=/\./,h=/^["']\w+["']$/,d=/"|'/g,g=/^-?\d+\.?\d*$/,m={if:function(t,e,n){var i=function(t,e){var n=[t],i=[],o=0,s=0;return a(e,(function(t,a){0===t.indexOf("if")?o+=1:"/if"===t?o-=1:o||0!==t.indexOf("elseif")&&"else"!==t||(n.push("else"===t?["true"]:t.split(" ").slice(1)),i.push(e.slice(s,a)),s=a+1)})),i.push(e.slice(s)),{exps:n,sourcesInsideIf:i}}(t,e),o=!1,s="";return a(i.exps,(function(t,e){return(o=b(t,n))&&(s=x(i.sourcesInsideIf[e],n)),!o})),s},each:function(t,e,n){var i=b(t,n),s=o(i)?"@index":"@key",c={},u="";return a(i,(function(t,i){c[s]=i,c["@this"]=t,r(n,c),u+=x(e.slice(),n)})),u},with:function(t,e,n){var a=i("as",t),o=t[a+1],s=b(t.slice(0,a),n),c={};return c[o]=s,x(e,r(n,c))||""}},_=3==="a".split(/a/).length?function(t,e){return t.split(e)}:function(t,e){var n,i,a=[],o=0;for(e.global||(e=new RegExp(e,"g")),n=e.exec(t);null!==n;)i=n.index,a.push(t.slice(o,i)),o=i+n[0].length,n=e.exec(t);return a.push(t.slice(o)),a};function v(t,e){var n,i=e[t];return"true"===t?i=!0:"false"===t?i=!1:h.test(t)?i=t.replace(d,""):u.test(t)?i=v((n=t.split(l))[0],e)[v(n[1],e)]:p.test(t)?i=v((n=t.split(f))[0],e)[n[1]]:g.test(t)&&(i=parseFloat(t)),i}function y(t,e,n){for(var i,a,o,r,c=m[t],u=1,l=2,p=e[l];u&&s(p);)0===p.indexOf(t)?u+=1:0===p.indexOf("/"+t)&&(u-=1,i=l),p=e[l+=2];if(u)throw Error(t+" needs {{/"+t+"}} expression.");return e[0]=c(e[0].split(" ").slice(1),(a=0,o=i,(r=e.splice(a+1,o-a)).pop(),r),n),e}function b(t,e){var n=v(t[0],e);return n instanceof Function?function(t,e,n){var i=[];return a(e,(function(t){i.push(v(t,n))})),t.apply(null,i)}(n,t.slice(1),e):n}function x(t,e){for(var n,i,a,o=1,r=t[o];s(r);)i=(n=r.split(" "))[0],m[i]?(a=y(i,t.splice(o,t.length-o),e),t=t.concat(a)):t[o]=b(n,e),r=t[o+=2];return t.join("")}t.exports=function(t,e){return x(_(t,c),e)}},function(t,e,n){var i=n(1),a=n(31);t.exports=function(t,e){var n=location.hostname,o="TOAST UI "+t+" for "+n+": Statistics",s=window.localStorage.getItem(o);(i(window.tui)||!1!==window.tui.usageStatistics)&&(s&&!function(t){return(new Date).getTime()-t>6048e5}(s)||(window.localStorage.setItem(o,(new Date).getTime()),setTimeout((function(){"interactive"!==document.readyState&&"complete"!==document.readyState||a("https://www.google-analytics.com/collect",{v:1,t:"event",tid:e,cid:n,dp:n,dh:t,el:t,ec:"use"})}),1e3)))}},function(t,e,n){var i=n(6);t.exports=function(t,e){var n=document.createElement("img"),a="";return i(e,(function(t,e){a+="&"+e+"="+t})),a=a.substring(1),n.src=t+"?"+a,n.style.display="none",document.body.appendChild(n),document.body.removeChild(n),n}}])},a=i(),window.onload=(document.body.classList.add("loaded_hiding"),void window.setTimeout((function(){document.body.classList.add("loaded"),document.body.classList.remove("loaded_hiding")}),500));const o={pagination:document.querySelector(".tui-pagination"),movieList:document.querySelector(".card-list")},s=new(t(a))(o.pagination,{totalItems:0,itemsPerPage:20,visiblePages:5,page:1,centerAlign:!1,firstItemClassName:"tui-first-child",lastItemClassName:"tui-last-child",template:{page:'<a href="#" class="tui-page-btn">{{page}}</a>',currentPage:'<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',moveButton:'<a href="#" class="tui-page-btn tui-{{type}}"><span class="tui-ico-{{type}}">{{type}}</span></a>',disabledMoveButton:'<span class="tui-page-btn tui-is-disabled tui-{{type}}"><span class="tui-ico-{{type}}">{{type}}</span></span>',moreButton:'<a href="#" class="tui-page-btn tui-{{type}}-is-ellip"><span class="tui-ico-ellip">...</span></a>'}});s.getCurrentPage();async function r(t=1){return await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=cf961b1b89f4c4a28558be2b04fdd59a&page=${t}`).then((t=>{if(!t.ok)throw new Error("Network response was not OK");return t.json()})).then((t=>(s.reset(t.total_results),o.pagination.classList.remove("pagination-is-hidden"),t.results))).catch((t=>{console.error("There has been a problem with your fetch operation:",t)}))}async function c(t){const e=t.page;return await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=cf961b1b89f4c4a28558be2b04fdd59a&page=${e}`).then((t=>t.json())).then((t=>t.results)).then((t=>{o.movieList.innerHTML="",o.movieList.insertAdjacentHTML("beforeend",f(t))}))}s.on("afterMove",c);const u=new(t(a))(p.pagination,{totalItems:0,itemsPerPage:20,visiblePages:5,page:1,centerAlign:!1,firstItemClassName:"tui-first-child",lastItemClassName:"tui-last-child",template:{page:'<a href="#" class="tui-page-btn">{{page}}</a>',currentPage:'<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',moveButton:'<a href="#" class="tui-page-btn tui-{{type}}"><span class="tui-ico-{{type}}">{{type}}</span></a>',disabledMoveButton:'<span class="tui-page-btn tui-is-disabled tui-{{type}}"><span class="tui-ico-{{type}}">{{type}}</span></span>',moreButton:'<a href="#" class="tui-page-btn tui-{{type}}-is-ellip"><span class="tui-ico-ellip">...</span></a>'}}),l=u.getCurrentPage(),p={movieList:document.querySelector(".home"),pagination:document.querySelector(".tui-pagination")};function f(t,e){if(0!==t.length)return t.map((({title:t,poster_path:n,release_date:i,genre_ids:a})=>{let o=i.slice(0,4),s=[];for(let t of a){let n=e.find((({id:e})=>e===t));s.push(n.name)}return s.length>=3&&(s=[s[0],s[1],"Other"]),`<li class="card">\n  <a href="" class="card-link link">\n    <img class="card-img" src="https://image.tmdb.org/t/p/w500${n}" alt="${t}">\n    <h3 class="card-name">${t}</h3>\n    <div class="card-item">\n      <p class="card-genres">${s.join(", ")}</p>\n      <p class="card-year"><span class="card-line">|</span>${o}</p>\n    </div>\n  </a>\n</li>`})).join("")}(async function(){return await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=cf961b1b89f4c4a28558be2b04fdd59a").then((t=>{if(!t.ok)throw new Error("Network response was not OK");return t.json()})).then((t=>t.genres)).catch((t=>{console.error("There has been a problem with your fetch operation:",t)}))})().then((t=>{r(l).then((e=>{let n=f(e,t);p.movieList.insertAdjacentHTML("beforeend",n)}))})),u.on("afterMove",c);
//# sourceMappingURL=index.6bb51cd1.js.map
