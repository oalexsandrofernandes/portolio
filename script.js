const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const root = document.documentElement;

/* ------------------------------------------------------------
   Banco de fotos dos projetos (compartilhado entre home e
   trabalhos.html). Imagens de banco gratuito (Unsplash),
   ilustrativas — troque pelas fotos reais dos seus projetos.
------------------------------------------------------------- */
const PROJECTS = [
  { project: 'Casa Pátio Norte', type: 'Residencial · 2025', img: '1600585154340-be6161a56a0c', alt: 'Casa Pátio Norte — fachada ao entardecer' },
  { project: 'Casa Pátio Norte', type: 'Sala · Madeira', img: '1600607687939-ce8a6c25118c', alt: 'Casa Pátio Norte — sala de estar com painel de madeira' },
  { project: 'Casa Pátio Norte', type: 'Banheiro', img: '1600566752355-35792bedcfea', alt: 'Casa Pátio Norte — banheiro em concreto e madeira escura' },
  { project: 'Casa Pátio Norte', type: 'Acesso', img: '1600047509807-ba8f99d2cdde', alt: 'Casa Pátio Norte — volume de acesso em revestimento cerâmico' },
  { project: 'Galpão Ribeira', type: 'Retrofit · 2024', img: '1600607688969-a5bfcd646154', alt: 'Galpão Ribeira — fachada retrofit com pátio arborizado' },
  { project: 'Galpão Ribeira', type: 'Sala integrada', img: '1600573472550-8090b5e0745e', alt: 'Galpão Ribeira — sala integrada com vista para a piscina' },
  { project: 'Galpão Ribeira', type: 'Estudo preliminar', img: '1503387762-592deb58ef4e', alt: 'Estudo preliminar — desenho técnico sobre a prancheta' },
  { project: 'Edifício Lume', type: 'Multifamiliar · 2024', img: '1487958449943-2429e8be8625', alt: 'Edifício Lume — volume em vidro e alumínio' },
  { project: 'Edifício Lume', type: 'Circulação', img: '1600566753086-00f18fb6b3ea', alt: 'Edifício Lume — circulação interna e escada' },
  { project: 'Edifício Lume', type: 'Áreas comuns', img: '1600585152220-90363fe7e115', alt: 'Edifício Lume — terraço com piscina' },
  { project: 'Edifício Lume', type: 'Fachada', img: '1512917774080-9991f1c4c750', alt: 'Edifício Lume — fachada e área externa' },
  { project: 'Apartamento Vidro', type: 'Interiores · 2023', img: '1600210492486-724fe5c67fb0', alt: 'Apartamento Vidro — sala de estar com luz natural' },
  { project: 'Apartamento Vidro', type: 'Estar', img: '1524758631624-e2822e304c36', alt: 'Apartamento Vidro — estar com iluminação de leitura' },
  { project: 'Pavilhão Sombra', type: 'Efêmero · 2022', img: '1518005020951-eccb494ad742', alt: 'Pavilhão Sombra — volume em curva sob o céu aberto' },
  { project: 'Pavilhão Sombra', type: 'Fachada', img: '1600566753190-17f0baa2a6c3', alt: 'Pavilhão Sombra — revestimento em madeira e metal' },
  { project: 'Pavilhão Sombra', type: 'Estrutura', img: '1545324418-cc1a3fa10c00', alt: 'Pavilhão Sombra — cobertura em vidro estrutural' },
  { project: 'Pavilhão Sombra', type: 'Vãos', img: '1486406146926-c627a92ad1ab', alt: 'Pavilhão Sombra — vão entre volumes em concreto' },
];

function projectImgUrl(id, w) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;
}

function slugify(str) {
  const stripAccents = new RegExp('[̀-ͯ]', 'g');
  return str.normalize('NFD').replace(stripAccents, '')
    .toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

/* agrupa as fotos por projeto — usado no índice de trabalhos (categorias)
   e na página de foco (projeto.html?p=<slug>) */
const PROJECT_GROUPS = PROJECTS.reduce((groups, item) => {
  let group = groups.find(g => g.name === item.project);
  if (!group) {
    group = { name: item.project, slug: slugify(item.project), type: item.type, photos: [] };
    groups.push(group);
  }
  group.photos.push(item);
  return groups;
}, []);

function buildGalleryItem(item, key, { caption = true } = {}) {
  const a = document.createElement('a');
  a.className = 'g-item reveal';
  a.href = '#';
  a.dataset.project = item.project;

  const img = document.createElement('img');
  img.src = projectImgUrl(item.img, 1000);
  img.alt = item.alt;
  img.loading = 'lazy';
  a.append(img);

  if (caption) {
    const figcaption = document.createElement('figcaption');
    figcaption.innerHTML = `<span class="title">${item.project}</span><span class="type mono">${item.type}</span>`;
    a.append(figcaption);
  }

  if (key !== undefined) a.dataset.key = key;
  return a;
}

/* observador único de revelação no scroll — reaproveitado para itens
   adicionados dinamicamente na galeria da home */
const revealObserver = !reduce ? new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('in'); revealObserver.unobserve(en.target); }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }) : null;

