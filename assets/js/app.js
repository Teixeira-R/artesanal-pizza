(function(){
const C=window.ARTESANAL,$=s=>document.querySelector(s),KEY="artesanal_cart_v1";
// Valores do config.js ficam em reais; todo cálculo é feito em centavos inteiros.
const toC=v=>v==null?null:Math.round(v*100);
const fmtC=c=>c==null?"a confirmar":(c/100).toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const fmt=n=>fmtC(toC(n));
const fh=t=>t.replace(":00","h").replace(":","h");
const hoursTxt=()=>C.hours.map(([a,b])=>fh(a)+" às "+fh(b)).join(" e ");
const brNow=()=>new Intl.DateTimeFormat("en-GB",{timeZone:"America/Sao_Paulo",hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).format(new Date());
const isOpen=()=>{const f=brNow();return C.hours.some(([a,b])=>f>=a&&f<b)};
const szTxt=(p,s)=>p.sizes.length>1?s.label:"";
const find=id=>C.products.find(p=>p.id===id);
let cart=[],cat=C.categories[0][0],query="";
const norm=t=>(t||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
function confirmDlg({title,text,ok,cancel,focus}){return new Promise(res=>{const d=$("#cf"),prev=document.activeElement;
$("#cfT").textContent=title;$("#cfP").textContent=text;$("#cfYes").textContent=ok;$("#cfNo").textContent=cancel;d.returnValue="";
d.addEventListener("close",()=>{res(d.returnValue==="ok");if(prev&&document.contains(prev)&&prev.focus)prev.focus()},{once:true});
d.showModal();$(focus==="ok"?"#cfYes":"#cfNo").focus()})}
function toast(t){const e=$("#toast");e.textContent=t;e.classList.add("on");setTimeout(()=>e.classList.remove("on"),1600)}
function waUrl(t){return "https://wa.me/"+C.whatsapp+(t?"?text="+encodeURIComponent(t):"")}
function load(){try{cart=(JSON.parse(localStorage.getItem(KEY))||[]).filter(i=>{const p=find(i.pid);return p&&p.sizes.some(s=>s.id===i.size)&&i.extras.every(x=>p.extras.some(e=>e.id===x))&&i.qty>0})}catch(e){cart=[]}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(cart))}catch(e){}}
function line(i){const p=find(i.pid),s=p.sizes.find(x=>x.id===i.size);const parts=[s.price,...i.extras.map(x=>p.extras.find(e=>e.id===x).price)].map(toC);return parts.some(v=>v==null)?null:parts.reduce((a,b)=>a+b,0)*i.qty}
function total(){let t=0;for(const i of cart){const l=line(i);if(l==null)return null;t+=l}return t}
const ICONS={pizzas:'<path d="M5 8c8-5 18-3 22 1L16 28z"/><circle cx="14" cy="13" r="2"/><circle cx="19" cy="17" r="1.6"/>',combos:'<rect x="5" y="12" width="22" height="15" rx="2"/><path d="M5 17h22M16 12v15M16 12c-4-6-9-2-6 0M16 12c4-6 9-2 6 0"/>',retirada:'<path d="M7 11h18l-1.5 16h-15z"/><path d="M12 11a4 4 0 018 0"/>',bebidas:'<path d="M8 8h16l-2 19H10z"/><path d="M8 13h16M18 8l2-5"/>'};
const io2="IntersectionObserver"in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io2.unobserve(e.target)}}),{threshold:.12,rootMargin:"0px 0px -6% 0px"}):null;
function reveal(root){(root||document).querySelectorAll(".rv:not(.in)").forEach((el,i)=>{el.style.setProperty("--i",i%6);io2?io2.observe(el):el.classList.add("in")})}
function bump(){["#cartCount","#bnCount"].forEach(id=>{const e=$(id);e.classList.remove("bump");void e.offsetWidth;e.classList.add("bump")})}
function renderTabs(){const t=$("#tabs"),ids=C.categories.map(c=>c[0]);t.innerHTML="";C.categories.forEach(([id,l],k)=>{const b=document.createElement("button");const sel=!query&&id===cat;
b.id="tab-"+id;b.type="button";b.setAttribute("role","tab");b.setAttribute("aria-selected",sel);b.setAttribute("aria-controls","products");b.tabIndex=(sel||(query&&k===0))?0:-1;
b.innerHTML=`<span class="ic"><svg viewBox="0 0 32 32" aria-hidden="true">${ICONS[id]||ICONS.pizzas}</svg></span><span></span>`;b.lastChild.textContent=l;
const go=n=>{cat=ids[n];query="";$("#q").value="";renderTabs();renderProducts();$("#tab-"+ids[n]).focus()};
b.onclick=()=>{cat=id;query="";$("#q").value="";renderTabs();renderProducts()};
b.onkeydown=e=>{const n=e.key==="ArrowRight"?(k+1)%ids.length:e.key==="ArrowLeft"?(k-1+ids.length)%ids.length:e.key==="Home"?0:e.key==="End"?ids.length-1:null;if(n==null)return;e.preventDefault();go(n)};
t.append(b)})}
function photoBlock(p){
  const tag=p.pickupOnly&&p.image?'<span class="badge">Retirada no balcão</span>':"";
  if(p.image)return `<div class="ph"><img loading="lazy" decoding="async" width="800" height="394" src="${p.image}" alt="">${tag}<small></small></div>`;
  if(p.cat==="bebidas")return "";
  return `<div class="ph empty"><img class="mark" src="assets/img/logo/logo-artesanal.png" alt="" width="210" height="120" loading="lazy"></div>`}
