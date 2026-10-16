/**
 * Bharat Nadar - Developer Portfolio
 * Vanilla JavaScript (ES6+) Interactions
 * - Progressive enhancement
 * - Active section scroll spy (IntersectionObserver)
 * - Mobile drawer navigation
 * - Project category filtering
 * - Expandable secondary projects
 * - Copy email to clipboard with fallback & toast alert
 * - Back to top smooth scroll
 * - Dynamic copyright year
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Progressive Enhancement Flag
    document.documentElement.classList.add('js-loaded');

    // 2. Dynamic Copyright Year
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // 3. Mobile Navigation Drawer
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileToggle && mobileDrawer) {
        const toggleDrawer = (isOpen) => {
            const willOpen = typeof isOpen === 'boolean' ? isOpen : !mobileDrawer.classList.contains('is-active');
            mobileDrawer.classList.toggle('is-active', willOpen);
            mobileToggle.setAttribute('aria-expanded', willOpen ? 'true' : 'false');

            // Update toggle icon
            const iconMenu = mobileToggle.querySelector('.icon-menu');
            const iconClose = mobileToggle.querySelector('.icon-close');
            if (iconMenu && iconClose) {
                iconMenu.style.display = willOpen ? 'none' : 'block';
                iconClose.style.display = willOpen ? 'block' : 'none';
            }

            // Prevent background scrolling when drawer is open
            document.body.style.overflow = willOpen ? 'hidden' : '';
        };

        mobileToggle.addEventListener('click', () => toggleDrawer());

        // Close drawer when mobile link is tapped
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                toggleDrawer(false);
            });
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileDrawer.classList.contains('is-active')) {
                toggleDrawer(false);
                mobileToggle.focus();
            }
        });
    }

    // 4. Active Section Scroll Spy via IntersectionObserver
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    if ('IntersectionObserver' in window && sections.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -65% 0px',
            threshold: 0
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        const href = link.getAttribute('href');
                        if (href === `#${currentId}`) {
                            link.classList.add('active');
                        } else {
                            link.classList.remove('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => sectionObserver.observe(section));
    }

    // 5. Scroll Reveal Effect via IntersectionObserver
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if ('IntersectionObserver' in window && revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback: reveal immediately
        revealElements.forEach(el => el.classList.add('is-revealed'));
    }

    // 6. Project Category Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card[data-category]');

    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Active tab styling
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const categories = card.getAttribute('data-category').split(' ');
                    if (filterValue === 'all' || categories.includes(filterValue)) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(10px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 200);
                    }
                });
            });
        });
    }

    // 7. Copy Email to Clipboard with Fallback & Toast Alert
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const toastAlert = document.getElementById('toast-alert');
    const targetEmail = 'bharatnadar64@gmail.com';

    const showToast = (message) => {
        if (!toastAlert) return;
        const toastMessage = toastAlert.querySelector('.toast-message');
        if (toastMessage) toastMessage.textContent = message;

        toastAlert.classList.add('is-visible');
        setTimeout(() => {
            toastAlert.classList.remove('is-visible');
        }, 3200);
    };

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', async () => {
            let succeeded = false;

            // Modern Clipboard API
            if (navigator.clipboard && window.isSecureContext) {
                try {
                    await navigator.clipboard.writeText(targetEmail);
                    succeeded = true;
                } catch (err) {
                    succeeded = false;
                }
            }

            // Legacy fallback
            if (!succeeded) {
                try {
                    const textArea = document.createElement('textarea');
                    textArea.value = targetEmail;
                    textArea.style.position = 'fixed';
                    textArea.style.left = '-999999px';
                    textArea.style.top = '-999999px';
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                    succeeded = document.execCommand('copy');
                    document.body.removeChild(textArea);
                } catch (err) {
                    succeeded = false;
                }
            }

            if (succeeded) {
                showToast('Email address copied to clipboard!');
            } else {
                // Direct fallback: prompt user
                showToast(`Email: ${targetEmail}`);
            }
        });
    }

    // 8. Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
