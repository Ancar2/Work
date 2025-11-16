// ---------------------------------------------
// GALERÍA INTERACTIVA DE IMÁGENES
// ---------------------------------------------
const mainImg = document.querySelector('.item .image img');
const miniatures = document.querySelectorAll('.item .img-miniature img');

if (mainImg && miniatures.length > 0) {
    miniatures.forEach((img) => {
        img.addEventListener('click', () => {
            miniatures.forEach(i => i.parentElement.classList.remove('active'));
            img.parentElement.classList.add('active');
            mainImg.style.opacity = 0;
            setTimeout(() => {
                mainImg.src = img.src;
                mainImg.style.opacity = 1;
            }, 200);
        });
    });
    miniatures[0].parentElement.classList.add('active');
}

// ---------------------------------------------
// FAVORITOS Y MENU OVERLAY
// ---------------------------------------------
const overlay = document.getElementById('over');
if (overlay) {
    overlay.addEventListener('click', () => {
        const menuToggle = document.querySelector('.menu-toggle');
        if (menuToggle && menuToggle.checked) {
            menuToggle.checked = false;
        }
    });
}

const favoriteElements = document.querySelectorAll('.favorite-btn, .favorite-icon');
favoriteElements.forEach(el => {
    el.addEventListener('click', () => {
        el.classList.toggle('clicked');
    });
});

// ---------------------------------------------
// CONTROLES DE SCROLL EN GALERÍA HORIZONTAL
// ---------------------------------------------
const container = document.querySelector('.container-two');
const next = document.getElementById('next-btn');
const prev = document.getElementById('prev-btn');
let isScrolling = false;

const updateButtons = () => {
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    const scrollLeft = Math.round(container.scrollLeft);
    prev.style.opacity = scrollLeft <= 0 ? '0.4' : '1';
    next.style.opacity = scrollLeft >= maxScrollLeft - 2 ? '0.4' : '1';
    prev.disabled = scrollLeft <= 0;
    next.disabled = scrollLeft >= maxScrollLeft - 2;
};

const scrollByStep = (direction) => {
    if (isScrolling) return;
    const distance = container.offsetWidth * direction;
    const startScroll = container.scrollLeft;
    const targetScroll = startScroll + distance;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    const finalScroll = Math.max(0, Math.min(targetScroll, maxScrollLeft));
    isScrolling = true;
    container.scrollTo({ left: finalScroll, behavior: 'smooth' });

    const checkScroll = () => {
        const atTarget = Math.abs(container.scrollLeft - finalScroll) < 2;
        if (atTarget) {
            isScrolling = false;
            updateButtons();
        } else {
            requestAnimationFrame(checkScroll);
        }
    };
    requestAnimationFrame(checkScroll);
};

if (container && next && prev) {
    next.addEventListener('click', () => scrollByStep(1));
    prev.addEventListener('click', () => scrollByStep(-1));
    container.addEventListener('scroll', updateButtons);
    window.addEventListener('resize', updateButtons);
    updateButtons();
}



// ---------------------------------------------
// TRADUCCIÓN AUTOMÁTICA (GOOGLE TRANSLATE)
// ---------------------------------------------
window.googleTranslateElementInit = () => {
    new google.translate.TranslateElement({
        pageLanguage: 'es',
        autoDisplay: false
    }, 'google_translate_element');
};

document.querySelectorAll('#language-select li').forEach(li => {
    li.addEventListener('click', () => {
        const lang = li.getAttribute('data-lang');
        const select = document.querySelector('select.goog-te-combo');
        if (select) {
            select.value = lang;
            select.dispatchEvent(new Event('change'));
        }
        if (typeof langModal !== 'undefined' && langModal) {
            langModal.classList.add('hidden');
        }
    });
});

// ---------------------------------------------
// MODAL DE IDIOMAS
// ---------------------------------------------
const langToggle = document.getElementById('lang-toggle');
const langModal = document.getElementById('lang-modal');
const closeLang = document.getElementById('close-lang');

if (langToggle && langModal && closeLang) {
    langToggle.addEventListener('click', () => {
        langModal.classList.toggle('hidden');
    });
    closeLang.addEventListener('click', () => {
        langModal.classList.add('hidden');
    });
    document.addEventListener('click', (e) => {
        if (!langModal.contains(e.target) && !langToggle.contains(e.target)) {
            langModal.classList.add('hidden');
        }
    });
}
