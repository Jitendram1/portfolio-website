document.addEventListener('DOMContentLoaded', () => {
    
    /* 1. MOBILE MENU TOGGLE */
    const hamburger = document.querySelector('.hamburger-btn');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.m-link');
    let isMenuOpen = false;

    hamburger.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        hamburger.classList.toggle('active');
        overlay.classList.toggle('open');
        
        // Disable scrolling when menu is open
        document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    });

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            isMenuOpen = false;
            hamburger.classList.remove('active');
            overlay.classList.remove('open');
            document.body.style.overflow = 'auto';
        });
    });

    /* 2. SCROLL REVEAL (INTERSECTION OBSERVER) */
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const scrollElements = document.querySelectorAll('.fade-scroll');
    scrollElements.forEach(el => observer.observe(el));

    /* 3. NAVBAR SCROLL CLASS */
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
});