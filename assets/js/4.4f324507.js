(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{306:function(t,n,e){"use strict";e.d(n,"d",(function(){return r})),e.d(n,"a",(function(){return u})),e.d(n,"i",(function(){return a})),e.d(n,"f",(function(){return s})),e.d(n,"g",(function(){return o})),e.d(n,"h",(function(){return c})),e.d(n,"b",(function(){return f})),e.d(n,"e",(function(){return h})),e.d(n,"k",(function(){return p})),e.d(n,"l",(function(){return d})),e.d(n,"c",(function(){return g})),e.d(n,"j",(function(){return m}));e(20),e(67),e(174),e(97),e(176),e(65),e(44),e(307),e(66),e(309),e(68);var r=/#.*$/,i=/\.(md|html)$/,u=/\/$/,a=/^[a-z]+:/i;function l(t){return decodeURI(t).replace(r,"").replace(i,"")}function s(t){return a.test(t)}function o(t){return/^mailto:/.test(t)}function c(t){return/^tel:/.test(t)}function f(t){if(s(t))return t;var n=t.match(r),e=n?n[0]:"",i=l(t);return u.test(i)?t:i+".html"+e}function h(t,n){var e=decodeURIComponent(t.hash),i=function(t){var n=t.match(r);if(n)return n[0]}(n);return(!i||e===i)&&l(t.path)===l(n)}function p(t,n,e){if(s(n))return{type:"external",path:n};e&&(n=function(t,n,e){var r=t.charAt(0);if("/"===r)return t;if("?"===r||"#"===r)return n+t;var i=n.split("/");e&&i[i.length-1]||i.pop();for(var u=t.replace(/^\//,"").split("/"),a=0;a<u.length;a++){var l=u[a];".."===l?i.pop():"."!==l&&i.push(l)}""!==i[0]&&i.unshift("");return i.join("/")}(n,e));for(var r=l(n),i=0;i<t.length;i++)if(l(t[i].regularPath)===r)return Object.assign({},t[i],{type:"page",path:f(t[i].path)});return console.error('[vuepress] No matching page found for sidebar item "'.concat(n,'"')),{}}function d(t,n,e,r){var i=e.pages,u=e.themeConfig,a=r&&u.locales&&u.locales[r]||u;if("auto"===(t.frontmatter.sidebar||a.sidebar||u.sidebar))return v(t);var l=a.sidebar||u.sidebar;if(l){var s=function(t,n){if(Array.isArray(n))return{base:"/",config:n};for(var e in n)if(0===(r=t,/(\.html|\/)$/.test(r)?r:r+"/").indexOf(encodeURI(e)))return{base:e,config:n[e]};var r;return{}}(n,l),o=s.base,c=s.config;return"auto"===c?v(t):c?c.map((function(t){return function t(n,e,r){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1;if("string"==typeof n)return p(e,n,r);if(Array.isArray(n))return Object.assign(p(e,n[0],r),{title:n[1]});var u=n.children||[];return 0===u.length&&n.path?Object.assign(p(e,n.path,r),{title:n.title}):{type:"group",path:n.path,title:n.title,sidebarDepth:n.sidebarDepth,initialOpenGroupIndex:n.initialOpenGroupIndex,children:u.map((function(n){return t(n,e,r,i+1)})),collapsable:!1!==n.collapsable}}(t,i,o)})):[]}return[]}function v(t){var n=g(t.headers||[]);return[{type:"group",collapsable:!1,title:t.title,path:null,children:n.map((function(n){return{type:"auto",title:n.title,basePath:t.path,path:t.path+"#"+n.slug,children:n.children||[]}}))}]}function g(t){var n;return(t=t.map((function(t){return Object.assign({},t)}))).forEach((function(t){2===t.level?n=t:n&&(n.children||(n.children=[])).push(t)})),t.filter((function(t){return 2===t.level}))}function m(t){return Object.assign(t,{type:t.items&&t.items.length?"links":"link"})}},307:function(t,n,e){"use strict";var r=e(171),i=e(6),u=e(14),a=e(25),l=e(172),s=e(173);r("match",1,(function(t,n,e){return[function(n){var e=a(this),r=null==n?void 0:n[t];return void 0!==r?r.call(n,e):new RegExp(n)[t](String(e))},function(t){var r=e(n,t,this);if(r.done)return r.value;var a=i(t),o=String(this);if(!a.global)return s(a,o);var c=a.unicode;a.lastIndex=0;for(var f,h=[],p=0;null!==(f=s(a,o));){var d=String(f[0]);h[p]=d,""===d&&(a.lastIndex=l(o,u(a.lastIndex),c)),p++}return 0===p?null:h}]}))},308:function(t,n,e){"use strict";e(170),e(69),e(310);var r=e(306),i={name:"NavLink",props:{item:{required:!0}},computed:{link:function(){return Object(r.b)(this.item.link)},exact:function(){var t=this;return this.$site.locales?Object.keys(this.$site.locales).some((function(n){return n===t.link})):"/"===this.link},isNonHttpURI:function(){return Object(r.g)(this.link)||Object(r.h)(this.link)},isBlankTarget:function(){return"_blank"===this.target},isInternal:function(){return!Object(r.f)(this.link)&&!this.isBlankTarget},target:function(){return this.isNonHttpURI?null:this.item.target?this.item.target:Object(r.f)(this.link)?"_blank":""},rel:function(){return this.isNonHttpURI||!1===this.item.rel?null:this.item.rel?this.item.rel:this.isBlankTarget?"noopener noreferrer":null}},methods:{focusoutAction:function(){this.$emit("focusout")}}},u=e(43),a=Object(u.a)(i,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return t.isInternal?e("RouterLink",{staticClass:"nav-link",attrs:{to:t.link,exact:t.exact},nativeOn:{focusout:function(n){return t.focusoutAction(n)}}},[t._v("\n  "+t._s(t.item.text)+"\n")]):e("a",{staticClass:"nav-link external",attrs:{href:t.link,target:t.target,rel:t.rel},on:{focusout:t.focusoutAction}},[t._v("\n  "+t._s(t.item.text)+"\n  "),t.isBlankTarget?e("OutboundLink"):t._e()],1)}),[],!1,null,null,null);n.a=a.exports},309:function(t,n,e){"use strict";var r=e(171),i=e(175),u=e(6),a=e(25),l=e(98),s=e(172),o=e(14),c=e(173),f=e(70),h=e(1),p=[].push,d=Math.min,v=!h((function(){return!RegExp(4294967295,"y")}));r("split",2,(function(t,n,e){var r;return r="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(t,e){var r=String(a(this)),u=void 0===e?4294967295:e>>>0;if(0===u)return[];if(void 0===t)return[r];if(!i(t))return n.call(r,t,u);for(var l,s,o,c=[],h=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),d=0,v=new RegExp(t.source,h+"g");(l=f.call(v,r))&&!((s=v.lastIndex)>d&&(c.push(r.slice(d,l.index)),l.length>1&&l.index<r.length&&p.apply(c,l.slice(1)),o=l[0].length,d=s,c.length>=u));)v.lastIndex===l.index&&v.lastIndex++;return d===r.length?!o&&v.test("")||c.push(""):c.push(r.slice(d)),c.length>u?c.slice(0,u):c}:"0".split(void 0,0).length?function(t,e){return void 0===t&&0===e?[]:n.call(this,t,e)}:n,[function(n,e){var i=a(this),u=null==n?void 0:n[t];return void 0!==u?u.call(n,i,e):r.call(String(i),n,e)},function(t,i){var a=e(r,t,this,i,r!==n);if(a.done)return a.value;var f=u(t),h=String(this),p=l(f,RegExp),g=f.unicode,m=(f.ignoreCase?"i":"")+(f.multiline?"m":"")+(f.unicode?"u":"")+(v?"y":"g"),b=new p(v?f:"^(?:"+f.source+")",m),_=void 0===i?4294967295:i>>>0;if(0===_)return[];if(0===h.length)return null===c(b,h)?[h]:[];for(var k=0,y=0,x=[];y<h.length;){b.lastIndex=v?y:0;var O,I=c(b,v?h:h.slice(y));if(null===I||(O=d(o(b.lastIndex+(v?0:y)),h.length))===k)y=s(h,y,g);else{if(x.push(h.slice(k,y)),x.length===_)return x;for(var j=1;j<=I.length-1;j++)if(x.push(I[j]),x.length===_)return x;y=k=O}}return x.push(h.slice(k)),x}]}),!v)},310:function(t,n,e){"use strict";var r=e(0),i=e(311);r({target:"String",proto:!0,forced:e(312)("link")},{link:function(t){return i(this,"a","href",t)}})},311:function(t,n,e){var r=e(25),i=/"/g;t.exports=function(t,n,e,u){var a=String(r(t)),l="<"+n;return""!==e&&(l+=" "+e+'="'+String(u).replace(i,"&quot;")+'"'),l+">"+a+"</"+n+">"}},312:function(t,n,e){var r=e(1);t.exports=function(t){return r((function(){var n=""[t]('"');return n!==n.toLowerCase()||n.split('"').length>3}))}},368:function(t,n,e){"use strict";e.r(n);e(31),e(46),e(67),e(44),e(66),e(68);var r=e(56),i={components:{NavLink:e(308).a},props:{payload:{type:Array,required:!0,validator:function(t){return t.forEach((function(t){return void 0!==t.key&&(void 0!==t.type&&(void 0!==t.required&&(void 0!==t.description&&(void 0!==t.example&&void 0))))})),"object"===Object(r.a)(t)}}},methods:{prepareTypeForUriHash:function(t){return t.url?t.url:"/docs/scheme/types.html#"+t.type.replace(/\[\]/g,"").toLowerCase()}}},u=e(43),a=Object(u.a)(i,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("table",[t._m(0),t._v(" "),e("tbody",t._l(this.payload,(function(n){return e("tr",[e("td",[t._v(t._s(n.key))]),t._v(" "),e("td",[e("NavLink",{attrs:{item:{link:t.prepareTypeForUriHash(n),text:n.type}}})],1),t._v(" "),e("td",{staticStyle:{"text-align":"center"}},[n.required?e("span",[t._v("Y")]):t._e()]),t._v(" "),e("td",[e("p",[t._v(t._s(n.description))]),t._v(" "),n.enumValues?[e("b",[t._v("Allowed values:")]),t._v(" "),e("ul",t._l(n.enumValues,(function(n){return e("li",[t._v("\n                        "+t._s(n)+"\n                    ")])})),0)]:t._e()],2)])})),0)])}),[function(){var t=this.$createElement,n=this._self._c||t;return n("thead",[n("tr",[n("th",[this._v("key")]),this._v(" "),n("th",[this._v("type")]),this._v(" "),n("th",[this._v("required")]),this._v(" "),n("th",[this._v("description")])])])}],!1,null,null,null);n.default=a.exports}}]);