function renderProducts(){const g=$("#products");g.innerHTML="";if(query)g.removeAttribute("aria-labelledby");else g.setAttribute("aria-labelledby","tab-"+cat);const nq=norm(query.trim());const list=nq?C.products.filter(p=>norm(p.name+" "+p.desc).includes(nq)):C.products.filter(p=>p.cat===cat);if(!list.length)g.innerHTML=`<p class="empty-msg">${nq?"Nenhum item encontrado para essa busca.":"Nenhum item nesta categoria ainda."}</p>`;
list.forEach(p=>{const d=document.createElement("article");d.className="card rv";const ph=photoBlock(p);if(!ph)d.classList.add("nopic");
const pr=s=>(s.from?"<small>a partir de</small>":"")+fmt(s.price);
d.innerHTML=ph+`<div class="cb"><h3></h3><p></p>
<label ${p.sizes.length<2?"hidden":""}>Tamanho<select class="sz">${p.sizes.map(s=>`<option value="${s.id}">${s.label}</option>`).join("")}</select></label>
${p.extras.map(e=>`<label><input type="checkbox" class="ex" value="${e.id}" style="width:auto"> ${e.label} (${fmt(e.price)})</label>`).join("")}
<div class="price"></div><button class="btn red">Adicionar ao pedido</button></div>`;
d.querySelector("h3").textContent=p.name;d.querySelector(".cb p").textContent=p.desc;
const im=d.querySelector(".ph img:not(.mark)");if(im)im.alt=p.imageAlt||("Foto de divulgação — "+p.name);
const sm=d.querySelector(".ph small");if(sm)sm.textContent=p.imageNote||"";
if(p.pickupOnly&&!p.image){const b=document.createElement("span");b.className="badge";b.textContent="Retirada no balcão";d.querySelector(".cb").prepend(b)}
const sel=d.querySelector(".sz"),upd=()=>{d.querySelector(".price").innerHTML=pr(p.sizes.find(s=>s.id===sel.value)||p.sizes[0])};sel.onchange=upd;upd();
d.querySelector(".btn").onclick=()=>{const size=sel.value,extras=[...d.querySelectorAll(".ex:checked")].map(x=>x.value).sort();
const f=cart.find(i=>i.pid===p.id&&i.size===size&&i.extras.join()===extras.join());f?f.qty++:cart.push({pid:p.id,size,extras,qty:1});save();renderCart();bump();toast("Adicionado ao pedido ✓")};g.append(d)});reveal(g)}
function renderCart(){const n=cart.reduce((a,i)=>a+i.qty,0);$("#cartCount").textContent=n;$("#bnCount").textContent=n;$("#bnCount").hidden=!n;const box=$("#cartItems");box.innerHTML="";
$("#checkout").hidden=!cart.length;if(!cart.length){box.innerHTML="<p>Seu carrinho está vazio. Escolha algo no cardápio!</p>";return}
cart.forEach((i,idx)=>{const p=find(i.pid),s=p.sizes.find(x=>x.id===i.size);const d=document.createElement("div");d.className="ci";
d.innerHTML=`<b></b><small></small><div class="q"><button aria-label="Diminuir">−</button><span>${i.qty}</span><button aria-label="Aumentar">+</button><button class="rm">Remover</button><span style="margin-left:auto">${fmtC(line(i))}</span></div>`;
d.querySelector("b").textContent=p.name;const sm=d.querySelector("small"),stx=[szTxt(p,s),i.extras.map(x=>p.extras.find(e=>e.id===x).label).join(", ")].filter(Boolean).join(" + ");sm.textContent=stx;sm.hidden=!stx;
const [m,pl,rm]=d.querySelectorAll("button");m.onclick=()=>{i.qty>1?(i.qty--,save(),renderCart()):rmv(idx)};pl.onclick=()=>{i.qty++;save();renderCart()};rm.onclick=()=>rmv(idx);box.append(d)});
const t=total();$("#total").textContent=t==null?"a confirmar (há itens sem preço definido)":fmtC(t);$("#addrF").hidden=$("#mode").value!=="Entrega"}
async function rmv(idx){const p=find(cart[idx].pid);const ok=await confirmDlg({title:"Remover item?",text:"Remover \""+p.name+"\" do seu pedido?",ok:"Remover",cancel:"Manter",focus:"cancel"});
if(ok){cart.splice(idx,1);save();renderCart();($("#cartItems button")||$("#dTitle")).focus()}}
let opener=null;const INERT=["header.hd","main","footer","nav.bnav",".wa-float",".cart-fab"];
function openCart(o,from){const d=$("#drawer");$("#scrim").classList.toggle("on",o);d.classList.toggle("open",o);d.inert=!o;
INERT.forEach(q=>document.querySelectorAll(q).forEach(e=>e.inert=o));
if(o){opener=from||document.activeElement;renderCart();$("#dTitle").focus()}
else if(opener){const t=opener;opener=null;(t.getClientRects().length?t:($("#bnCart").getClientRects().length?$("#bnCart"):$("#cartFab"))).focus()}}
$("#drawer").addEventListener("keydown",e=>{if(e.key!=="Tab")return;const f=[...$("#drawer").querySelectorAll("button,input,select,textarea,a[href],[tabindex]:not([tabindex='-1'])")].filter(x=>!x.disabled&&x.offsetParent!==null);
if(!f.length)return;const a=f[0],z=f[f.length-1];if(e.shiftKey&&(document.activeElement===a||document.activeElement===$("#dTitle"))){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}});
$("#cartFab").onclick=e=>openCart(true,e.currentTarget);$("#bnCart").onclick=e=>openCart(true,e.currentTarget);$("#scrim").onclick=()=>openCart(false);$("#q").oninput=e=>{query=e.target.value;renderTabs();renderProducts()};$("#closeCart").onclick=()=>openCart(false);$("#mode").onchange=renderCart;
$("#send").onclick=async()=>{const err=$("#err");err.textContent="";const entrega=$("#mode").value==="Entrega";
if(!cart.length)return err.textContent="Adicione itens ao pedido.";
if(!$("#cname").value.trim())return err.textContent="Informe seu nome.";
if(entrega&&(!$("#street").value.trim()||!$("#hood").value.trim()))return err.textContent="Informe rua, número e bairro para entrega.";
if(entrega&&cart.some(i=>find(i.pid).pickupOnly))return err.textContent="Há itens somente para retirada no balcão. Escolha \"Retirada\" ou remova esses itens.";
if(C.hoursConfirmed&&!isOpen()){const go=await confirmDlg({title:"Estamos fechados agora",text:"Nosso horário de funcionamento é "+hoursTxt()+". Você pode enviar o pedido mesmo assim para consultar ou deixar o pedido registrado, mas a confirmação depende do atendimento.",ok:"Enviar mesmo assim",cancel:"Voltar",focus:"ok"});if(!go)return}
const L=cart.map(i=>{const p=find(i.pid),s=p.sizes.find(x=>x.id===i.size);const ex=i.extras.length?" + "+i.extras.map(x=>p.extras.find(e=>e.id===x).label).join(", "):"",sz=szTxt(p,s);return `${i.qty}x ${p.name}${sz?" — "+sz:""}${ex} — ${s.from?"a partir de ":""}${fmtC(line(i))}`});
const t=total(),obs=$("#notes").value.trim()||"sem observações";
const msg=`Olá, Artesanal Pizzaria! Gostaria de fazer um pedido:\n\nNome: ${$("#cname").value.trim()}\n\n${L.join("\n")}\n\nObservações: ${obs}\n\n${$("#mode").value}`+(entrega?`\nEndereço: ${$("#street").value.trim()} — ${$("#hood").value.trim()}${$("#ref").value.trim()?" (ref.: "+$("#ref").value.trim()+")":""}`:"")+`\n\nTotal estimado: ${fmtC(t)} (sem taxa de entrega)\n\nAguardo a confirmação do pedido.`;
const w=window.open(waUrl(msg),"_blank");if(w)w.opener=null;else location.href=waUrl(msg)};
function schemaLD(){const a=C.addressParts;if(!C.hoursConfirmed||!a||!a.street||!a.locality||!a.region||!a.postalCode||!C.phone||!C.hours.length)return;
const d={"@context":"https://schema.org","@type":"Restaurant",name:C.name,servesCuisine:"Pizza",
address:{"@type":"PostalAddress",streetAddress:a.street,addressLocality:a.locality,addressRegion:a.region,postalCode:a.postalCode,addressCountry:a.country||"BR"},
telephone:"+"+C.phone,
contactPoint:[{"@type":"ContactPoint",telephone:"+"+C.whatsapp,contactType:"customer service",availableLanguage:"pt-BR"}],
openingHoursSpecification:C.hours.map(([o,c])=>({"@type":"OpeningHoursSpecification",dayOfWeek:["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],opens:o,closes:c})),
hasMap:"https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(C.address)};
if(C.siteUrl){d.url=C.siteUrl;d.image=C.siteUrl+"/assets/img/logo/og-image.jpg"}
const t=document.createElement("script");t.type="application/ld+json";t.textContent=JSON.stringify(d);document.head.append(t)}
function renderStatic(){schemaLD();document.querySelectorAll("[data-wa]").forEach(a=>{a.href=waUrl("Olá, Artesanal Pizzaria!");a.target="_blank";a.rel="noopener"});
if(C.instagram){const ig=$("#ig");ig.href=C.instagram;ig.textContent="Instagram "+("@"+C.instagram.replace(/\/$/,"").split("/").pop());ig.hidden=false}else $("#ig").closest("p").hidden=true;
const waTxt="WhatsApp "+C.whatsapp.replace(/^55(\d{2})(\d{5})(\d{4})$/,"($1) $2-$3");
document.querySelectorAll(".js-wa-text").forEach(a=>a.textContent=waTxt);$("#tWa").textContent=waTxt.replace("WhatsApp ","");
const tel=C.phone?"("+C.phone.slice(2,4)+") "+C.phone.slice(4,8)+"-"+C.phone.slice(8):"";
document.querySelectorAll(".js-tel").forEach(a=>{if(C.phone){a.href="tel:+"+C.phone;a.textContent="Telefone "+tel}else a.closest("p").hidden=true});
$("#mapBtn").href="https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(C.address||C.mapsQuery);
const ad=C.address||"Endereço a confirmar.";$("#addr").textContent=ad;$("#addr2").textContent=ad;$("#heroAddr").textContent=ad;$("#tAddr").textContent=ad;
if(C.address)$("#map").innerHTML=`<iframe loading="lazy" title="Mapa da Artesanal Pizzaria" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=${encodeURIComponent(C.address)}&output=embed"></iframe>`;else $("#map").hidden=true;
const h=`<li><b>Seg à Dom</b> · ${hoursTxt()}</li>`;$("#hours").innerHTML=h;$("#hours2").innerHTML=h;$("#tHours").textContent="Todos os dias, "+hoursTxt();
$("#hoursNote").textContent=C.hoursConfirmed?"":"Horários a confirmar antes da publicação.";
$("#provNote").textContent=C.notice||"";
$("#promos").innerHTML=C.promos.map(p=>`<div class="card rv"><div class="cb"><h3>${p.title}</h3><p>${p.text}</p><span class="price">${fmt(p.price)}</span><a class="btn red" target="_blank" rel="noopener" href="${waUrl("Olá, Artesanal Pizzaria! Quero saber da promoção: "+p.title)}">Pedir pelo WhatsApp</a></div></div>`).join("");
const o=C.promos[C.promos.length-1];if(o){$("#offT").textContent=o.title;$("#offP").textContent=o.text+" Por "+fmt(o.price)+".";$("#offBtn").onclick=()=>{cat="retirada";query="";$("#q").value="";renderTabs();renderProducts();$("#cardapio").scrollIntoView()}}
const items=C.gallery||[],lb=$("#lb"),lbi=lb.querySelector("img");let gi=0;
if(!items.length)$("#galeria").hidden=true;
const showG=i=>{gi=(i+items.length)%items.length;lbi.src=items[gi].src;lbi.alt=items[gi].alt;$("#lbCap").textContent=(gi+1)+" / "+items.length};
items.forEach((g,i)=>{const b=document.createElement("button");b.className="g";b.setAttribute("aria-label","Ampliar foto: "+g.alt);b.innerHTML=`<img loading="lazy" src="${g.src}" alt="${g.alt}">`;b.onclick=()=>{showG(i);lb.showModal()};$("#gal").append(b)});
lb.querySelector(".lb-x").onclick=()=>lb.close();lb.querySelector(".lb-prev").onclick=()=>showG(gi-1);lb.querySelector(".lb-next").onclick=()=>showG(gi+1);
lb.addEventListener("click",e=>{if(e.target===lb)lb.close()});lb.addEventListener("keydown",e=>{if(e.key==="ArrowLeft")showG(gi-1);if(e.key==="ArrowRight")showG(gi+1)});
if(C.hoursConfirmed){const open=isOpen();const c=$("#openState");c.hidden=false;c.textContent=open?"Aberto agora":"Fechado agora";c.classList.add(open?"open":"closed")}}
if("IntersectionObserver"in window){const links=[...document.querySelectorAll("#nav a,.bnav a[href]")];const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle("on",a.getAttribute("href")==="#"+e.target.id))}),{rootMargin:"-45% 0px -50% 0px"});
links.forEach(a=>{const t=document.querySelector(a.getAttribute("href"));if(t)io.observe(t)})}
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!document.querySelector("dialog[open]"))openCart(false)});
load();renderStatic();renderTabs();renderProducts();renderCart();
document.querySelectorAll(".sec-head,.steps li,.panel,.map,.about,.offer-in").forEach(e=>e.classList.add("rv"));reveal();
})();
