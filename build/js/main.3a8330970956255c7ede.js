!function(e){var t={};function n(s){if(t[s])return t[s].exports;var o=t[s]={i:s,l:!1,exports:{}};return e[s].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(s,o,function(t){return e[t]}.bind(null,o));return s},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t,n){},function(e,t,n){"use strict";!function(){const e=document.querySelector(".nav__menu-opener"),t=document.querySelector(".nav");e.classList.remove("hide"),t.classList.remove("header__nav--no-js"),e.addEventListener("click",(function(){const n="false"===e.getAttribute("aria-expanded")?"true":"false";e.setAttribute("aria-expanded",n),t.classList.toggle("header__nav--menu-open"),e.classList.toggle("header__nav--menu-open")}))}(),function(){const e=document.querySelector(".to_top");window.addEventListener("scroll",(function(){window.pageYOffset>document.documentElement.clientHeight?e.classList.add("to_top-show"):e.classList.remove("to_top-show")}))}(),function(){const e=document.querySelector(".price"),t=e.querySelector(".price__select");e.querySelector(".price__no-js").classList.remove("price__no-js"),t.addEventListener("change",(function(){const t={2:[".price__cell--3",".price__cell--4"],3:[".price__cell--2",".price__cell--4"],4:[".price__cell--2",".price__cell--3"]},n=e.querySelectorAll(".price__cell--"+this.value),s=e.querySelectorAll(t[this.value][0]),o=e.querySelectorAll(t[this.value][1]);for(let e=0;e<n.length;e++)n[e].classList.remove("hide"),s[e].classList.add("hide"),o[e].classList.add("hide")}))}(),function(){const e=document.querySelector(".slider"),t=e.querySelector(".slider__arrow-forward"),n=e.querySelector(".slider__arrow-back"),s=e.querySelector(".slider__slides"),o=e.querySelectorAll(".slider__item").length,i=e.querySelector(".slider__indicators");let r=0;let c,l,a;if(o>1){const d=function(){0===r?n.hidden=!0:r===o-1?t.hidden=!0:n.hidden=t.hidden=!1};for(let e=0;e<o;e++)i.insertAdjacentHTML("beforeend",'<span class="slider__ind">');n.hidden=!0,e.classList.remove("slider__no-js");const u=function(){clearTimeout(a),clearTimeout(c),clearInterval(l),s.classList.add("click-duration"),s.classList.remove("auto-duration");const e=this===t;i.children[r].style.backgroundColor="",e?(n.hidden=!1,r+=1):r>0&&(t.hidden=!1,r-=1),s.style.transform="translate(-".concat(100*r,"%)"),i.children[r].style.backgroundColor="#f8cd60",d(),m()};t.addEventListener("click",u),n.addEventListener("click",u);const f=function(){i.children[r].style.backgroundColor="",r!==o-1&&(r+=1),s.classList.remove("click-duration"),s.classList.add("auto-duration"),s.style.transform="translateX(-".concat(100*r,"%)"),d(),r-=1,c=setTimeout((function(){s.classList.remove("auto-duration"),s.style.transform="translateX(-".concat(100*r,"%)"),s.append(s.firstElementChild)}),2100)},m=function(){a=setTimeout((function(){l=setInterval((function(){f()}),4e3)}),5e3)};m()}}()},function(e,t){const n=document.getElementById("form"),s=document.getElementById("name"),o=document.getElementById("email"),i=document.getElementById("phone");let r=0,c=0;const l=["+","9"," ","(","9","9","9",")"," ","9","9","9","-","9","9","-","9","9"],a=["+","1"," ","(","_","_","_",")"," ","_","_","_","-","_","_","-","_","_"];let d,u=a.slice(),f=a.join("");const m=document.querySelector(".success-send"),v=n.querySelector(".contact__btn-name"),h=n.querySelector(".sk-three-bounce"),p=function(){this.value=this.value.trim(),this.validity.patternMismatch||""===this.value?(this.style.borderColor="#ba0b11",this.parentElement.classList.remove("valid")):(this.style.borderColor="",this.parentElement.classList.add("valid"))},y=function(){setTimeout(()=>{const e=Array.from(this.value).filter(e=>/\d/.test(e));e.reverse();const t=l.slice();for(let n=0;n<t.length;n++)"9"===t[n]&&(t[n]=e.pop()||"_");t[1]="1",u=t,this.value=t.join(""),r=c=0,p.call(this)})},_=function(){r=this.selectionStart,c=this.selectionEnd},L=function(e){const t=r!==c;if(e.ctrlKey||(d=this.selectionStart<4?this.selectionStart=4:this.selectionStart),"Tab"!==e.key&&"ArrowRight"!==e.key&&"ArrowLeft"!==e.key&&"ArrowDown"!==e.key&&"ArrowUp"!==e.key&&!e.ctrlKey){if(e.preventDefault(),t&&this.selectionStart!==this.selectionEnd){const e=a.slice(r,c);u.splice(r,c-r,...e)}if(/\d/.test(e.key)&&d<u.length){let t=u.indexOf("_");const n=u.indexOf("-",this.selectionStart);if(-1===t)for(let e=this.selectionStart;e<u.length&&(t=e,!/\d/.test(u[e]));e++);u[t]=e.key,d=6===t?8:n-t==1?t+1:t}else{if("Backspace"===e.key&&!t&&"("!==u[d-1]){let e;switch(u[this.selectionStart-1]){case"-":e="-";break;case" ":e=" ";break;case")":e=")";break;default:e="_"}u.splice(this.selectionStart-1,1,e),d-=1}if("Delete"===e.key&&!t){const e=u.slice(d).findIndex(e=>/\d/.test(e));~e&&(u[d+e]="_")}}this.value=u.join(""),this.selectionStart=this.selectionEnd=d+1,/\d/.test(e.key)||(this.selectionStart=this.selectionEnd=d)}p.call(this)},E=function(e){"Escape"===e.code&&(m.classList.add("display-none"),document.removeEventListener("keydown",E))},g=function(e){v.textContent="SENDING",v.classList.add("sending"),h.classList.remove("display-none"),fetch("mail.php",{method:"post",body:new FormData(n)}).then(()=>{!function(){m.classList.remove("display-none"),v.textContent="SEND",v.classList.remove("sending"),h.classList.add("display-none"),document.addEventListener("keydown",E),m.addEventListener("click",(function(){m.classList.add("display-none")}),{once:!0});n.querySelectorAll("label:not(:last-of-type)").forEach(e=>e.classList.remove("valid"))}(),n.reset()}).catch(()=>alert("There are network problems. Send the application again")),e.preventDefault()};n.addEventListener("focusin",(function(e){this.addEventListener("submit",g),e.target===i&&(i.value=f||i.value,setTimeout(()=>{i.selectionStart=i.selectionEnd=d||4}),f="",i.addEventListener("paste",y),i.addEventListener("select",_),i.addEventListener("keydown",L)),e.target===s&&s.addEventListener("input",p),e.target===o&&o.addEventListener("input",p)})),n.addEventListener("focusout",(function(e){this.removeEventListener("submit",g),e.target===i&&(i.removeEventListener("paste",y),i.removeEventListener("select",_),i.removeEventListener("keydown",L)),e.target===s&&s.removeEventListener("input",p),e.target===o&&o.removeEventListener("input",p)}))},function(e,t,n){"use strict";n.r(t);n(0),n(1),n(2);const s=(e,t)=>{if("scrollBehavior"in document.documentElement.style)return;t.preventDefault();const n=e.getAttribute("href")||"",s=document.querySelector(n);if(s){const e=s.getBoundingClientRect().top;((e,t,n="scrollTop")=>{let s=null;const o=e[n],i=t-o,r=t=>{s||(s=t);const c=t-s;c/1e3>1||(e[n]=((e,t,n,s,o)=>s*((t=t/o-1)*t*t*t*t+1)+n)(0,c,o,i,1e3),requestAnimationFrame(r))};r()})(document.documentElement,e)}};document.addEventListener("click",e=>{const t=e.target.closest(".scroll-to");t&&s(t,e)})}]);