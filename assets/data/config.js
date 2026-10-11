// ===== EDITE AQUI: dados comerciais da Artesanal Pizzaria =====
// ATENÇÃO: WhatsApp, telefone, endereço e horário já são da Artesanal; cardápio e preços ainda foram herdados do projeto anterior.
// Confirme cada um antes de publicar (veja docs/README.md > Pendências).
const one=(id,cat,name,desc,price,o={})=>({id,cat,name,desc,image:null,sizes:[{id:"u",label:"Único",price}],extras:[],...o});
window.ARTESANAL = {
  name: "Artesanal Pizzaria",
  tagline: "A arte de fazer pizza",
  whatsapp: "5527997934989",
  phone: "552730681044",            // telefone fixo (27) 3068-1044
  instagram: "",                       // PENDENTE: informe o link do Instagram da Artesanal (deixe vazio para ocultar)
  address: "Av. Guarapari, 824 - Valparaíso, Serra - ES, 29165-791",
  siteUrl: "",                         // PENDENTE: domínio publicado (ex.: https://seu-dominio.com.br). Use scripts/aplicar-dominio.js
  addressParts: {street:"Av. Guarapari, 824 - Valparaíso",locality:"Serra",region:"ES",postalCode:"29165-791",country:"BR"},
  mapsQuery: "Av. Guarapari, 824, Valparaíso, Serra, ES",
  hoursConfirmed: true,                // horário informado pelo proprietário
  hours: [["18:00","23:30"]], // todos os dias
  notice: "Sabores das pizzas P/M/G, bordas e acréscimos ainda serão adicionados. Preços das pizzas são \"a partir de\".",
  categories: [["pizzas","Pizzas"],["combos","Combos promocionais"],["retirada","Super promoção (retirada)"],["bebidas","Bebidas"]],
  products: [
    // PIZZAS — preços "a partir de" (from:true). Sabores e valores por sabor: A CONFIRMAR.
    {id:"pz-p",cat:"pizzas",imageNote:"Foto ilustrativa",imageAlt:"Pizza de queijo derretido sobre tábua de madeira",name:"Pizza P",desc:"Pizza com 1 sabor e 4 fatias. Sabores a confirmar.",image:"assets/img/produtos/pizza-recorte.webp",sizes:[{id:"p",label:"P — 4 fatias",price:33,from:true}],extras:[]},
    {id:"pz-m",cat:"pizzas",imageNote:"Foto ilustrativa",imageAlt:"Pizza de queijo derretido sobre tábua de madeira",name:"Pizza M",desc:"Pizza com até 2 sabores e 6 fatias. Sabores a confirmar.",image:"assets/img/produtos/pizza-recorte.webp",sizes:[{id:"m",label:"M — 6 fatias",price:35,from:true}],extras:[]},
    {id:"pz-g",cat:"pizzas",imageNote:"Foto ilustrativa",imageAlt:"Pizza de queijo derretido sobre tábua de madeira",name:"Pizza G",desc:"Pizza com até 2 sabores e 8 fatias. Sabores a confirmar.",image:"assets/img/produtos/pizza-recorte.webp",sizes:[{id:"g",label:"G — 8 fatias",price:45.9,from:true}],extras:[]},
    // COMBOS PROMOCIONAIS
    one("cb-mm","combos","Promoção Meio a Meio","Pizza meio Frango c/ Mussarela e meio Portuguesa, generosa e irresistível. Esse combo acompanha um Guaraná 1,5l!",57.99,{art:"frango"}),
    one("cb-3t","combos","Promoção 3 Terços","Pizza em 3 terços de Calabresa, Portuguesa e Frango c/ catupiry. Esse combo acompanha uma Coca Cola 1,5L.",66.99,{art:"calabresa"}),
    one("cb-2p","combos","Promoção 2 Pizzas","2 pizzas Grandes - 8 fatias cada. (1) Cowboy - presunto, ovo, mussarela e bacon. Descrição completa e 2º sabor a confirmar.",99.99,{art:"pepperoni"}),
    // SUPER PROMOÇÃO — somente retirada no balcão (pickupOnly)
    one("sp-fc","retirada","Frango c/ Catupiry","Pizza Grande (8 pedaços): delicioso frango desfiado com cobertura de Catupiry. Uma combinação clássica, cremosa e irresistível! APENAS PARA RETIRADA NO BALCÃO.",42,{pickupOnly:true,art:"frango"}),
    one("sp-to","retirada","Toscana","Pizza Grande (8 pedaços): calabresa fatiada, cebola e uma deliciosa cobertura de mussarela derretida. Um sabor marcante e irresistível! APENAS PARA RETIRADA NO BALCÃO.",42,{pickupOnly:true,art:"calabresa"}),
    one("sp-po","retirada","Portuguesa","Pizza Grande (8 pedaços): presunto, ovos, ervilha e cebola, finalizada com uma generosa cobertura de mussarela derretida. Um clássico cheio de sabor! APENAS PARA RETIRADA NO BALCÃO.",42,{pickupOnly:true,art:"portuguesa"}),
    one("sp-ca","retirada","Calabresa","Pizza Grande (8 pedaços): calabresa fatiada e cebola. Simplicidade e sabor em cada mordida! APENAS PARA RETIRADA NO BALCÃO.",42,{pickupOnly:true,art:"calabresa"}),
    one("sp-dq","retirada","Dois Queijos","Pizza Grande (8 pedaços): mussarela e Catupiry. Combinação cremosa e perfeita para os amantes do queijo! APENAS PARA RETIRADA NO BALCÃO.",42,{pickupOnly:true,art:"queijo"}),
    // BEBIDAS
    one("b-cc15","bebidas","Coca Cola 1,5L","Garrafa de Coca-Cola 1,5L gelada, refrescante e perfeita para acompanhar sua pizza favorita.",12,{art:"garrafa:#C8102E"}),
    one("b-cz15","bebidas","Coca Zero 1,5L","Garrafa de Coca-Cola Zero Açúcar 1,5L. Todo o sabor sem açúcar, geladinha e refrescante.",14,{art:"garrafa:#222"}),
    one("b-gu15","bebidas","Guaraná 1,5L","Garrafa de Guaraná 1,5L gelado, levemente adocicado e muito refrescante. Ideal para compartilhar!",12,{art:"garrafa:#2E9B3E"}),
    one("b-fl15","bebidas","Fanta Laranja 1,5L","Fanta laranja 1,5L.",11,{art:"garrafa:#FF8A00"}),
    one("b-fu15","bebidas","Fanta Uva 1,5L","Fanta uva 1,5L.",12,{art:"garrafa:#6B2FA0"}),
    one("b-cc6","bebidas","Coca Cola 600ml","Garrafa de Coca-Cola 600ml, a companhia perfeita para a sua pizza com muito frescor e sabor.",8,{art:"garrafa:#C8102E"}),
    one("b-cz6","bebidas","Coca Zero 600ml","Garrafa de Coca-Cola Zero 600ml gelada, sem açúcar e com todo o sabor clássico que você ama.",9,{art:"garrafa:#222"}),
    one("b-cl","bebidas","Coca Cola lata 350ml","Coca-Cola lata 350ml.",5,{art:"lata:#C8102E"}),
    one("b-czl","bebidas","Coca Zero lata 350ml","Coca-Cola Zero lata 350ml.",8,{art:"lata:#222"}),
    one("b-gl","bebidas","Guaraná Lata","Lata de Guaraná gelado, prático e refrescante. Sabor suave e adocicado pra acompanhar sua refeição.",7.5,{art:"lata:#2E9B3E"}),
    one("b-ag","bebidas","Água 510ml","Água mineral 510ml, pura e refrescante. Leveza e hidratação na medida certa.",3.5,{art:"garrafa:#6EC6F0"}),
    one("b-agg","bebidas","Água c/ Gás 510ml","Água mineral com gás 510ml, refrescante e com borbulhas suaves.",4,{art:"garrafa:#9AD8F5"})
  ],
  // Destaques da seção Promoções (preços conforme cardápio)
  promos: [
    {title:"Promoção Meio a Meio",text:"Meio Frango c/ Mussarela e meio Portuguesa + Guaraná 1,5L.",price:57.99},
    {title:"Promoção 3 Terços",text:"Calabresa, Portuguesa e Frango c/ catupiry + Coca-Cola 1,5L.",price:66.99},
    {title:"Promoção 2 Pizzas",text:"2 pizzas Grandes de 8 fatias cada.",price:99.99},
    {title:"Super promoção — só retirada no balcão",text:"Pizza Grande (8 pedaços): Frango c/ Catupiry, Toscana, Portuguesa, Calabresa ou Dois Queijos.",price:42}
  ],
  gallery: [] // PENDENTE: adicione fotos da Artesanal em assets/img/galeria/ ({src,alt}); vazio = seção oculta
};
