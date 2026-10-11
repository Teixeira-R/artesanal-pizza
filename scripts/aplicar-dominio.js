#!/usr/bin/env node
// Uso: node scripts/aplicar-dominio.js https://seu-dominio.com.br
// Substitui __SITE_URL__ (canonical, Open Graph, robots, sitemap) e grava siteUrl em assets/data/config.js.
const fs=require("fs"),path=require("path");
let url=(process.argv[2]||"").trim().replace(/\/+$/,"");
if(!/^https:\/\/[a-z0-9.-]+\.[a-z]{2,}(\/[^\s]*)?$/i.test(url)){console.error("Informe a URL completa com https, ex.: https://seu-dominio.com.br");process.exit(1)}
const root=path.join(__dirname,"..");
for(const f of ["index.html","robots.txt","sitemap.xml"]){const p=path.join(root,f);fs.writeFileSync(p,fs.readFileSync(p,"utf8").replaceAll("__SITE_URL__",url))}
const cp=path.join(root,"assets/data/config.js");fs.writeFileSync(cp,fs.readFileSync(cp,"utf8").replace(/siteUrl:\s*"[^"]*"/,`siteUrl: "${url}"`));
console.log("Domínio aplicado:",url);