function observeReveal(el, i = 0) {
  if (!revealObserver) { el.classList.add('in'); return; }
  el.style.transitionDelay = (i % 5) * 0.05 + 's';
  revealObserver.observe(el);
}

/* ---------------- trabalhos: grid e lista como inversão simétrica ----------------
   Os dois conjuntos são renderizados sempre, cada projeto aparecendo duas
   vezes (uma foto e um nome) ligados pelo mesmo data-rel. Passar o mouse em
   um deles marca o par correspondente — em modo grade a foto invoca o nome,
   em modo lista o nome invoca a foto. Só o CSS decide quem é conteúdo e quem
   é camada de revelação.
--------------------------------------------------------------------------- */
const workEl = document.getElementById('work');
const workGridEl = document.getElementById('work-grid');
const workListEl = document.getElementById('work-list');
if (workEl && workGridEl && workListEl) {
  PROJECT_GROUPS.forEach(group => {
    const cover = group.photos[0];
    const href = `projeto.html?p=${group.slug}`;

    const gridItem = document.createElement('a');
    gridItem.className = 'work-grid-item';
    gridItem.href = href;
    gridItem.dataset.rel = group.slug;
    const img = document.createElement('img');
    img.src = projectImgUrl(cover.img, 900);
    img.alt = cover.alt;
    // sem lazy: as fotos precisam estar prontas pra aparecer no hover da lista
    gridItem.appendChild(img);
    workGridEl.appendChild(gridItem);

    const listItem = document.createElement('a');
    listItem.className = 'work-list-item';
    listItem.href = href;
    listItem.dataset.rel = group.slug;
    listItem.innerHTML = `<span class="work-name">${group.name}</span>`;
    workListEl.appendChild(listItem);
  });

  const pairs = new Map();
  [...workGridEl.children, ...workListEl.children].forEach(el => {
    const rel = el.dataset.rel;
    if (!pairs.has(rel)) pairs.set(rel, []);
    pairs.get(rel).push(el);
  });

  function setHover(rel, on) {
    pairs.get(rel).forEach(el => {
      el.classList.toggle('is-hovering', on);
      // "saindo" existe para o flip continuar o giro pro outro lado em vez
      // de voltar pelo mesmo caminho; some depois que a transição acaba
      el.classList.toggle('is-leaving', !on);
      if (!on) setTimeout(() => el.classList.remove('is-leaving'), 790);
    });
  }

  pairs.forEach((els, rel) => {
    els.forEach(el => {
      el.addEventListener('mouseenter', () => setHover(rel, true));
      el.addEventListener('mouseleave', () => setHover(rel, false));
      el.addEventListener('focus', () => setHover(rel, true));
      el.addEventListener('blur', () => setHover(rel, false));
    });
  });

  const workToggleButtons = [...document.querySelectorAll('.work-toggle button')];
  workToggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const list = btn.dataset.view === 'list';
      workEl.classList.toggle('view--list', list);
      workEl.classList.toggle('view--grid', !list);
      // troca de modo com o hover ainda ativo deixaria um par marcado
      pairs.forEach((_, rel) => setHover(rel, false));
      workToggleButtons.forEach(b => {
        const active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', String(active));
      });
    });
  });
}

