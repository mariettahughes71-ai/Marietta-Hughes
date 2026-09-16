/* =====================================================
   MARIETTA HUGHES MERCY - WEBSITE JAVASCRIPT
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {

    // ===== PRELOADER =====
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('hidden');
        }, 2200);
    });

    // Fallback: hide preloader after 4 seconds regardless
    setTimeout(function() {
        preloader.classList.add('hidden');
    }, 4000);

    // ===== NAVBAR SCROLL =====
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;

        // Navbar background
        if (scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button
        if (scrollY > 600) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===== MOBILE MENU =====
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu on link click
    document.querySelectorAll('.nav-links a').forEach(function(link) {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu on outside click
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // ===== ACTIVE NAV LINK ON SCROLL =====
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ===== COUNTER ANIMATION =====
    const counters = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;
        countersAnimated = true;

        counters.forEach(function(counter) {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function: ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                const currentValue = Math.floor(eased * target);

                counter.textContent = currentValue;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            }

            requestAnimationFrame(updateCounter);
        });
    }

    // ===== SCROLL REVEAL ANIMATIONS =====
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');

                // Trigger counter animation when hero stats are visible
                if (entry.target.closest('.hero')) {
                    animateCounters();
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(function(el) {
        revealObserver.observe(el);
    });

    // Also observe hero stats directly
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    animateCounters();
                }
            });
        }, { threshold: 0.5 });
        statsObserver.observe(heroStats);
    }

    // ===== SERVICE FILTER TABS =====
    const tabBtns = document.querySelectorAll('.tab-btn');
    const serviceCards = document.querySelectorAll('.service-card');

    tabBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            // Update active tab
            tabBtns.forEach(function(b) { b.classList.remove('active'); });
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            serviceCards.forEach(function(card) {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ===== FAQ ACCORDION =====
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');

            // Close all
            faqItems.forEach(function(faq) {
                faq.classList.remove('active');
            });

            // Open clicked if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ===== FORM SUBMISSION WITH FORMSPREE =====
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function(e) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Let the form submit naturally to Formspree
        // Add a small delay to show loading state
        setTimeout(function() {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 3000);
    });

    // ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== PARALLAX EFFECT ON HERO =====
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        const particles = document.querySelectorAll('.particle');

        particles.forEach(function(particle, index) {
            const speed = 0.3 + (index * 0.05);
            particle.style.transform = 'translateY(' + (scrollY * speed * -0.3) + 'px)';
        });
    });

    // ===== TYPING EFFECT FOR HERO (subtle) =====
    const heroHighlight = document.querySelector('.hero-highlight');
    if (heroHighlight) {
        heroHighlight.style.opacity = '0';
        setTimeout(function() {
            heroHighlight.style.transition = 'opacity 1s ease';
            heroHighlight.style.opacity = '1';
        }, 800);
    }

});

// ===== CSS ANIMATION KEYFRAME (injected) =====
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(styleSheet);