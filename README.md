# Portfólio — Alexsandro Fernandes

Site de portfólio pessoal (arquitetura, interiores, projeto residencial).

## Estrutura

- `index.html` — marcação e conteúdo
- `style.css` — estilos
- `script.js` — interações (miniatura que segue o cursor, revelação no scroll)
- `img/` — fotos/renders dos projetos

## O que trocar

Procure pelos comentários `TROCAR` em `index.html`:

1. **Projetos** — seção `<ol class="index">`. Cada `<li>` é um projeto: troque título, ano, tipo e imagem.
2. **Imagens** — hoje são SVGs cinza de placeholder. Coloque as fotos/renders em `img/` e aponte o `src`.
3. **Texto Sobre** — seção `#sobre`.
4. **Contato** — e-mail no rodapé (Instagram e LinkedIn já estão preenchidos).

## Rodar localmente

Basta abrir `index.html` no navegador, ou servir a pasta com qualquer servidor estático, por exemplo:

```
npx serve .
```

## Publicar no GitHub Pages

Depois de subir o repositório para o GitHub, ative o GitHub Pages nas configurações do repositório apontando para a branch `main` e a raiz (`/`).
