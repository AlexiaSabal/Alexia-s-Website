/* Mobile nav toggle */
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("show");
    });

    document.querySelectorAll(".nav-links a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("show");
        });
    });
}

/* Footer year */
const yearEl = document.getElementById("year");
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

/* Smooth fade-out before navigating to another page on this site */
document.querySelectorAll("a[href]").forEach(function (link) {
    const href = link.getAttribute("href");

    if (!href) return;

    const isSamePageAnchor = href.startsWith("#");
    const isNewTab = link.target === "_blank";
    const isExternal = /^https?:\/\//i.test(href);
    const isMail = href.startsWith("mailto:") || href.startsWith("tel:");

    if (!isSamePageAnchor && !isNewTab && !isExternal && !isMail) {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            document.body.classList.add("page-exit");

            setTimeout(function () {
                window.location.href = href;
            }, 260);
        });
    }
});

/* Scroll-reveal animations */
const revealEls = document.querySelectorAll(".reveal");

if (revealEls.length && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in-view");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    revealEls.forEach(function (el) {
        revealObserver.observe(el);
    });
} else {
    revealEls.forEach(function (el) {
        el.classList.add("in-view");
    });
}

/* Highlight the active nav link while scrolling through in-page sections */
const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".nav-links a");

if (sections.length && navigationLinks.length) {
    window.addEventListener("scroll", function () {
        let currentSection = "";

        sections.forEach(function (section) {
            const top = section.offsetTop - 120;
            const bottom = top + section.offsetHeight;

            if (window.scrollY >= top && window.scrollY < bottom) {
                currentSection = section.getAttribute("id");
            }
        });

        navigationLinks.forEach(function (link) {
            link.classList.remove("active");

            if (currentSection && link.getAttribute("href") === "#" + currentSection) {
                link.classList.add("active");
            }
        });
    });
}
