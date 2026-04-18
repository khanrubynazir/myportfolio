// Portfolio UI: typewriter hero + tab navigation.
// ===== TYPEWRITER =====
function typeWriter(el, text, speed, onDone) {
  el.textContent = '';
  let i = 0;
  const timer = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(timer);
      if (onDone) onDone();
    }
  }, speed);
}

function addCursor(afterEl, sizeClass) {
  const cursor = document.createElement('span');
  cursor.className = sizeClass ? `cursor ${sizeClass}` : 'cursor';
  cursor.textContent = '|';
  afterEl.parentNode.insertBefore(cursor, afterEl.nextSibling);
  return cursor;
}

function removeCursor(cursor) {
  if (cursor && cursor.parentNode) cursor.parentNode.removeChild(cursor);
}

// run typewriter on page load
window.addEventListener('DOMContentLoaded', () => {
  const h1     = document.querySelector('.hero-content h1');
  const about  = document.querySelector('.about-text');

  const h1Text    = "Hi, my name is Ruby";
  const aboutText = "I'm an aspiring lawyer. Jack of all trades, master of none — but oftentimes better than a master of one.";

  // type h1 first
  const c1 = addCursor(h1);
  typeWriter(h1, h1Text, 80, () => {
    // color "Ruby" after typing finishes
    h1.innerHTML = h1.innerHTML.replace('Ruby', '<span class="highlight">Ruby</span>');
    removeCursor(c1);

    // small pause then type about text
    setTimeout(() => {
      const c2 = addCursor(about, 'small');
      typeWriter(about, aboutText, 28, () => {
        removeCursor(c2);
      });
    }, 300);
  });
});

// ===== TAB SWITCHING =====
function switchTab(tabName) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

  document.getElementById('tab-' + tabName).classList.add('active');
  const link = document.querySelector(`.nav-link[data-tab="${tabName}"]`);
  if (link) link.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    switchTab(link.dataset.tab);
  });
});

document.querySelectorAll('.btn[data-tab]').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    switchTab(btn.dataset.tab);
  });
});
