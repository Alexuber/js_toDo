var t={randomUUID:"undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)};let e;const n=new Uint8Array(16);function a(){if(!e&&(e="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!e))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return e(n)}const o=[];for(let t=0;t<256;++t)o.push((t+256).toString(16).slice(1));function r(t,e=0){return(o[t[e+0]]+o[t[e+1]]+o[t[e+2]]+o[t[e+3]]+"-"+o[t[e+4]]+o[t[e+5]]+"-"+o[t[e+6]]+o[t[e+7]]+"-"+o[t[e+8]]+o[t[e+9]]+"-"+o[t[e+10]]+o[t[e+11]]+o[t[e+12]]+o[t[e+13]]+o[t[e+14]]+o[t[e+15]]).toLowerCase()}var s=function(e,n,o){if(t.randomUUID&&!n&&!e)return t.randomUUID();const s=(e=e||{}).random||(e.rng||a)();if(s[6]=15&s[6]|64,s[8]=63&s[8]|128,n){o=o||0;for(let t=0;t<16;++t)n[o+t]=s[t];return n}return r(s)};const i=document.querySelector("form"),l=document.querySelector(".input-value"),d=document.querySelector(".todo-list");document.querySelectorAll(".todo_item");p();let u,c=localStorage.getItem("data")?JSON.parse(localStorage.getItem("data")):[];function m(t){t.preventDefault();const e=l.value,n={id:s(),priority:"standart",status:"in progress",text:e};c.push(n),localStorage.setItem("data",JSON.stringify(c)),p(),l.value=""}function p(){let t;if(0===localStorage.length)t='<li class="todo_item">\n  <p class= "item_text">У вас не має справ</p>\n</li>';else{t=JSON.parse(localStorage.getItem("data")).map((t=>`<li class="todo_item" data-id=${t.id}>\n  <p class= "item_text" >${t.text}</p>\n  <button class='edit'>✏️</button>\n  <button class='success'>✅</button>\n  <button class='delete' data-id=${t.id}>❌</button>\n</li>`)).join("")}d.innerHTML=t}function f(t){t.preventDefault(),u.text=l.value;const e=c.indexOf(u);c.splice(e,1,u),localStorage.setItem("data",JSON.stringify(c)),p(),l.value="",i.removeEventListener("submit",f),i.addEventListener("submit",m),i.lastElementChild.value="Додати в список"}i.addEventListener("submit",m),d.addEventListener("click",(function(t){if(t.target.classList.contains("delete"))c=c.filter((e=>e.id!==t.target.parentNode.dataset.id)),localStorage.setItem("data",JSON.stringify(c)),p();else if(t.target.classList.contains("edit"))l.value=t.target.parentNode.firstElementChild.textContent,i.lastElementChild.value="Відредагувати",u=c.find((e=>e.id===t.target.parentNode.dataset.id)),i.removeEventListener("submit",m),i.addEventListener("submit",f);else{if(!t.target.classList.contains("success"))return;console.log(t.target.parentNode.dataset.id)}}));
//# sourceMappingURL=index.65a92ee4.js.map
