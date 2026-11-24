# Drogaria Popular do Tiãozinho

E-commerce da Drogaria Popular do Tiãozinho (Jardim Aeroporto, Franca/SP). MVP mobile first: carrossel de destaques, catálogo, carrinho, checkout seguro com pedido pelo WhatsApp, entrega grátis por CEP, 5% de desconto no Pix, blog de saúde e páginas legais (RDC 44/2009, RDC 96/2008, Decreto 7.962/2013, LGPD).

Site estático publicado na Vercel: https://drogariapopulartiaozinho.vercel.app

## Estrutura
- `index.html`: loja (conteúdo pré-renderizado para buscadores e IAs; o `app.js` assume a navegação).
- `app.js`: catálogo, carrinho, checkout, blog e páginas legais. Configurações no topo: `PIX` (% de desconto), `FREE` (0 = entrega sempre grátis), `WA` (WhatsApp), `LEGAL` (dados da farmácia).
- `saude/*.html`: artigos do blog com URL própria (SEO).
- `sitemap.xml`, `robots.txt`, `llms.txt` (GEO), `site.webmanifest`, `404.html`.
- `vercel.json`: HTTPS/HSTS, CSP, anti-clickjacking, cache de fontes e imagens.

## Indexação
O site está com `noindex` (meta robots em todas as páginas e cabeçalho `X-Robots-Tag` no `vercel.json`) enquanto a farmácia não estiver no domínio `.com.br` exigido pela RDC 44/2009 e com preços e dados reais. Para liberar: remover o `X-Robots-Tag` do `vercel.json` e trocar `noindex, follow` por `index, follow` nas páginas.

## Antes de vender de verdade
- Domínio `.com.br` e indexação liberada.
- Farmacêutico responsável e CRF, licença sanitária, AFE e e-mail em `LEGAL`.
- Preços reais dentro do PMC/CMED, registro MS dos medicamentos e áreas de entrega reais.
