import{lv as s}from"./index-BfFZtmsR.js";import{lw as c,lx as x,ly as y,lz as g,ff as v,lA as j}from"./index-BfFZtmsR.js";function u(n){let{options:e,value:r}=n;return typeof e[r]=="number"}function p(n){let e="";for(let r in n){let t=n[r];if(typeof t=="boolean")t&&(e+=`#define ${r}
`);else if(typeof t=="number")e+=`#define ${r} ${t.toFixed()}
`;else if(typeof t=="object")if(u(t)){let{value:f,options:o,namespace:a}=t,i=a?`${a}_`:"";for(let l in o)e+=`#define ${i}${l} ${o[l].toFixed()}
`;e+=`#define ${r} ${i}${f}
`}else{let f=t.options,o=0;for(let a in f)e+=`#define ${f[a]} ${(o++).toFixed()}
`;e+=`#define ${r} ${f[t.value]}
`}}return e}function d(n,e,r,t=""){return new s(n,t+e.vertexShader,t+e.fragmentShader,r)}export{c as BufferObject,s as DisposableProgram,x as FramebufferObject,y as ProgramCache,g as Renderbuffer,v as Texture,j as VertexArrayObject,d as createProgram,p as glslifyDefineMap};
