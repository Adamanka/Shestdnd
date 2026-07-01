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
    
    const bgElements = [
        document.querySelector('.parallax-bg-1'),
        document.querySelector('.parallax-bg-2'),
        document.querySelector('.parallax-bg-3'),
        document.querySelector('.parallax-bg-4'),
        document.querySelector('.parallax-bg-5'),
        document.querySelector('.parallax-bg-6')
    ];
    
    bgElements.forEach(bg => {
        if (bg) bg.style.opacity = '0';
    });
    
    chapters.forEach((chapter, index) => {
        const rect = chapter.getBoundingClientRect();
        const chapterCenter = rect.top + rect.height / 2;
        
        if (chapterCenter > 0 && chapterCenter < windowHeight) {
            const bgIndex = Math.min(index, 5);
            if (bgElements[bgIndex]) {
                bgElements[bgIndex].style.opacity = '1';
            }
        }
    });
    
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

// ===== МУЗЫКА =====
const music1 = document.getElementById('musicCh1-2');
const music2 = document.getElementById('musicCh3-6');
const musicBtn = document.getElementById('musicBtn');
let isMusicPlaying = false;
let currentTrack = '1-2';

// Функция переключения музыки
function switchMusic(track) {
    if (track === '3-6' && currentTrack !== '3-6') {
        music1.pause();
        music1.currentTime = 0;
        if (isMusicPlaying) {
            music2.play().catch(() => {});
        }
        currentTrack = '3-6';
        console.log('🎵 Переключено на музыку для глав 3-6');
    } else if (track === '1-2' && currentTrack !== '1-2') {
        music2.pause();
        music2.currentTime = 0;
        if (isMusicPlaying) {
            music1.play().catch(() => {});
        }
        currentTrack = '1-2';
        console.log('🎵 Переключено на музыку для глав 1-2');
    }
}

// Функция воспроизведения/паузы
function toggleMusic() {
    if (isMusicPlaying) {
        music1.pause();
        music2.pause();
        isMusicPlaying = false;
        musicBtn.innerHTML = '<i class="fas fa-music"></i> Музыка';
        musicBtn.classList.remove('playing');
        console.log('🔇 Музыка остановлена');
    } else {
        if (currentTrack === '1-2') {
            music1.play().catch(() => {
                console.log('⚠️ Автозапуск заблокирован браузером');
            });
        } else {
            music2.play().catch(() => {
                console.log('⚠️ Автозапуск заблокирован браузером');
            });
        }
        isMusicPlaying = true;
        musicBtn.innerHTML = '<i class="fas fa-volume-up"></i> Выкл. музыку';
        musicBtn.classList.add('playing');
        console.log('🔊 Музыка включена');
    }
}

// Кнопка музыки
musicBtn.addEventListener('click', toggleMusic);

// Смена музыки при скролле к 3-й главе
function updateMusicOnScroll() {
    const chapters = document.querySelectorAll('.history-chapter');
    const windowHeight = window.innerHeight;
    
    chapters.forEach((chapter) => {
        const rect = chapter.getBoundingClientRect();
        const chapterCenter = rect.top + rect.height / 2;
        
        if (chapterCenter > 0 && chapterCenter < windowHeight) {
            const chapterNum = parseInt(chapter.dataset.chapter);
            if (chapterNum <= 2) {
                switchMusic('1-2');
            } else if (chapterNum >= 3) {
                switchMusic('3-6');
            }
        }
    });
}

// Добавляем смену музыки в скролл
window.addEventListener('scroll', updateMusicOnScroll);
window.addEventListener('resize', updateMusicOnScroll);

// ===== ПЕРВОНАЧАЛЬНЫЙ ЗАПУСК =====
currentTrack = '1-2';
music1.volume = 0.5;
music2.volume = 0.5;

// Пробуем включить музыку автоматически (если разрешено)
document.addEventListener('click', function autoPlay() {
    if (!isMusicPlaying) {
        music1.play().then(() => {
            isMusicPlaying = true;
            musicBtn.innerHTML = '<i class="fas fa-volume-up"></i> Выкл. музыку';
            musicBtn.classList.add('playing');
            document.removeEventListener('click', autoPlay);
            console.log('🎵 Музыка запущена автоматически');
        }).catch(() => {
            console.log('⚠️ Автозапуск заблокирован браузером. Нажмите кнопку "Музыка" для включения.');
        });
    }
}, { once: true });

console.log('🎵 Музыка загружена!');
console.log('🐰 Квента Шесть загружена!');
