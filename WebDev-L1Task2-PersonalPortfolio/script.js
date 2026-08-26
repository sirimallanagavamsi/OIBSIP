document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Custom Cursor Glow Tracker (Cyberpunk Aesthetic)
    const glowCursor = document.getElementById("glow-cursor");
    if (glowCursor) {
        window.addEventListener("mousemove", (e) => {
            glowCursor.style.left = `${e.clientX}px`;
            glowCursor.style.top = `${e.clientY}px`;
        }, { passive: true });
    }

    // 2. Typewriter Effect
    const words = ["Web Developer", "UI/UX Designer", "Oasis Infobyte Intern"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typewriterElement = document.getElementById("typewriter");

    function type() {
        if (!typewriterElement) return;

        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 40 : 90;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2200; // Pause when word is complete
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 400;
        }

        setTimeout(type, typeSpeed);
    }

    type();

    // 3. Accessible Mobile Menu Toggle with Outside Click Dismissal
    const menuToggle = document.getElementById("menu-toggle");
    const navContainer = document.getElementById("nav-container");

    if (menuToggle && navContainer) {
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            const isActive = navContainer.classList.toggle("active");
            menuToggle.setAttribute("aria-expanded", isActive ? "true" : "false");
        });

        // Close navbar when any link is clicked
        document.querySelectorAll(".nav-link").forEach(link => {
            link.addEventListener("click", () => {
                navContainer.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });

        // Close navbar when clicking outside on mobile
        document.addEventListener("click", (e) => {
            if (!navContainer.contains(e.target) && !menuToggle.contains(e.target)) {
                navContainer.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });
    }

    // 4. Optimized Scrollspy (Active Nav Link on Scroll)
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    function updateActiveNav() {
        let currentSection = "";
        const scrollPosition = window.scrollY + 250;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", updateActiveNav, { passive: true });

    // 5. Dynamic Skill Card Hover Colors from data-color
    const skillCards = document.querySelectorAll(".skill-card[data-color]");
    skillCards.forEach(card => {
        const brandColor = card.getAttribute("data-color");
        
        card.addEventListener("mouseenter", () => {
            card.style.borderColor = brandColor;
            card.style.boxShadow = `0 12px 35px -8px ${brandColor}45`;
            const icon = card.querySelector(".skill-icon");
            if (icon) icon.style.color = brandColor;
        });

        card.addEventListener("mouseleave", () => {
            card.style.borderColor = "";
            card.style.boxShadow = "";
            const icon = card.querySelector(".skill-icon");
            if (icon) icon.style.color = "";
        });
    });

    // 6. Intersection Observer for Scroll Animations
    const revealElements = document.querySelectorAll(".scroll-reveal");
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observerInstance.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -50px 0px" });

        revealElements.forEach(el => observer.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add("visible"));
    }

    // 7. Back to Top Floating Button
    const backToTopBtn = document.getElementById("backToTop");
    if (backToTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add("show");
            } else {
                backToTopBtn.classList.remove("show");
            }
        }, { passive: true });

        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // 8. Dynamic Copyright Year
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});