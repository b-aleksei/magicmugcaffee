!function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){},function(e,t,n){"use strict";var r,a,i,o,s;r=document.querySelector(".nav__menu-opener"),a=document.querySelector(".nav"),r.classList.remove("hide"),a.classList.remove("header__nav--no-js"),r.addEventListener("click",(function(){var e="false"===r.getAttribute("aria-expanded")?"true":"false";r.setAttribute("aria-expanded",e),a.classList.toggle("header__nav--menu-open"),r.classList.toggle("header__nav--menu-open")})),i=document.querySelector(".to_top"),window.addEventListener("scroll",(function(){window.pageYOffset>document.documentElement.clientHeight?i.classList.add("to_top-show"):i.classList.remove("to_top-show")})),o=document.querySelector(".price"),s=o.querySelector(".price__select"),o.querySelector(".price__no-js").classList.remove("price__no-js"),s.addEventListener("change",(function(){for(var e={2:[".price__cell--3",".price__cell--4"],3:[".price__cell--2",".price__cell--4"],4:[".price__cell--2",".price__cell--3"]},t=o.querySelectorAll(".price__cell--"+this.value),n=o.querySelectorAll(e[this.value][0]),r=o.querySelectorAll(e[this.value][1]),a=0;a<t.length;a++)t[a].classList.remove("hide"),n[a].classList.add("hide"),r[a].classList.add("hide")})),function(){var e,t,n,r=document.querySelector(".slider"),a=r.querySelector(".slider__arrow-forward"),i=r.querySelector(".slider__arrow-back"),o=r.querySelector(".slider__slides"),s=r.querySelectorAll(".slider__item").length,c=r.querySelector(".slider__indicators"),l=0;if(s>1){for(var u=function(){0===l?i.hidden=!0:l===s-1?a.hidden=!0:i.hidden=a.hidden=!1},d=0;d<s;d++)c.insertAdjacentHTML("beforeend",'<span class="slider__ind">');i.hidden=!0,r.classList.remove("slider__no-js");var f=function(){clearTimeout(n),clearTimeout(e),clearInterval(t),o.classList.add("click-duration"),o.classList.remove("auto-duration");var r=this===a;c.children[l].style.backgroundColor="",r?(i.hidden=!1,l+=1):l>0&&(a.hidden=!1,l-=1),o.style.transform="translate(-".concat(100*l,"%)"),c.children[l].style.backgroundColor="#f8cd60",u(),v()};a.addEventListener("click",f),i.addEventListener("click",f);var v=function(){n=setTimeout((function(){t=setInterval((function(){c.children[l].style.backgroundColor="",l!==s-1&&(l+=1),o.classList.remove("click-duration"),o.classList.add("auto-duration"),o.style.transform="translateX(-".concat(100*l,"%)"),u(),l-=1,e=setTimeout((function(){o.classList.remove("auto-duration"),o.style.transform="translateX(-".concat(100*l,"%)"),o.append(o.firstElementChild)}),2100)}),4e3)}),5e3)};v()}}()},function(e,t,n){"use strict";n.r(t);n(0),n(1);var r=function(e){var t=e.target,n="".concat("+7"," (___) ___-__-__"),r=n.replace(/\D/g,""),a=0,i=t.value.replace(/\D/g,"");i.length||(i=r),t.value="",Array.prototype.forEach.call(n,(function(e){var n=/[_\d]/.test(e)&&i.length>a;t.value+=n?i.charAt(a++):i.length<=a?"":e}))},a=function e(t){var n=t.target;"+7"===n.value&&(n.value=""),n.removeEventListener("input",r),n.removeEventListener("blur",e)},i=function(e){e.value||(e.value="+7"),e.addEventListener("input",r),e.addEventListener("blur",a)};function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var s={regEmail:/^\s*[\w.-]+@[\w-]+\.(?:[\w-]+\.)?[A-Za-z]{2,8}\s*$/},c={required:"The field should not be empty",phone:"the number isn't correct",email:"the email isn't correct"},l={success:"Your application is accepted. Thanks! We will contact you soon.",bad:"The remote server not found.",error:"There are network problems. Check your internet connection."};fetch("data/errorMes.json").then((function(e){return e.json()})).then((function(e){return c=e})).catch((function(){})),fetch("data/errorMes.json").then((function(e){return e.json()})).then((function(e){return l=e})).catch((function(){}));var u=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.form=t,this.defaultConfig={url:"mail.php",classError:"form-invalid",statusMessages:l},this.config=Object.assign(this.defaultConfig,n),this.init()}var t,n,r;return t=e,(n=[{key:"init",value:function(){this.form.addEventListener("focusin",this),this.form.addEventListener("focusout",this),this.form.addEventListener("click",this),this.form.addEventListener("submit",this)}},{key:"handleEvent",value:function(e){var t=this;switch(e.type){case"focusin":e.target.hasAttribute("data-validate")&&(e.target.setCustomValidity(""),"phone"===e.target.dataset.validate&&i(e.target));break;case"focusout":e.target.hasAttribute("data-validate")&&this.checkValue(e.target);break;case"click":e.target.closest('[type="submit"]')&&(e.currentTarget.querySelectorAll("[data-validate]:not([disabled])").forEach((function(e){e.parentElement.classList.add("validate"),t.checkValue(e)})),this.form.checkValidity()||(this.form.addEventListener("animationend",this),this.form.classList.add(this.config.classError)));break;case"submit":e.preventDefault(),this.sendData(this.form);break;case"animationend":this.form.classList.remove(this.config.classError),this.form.removeEventListener("animationend",this)}}},{key:"setErrorMes",value:function(e,t){var n=e.parentElement.querySelector("[data-error]");n&&(n.dataset.error=t),e.setCustomValidity(t)}},{key:"checkValue",value:function(e){if(e.parentElement.classList.remove("valid"),e.parentElement.classList.add("validate"),e.value||!e.required)if("email"!==e.dataset.validate||(e.value=e.value.trim(),!e.value||s.regEmail.test(e.value))){if("phone"===e.dataset.validate){var t=e.value.replace(/\D/g,"").length;if(e.value&&t<11)return void this.setErrorMes(e,c.phone)}e.parentElement.classList.add("valid")}else this.setErrorMes(e,c.email);else this.setErrorMes(e,c.required)}},{key:"beforeSending",value:function(){}},{key:"afterSending",value:function(){}},{key:"transferAction",value:function(e){}},{key:"sendData",value:function(e){var t=this;this.beforeSending(),fetch(this.config.url,{method:"post",body:new FormData(e)}).then((function(n){n.ok?(t.transferAction("success"),e.reset(),e.querySelectorAll("[data-validate]:not(:disabled)").forEach((function(e){e.parentElement.classList.remove("validate")}))):t.transferAction("bad")})).catch((function(){t.transferAction("error")})).finally((function(){t.afterSending()}))}}])&&o(t.prototype,n),r&&o(t,r),e}(),d=document.getElementById("form"),f=document.querySelector(".success-send");if(d){var v=d.querySelector(".contact__btn-name"),h=d.querySelector(".sk-three-bounce"),m=new u(d);m.beforeSending=function(){v.textContent="SENDING",v.classList.add("sending"),h.classList.add("preload-active")},m.afterSending=function(){v.textContent="SEND",v.classList.remove("sending"),h.classList.remove("preload-active")},m.transferAction=function(e){if(f){f.querySelector(".success-send__title").innerText=m.config.statusMessages[e],f.classList.add("success-send--active");var t=function e(t){"Escape"===t.code&&(f.classList.remove("success-send--active"),document.removeEventListener("keydown",e))};document.addEventListener("click",(function(){f.classList.remove("success-send--active"),document.removeEventListener("keydown",t)}),{once:!0}),document.addEventListener("keydown",t)}}}var p=function(e,t,n,r,a){return r*((t=t/a-1)*t*t*t*t+1)+n},y=function(e,t){if(!("scrollBehavior"in document.documentElement.style)){t.preventDefault();var n=e.getAttribute("href")||"",r=document.querySelector(n);if(r){var a=r.getBoundingClientRect().top;!function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"scrollTop",r=null,a=e[n],i=t-a,o=1e3,s=function t(s){r||(r=s);var c=s-r;c/o>1||(e[n]=p(0,c,a,i,o),requestAnimationFrame(t))};s()}(document.documentElement,a)}}};document.addEventListener("click",(function(e){var t=e.target.closest(".scroll-to");t&&y(t,e)}))}]);