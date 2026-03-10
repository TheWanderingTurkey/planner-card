function t(t,e,i,a){var o,s=arguments.length,n=s<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,a);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=window,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,a=Symbol(),o=new WeakMap;let s=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==a)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,a)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[a+1],t[0]);return new s(i,t,a)},r=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new s("string"==typeof t?t:t+"",void 0,a))(e)})(t):t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l;const d=window,c=d.trustedTypes,h=c?c.emptyScript:"",p=d.reactiveElementPolyfillSupport,u={toAttribute(t,e){switch(e){case Boolean:t=t?h:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},g=(t,e)=>e!==t&&(e==e||t==t),v={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:g},m="finalized";let _=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,i)=>{const a=this._$Ep(i,e);void 0!==a&&(this._$Ev.set(a,i),t.push(a))}),t}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,a=this.getPropertyDescriptor(t,i,e);void 0!==a&&Object.defineProperty(this.prototype,t,a)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(a){const o=this[t];this[e]=a,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||v}static finalize(){if(this.hasOwnProperty(m))return!1;this[m]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach(t=>t(this))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const a=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,a)=>{i?t.adoptedStyleSheets=a.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):a.forEach(i=>{const a=document.createElement("style"),o=e.litNonce;void 0!==o&&a.setAttribute("nonce",o),a.textContent=i.cssText,t.appendChild(a)})})(a,this.constructor.elementStyles),a}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=v){var a;const o=this.constructor._$Ep(t,i);if(void 0!==o&&!0===i.reflect){const s=(void 0!==(null===(a=i.converter)||void 0===a?void 0:a.toAttribute)?i.converter:u).toAttribute(e,i.type);this._$El=t,null==s?this.removeAttribute(o):this.setAttribute(o,s),this._$El=null}}_$AK(t,e){var i;const a=this.constructor,o=a._$Ev.get(t);if(void 0!==o&&this._$El!==o){const t=a.getPropertyOptions(o),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:u;this._$El=o,this[o]=s.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let a=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||g)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):a=!1),!this.isUpdatePending&&a&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((t,e)=>this[e]=t),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)}),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach(t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach((t,e)=>this._$EO(e,this[e],t)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var f;_[m]=!0,_.elementProperties=new Map,_.elementStyles=[],_.shadowRootOptions={mode:"open"},null==p||p({ReactiveElement:_}),(null!==(l=d.reactiveElementVersions)&&void 0!==l?l:d.reactiveElementVersions=[]).push("1.6.3");const y=window,$=y.trustedTypes,w=$?$.createPolicy("lit-html",{createHTML:t=>t}):void 0,b="$lit$",x=`lit$${(Math.random()+"").slice(9)}$`,A="?"+x,E=`<${A}>`,C=document,S=()=>C.createComment(""),k=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,D="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,M=/>/g,z=RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),P=/'/g,N=/"/g,H=/^(?:script|style|textarea|title)$/i,R=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),L=Symbol.for("lit-noChange"),I=Symbol.for("lit-nothing"),W=new WeakMap,j=C.createTreeWalker(C,129,null,!1);function F(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==w?w.createHTML(e):e}const V=(t,e)=>{const i=t.length-1,a=[];let o,s=2===e?"<svg>":"",n=U;for(let e=0;e<i;e++){const i=t[e];let r,l,d=-1,c=0;for(;c<i.length&&(n.lastIndex=c,l=n.exec(i),null!==l);)c=n.lastIndex,n===U?"!--"===l[1]?n=O:void 0!==l[1]?n=M:void 0!==l[2]?(H.test(l[2])&&(o=RegExp("</"+l[2],"g")),n=z):void 0!==l[3]&&(n=z):n===z?">"===l[0]?(n=null!=o?o:U,d=-1):void 0===l[1]?d=-2:(d=n.lastIndex-l[2].length,r=l[1],n=void 0===l[3]?z:'"'===l[3]?N:P):n===N||n===P?n=z:n===O||n===M?n=U:(n=z,o=void 0);const h=n===z&&t[e+1].startsWith("/>")?" ":"";s+=n===U?i+E:d>=0?(a.push(r),i.slice(0,d)+b+i.slice(d)+x+h):i+x+(-2===d?(a.push(void 0),e):h)}return[F(t,s+(t[i]||"<?>")+(2===e?"</svg>":"")),a]};class B{constructor({strings:t,_$litType$:e},i){let a;this.parts=[];let o=0,s=0;const n=t.length-1,r=this.parts,[l,d]=V(t,e);if(this.el=B.createElement(l,i),j.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(a=j.nextNode())&&r.length<n;){if(1===a.nodeType){if(a.hasAttributes()){const t=[];for(const e of a.getAttributeNames())if(e.endsWith(b)||e.startsWith(x)){const i=d[s++];if(t.push(e),void 0!==i){const t=a.getAttribute(i.toLowerCase()+b).split(x),e=/([.?@])?(.*)/.exec(i);r.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?Z:"?"===e[1]?Q:"@"===e[1]?X:K})}else r.push({type:6,index:o})}for(const e of t)a.removeAttribute(e)}if(H.test(a.tagName)){const t=a.textContent.split(x),e=t.length-1;if(e>0){a.textContent=$?$.emptyScript:"";for(let i=0;i<e;i++)a.append(t[i],S()),j.nextNode(),r.push({type:2,index:++o});a.append(t[e],S())}}}else if(8===a.nodeType)if(a.data===A)r.push({type:2,index:o});else{let t=-1;for(;-1!==(t=a.data.indexOf(x,t+1));)r.push({type:7,index:o}),t+=x.length-1}o++}}static createElement(t,e){const i=C.createElement("template");return i.innerHTML=t,i}}function q(t,e,i=t,a){var o,s,n,r;if(e===L)return e;let l=void 0!==a?null===(o=i._$Co)||void 0===o?void 0:o[a]:i._$Cl;const d=k(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(s=null==l?void 0:l._$AO)||void 0===s||s.call(l,!1),void 0===d?l=void 0:(l=new d(t),l._$AT(t,i,a)),void 0!==a?(null!==(n=(r=i)._$Co)&&void 0!==n?n:r._$Co=[])[a]=l:i._$Cl=l),void 0!==l&&(e=q(t,l._$AS(t,e.values),l,a)),e}class G{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:a}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:C).importNode(i,!0);j.currentNode=o;let s=j.nextNode(),n=0,r=0,l=a[0];for(;void 0!==l;){if(n===l.index){let e;2===l.type?e=new Y(s,s.nextSibling,this,t):1===l.type?e=new l.ctor(s,l.name,l.strings,this,t):6===l.type&&(e=new tt(s,this,t)),this._$AV.push(e),l=a[++r]}n!==(null==l?void 0:l.index)&&(s=j.nextNode(),n++)}return j.currentNode=C,o}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Y{constructor(t,e,i,a){var o;this.type=2,this._$AH=I,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=a,this._$Cp=null===(o=null==a?void 0:a.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=q(this,t,e),k(t)?t===I||null==t||""===t?(this._$AH!==I&&this._$AR(),this._$AH=I):t!==this._$AH&&t!==L&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>T(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==I&&k(this._$AH)?this._$AA.nextSibling.data=t:this.$(C.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:a}=t,o="number"==typeof a?this._$AC(t):(void 0===a.el&&(a.el=B.createElement(F(a.h,a.h[0]),this.options)),a);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.v(i);else{const t=new G(o,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new B(t)),e}T(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,a=0;for(const o of t)a===e.length?e.push(i=new Y(this.k(S()),this.k(S()),this,this.options)):i=e[a],i._$AI(o),a++;a<e.length&&(this._$AR(i&&i._$AB.nextSibling,a),e.length=a)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class K{constructor(t,e,i,a,o){this.type=1,this._$AH=I,this._$AN=void 0,this.element=t,this.name=e,this._$AM=a,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=I}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,a){const o=this.strings;let s=!1;if(void 0===o)t=q(this,t,e,0),s=!k(t)||t!==this._$AH&&t!==L,s&&(this._$AH=t);else{const a=t;let n,r;for(t=o[0],n=0;n<o.length-1;n++)r=q(this,a[i+n],e,n),r===L&&(r=this._$AH[n]),s||(s=!k(r)||r!==this._$AH[n]),r===I?t=I:t!==I&&(t+=(null!=r?r:"")+o[n+1]),this._$AH[n]=r}s&&!a&&this.j(t)}j(t){t===I?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class Z extends K{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===I?void 0:t}}const J=$?$.emptyScript:"";class Q extends K{constructor(){super(...arguments),this.type=4}j(t){t&&t!==I?this.element.setAttribute(this.name,J):this.element.removeAttribute(this.name)}}class X extends K{constructor(t,e,i,a,o){super(t,e,i,a,o),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=q(this,t,e,0))&&void 0!==i?i:I)===L)return;const a=this._$AH,o=t===I&&a!==I||t.capture!==a.capture||t.once!==a.once||t.passive!==a.passive,s=t!==I&&(a===I||o);o&&this.element.removeEventListener(this.name,this,a),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class tt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){q(this,t)}}const et=y.litHtmlPolyfillSupport;null==et||et(B,Y),(null!==(f=y.litHtmlVersions)&&void 0!==f?f:y.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var it,at;class ot extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var a,o;const s=null!==(a=null==i?void 0:i.renderBefore)&&void 0!==a?a:e;let n=s._$litPart$;if(void 0===n){const t=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;s._$litPart$=n=new Y(e.insertBefore(S(),t),t,void 0,null!=i?i:{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return L}}ot.finalized=!0,ot._$litElement$=!0,null===(it=globalThis.litElementHydrateSupport)||void 0===it||it.call(globalThis,{LitElement:ot});const st=globalThis.litElementPolyfillSupport;null==st||st({LitElement:ot}),(null!==(at=globalThis.litElementVersions)&&void 0!==at?at:globalThis.litElementVersions=[]).push("3.3.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const nt=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function rt(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):nt(t,e)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function lt(t){return rt({...t,state:!0})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var dt;null===(dt=window.HTMLSlotElement)||void 0===dt||dt.prototype.assignedElements;const ct=n`
	:host {
    display: block;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }

	ha-card {
		padding: 16px;
	}

	.empty-state {
		opacity: 0.5;
		font-style: italic;
		font-size: 0.9em;
		padding: 8px 4px;
		text-align: center;
	}

	.header {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 16px;
		gap: 12px;
	}

	/* Keeps the month and the view toggles on the same row */
	.header-left {
		display: flex;
		align-items: center;
		gap: 16px;
		flex-wrap: nowrap;
		justify-content: space-between;
	}

	.month-nav {
		display: flex;
		align-items: center;
		gap: 2px;
	}

	/* Reduce the padding on the arrows so they hug the text tighter */
	.month-nav .clickable-icon {
		padding: 4px;
	}

	/* Removed min-width, added a tiny margin to let it breathe naturally */
	.month-nav h2 {
		margin: 0 4px;
		font-size: 1.5rem;
		text-align: center;
		white-space: nowrap;
	}

	.toggles {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
		flex: 1;
		justify-content: flex-end;
	}

	.grid {
    display: grid;
    /* Use minmax(0, 1fr) to force perfectly equal columns regardless of content width */
    grid-template-columns: repeat(7, minmax(0, 1fr)); 
    gap: 4px;
    background: var(--divider-color, #e0e0e0);
    border: 1px solid var(--divider-color, #e0e0e0);
    border-radius: 8px;
    overflow: hidden;
  }

	.day-box {
		background-color: var(--card-background-color, #fff);
		padding: 6px;
		/* Increased padding */
		display: flex;
		flex-direction: column;
		gap: 4px;
		/* More space between events */
		position: relative;
		min-height: 110px;
	}

	/* =========================================
			DAY MODIFIERS (Today & Weekends)
			========================================= */

	/* Highlight today with the theme's primary color */
	.day-box.today {
		box-shadow: inset 0 0 0 2px var(--primary-color);
	}

	/* Make today's date badge pop */
	.day-box.today .date-badge {
		background-color: var(--primary-color);
		color: var(--text-primary-color, #ffffff);
	}

	/* Weekends get a subtle background shift (HA handles light/dark automatically) */
	.day-box.weekend {
		background-color: var(--secondary-background-color, rgba(128, 128, 128, 0.05));
	}

	.day-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 1.1em;
		font-weight: bold;
		margin-bottom: 6px;
	}

	/* NEW: Sticky footer for weather and add button */
	.day-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: auto;
		padding-top: 6px;
		min-height: 24px;
	}

	.weather-wrapper {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 1em;
		/* Larger weather text */
		opacity: 0.8;
	}

	.add-event-btn {
		cursor: pointer;
		opacity: 0.2;
		transition: opacity 0.2s;
	}

	.day-box:hover .add-event-btn {
		opacity: 1;
	}

	/* New wrapper to align the icon and the event box */
	.event-wrapper {
		display: flex;
		align-items: center;
		gap: 6px;
		/* Space between icon and box */
		width: 100%;
		cursor: pointer;
	}

	/* Wake badge specific styling */
	.wake-wrapper {
		display: flex;
		align-items: center;
		gap: 4px;
		cursor: pointer;
	}

	.wake-badge {
		font-size: 0.9em;
		font-weight: 600;
		white-space: nowrap;
		color: #ffffff;
		/* Forced white text */
		background: transparent;
		/* No background */
	}

	.clickable-icon {
		cursor: pointer;
		padding: 8px;
		opacity: 0.7;
		transition: opacity 0.2s;
	}

	.clickable-icon:hover {
		opacity: 1;
	}

	/* Dialog Styling */
	dialog {
		border: none;
		border-radius: 8px;
		padding: 20px;
		background: var(--card-background-color);
		color: var(--primary-text-color);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
		width: 320px;
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.5);
	}

	.dialog-row {
		margin-bottom: 12px;
		display: flex;
		flex-direction: column;
	}

	.dialog-row label {
		font-size: 1em;
		font-weight: bold;
	}

	.dialog-row select,
	.dialog-row input {
		padding: 8px;
		margin-top: 4px;
		font-size: 1em;
	}

	/* Larger inputs */
	button {
		padding: 8px 12px;
		font-size: 1em;
		cursor: pointer;
	}

	ha-chip {
		cursor: pointer !important;
		transition:
			opacity 0.2s ease,
			filter 0.2s ease;
	}

	ha-chip:hover {
		filter: brightness(1.3);
	}

	ha-chip[outline] {
		opacity: 0.4;
		filter: grayscale(1);
	}

	ha-chip ha-icon {
		--mdc-icon-size: 18px;
	}

	/* NEW: Dark gray circle for the date */
	.date-badge {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		background-color: #444444;
		/* Dark gray */
		color: #ffffff;
		/* White text for contrast */
		border-radius: 50%;
		font-size: 1.2em;
		/* Larger font */
		font-weight: bold;
	}

	/* UPDATED: Event item with smaller text and tighter padding */
	.event-item {
		flex: 1;
		min-width: 0;
		border-radius: 8px;
		padding: 3px 6px;
		/* Reduced vertical padding slightly */
		font-size: 0.85em;
		/* Reduced font size by approx 1pt */
		font-weight: 500;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		box-sizing: border-box;
	}

	/* --- VIEW TOGGLE BUTTONS --- */
	.view-toggles {
		display: flex;
		background: var(--secondary-background-color);
		border-radius: 8px;
		padding: 2px;
	}

	.view-toggles ha-icon {
		padding: 6px;
		border-radius: 6px;
		opacity: 0.4;
		cursor: pointer;
		transition: all 0.2s;
	}

	.view-toggles ha-icon:hover {
		opacity: 0.8;
	}

	.view-toggles ha-icon.active {
		opacity: 1;
		background: var(--card-background-color);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
	}

	.agenda-date-text {
		display: none;
		font-size: 1.1em;
		font-weight: bold;
	}

	/* =========================================
			LAYOUT: SQUEEZED (iPad Portrait)
			Compresses the grid to fit narrow screens
			========================================= */
	.layout-squeezed .date-badge {
		width: 22px;
		height: 22px;
		font-size: 0.9em;
	}

	.layout-squeezed .day-box {
		padding: 4px;
	}

	.layout-squeezed .event-item {
		font-size: 0.7em;
		padding: 2px;
	}

	.layout-squeezed .weather-wrapper span {
		font-size: 0.8em;
	}

	.layout-squeezed ha-icon {
		--mdc-icon-size: 14px !important;
		min-width: 14px;
	}

	/* =========================================
			LAYOUT: AGENDA (iPhone Portrait)
			Destroys the grid, creates a vertical list
			========================================= */
	.layout-agenda .grid {
		display: flex;
		flex-direction: column;
		gap: 12px;
		background: transparent;
		border: none;
		max-height: 65vh;
		/* Locks the height so it scrolls internally */
		overflow-y: auto;
		/* Enables vertical scrolling */
		padding-right: 8px;
		/* Adds a little breathing room for the scrollbar */
	}

	/* Style the scrollbar to match the slick HA interface */
	.layout-agenda .grid::-webkit-scrollbar {
		width: 6px;
	}

	.layout-agenda .grid::-webkit-scrollbar-thumb {
		background: var(--divider-color);
		border-radius: 3px;
	}

	.layout-agenda .day-box {
		border: 1px solid var(--divider-color);
		border-radius: 12px;
		padding: 16px;
		min-height: unset;
		/* Strip away the 110px minimum from the desktop grid */
		height: fit-content;
		/* Hug the content tightly */
	}

	/* Keep your existing .layout-agenda rules below this... */
	.layout-agenda .agenda-date-text {
		display: block;
	}

	.layout-agenda .day-header {
		border-bottom: 1px solid var(--divider-color);
		padding-bottom: 12px;
		margin-bottom: 12px;
	}

	.layout-agenda .event-item {
		font-size: 1.05em;
		padding: 8px 12px;
	}

	.layout-agenda .event-wrapper {
		margin-bottom: 6px;
	}

	.layout-agenda .day-footer {
		margin-top: 16px;
	}

	/* Agenda Overrides for the Header */
	.layout-agenda .header {
		flex-direction: column;
		/* Forces the two sections to stack vertically */
		align-items: flex-start;
		gap: 12px;
	}

	.layout-agenda .header-left {
		width: 100%;
		gap: 4px;
	}

	.layout-agenda .month-nav h2 {
		font-size: 1.25rem;
	}

	.layout-agenda .view-toggles ha-icon {
		padding: 4px;
		--mdc-icon-size: 20px;
	}

	.layout-agenda .toggles {
		width: 100%;
		/* Ensures the chips take up the full width of the new row */
		justify-content: flex-start;
	}
`;function ht(t){const e=new Date(t),i=e.getDay(),a=e.getDate()-i;return new Date(e.setDate(a))}function pt(t){return t.toISOString().split("T")[0]}class ut extends ot{constructor(){super(...arguments),this._showAddCalendar=!1,this._selectedNewCalendar=""}setConfig(t){this._config=t}_configChanged(t){const e=new Event("config-changed",{bubbles:!0,composed:!0});e.detail={config:t},this.dispatchEvent(e)}_weatherChanged(t){this._config&&this.hass&&this._configChanged({...this._config,weather_entity:t.detail.value})}_newCalendarPicked(t){this._selectedNewCalendar=t.detail.value}_confirmAddCalendar(){if(!this._selectedNewCalendar)return;const t=this._selectedNewCalendar,e=[...this._config.calendars||[]];e.includes(t)||(e.push(t),this._configChanged({...this._config,calendars:e})),this._selectedNewCalendar="",this._showAddCalendar=!1}_cancelAddCalendar(){this._selectedNewCalendar="",this._showAddCalendar=!1}_removeCalendar(t){const e=[...this._config.calendars];e.splice(t,1),this._configChanged({...this._config,calendars:e})}_moveCalendar(t,e){const i=[...this._config.calendars];if(t+e<0||t+e>=i.length)return;const a=i[t];i[t]=i[t+e],i[t+e]=a,this._configChanged({...this._config,calendars:i})}_updateColor(t,e){const i={...this._config.colors||{}};i[t]=e,this._configChanged({...this._config,colors:i})}render(){if(!this.hass||!this._config)return R``;const t=this._config.calendars||[];return R`
      <div class="card-config">
        
        <div class="section">
          <h3>Weather Entity</h3>
          <ha-selector
            .hass=${this.hass}
            .selector=${{entity:{domain:"weather"}}}
            .value=${this._config.weather_entity}
            @value-changed=${this._weatherChanged}
          ></ha-selector>
        </div>

        <div class="section">
          <h3>Calendars & Colors</h3>
          
          ${this._showAddCalendar?R`
            <div class="add-calendar-box">
              <ha-selector
                .hass=${this.hass}
                .selector=${{entity:{domain:"calendar"}}}
                .value=${this._selectedNewCalendar}
                @value-changed=${this._newCalendarPicked}
              ></ha-selector>
              <div class="add-actions">
                <button class="btn cancel" @click=${this._cancelAddCalendar}>Cancel</button>
                <button class="btn add" ?disabled=${!this._selectedNewCalendar} @click=${this._confirmAddCalendar}>Add</button>
              </div>
            </div>
          `:R`
            <button class="btn add-new" @click=${()=>this._showAddCalendar=!0}>
              <ha-icon icon="mdi:plus" style="--mdc-icon-size: 20px;"></ha-icon> Add Calendar
            </button>
          `}

          <div class="calendar-list">
            ${t.map((e,i)=>{var a,o;const s=(null===(a=this.hass.states[e])||void 0===a?void 0:a.attributes.friendly_name)||e,n=(null===(o=this._config.colors)||void 0===o?void 0:o[e])||"#4caf50";return R`
                <div class="calendar-item">
                  <input 
                    type="color" 
                    title="Choose Color"
                    .value=${n} 
                    @input=${t=>this._updateColor(e,t.target.value)} 
                  />
                  
                  <div class="name" title="${e}">${s}</div>
                  
                  <div class="controls">
                    <ha-icon 
                      class="icon-btn" 
                      icon="mdi:arrow-up" 
                      @click=${()=>this._moveCalendar(i,-1)}
                      style="visibility: ${0===i?"hidden":"visible"}">
                    </ha-icon>
                    
                    <ha-icon 
                      class="icon-btn" 
                      icon="mdi:arrow-down" 
                      @click=${()=>this._moveCalendar(i,1)}
                      style="visibility: ${i===t.length-1?"hidden":"visible"}">
                    </ha-icon>
                    
                    <ha-icon 
                      class="icon-btn delete" 
                      icon="mdi:delete" 
                      @click=${()=>this._removeCalendar(i)}>
                    </ha-icon>
                  </div>
                </div>
              `})}
          </div>
        </div>

      </div>
    `}}ut.styles=n`
    .card-config { display: flex; flex-direction: column; gap: 24px; }
    .section h3 { margin: 0 0 8px 0; font-size: 1.1em; color: var(--primary-text-color); }
    
    /* --- NEW BUTTON & ADD BOX STYLES --- */
    .btn {
      background: var(--primary-color);
      color: var(--text-primary-color);
      border: none;
      border-radius: 4px;
      padding: 8px 16px;
      cursor: pointer;
      font-weight: 500;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .btn:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn.cancel { background: transparent; color: var(--primary-text-color); border: 1px solid var(--divider-color); }
    .btn.add-new { 
      background: transparent; 
      color: var(--primary-color); 
      border: 1px solid var(--primary-color); 
      width: 100%; 
      justify-content: center; 
      margin-bottom: 8px;
    }
    .add-calendar-box {
      border: 1px solid var(--divider-color);
      padding: 12px;
      border-radius: 8px;
      margin-bottom: 12px;
      background: var(--secondary-background-color);
    }
    .add-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 12px; }
    /* ----------------------------------- */

    .calendar-list { display: flex; flex-direction: column; gap: 8px; }
    .calendar-item {
      display: flex; align-items: center; gap: 12px;
      background: var(--secondary-background-color);
      padding: 8px 12px; border-radius: 8px;
      border: 1px solid var(--divider-color);
    }
    input[type="color"] { border: none; width: 28px; height: 28px; padding: 0; border-radius: 4px; cursor: pointer; background: transparent; }
    input[type="color"]::-webkit-color-swatch-wrapper { padding: 0; }
    input[type="color"]::-webkit-color-swatch { border: 1px solid rgba(0,0,0,0.2); border-radius: 4px; }
    .name { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-weight: 500; color: var(--primary-text-color); }
    .controls { display: flex; gap: 4px; }
    .icon-btn { cursor: pointer; color: var(--secondary-text-color); padding: 4px; border-radius: 4px; transition: background 0.2s, color 0.2s; }
    .icon-btn:hover { background: rgba(128, 128, 128, 0.1); color: var(--primary-text-color); }
    .icon-btn.delete:hover { color: #ff5252; background: rgba(255, 82, 82, 0.1); }
  `,t([rt({attribute:!1})],ut.prototype,"hass",void 0),t([lt()],ut.prototype,"_config",void 0),t([lt()],ut.prototype,"_showAddCalendar",void 0),t([lt()],ut.prototype,"_selectedNewCalendar",void 0),customElements.define("meal-activity-planner-editor",ut),window.customCards=window.customCards||[],window.customCards.push({type:"meal-activity-planner",name:"Meal & Activity Planner",description:"A 5-week planner for meals, chores, and activities."});let gt=class extends ot{constructor(){super(...arguments),this._forceViewMode="auto",this._cardWidth=0,this._currentDate=new Date,this._hiddenCalendars=new Set,this._events={},this._weatherForecast=[],this._dialogDate="",this._dialogCalendar="",this._dialogSummary="",this._dialogStartTime="12:00",this._dialogEndTime="13:00",this._dialogEventUid="",this._isAllDayType=!1,this._isCustomEvent=!1,this._hasScrolledToToday=!1}get _effectiveLayout(){return"auto"!==this._forceViewMode?this._forceViewMode:0===this._cardWidth?"desktop":this._cardWidth<500?"agenda":this._cardWidth<800?"squeezed":"desktop"}static getConfigElement(){return document.createElement("meal-activity-planner-editor")}setConfig(t){if(!t.calendars)throw new Error("Please define calendars.");this.config={...t}}connectedCallback(){super.connectedCallback(),this._fetchData(),this._refreshInterval=window.setInterval(()=>{this._fetchData()},6e4)}firstUpdated(t){var e;super.firstUpdated&&super.firstUpdated(t);const i=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector("ha-card");i&&(this._resizeObserver=new ResizeObserver(t=>{const e=t[0].contentRect.width;e>0&&this._cardWidth!==e&&(this._cardWidth=e)}),this._resizeObserver.observe(i))}disconnectedCallback(){this._refreshInterval&&clearInterval(this._refreshInterval),this._resizeObserver&&this._resizeObserver.disconnect(),super.disconnectedCallback()}updated(t){var e;if(super.updated(t),"agenda"===this._effectiveLayout){if(!this._hasScrolledToToday){const t=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector(".day-box.today");t&&(setTimeout(()=>{t.scrollIntoView({behavior:"smooth",block:"start"})},150),this._hasScrolledToToday=!0)}}else this._hasScrolledToToday=!1}async _fetchData(){await this._fetchWeather();const t=ht(new Date(this._currentDate.getFullYear(),this._currentDate.getMonth(),1)),e=new Date(t);e.setDate(t.getDate()+35);const i=t.toISOString(),a=e.toISOString();let o=[];for(const t of this.config.calendars)if(!this._hiddenCalendars.has(t))try{const e=await this.hass.callApi("GET",`calendars/${t}?start=${i}&end=${a}`);e.forEach(e=>e.calendar_id=t),o=[...o,...e]}catch(e){console.error("Failed to fetch calendar",t,e)}const s={};o.forEach(t=>{const e=t.start.date||t.start.dateTime.split("T")[0];s[e]||(s[e]=[]),s[e].push(t)}),this._events=s}async _fetchWeather(){var t;if(!this.config.weather_entity)return;const e=async t=>await this.hass.callWS({type:"call_service",domain:"weather",service:"get_forecasts",service_data:{type:t},target:{entity_id:this.config.weather_entity},return_response:!0});try{let i;try{i=await e("daily")}catch(t){if(!t.message||!t.message.includes("does not support 'daily'"))throw t;console.log(`Weather entity ${this.config.weather_entity} requires twice_daily.`),i=await e("twice_daily")}this._weatherForecast=(null===(t=i.response[this.config.weather_entity])||void 0===t?void 0:t.forecast)||[],this.requestUpdate()}catch(t){console.error("Weather fetch failed. Error:",t)}}_changeMonth(t){this._currentDate.setMonth(this._currentDate.getMonth()+t),this._currentDate=new Date(this._currentDate),this._fetchData()}_toggleCalendar(t){this._hiddenCalendars.has(t)?this._hiddenCalendars.delete(t):this._hiddenCalendars.add(t),this.requestUpdate(),this._fetchData()}_updateCalendarSelection(t){this._dialogCalendar=t;const e=t.toLowerCase();this._isAllDayType=["food","meal","activit","chore"].some(t=>e.includes(t)),this._isCustomEvent=!1}_openDialog(t){this._dialogDate=t,this._dialogSummary="",this._dialogEventUid="",this._dialogStartTime="12:00",this._dialogEndTime="13:00",this._updateCalendarSelection(this.config.calendars[0]),this._dialog.showModal()}_openEditDialog(t,e){var i,a;this._dialogDate=e,this._dialogCalendar=t.calendar_id,this._dialogSummary=t.summary,this._dialogEventUid=t.uid||t.id,this._updateCalendarSelection(t.calendar_id);const o=t.calendar_id.toLowerCase();let s="";if(o.includes("meal")||o.includes("food")?s="input_select.meals":o.includes("activit")&&(s="input_select.activities"),s&&this.hass.states[s]){const e=this.hass.states[s].attributes.options||[];t.summary&&!e.includes(t.summary)&&(this._isCustomEvent=!0)}if(!this._isAllDayType&&(null===(i=t.start)||void 0===i?void 0:i.dateTime)){const e=new Date(t.start.dateTime),i=new Date((null===(a=t.end)||void 0===a?void 0:a.dateTime)||t.start.dateTime);this._dialogStartTime=e.toTimeString().slice(0,5),this._dialogEndTime=i.toTimeString().slice(0,5)}else this._dialogStartTime="12:00",this._dialogEndTime="13:00";this._dialog.showModal()}_closeDialog(){this._dialog.close()}async _saveEvent(){const t=this._dialogCalendar.toLowerCase().includes("wake"),e=t?"Wake up":this._dialogSummary;if(t){const t=new Date(`${this._dialogDate}T${this._dialogStartTime}:00`),e=new Date(t.getTime()+36e5);this._dialogEndTime=e.toTimeString().slice(0,5)}const[i,a,o]=this._dialogDate.split("-").map(Number),s=new Date(i,a-1,o+1),n=`${s.getFullYear()}-${String(s.getMonth()+1).padStart(2,"0")}-${String(s.getDate()).padStart(2,"0")}`;if(this._dialogEventUid){const t={summary:e};if(this._isAllDayType)t.dtstart=this._dialogDate,t.dtend=n;else{const e=new Date(`${this._dialogDate}T${this._dialogStartTime}:00`),i=new Date(`${this._dialogDate}T${this._dialogEndTime}:00`);t.dtstart=e.toISOString(),t.dtend=i.toISOString()}await this.hass.callWS({type:"calendar/event/update",entity_id:this._dialogCalendar,uid:this._dialogEventUid,event:t})}else{const t={entity_id:this._dialogCalendar,summary:e};this._isAllDayType?(t.start_date=this._dialogDate,t.end_date=n):(t.start_date_time=`${this._dialogDate} ${this._dialogStartTime}:00`,t.end_date_time=`${this._dialogDate} ${this._dialogEndTime}:00`),await this.hass.callService("calendar","create_event",t)}this._closeDialog(),setTimeout(()=>this._fetchData(),1e3)}async _deleteEvent(){if(this._dialogEventUid){try{await this.hass.callWS({type:"calendar/event/delete",entity_id:this._dialogCalendar,uid:this._dialogEventUid})}catch(t){console.error("Failed to delete event:",t)}this._closeDialog(),setTimeout(()=>this._fetchData(),1e3)}}render(){const t="agenda"===this._effectiveLayout?"short":"long";return R`
			<ha-card>
				<div class="header">
					<div class="header-left">
						<div class="month-nav">
							<ha-icon icon="mdi:chevron-left" class="clickable-icon" @click=${()=>this._changeMonth(-1)}></ha-icon>
							<h2>${this._currentDate.toLocaleString("default",{month:t,year:"numeric"})}</h2>
							<ha-icon icon="mdi:chevron-right" class="clickable-icon" @click=${()=>this._changeMonth(1)}></ha-icon>
						</div>

						<div class="view-toggles">
							<ha-icon
								icon="mdi:monitor-cellphone"
								class="${"auto"===this._forceViewMode?"active":""}"
								@click=${()=>this._forceViewMode="auto"}
								title="Auto Responsive"></ha-icon>
							<ha-icon
								icon="mdi:calendar-month"
								class="${"desktop"===this._forceViewMode?"active":""}"
								@click=${()=>this._forceViewMode="desktop"}
								title="Desktop Grid"></ha-icon>
							<ha-icon
								icon="mdi:view-column"
								class="${"squeezed"===this._forceViewMode?"active":""}"
								@click=${()=>this._forceViewMode="squeezed"}
								title="Squeezed Grid"></ha-icon>
							<ha-icon
								icon="mdi:view-agenda"
								class="${"agenda"===this._forceViewMode?"active":""}"
								@click=${()=>this._forceViewMode="agenda"}
								title="Agenda List"></ha-icon>
						</div>
					</div>

					<div class="toggles">
						${[...this.config.calendars].filter(t=>!t.toLowerCase().includes("wake")).sort((t,e)=>{var i,a;const o=(null===(i=this.hass.states[t])||void 0===i?void 0:i.attributes.friendly_name)||t,s=(null===(a=this.hass.states[e])||void 0===a?void 0:a.attributes.friendly_name)||e;return o.localeCompare(s)}).map(t=>{var e,i,a;const o=this.config.calendars.indexOf(t),s=["#F44336","#E91E63","#9C27B0","#3F51B5","#03A9F4","#009688","#FF9800","#795548"],n=(null===(e=this.config.colors)||void 0===e?void 0:e[t])||s[o%s.length]||"#4caf50",r=this._hiddenCalendars.has(t);return R`
									<ha-chip
										?outline=${r}
										style="--ha-chip-background-color: transparent; --ha-chip-text-color: ${n}; color: ${n};"
										@click=${()=>this._toggleCalendar(t)}>
										<ha-icon slot="icon" .icon=${(null===(i=this.hass.states[t])||void 0===i?void 0:i.attributes.icon)||"mdi:calendar"} style="color: ${n} !important;"></ha-icon>
										${null===(a=this.hass.states[t])||void 0===a?void 0:a.attributes.friendly_name}
									</ha-chip>
								`})}
					</div>
				</div>

				<div class="layout-${this._effectiveLayout}">
					<div class="grid">${this._renderGrid()}</div>
				</div>

				<dialog id="eventDialog">
					<h3>${this._dialogEventUid?"Edit Event":"Add Event"} for ${this._dialogDate}</h3>

					<div class="dialog-row">
						<label>Calendar</label>
						<select
							@change=${t=>{this._updateCalendarSelection(t.target.value),this._dialogSummary=""}}
							.value=${this._dialogCalendar}
							?disabled=${""!==this._dialogEventUid}>
							${[...this.config.calendars].sort((t,e)=>{var i,a;const o=(null===(i=this.hass.states[t])||void 0===i?void 0:i.attributes.friendly_name)||t,s=(null===(a=this.hass.states[e])||void 0===a?void 0:a.attributes.friendly_name)||e;return o.localeCompare(s)}).map(t=>{var e;return R`<option value="${t}">${(null===(e=this.hass.states[t])||void 0===e?void 0:e.attributes.friendly_name)||t}</option>`})}
						</select>
					</div>

					${(()=>{const t=this._dialogCalendar.toLowerCase().includes("wake");return R`
							${t?"":R`
										<div class="dialog-row">
											<label>Event / Meal</label>
											${this._renderDynamicInput()}
										</div>
									`}
							${this._isAllDayType?"":R`
										<div class="dialog-row" style="display:flex; flex-direction:row; gap:8px;">
											<div style="flex:1; display:flex; flex-direction:column;">
												<label>Start Time</label>
												<input type="time" .value=${this._dialogStartTime} @input=${t=>this._dialogStartTime=t.target.value} />
											</div>

											${t?"":R`
														<div style="flex:1; display:flex; flex-direction:column;">
															<label>End Time</label>
															<input type="time" .value=${this._dialogEndTime} @input=${t=>this._dialogEndTime=t.target.value} />
														</div>
													`}
										</div>
									`}
						`})()}

					<div style="display:flex; justify-content:space-between; margin-top:16px;">
						<div>
							${this._dialogEventUid?R`<button @click=${this._deleteEvent} style="color: #ff5252; border-color: #ff5252; background: transparent;">Delete</button>`:""}
						</div>
						<div style="display:flex; gap:8px;">
							<button @click=${this._closeDialog} style="background: transparent; border: 1px solid var(--divider-color); color: var(--primary-text-color);">Cancel</button>
							<button @click=${this._saveEvent} style="background: var(--primary-color); color: var(--text-primary-color); border: none;">Save</button>
						</div>
					</div>
				</dialog>
			</ha-card>
		`}_renderDynamicInput(){const t=this._dialogCalendar.toLowerCase();let e="";if(t.includes("meal")||t.includes("food")?e="input_select.meals":t.includes("activit")&&(e="input_select.activities"),e&&this.hass.states[e]){const t=this.hass.states[e].attributes.options||[],i=t=>{"__CUSTOM__"===t.target.value?(this._isCustomEvent=!0,this._dialogSummary=""):(this._isCustomEvent=!1,this._dialogSummary=t.target.value)};return R`
				<div style="display: flex; flex-direction: column; gap: 8px;">
					<select @change=${i} .value=${this._isCustomEvent?"__CUSTOM__":this._dialogSummary}>
						<option value="" disabled selected>Select an option...</option>
						${t.map(t=>R`<option value="${t}">${t}</option>`)}
						<option value="__CUSTOM__">Custom...</option>
					</select>

					${this._isCustomEvent?R` <input type="text" .value=${this._dialogSummary} @input=${t=>this._dialogSummary=t.target.value} placeholder="Type custom event name..." /> `:""}
				</div>
			`}return R` <input type="text" .value=${this._dialogSummary} @input=${t=>this._dialogSummary=t.target.value} placeholder="Enter event title..." /> `}_getWeatherIcon(t){return{"clear-night":"mdi:weather-night",cloudy:"mdi:weather-cloudy",exceptional:"mdi:alert-circle-outline",fog:"mdi:weather-fog",hail:"mdi:weather-hail",lightning:"mdi:weather-lightning","lightning-rainy":"mdi:weather-lightning-rainy",partlycloudy:"mdi:weather-partly-cloudy",pouring:"mdi:weather-pouring",rainy:"mdi:weather-rainy",snowy:"mdi:weather-snowy","snowy-rainy":"mdi:weather-snowy-rainy",sunny:"mdi:weather-sunny",windy:"mdi:weather-windy","windy-variant":"mdi:weather-windy-variant"}[t]||"mdi:weather-partly-cloudy"}_formatTime(t){if(!t)return"";return new Date(t).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"})}_renderGrid(){var t,e,i,a,o;let s=ht(new Date(this._currentDate.getFullYear(),this._currentDate.getMonth(),1));const n=["#F44336","#E91E63","#9C27B0","#3F51B5","#03A9F4","#009688","#FF9800","#795548"],r=[],l=(null===(e=null===(t=this.hass)||void 0===t?void 0:t.config)||void 0===e?void 0:e.time_zone)||Intl.DateTimeFormat().resolvedOptions().timeZone,d=new Intl.DateTimeFormat("en-US",{timeZone:l,year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date),c=null===(i=d.find(t=>"year"===t.type))||void 0===i?void 0:i.value,h=null===(a=d.find(t=>"month"===t.type))||void 0===a?void 0:a.value,p=null===(o=d.find(t=>"day"===t.type))||void 0===o?void 0:o.value,u=`${c}-${h}-${p}`;for(let t=0;t<35;t++){const t=pt(s);let e=this._events[t]||[];const i=this._weatherForecast.filter(e=>e.datetime.includes(t));let a=null,o=null,l="";if(i.length>0){l=i[0].condition;const t=i.map(t=>t.temperature);a=Math.max(...t),i.length>1&&(o=Math.min(...t))}const d=0===s.getDay()||6===s.getDay(),c=t===u,h=e.filter(t=>t.calendar_id.toLowerCase().includes("wake"));e=e.filter(t=>!t.calendar_id.toLowerCase().includes("wake")),e.sort((t,e)=>{const i=void 0!==t.start.date,a=void 0!==e.start.date;if(i&&!a)return-1;if(!i&&a)return 1;if(!i&&!a){const i=new Date(t.start.dateTime).getTime(),a=new Date(e.start.dateTime).getTime();if(i!==a)return i-a}return this.config.calendars.indexOf(t.calendar_id)-this.config.calendars.indexOf(e.calendar_id)}),r.push(R`
				<div class="day-box ${c?"today":""} ${d?"weekend":""}">
					<div class="day-header">
						<div style="display:flex; align-items:center; gap: 8px;">
							<div class="date-badge">${s.getDate()}</div>
							<div class="agenda-date-text">${s.toLocaleDateString("default",{weekday:"long",month:"long",day:"numeric"})}</div>
						</div>

						<div style="display:flex; align-items:center; gap: 4px; flex-wrap: wrap;">
							${null!==a?R`
										<div class="weather-wrapper">
											<ha-icon icon=${this._getWeatherIcon(l)} style="--mdc-icon-size: 18px;"></ha-icon>
											<span> ${a}°${null!==o?R`<span style="opacity: 0.6; font-size: 0.9em;">/${o}°</span>`:""} </span>
										</div>
									`:""}
						</div>
					</div>

					<div style="display:flex; flex-direction:column; gap:2px;">
						${0===e.length?R` <div class="empty-state">No events scheduled</div> `:""}
						${e.map(e=>{var i,a;const o=this.config.calendars.indexOf(e.calendar_id),s=(null===(i=this.config.colors)||void 0===i?void 0:i[e.calendar_id])||n[o%n.length]||"#4caf50",r=(null===(a=this.hass.states[e.calendar_id])||void 0===a?void 0:a.attributes.icon)||"mdi:calendar",l=["food","meals","activities","chores"].some(t=>e.calendar_id.toLowerCase().includes(t));let d=e.summary;if(!l&&e.start.dateTime){d=`${this._formatTime(e.start.dateTime)} ${e.summary}`}return R`
								<div
									class="event-wrapper"
									@click=${i=>{i.stopPropagation(),this._openEditDialog(e,t)}}>
									<ha-icon icon="${r}" style="color: ${s}; --mdc-icon-size: 18px; min-width: 18px;"></ha-icon>
									<div class="event-item" title="${d}" style="background-color: color-mix(in srgb, ${s} 50%, transparent); color: var(--primary-text-color);">
										${d}
									</div>
								</div>
							`})}
					</div>

					<div class="day-footer">
						<div style="display:flex; align-items:center; gap: 4px; flex-wrap: wrap;">
							${h.map(e=>{var i,a;const o=this.config.calendars.indexOf(e.calendar_id),s=(null===(i=this.config.colors)||void 0===i?void 0:i[e.calendar_id])||n[o%n.length]||"#4caf50",r=(null===(a=this.hass.states[e.calendar_id])||void 0===a?void 0:a.attributes.icon)||"mdi:weather-sunset-up",l=e.start.dateTime?this._formatTime(e.start.dateTime):"Wake";return R`
									<div
										class="wake-wrapper"
										@click=${i=>{i.stopPropagation(),this._openEditDialog(e,t)}}>
										<ha-icon icon="${r}" style="color: ${s}; --mdc-icon-size: 16px;"></ha-icon>
										<div class="wake-badge" title="${e.summary}">${l}</div>
									</div>
								`})}
						</div>

						<ha-icon
							class="clickable-icon add-event-btn"
							icon="mdi:plus"
							style="--mdc-icon-size: 20px; margin: 0; padding: 4px;"
							@click=${()=>this._openDialog(t)}></ha-icon>
					</div>
				</div>
			`),s.setDate(s.getDate()+1)}return r}};gt.styles=ct,t([lt()],gt.prototype,"_forceViewMode",void 0),t([lt()],gt.prototype,"_cardWidth",void 0),t([rt({attribute:!1})],gt.prototype,"hass",void 0),t([rt({attribute:!1})],gt.prototype,"config",void 0),t([lt()],gt.prototype,"_currentDate",void 0),t([lt()],gt.prototype,"_hiddenCalendars",void 0),t([lt()],gt.prototype,"_events",void 0),t([lt()],gt.prototype,"_weatherForecast",void 0),t([lt()],gt.prototype,"_dialogDate",void 0),t([lt()],gt.prototype,"_dialogCalendar",void 0),t([lt()],gt.prototype,"_dialogSummary",void 0),t([lt()],gt.prototype,"_dialogStartTime",void 0),t([lt()],gt.prototype,"_dialogEndTime",void 0),t([lt()],gt.prototype,"_dialogEventUid",void 0),t([lt()],gt.prototype,"_isAllDayType",void 0),t([lt()],gt.prototype,"_isCustomEvent",void 0),t([
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function(t){return(({finisher:t,descriptor:e})=>(i,a)=>{var o;if(void 0===a){const a=null!==(o=i.originalKey)&&void 0!==o?o:i.key,s=null!=e?{kind:"method",placement:"prototype",key:a,descriptor:e(i.key)}:{...i,key:a};return null!=t&&(s.finisher=function(e){t(e,a)}),s}{const o=i.constructor;void 0!==e&&Object.defineProperty(i,a,e(a)),null==t||t(o,a)}})({descriptor:e=>{const i={get(){var e,i;return null!==(i=null===(e=this.renderRoot)||void 0===e?void 0:e.querySelector(t))&&void 0!==i?i:null},enumerable:!0,configurable:!0};return i}})}("#eventDialog")],gt.prototype,"_dialog",void 0),gt=t([(t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:a}=e;return{kind:i,elements:a,finisher(e){customElements.define(t,e)}}})(t,e))("meal-activity-planner")],gt);export{gt as MealActivityPlanner};