/* ---------------- home: grade "espalhada" com loop de scroll ---------------- */
const homeGalleryEl = document.getElementById('home-gallery');
if (homeGalleryEl) {
  // monta um "período" (repete a lista curada pra ter linhas suficientes
  // pro loop não parecer curto) num fragment separado, fora da página ainda
  const CYCLES = 3;
  let index = 0;
  const periodFrag = document.createDocumentFragment();
  for (let c = 0; c < CYCLES; c++) {
    PROJECTS.forEach(item => {
      const el = buildGalleryItem(item, index, { caption: false }); // home: só foto, sem legenda
      el.classList.remove('reveal'); // a home usa reveal em cascata próprio, não o scroll-spy genérico
      periodFrag.appendChild(el);
      index++;

      // célula vazia periódica, só pra dar ritmo à grade — sem conteúdo
      if (index % 7 === 3) {
        const skip = document.createElement('div');
        skip.className = 'g-item g-item--skip';
        skip.setAttribute('aria-hidden', 'true');
        periodFrag.appendChild(skip);
      }
    });
  }

  // completa a última linha do período: o total de células (fotos + vazias)
  // precisa ser múltiplo de 5, 3 e 2 — as 3 quantidades de colunas usadas
  // nos breakpoints (desktop/tablet/mobile). Sem isso, a linha final fica
  // incompleta e o padrão de colunas deslocadas desalinha bem na emenda
  // entre uma cópia do período e a próxima.
  const LOOP_MULTIPLE = 30; // mmc(5, 3, 2)
  while (periodFrag.children.length % LOOP_MULTIPLE !== 0) {
    const item = PROJECTS[index % PROJECTS.length];
    const el = buildGalleryItem(item, index, { caption: false });
    el.classList.remove('reveal');
    periodFrag.appendChild(el);
    index++;
  }

  // cola DUAS cópias do período uma atrás da outra: o loop volta ao início
  // bem antes de a rolagem alcançar o fim da 1ª cópia, então sem uma 2ª
  // cópia pronta logo depois, a tela mostraria vazio por um instante ali —
  // com as duas, sempre tem foto de verdade esperando à frente.
  homeGalleryEl.appendChild(periodFrag.cloneNode(true));
  const periodHeight = homeGalleryEl.scrollHeight; // altura de 1 período só
  homeGalleryEl.appendChild(periodFrag.cloneNode(true));

  // animação de abertura: pra cada foto visível, calcula o vetor da sua
  // célula final até o centro da viewport e injeta como --tx/--ty — o CSS
  // usa esses valores como posição inicial (todas empilhadas no centro).
  // Quando o body ganha .has--finished, cada uma viaja de volta pra célula
  // com duração e delay próprios (efeito de explosão orgânica, não uníssono).
  const homeItems = [...homeGalleryEl.querySelectorAll('.g-item')];
  if (!reduce) {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    homeItems.forEach((el, i) => {
      const r = el.getBoundingClientRect();
      const visible = r.top < window.innerHeight && r.bottom > 0;
      if (visible) {
        el.style.setProperty('--tx', (cx - (r.left + r.width / 2)).toFixed(1) + 'px');
        el.style.setProperty('--ty', (cy - (r.top + r.height / 2)).toFixed(1) + 'px');
      }
      // pseudo-aleatório determinístico por índice: durações 0.9s–1.4s,
      // delays escalonados de 0.04s a 0.13s (multiplicador de 0.01s no CSS)
      el.style.setProperty('--dur', (0.9 + ((i * 7) % 11) / 20) + 's');
      el.style.setProperty('--delay', String(4 + ((i * 5) % 10)));
    });
  }

  if (!reduce) {
    // só looping pra baixo: target nunca fica negativo, então não dá
    // pra "puxar" além do topo — mas rolando pra baixo o loop nunca acaba.
    // Com o menu de tela cheia aberto, o grid fica parado.
    let target = 0;
    let current = 0;
    const ease = 0.08;
    const navOpen = () => document.body.classList.contains('nav-open');

    window.addEventListener('wheel', e => { if (navOpen()) return; target = Math.max(0, target + e.deltaY); }, { passive: true });

    let touchStartY = 0;
    window.addEventListener('touchstart', e => { touchStartY = e.touches[0].clientY; }, { passive: true });
    window.addEventListener('touchmove', e => {
      const y = e.touches[0].clientY;
      if (navOpen()) { touchStartY = y; return; }
      target = Math.max(0, target + (touchStartY - y) * 1.5);
      touchStartY = y;
    }, { passive: true });

    (function raf() {
      current += (target - current) * ease;
      const wrapped = current % periodHeight;
      homeGalleryEl.style.transform = `translateY(${-wrapped}px)`;
      requestAnimationFrame(raf);
    })();
  }
}

/* ---------------- página projeto.html: filmstrip + imagem principal ---------------- */
const projectTitleEl = document.getElementById('project-title');
if (projectTitleEl) {
  const slug = new URLSearchParams(location.search).get('p');
  const group = PROJECT_GROUPS.find(g => g.slug === slug) || PROJECT_GROUPS[0];

  document.getElementById('project-page-title').textContent = `${group.name} — Alexsandro Fernandes`;
  projectTitleEl.textContent = group.name;
  document.getElementById('project-info-name').textContent = group.name;

  const filmstripEl = document.getElementById('project-filmstrip');
  const mainImgEl = document.getElementById('project-main-img');
  const infoTypeEl = document.getElementById('project-info-type');

  function showPhoto(i) {
    const photo = group.photos[i];
    mainImgEl.src = projectImgUrl(photo.img, 1600);
    mainImgEl.alt = photo.alt;
    infoTypeEl.textContent = photo.type;
    [...filmstripEl.children].forEach((btn, bi) => btn.classList.toggle('is-active', bi === i));
  }

  group.photos.forEach((photo, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'project-thumb';
    btn.setAttribute('aria-label', photo.type);
    const img = document.createElement('img');
    img.src = projectImgUrl(photo.img, 200);
    img.alt = '';
    img.loading = 'lazy';
    btn.append(img);
    btn.addEventListener('click', () => showPhoto(i));
    filmstripEl.appendChild(btn);
  });

  showPhoto(0);

  const infoBtn = document.getElementById('project-info-btn');
  const infoPanel = document.getElementById('project-info-panel');
  infoBtn.addEventListener('click', () => {
    const open = infoBtn.getAttribute('aria-pressed') === 'true';
    infoBtn.setAttribute('aria-pressed', String(!open));
    infoPanel.hidden = open;
  });

  const backLink = document.getElementById('project-back');
  backLink.addEventListener('click', e => {
    if (document.referrer && new URL(document.referrer).host === location.host) {
      e.preventDefault();
      if (reduce) { history.back(); return; }
      document.body.classList.remove('has--finished');
      document.body.classList.add('is-leaving');
      setTimeout(() => history.back(), 450);
    }
  });
}

