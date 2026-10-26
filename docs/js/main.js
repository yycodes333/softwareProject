'use strict';

// Progressive enhancement: all product and installation content works without JS.
const toggle = document.querySelector('.menu-toggle');
const navigation = document.getElementById('navigation');
const mobile = window.matchMedia('(max-width: 600px)');
document.documentElement.classList.add('js-ready');
toggle.hidden = false;
function closeMenu(returnFocus = false) {
  navigation.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
  if (returnFocus) toggle.focus();
}
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
document.addEventListener('click', event => {
  if (!event.target.closest('.nav-wrap')) closeMenu();
});
mobile.addEventListener('change', () => closeMenu());

const copyButton = document.getElementById('copy-address');
const copyStatus = document.getElementById('copy-status');
copyButton.hidden = false;
copyButton.addEventListener('click', async () => {
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText('chrome://extensions/');
    copyStatus.textContent = '已复制，请粘贴到 Chrome 地址栏打开。';
  } catch {
    copyStatus.textContent = '暂时无法自动复制，请手动选中并复制：chrome://extensions/';
  }
});
document.getElementById('year').textContent = String(new Date().getFullYear());
