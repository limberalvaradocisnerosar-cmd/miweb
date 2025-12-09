// Menú hamburguesa funcional - Código común para todas las páginas
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
let overlay = null;

function createOverlay() {
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0, 0, 0, 0.5); z-index: 98; opacity: 0; transition: opacity 0.3s ease; pointer-events: none;';
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

    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });
}

