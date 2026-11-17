/**
 * Bharat Nadar - Developer Portfolio (Vanilla JS, ES6+)
 * Original features: scroll spy, mobile drawer, project filter, reveal on scroll,
 * copy email with fallback + toast, back to top, dynamic year.
 * New: scroll progress bar, header state, mobile sticky action bar,
 * stat count-up, accessible filter tabs, drawer focus/aria handling.
 */
document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    root.classList.add('js-loaded');

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasIO = 'IntersectionObserver' in window;

    // Dynamic year
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Mobile drawer
    const toggle = document.getElementById('mobile-toggle');
    const drawer = document.getElementById('mobile-drawer');
    const setDrawer = (open) => {
        drawer.classList.toggle('is-active', open);
        drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
        const menu = toggle.querySelector('.icon-menu');
        const close = toggle.querySelector('.icon-close');
        if (menu && close) {
            menu.style.display = open ? 'none' : 'block';
            close.style.display = open ? 'block' : 'none';
        }
        document.body.style.overflow = open ? 'hidden' : '';
    };
    if (toggle && drawer) {
        toggle.addEventListener('click', () => setDrawer(!drawer.classList.contains('is-active')));
        drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setDrawer(false)));
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && drawer.classList.contains('is-active')) {
                setDrawer(false);
                toggle.focus();
            }
        });
        // Close drawer if resized to desktop
        window.matchMedia('(min-width: 900px)').addEventListener('change', (e) => {
            if (e.matches) setDrawer(false);
        });
    }

    // Scroll spy (desktop nav + mobile drawer links)
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const sections = document.querySelectorAll('main section[id]');
    if (hasIO && sections.length) {
        const spy = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const id = entry.target.id;
                navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
            });
        }, { rootMargin: '-25% 0px -65% 0px', threshold: 0 });
        sections.forEach(s => spy.observe(s));
    }

    // Reveal on scroll
    const reveals = document.querySelectorAll('.reveal-on-scroll');
    if (hasIO && reveals.length) {
        const revealIO = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                    obs.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -40px 0px', threshold: 0.08 });
        reveals.forEach(el => revealIO.observe(el));
    } else {
        reveals.forEach(el => el.classList.add('is-revealed'));
    }

    // Project filtering (accessible tabs)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card[data-category]');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => {
                const on = b === btn;
                b.classList.toggle('active', on);
                b.setAttribute('aria-selected', on ? 'true' : 'false');
            });
            const value = btn.dataset.filter;
            cards.forEach(card => {
                const show = value === 'all' || card.dataset.category.split(' ').includes(value);
                card.hidden = !show;
                if (show) card.classList.add('is-revealed');
            });
        });
    });

    // Header state, progress bar, mobile action bar (one rAF-throttled scroll handler)
    const header = document.getElementById('site-header');
    const progress = document.getElementById('progress');
    const actionBar = document.getElementById('action-bar');
    const hero = document.getElementById('about');
    const contact = document.getElementById('contact');
    let ticking = false;

    const onScroll = () => {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (header) header.classList.toggle('is-scrolled', y > 8);
        if (progress && max > 0) progress.style.transform = `scaleX(${Math.min(y / max, 1)})`;
        if (actionBar && hero && contact) {
            // Show after the hero CTAs scroll away; hide once the full contact section is on screen
            const heroBottom = hero.offsetTop + hero.offsetHeight * 0.6;
            const contactTop = contact.offsetTop - window.innerHeight * 0.4;
            actionBar.classList.toggle('is-visible', y > heroBottom && y < contactTop);
        }
        ticking = false;
    };
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(onScroll);
            ticking = true;
        }
    }, { passive: true });
    onScroll();

    // Stat count-up (runs once when stats come into view)
    const counters = document.querySelectorAll('[data-count]');
    const format = (el, value) => {
        const dec = parseInt(el.dataset.dec || '0', 10);
        el.textContent = (el.dataset.prefix || '') + value.toFixed(dec) + (el.dataset.suffix || '');
    };
    const runCounter = (el) => {
        const target = parseFloat(el.dataset.count);
        if (reduceMotion) return format(el, target);
        const duration = 1200;
        const start = performance.now();
        const step = (now) => {
            const t = Math.min((now - start) / duration, 1);
            format(el, target * (1 - Math.pow(1 - t, 3)));
            if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };
    if (hasIO && counters.length) {
        const countIO = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    runCounter(entry.target);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.6 });
        counters.forEach(el => countIO.observe(el));
    }

    // Copy email with fallback + toast
    const copyBtn = document.getElementById('copy-email-btn');
    const toast = document.getElementById('toast-alert');
    const email = 'bharatnadar64@gmail.com';
    let toastTimer;

    const showToast = (message) => {
        if (!toast) return;
        const msg = toast.querySelector('.toast-message');
        if (msg) msg.textContent = message;
        toast.classList.add('is-visible');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 3200);
    };

    if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
            let ok = false;
            if (navigator.clipboard && window.isSecureContext) {
                try { await navigator.clipboard.writeText(email); ok = true; } catch (_) { ok = false; }
            }
            if (!ok) {
                try {
                    const ta = document.createElement('textarea');
                    ta.value = email;
                    ta.setAttribute('readonly', '');
                    ta.style.cssText = 'position:fixed;left:-9999px;top:-9999px;';
                    document.body.appendChild(ta);
                    ta.select();
                    ok = document.execCommand('copy');
                    document.body.removeChild(ta);
                } catch (_) { ok = false; }
            }
            showToast(ok ? 'Email address copied to clipboard!' : `Email: ${email}`);
        });
    }

    // Back to top
    const topBtn = document.getElementById('back-to-top');
    if (topBtn) {
        topBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
        });
    }
});
