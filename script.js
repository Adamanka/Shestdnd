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

// ===== ПАРАЛЛАКС СМЕНА ФОНА ДЛЯ КАЖДОЙ ГЛАВЫ =====
function updateBackgroundOnScroll() {
    const chapters = document.querySelectorAll('.history-chapter');
    const windowHeight = window.innerHeight;
    
    // Получаем все фоны
    const bgElements = [
        document.querySelector('.parallax-bg-1'),
        document.querySelector('.parallax-bg-2'),
        document.querySelector('.parallax-bg-3'),
        document.querySelector('.parallax-bg-4'),
        document.querySelector('.parallax-bg-5'),
        document.querySelector('.parallax-bg-6')
    ];
    
    // Сначала скрываем все фоны
    bgElements.forEach(bg => {
        if (bg) bg.style.opacity = '0';
    });
    
    // Проходим по каждой главе
    chapters.forEach((chapter, index) => {
        const rect = chapter.getBoundingClientRect();
        const chapterCenter = rect.top + rect.height / 2;
        
        // Если глава видна на экране (центр главы в пределах видимости)
        if (chapterCenter > 0 && chapterCenter < windowHeight) {
            const bgIndex = Math.min(index, 5); // индекс фона (0-5)
            if (bgElements[bgIndex]) {
                bgElements[bgIndex].style.opacity = '1';
            }
        }
    });
    
    // Если ни одна глава не видна (начало страницы) — показываем первый фон
    let anyVisible = false;
    chapters.forEach((chapter) => {
        const rect = chapter.getBoundingClientRect();
        if (rect.top < windowHeight && rect.bottom > 0) {
            anyVisible = true;
        }
    });
    
    if (!anyVisible) {
        if (bgElements[0]) bgElements[0].style.opacity = '1';
    }
}

window.addEventListener('scroll', updateBackgroundOnScroll);
window.addEventListener('resize', updateBackgroundOnScroll);
window.addEventListener('load', updateBackgroundOnScroll);
updateBackgroundOnScroll();

console.log('Квента Шесть загружена! 🐰');
