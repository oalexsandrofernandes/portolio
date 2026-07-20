# Especificação de Design — Réplica de gregorcollienne.com

## Visão geral
Portfólio de fotografia, minimalista e editorial. Estética de "galeria de arte":
fundo off-white, tipografia pesada em caixa alta, e fotografias dispostas de forma
assimétrica que se movem com o scroll (parallax). Sem cores de acento — o
protagonismo é das imagens. Stack de referência: WordPress (tema custom), um único
CSS, um único JS, imagens WebP servidas por CDN.

## Cores
Apenas duas cores base:
- Fundo (light): #f5f3f0  (off-white / bege muito claro)
- Texto (dark):  #0C0C0C  (quase preto)
Texto escuro sobre fundo claro. Não há cores de destaque.

## Tipografia
Fonte única em todo o site: "Neue Rational", com fallback Helvetica. É uma fonte
comercial — licenciar ou usar substituto próximo (Neue Haas Grotesk / Helvetica Now
Display em peso bold). Características:
- Peso predominante: 800 (extra-bold)
- text-transform: uppercase global
- letter-spacing: 0.02em
- html { font-size: 62.5% } (1rem = 10px)

Escala tipográfica fluida (clamp):
- H1/H2:  clamp(36px, 5.5vw, 82px)
- H3:     clamp(21px, 3.4vw, 44px)   ← tamanho base do body
- H4:     clamp(19px, 3.2vw, 32px)
- H5:     clamp(18px, 2.0vw, 21px)
- H6:     clamp(16px, 1.6vw, 18px)
- medium: clamp(15px, 1.2vw, 16px)
- small:  clamp(13px, 1vw, 15px)
- mini:   clamp(12px, 1vw, 13px)
- micro:  11px

## Espaçamento e grid
Unidade base de 0.4rem (= 4px). Múltiplos: 0.5, 1, 1.5, 2, 3, 4, 8, 12, 16, 20, 24, 32.
- grid-gap: 1.2rem
- radius: 0.4rem (cantos praticamente retos)
- sidebar-width: 35.2rem ; sidebar-padding: 3.2rem
- barra topo/base: line-height 32px, padding 1.6rem

## Arquitetura (mapa de páginas)
1. Overview (home, `/`)
   Galeria de capa: dezenas de fotos espalhadas assimetricamente sobre o fundo.
   O nome "GREGOR COLLIENNE" fica fixo e centralizado ao fundo; as fotos passam
   por cima dele durante o scroll. Um bloco de texto "sobre" aparece no meio.

2. Work (`/work/`) e Work List (`/work-list/`)
   Índice dos projetos com dois modos alternáveis:
   - GRID (`/work/`): miniaturas dos projetos em disposição espalhada/staggered.
   - LIST (`/work-list/`): nomes das categorias como grande lista de texto centralizada.
   O toggle "GRID / LIST" fica na base; o modo ativo recebe sublinhado.
   Categorias: Voyage voyage, Portraits, Editorial, Wasserwärts, Wandern & wirren,
   2020, Through the Atlas Mountains, Unknown, B2B / Corporate, Advertising.
   Cada item leva a `/work/[categoria]/`.

3. Projeto / Focus (`/work/[categoria]/`)
   Título do projeto centralizado no topo (ex.: "PORTRAITS").
   Uma imagem grande em destaque ao centro; coluna vertical de miniaturas
   (filmstrip) à esquerda (~80px de largura). Barra inferior: INFO · INDEX · BACK.
   Muitas imagens são pré-carregadas.

## Navegação e botões
- Header minimalista. No topo-centro há um "+" (32×32px) que abre o menu
  (`c-element-navopener`, alterna estado open/close → o "+" vira "×"). Permanece fixo.
- Menu: flex em coluna, centralizado, itens uppercase peso 800 grandes (~H2).
  Itens principais: OVERVIEW · WORK. Secundários: CONTACT ME (mailto:
  info@gregorcollienne.com) e sociais em 2 letras: IN (Instagram), LI (LinkedIn),
  FB (Facebook).
- Botões são apenas texto (uppercase, bold), sem caixa/fundo/borda. Estado ativo =
  sublinhado. Toggles: GRID/LIST. Barra de projeto: INFO/INDEX/BACK.

## Layout das galerias
- Home e Work-grid: colunas com deslocamentos verticais diferentes (staggered/
  masonry irregular). Imagens mantêm proporção natural (retratos e paisagens
  misturados). Miniaturas ~150–215px de largura.
- Página de projeto: filmstrip de thumbnails à esquerda + imagem principal grande
  ao centro.
- Imagens: .webp via CDN, com srcset responsivo (ex.: 768w e 512w).

## Animações e interações
Um único script custom (sem GSAP/Lenis/Three no escopo global — lógica própria).
- Scroll suave com parallax: as fotos deslizam sobre o título fixo ao fundo.
  Elemento de scroll customizado (`#phatscroll`) e classes de estado no <body>
  (has--loaded, has--finished, js-nav--isopening/isopen/isclosing).
- Abrir/fechar menu: transição controlada por classes no <body>, com efeito de
  linhas/cortina (js-phatlines .line .line__inner, ~14 linhas) → wipe animado.
- Hover nos projetos: itens com classe js-grid-projecthover + data-rel;
  passar o mouse revela a imagem correspondente.
- Entrada de página: <body> ganha has--loaded → has--finished.
- Transição "+" → "×" no abridor de menu.
Sugestão de implementação: Lenis (scroll suave) + parallax por translateY
proporcional ao scroll + transições em CSS.

## Convenção de código
BEM com prefixos: c- (componente), js- (hook de JavaScript). Design tokens via CSS
custom properties. Tipografia fluida com clamp. html a 62.5% para trabalhar em rem.

## Textos
- Logo/nome: GREGOR COLLIENNE
- Bloco "sobre" (home): apresentação do fotógrafo — baseado na Bélgica,
  especializado em pessoas, fine art e fotografia comercial; trabalha com agências
  e clientes diretos pela Europa (marcas como Audi, Volkswagen, Lufthansa, Deutsche
  Telekom, eBay, IKEA); portfólio de retratos, paisagens e campanhas. [Usar o texto
  oficial do cliente.]
- Navegação: OVERVIEW · WORK · CONTACT ME
- Categorias: VOYAGE, VOYAGE · PORTRAITS · EDITORIAL · WASSERWÄRTS · WANDERN & WIRREN
  · 2020 · THROUGH THE ATLAS MOUNTAINS · UNKNOWN · B2B / CORPORATE · ADVERTISING
- Botões: INFO · INDEX · BACK · GRID · LIST