/* site é só a versão off-white/colorida — sem modo escuro nem monocromático;
   limpa qualquer preferência antiga que ainda esteja salva no navegador */
localStorage.removeItem('theme');
localStorage.removeItem('monochrome');
root.dataset.theme = 'light';
root.classList.remove('is-monochrome');

/* ---------------- navscreen: menu de tela cheia (botão +/×) ---------------- */
const navOpener = document.getElementById('nav-opener');
const navscreen = document.getElementById('navscreen');
if (navOpener && navscreen) {
  const aboutEl = navscreen.querySelector('.navscreen-about');
  let closeTimer = null;

  // quebra o parágrafo em linhas medidas de verdade (por offsetTop) e
  // embrulha cada uma em .line > .line__inner pro reveal linha a linha
  function splitLines(el) {
    if (!el || el.dataset.split === '1') return;
    const words = el.textContent.trim().split(/\s+/);
    el.textContent = '';
    const probe = words.map(w => {
      const s = document.createElement('span');
      s.style.display = 'inline-block';
      s.textContent = w;
      el.appendChild(s);
      el.appendChild(document.createTextNode(' '));
      return s;
    });
    const lines = [];
    let lastTop = null;
    probe.forEach(s => {
      const t = s.offsetTop;
      if (lastTop === null || t - lastTop > 1) { lines.push([]); lastTop = t; }
      lines[lines.length - 1].push(s.textContent);
    });
    el.textContent = '';
    lines.forEach((ws, i) => {
      const line = document.createElement('span');
      line.className = 'line';
      const inner = document.createElement('span');
      inner.className = 'line__inner';
      inner.style.transitionDelay = (0.08 + i * 0.06) + 's';
      inner.textContent = ws.join(' ');
      line.appendChild(inner);
      el.appendChild(line);
    });
    el.dataset.split = '1';
  }

  function openNav() {
    clearTimeout(closeTimer);
    navOpener.setAttribute('aria-expanded', 'true');
    navscreen.hidden = false;
    if (!reduce) splitLines(aboutEl); // só depois de visível, pra medir larguras reais
    requestAnimationFrame(() => {
      navscreen.classList.add('is-open');
      document.body.classList.add('nav-open');
    });
  }
  function closeNav() {
    navOpener.setAttribute('aria-expanded', 'false');
    navscreen.classList.remove('is-open');
    document.body.classList.remove('nav-open');
    closeTimer = setTimeout(() => { navscreen.hidden = true; }, 600);
  }
  navOpener.addEventListener('click', () => {
    navscreen.hidden ? openNav() : closeNav();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !navscreen.hidden) closeNav();
  });
}

/* ---------------- transição de página com blur ---------------- */
/* entrada: todo documento nasce sob o véu borrado e o dissolve logo após
   o primeiro frame (na home isso também dispara a explosão do grid) */
requestAnimationFrame(() => {
  setTimeout(() => document.body.classList.add('has--finished'), 60);
});

/* volta via bfcache (botão voltar): garante estado limpo */
window.addEventListener('pageshow', e => {
  if (e.persisted) {
    document.body.classList.remove('is-leaving');
    document.body.classList.add('has--finished');
  }
});

/* saída: intercepta cliques em links internos, borra a tela e só então navega */
document.addEventListener('click', e => {
  if (e.defaultPrevented || reduce) return;
  const a = e.target.closest('a');
  if (!a || !a.href || a.target === '_blank') return;
  let url;
  try { url = new URL(a.href, location.href); } catch { return; }
  if (url.origin !== location.origin) return;
  if (url.pathname === location.pathname && url.search === location.search) return;
  e.preventDefault();
  document.body.classList.remove('has--finished');
  document.body.classList.add('is-leaving');
  setTimeout(() => { location.href = url.href; }, 450);
});

/* revelação no scroll dos elementos estáticos da página */
document.querySelectorAll('.reveal:not(.g-item)').forEach((el, i) => observeReveal(el, i));
