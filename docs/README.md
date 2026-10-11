# Artesanal Pizzaria — site estático

Rodar local: `npx serve .` (ou abrir index.html). Deploy: importar a pasta na Vercel (Framework: Other, sem build).

Editar produtos, preços, horários, endereço, WhatsApp e galeria: `assets/data/config.js`.
Trocar fotos: colocar em `assets/img/produtos/` ou `assets/img/galeria/` e preencher `image` e `imageAlt` do produto.

## Identidade visual
Fundo grafite #171919, vermelho #B51F1D (marca) e #E5393E (destaque), branco quente #F2F0EC, cinza #A5A5A5, amarelo #F0B82D (somente avisos).
Fonte Inter; Pinyon Script em frases de apoio. Logotipo: `assets/img/logo/logo-artesanal.png` (fundo transparente) e `favicon.png`.

## Publicar com SEO completo
Canonical, Open Graph, robots.txt e sitemap.xml usam o marcador `__SITE_URL__` porque o domínio ainda não foi informado.
Depois de definir o domínio, rode uma vez: `node scripts/aplicar-dominio.js https://seu-dominio.com.br`
(substitui os marcadores e grava `siteUrl` no config.js, que também completa os dados estruturados com url e imagem).

## Pendências (dependem da pizzaria)
- Domínio publicado (veja acima).
- WhatsApp (27) 99793-4989, telefone (27) 3068-1044, endereço (Av. Guarapari, 824 - Valparaíso, Serra/ES) e horário (18h às 23h30, todos os dias) já são da Artesanal.
- Informar o Instagram da Artesanal em `instagram` (vazio = link oculto).
- Confirmar cardápio, preços e sabores (herdados do projeto anterior); sabores P/M/G, bordas e acréscimos ainda não existem.
- Galeria e vídeo foram removidos. Para reativar: colocar fotos em `assets/img/galeria/` e preencher `gallery` no config.js; o vídeo pode ser reinserido na seção "A Artesanal Pizzaria" do index.html.
- As pizzas P/M/G usam a mesma foto ilustrativa. Combos e retirada sem foto exibem o logotipo.
