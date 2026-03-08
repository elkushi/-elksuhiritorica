/* ============================================
   ELEMENTS
   ============================================ */
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const langSelector = document.getElementById('langSelector');
const langBtn = document.getElementById('langBtn');
const langLabel = document.getElementById('langLabel');
const langDropdown = document.getElementById('langDropdown');

const overlay = document.createElement('div');
overlay.classList.add('navbar__mobile-overlay');
document.body.appendChild(overlay);


/* ============================================
   HELPERS
   ============================================ */
function openMenu() {
    hamburger.classList.add('open');
    navMenu.classList.add('open');
    overlay.classList.add('show');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
    overlay.classList.remove('show');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

function openLang() {
    langSelector.classList.add('open');
    langBtn.setAttribute('aria-expanded', 'true');
}

function closeLang() {
    langSelector.classList.remove('open');
    langBtn.setAttribute('aria-expanded', 'false');
}


/* ============================================
   HAMBURGER
   ============================================ */
hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburger.classList.contains('open') ? closeMenu() : openMenu();
});

navMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
overlay.addEventListener('click', closeMenu);


/* ============================================
   LANGUAGE SELECTOR
   ============================================ */
langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    langSelector.classList.contains('open') ? closeLang() : openLang();
});

langDropdown.querySelectorAll('li').forEach(item => {
    item.addEventListener('click', (e) => {
        e.stopPropagation();
        const selectedCode = item.getAttribute('data-lang');
        const selectedDir = item.getAttribute('data-dir');
        langDropdown.querySelectorAll('li').forEach(li => li.classList.remove('active'));
        item.classList.add('active');
        langLabel.textContent = selectedCode;
        document.documentElement.setAttribute('dir', selectedDir);
        document.documentElement.setAttribute('lang', selectedCode.toLowerCase());
        closeLang();
    });
});


/* ============================================
   OUTSIDE CLICK & RESIZE
   ============================================ */
document.addEventListener('click', (e) => {
    if (!langSelector.contains(e.target)) closeLang();
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) closeMenu();
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMenu();
});