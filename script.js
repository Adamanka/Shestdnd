// ===== ИНИЦИАЛИЗАЦИЯ AOS =====
AOS.init({
    duration: 600,
    easing: 'ease-out',
    once: true,
    offset: 50,
    disable: 'mobile'
});

// ===== ТОВАРИЩИ =====
const modalEl = document.getElementById('comradesModal');
const openBtn = document.getElementById('comradesBtn');
const closeBtn = document.getElementById('closeModalBtn');

openBtn.addEventListener('click', () => modalEl.classList.add('active'));
closeBtn.addEventListener('click', () => modalEl.classList.remove('active'));
modalEl.addEventListener('click', (e) => {
    if (e.target === modalEl) modalEl.classList.remove('active');
});

// ===== FULLSCREEN КАРТИНОК =====
const images = document.querySelectorAll('.chapter-image-left img, .chapter-image-right img, .chapter-image-left-lower img');
const fsModal = document.getElementById('fullscreenModal');
const fsImg = document.getElementById('fullscreenImage');
const fsClose = document.getElementById('fullscreenCloseBtn');

images.forEach(img => {
    img.addEventListener('click', function(e) {
        e.stopPropagation();
        fsImg.src = this.src;
        fsModal.classList.add('active');
    });
});

function closeFullscreen() {
    fsModal.classList.remove('active');
    fsImg.src = '';
}

fsClose.addEventListener('click', closeFullscreen);
fsModal.addEventListener('click', (e) => {
    if (e.target === fsModal) closeFullscreen();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && fsModal.classList.contains('active')) closeFullscreen();
});

// ===== ПУЛЬСАЦИЯ РУНЫ =====
const symbol = document.querySelector('.symbol-circle i');
if (symbol) {
    setInterval(() => {
        symbol.style.textShadow = '0 0 8px var(--rune-glow)';
        setTimeout(() => { symbol.style.textShadow = 'none'; }, 200);
    }, 3000);
}

// ===== ТЕМЫ =====
function setTheme(themeId) {
    document.documentElement.setAttribute('data-theme', themeId);
    localStorage.setItem('theme_six', themeId);
    document.querySelectorAll('.theme-card').forEach(card => {
        card.classList.toggle('active-theme', card.dataset.theme === themeId);
    });
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme_six') || '1';
    setTheme(savedTheme);
}

const themeBtn = document.getElementById('themeBtn');
const themeModal = document.getElementById('themeModal');
const themeModalClose = document.getElementById('themeModalClose');
const themeCards = document.querySelectorAll('.theme-card');

themeBtn.addEventListener('click', () => themeModal.classList.add('active'));
themeModalClose.addEventListener('click', () => themeModal.classList.remove('active'));
themeModal.addEventListener('click', (e) => {
    if (e.target === themeModal) themeModal.classList.remove('active');
});

themeCards.forEach(card => {
    card.addEventListener('click', () => {
        const themeId = card.dataset.theme;
        setTheme(themeId);
        themeModal.classList.remove('active');
    });
});

initTheme();

// ===== ПАРАЛЛАКС СМЕНА ФОНА =====
function updateBackgroundOnScroll() {
    const chapter6 = document.querySelector('.history-chapter[data-chapter="6"]');
    if (!chapter6) return;
    const rect = chapter6.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    let opacity = 0;
    if (rect.top <= windowHeight * 0.6) {
        opacity = Math.min(1, Math.max(0, (windowHeight * 0.6 - rect.top) / (windowHeight * 0.3)));
    }
    const bg1 = document.querySelector('.parallax-bg-1');
    const bg2 = document.querySelector('.parallax-bg-2');
    if (bg1 && bg2) {
        bg1.style.opacity = 1 - opacity;
        bg2.style.opacity = opacity;
    }
}

window.addEventListener('scroll', updateBackgroundOnScroll);
window.addEventListener('resize', updateBackgroundOnScroll);
updateBackgroundOnScroll();

console.log('Квента Шесть загружена! 🐰');
