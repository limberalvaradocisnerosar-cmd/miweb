const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
let overlay = null;

if (mobileMenu && mobileMenu.parentElement) {
    document.body.appendChild(mobileMenu);
}

function createOverlay() {
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0, 0, 0, 0.5); z-index: 9998; opacity: 0; transition: opacity 0.3s ease; pointer-events: none;';
        document.body.appendChild(overlay);
    }
    return overlay;
}

function openMenu() {
    mobileMenu.classList.add('active');
    menuToggle.classList.add('active');
    const overlayEl = createOverlay();
    overlayEl.style.pointerEvents = 'all';
    overlayEl.style.opacity = '1';
    overlayEl.addEventListener('click', closeMenu);
}

function closeMenu() {
    mobileMenu.classList.remove('active');
    menuToggle.classList.remove('active');
    if (overlay) {
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
    }
}

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (mobileMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    const menuClose = document.getElementById('menuClose');
    if (menuClose) {
        menuClose.addEventListener('click', (e) => {
            e.stopPropagation();
            closeMenu();
        });
    }

    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });
}

const header = document.querySelector('header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
    
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => {
        observer.observe(card);
    });
});

