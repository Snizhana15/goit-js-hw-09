const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]");let n=0;t.addEventListener("click",(function(){n=setInterval((()=>document.body.style.background=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`),1e3),t.disabled=!0})),e.addEventListener("click",(function(){clearInterval(n),n=0,t.disabled=!1}));
//# sourceMappingURL=01-color-switcher.0ca0e7ef.js.map