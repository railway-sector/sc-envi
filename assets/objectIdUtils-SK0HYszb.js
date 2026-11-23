const i=1;function f(n,r){let t=0;for(let o of r){let e=o.attributes?.[n];typeof e=="number"&&isFinite(e)&&(t=Math.max(t,e))}return t}export{i as e,f as t};
