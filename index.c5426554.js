var t={randomUUID:"undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)};let e;const o=new Uint8Array(16);function r(){if(!e&&(e="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!e))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return e(o)}const n=[];for(let t=0;t<256;++t)n.push((t+256).toString(16).slice(1));function a(t,e=0){return(n[t[e+0]]+n[t[e+1]]+n[t[e+2]]+n[t[e+3]]+"-"+n[t[e+4]]+n[t[e+5]]+"-"+n[t[e+6]]+n[t[e+7]]+"-"+n[t[e+8]]+n[t[e+9]]+"-"+n[t[e+10]]+n[t[e+11]]+n[t[e+12]]+n[t[e+13]]+n[t[e+14]]+n[t[e+15]]).toLowerCase()}var u=function(e,o,n){if(t.randomUUID&&!o&&!e)return t.randomUUID();const u=(e=e||{}).random||(e.rng||r)();if(u[6]=15&u[6]|64,u[8]=63&u[8]|128,o){n=n||0;for(let t=0;t<16;++t)o[n+t]=u[t];return o}return a(u)};const s=document.querySelector("form"),i=document.querySelector(".input-value"),d=document.querySelector(".todo-list"),c=[];s.addEventListener("submit",(function(t){t.preventDefault();const e=i.value,o={id:u(),priority:"standart",status:"in progress",text:e};c.push(o),localStorage.setItem("data",JSON.stringify(c)),function(){let t;if(0===localStorage.length)t='<li class="list__item">\n        <p class="list__desc">You dont have deals</p>\n      </li>';else{JSON.parse(localStorage.getItem("data"))}d.innertHTML("beforeend",t)}()}));
//# sourceMappingURL=index.c5426554.js.map