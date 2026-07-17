const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* miniatura que segue o cursor no índice */
const peek = document.querySelector('.peek');
const peekImg = peek.querySelector('img');
let tx = 0, ty = 0, cx = 0, cy = 0, active = false;

document.querySelectorAll('.row').forEach(row => {
  row.addEventListener('mouseenter', () => {
    if (matchMedia('(hover: none)').matches) return;
    peekImg.src = row.dataset.img;
    peek.classList.add('on');
    active = true;
  });
  row.addEventListener('mouseleave', () => {
    peek.classList.remove('on');
    active = false;
  });
});

window.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });

(function loop(){
  cx += (tx - cx) * 0.12;
  cy += (ty - cy) * 0.12;
  if (active) peek.style.left = cx + 'px', peek.style.top = cy + 'px';
  requestAnimationFrame(loop);
})();

/* revelação no scroll */
if (!reduce) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = (i % 5) * 0.05 + 's';
    io.observe(el);
  });
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
}
