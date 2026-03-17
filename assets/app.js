const toggle = document.querySelector('.menu-toggle');
const drawer = document.querySelector('.mobile-drawer');
const closeBtn = document.querySelector('.menu-close');
const backdrop = document.querySelector('.menu-backdrop');
const focusables = () => drawer.querySelectorAll('a, button');
let previousFocus = null;

function openMenu() {
  previousFocus = document.activeElement;
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
  toggle.setAttribute('aria-expanded', 'true');
  backdrop.hidden = false;
  document.body.classList.add('lock');
  const first = focusables()[0];
  if (first) first.focus();
}

function closeMenu() {
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
  toggle.setAttribute('aria-expanded', 'false');
  backdrop.hidden = true;
  document.body.classList.remove('lock');
  if (previousFocus) previousFocus.focus();
}

toggle?.addEventListener('click', () => {
  if (drawer.classList.contains('open')) closeMenu();
  else openMenu();
});
closeBtn?.addEventListener('click', closeMenu);
backdrop?.addEventListener('click', closeMenu);

document.addEventListener('keydown', (e) => {
  if (!drawer.classList.contains('open')) return;
  if (e.key === 'Escape') closeMenu();
  if (e.key === 'Tab') {
    const items = [...focusables()];
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

drawer?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
