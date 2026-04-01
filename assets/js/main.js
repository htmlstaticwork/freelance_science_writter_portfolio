document.addEventListener('DOMContentLoaded', () => {
    const htmlElement = document.documentElement;

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.setAttribute('data-lucide', 'x');
                } else {
                    icon.setAttribute('data-lucide', 'menu');
                }
                lucide.createIcons();
            }
        });
    }

    // Mobile Dropdown Toggle Logic
    const dropdownBtns = document.querySelectorAll('.nav-dropbtn');
    dropdownBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (window.innerWidth <= 1024) {
                e.preventDefault();
                const parent = btn.parentElement;
                const dropdownContent = parent.querySelector('.nav-dropdown-content');
                if (dropdownContent) {
                    dropdownContent.classList.toggle('show');
                    btn.classList.toggle('active-toggle');
                }
            }
        });
    });

    // --- Theme (Dark Mode) Logic ---
    const themeToggles = document.querySelectorAll('.theme-toggle');
    
    // Initial Theme load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlElement.classList.add('dark-mode');
        updateAllThemeIcons('dark');
    } else {
        updateAllThemeIcons('light');
    }

    themeToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            htmlElement.classList.toggle('dark-mode');
            const isDark = htmlElement.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateAllThemeIcons(isDark ? 'dark' : 'light');
        });
    });

    function updateAllThemeIcons(theme) {
        themeToggles.forEach(btn => {
            const icon = btn.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
            }
        });
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    // --- RTL (Right-to-Left) Logic ---
    const rtlToggles = document.querySelectorAll('.rtl-toggle');
    
    // Initial RTL load
    const savedRTL = localStorage.getItem('rtl');
    if (savedRTL === 'true') {
        htmlElement.setAttribute('dir', 'rtl');
        updateAllRTLIcons(true);
    } else {
        htmlElement.removeAttribute('dir');
        updateAllRTLIcons(false);
    }

    rtlToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentRTL = htmlElement.getAttribute('dir') === 'rtl';
            if (currentRTL) {
                htmlElement.removeAttribute('dir');
                localStorage.setItem('rtl', 'false');
                updateAllRTLIcons(false);
            } else {
                htmlElement.setAttribute('dir', 'rtl');
                localStorage.setItem('rtl', 'true');
                updateAllRTLIcons(true);
            }
        });
    });

    function updateAllRTLIcons(isRTL) {
        rtlToggles.forEach(btn => {
            const icon = btn.querySelector('i');
            if (icon) {
                // You could flip the icon or change it, but standard globe for lang/RTL is fine
                icon.setAttribute('data-lucide', 'languages');
            }
        });
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    // --- Article Filtering Logic ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const articleItems = document.querySelectorAll('.article-item');

    if (filterBtns.length > 0 && articleItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // 1. Remove highlight from all buttons
                filterBtns.forEach(b => {
                    b.classList.remove('btn-primary');
                    b.classList.add('btn-outline');
                });
                
                // 2. Add highlight to the clicked button
                btn.classList.add('btn-primary');
                btn.classList.remove('btn-outline');

                // 3. Filter articles
                const filterValue = btn.getAttribute('data-filter');
                articleItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeIn 0.5s ease forwards';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
