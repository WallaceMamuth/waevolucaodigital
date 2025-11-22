const mobileToggle = document.getElementById("mobileToggle");
const mobileMenu = document.getElementById("mobileMenu");
const yearSpan = document.getElementById("year");
const faqItems = document.querySelectorAll(".faq-item");

if (mobileToggle && mobileMenu) {
  mobileToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
  });
}

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  question?.addEventListener("click", () => {
    const expanded = question.getAttribute("aria-expanded") === "true";
    question.setAttribute("aria-expanded", String(!expanded));
    item.classList.toggle("open");
  });
});

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear().toString();
}

const contactForm = document.querySelector(".contact-form-modern");
if (contactForm) {
  const feedback = contactForm.querySelector(".form-feedback");
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (feedback) {
      feedback.textContent = "Recebemos seu briefing! Responderemos em até 24h úteis.";
      feedback.classList.add("visible");
      setTimeout(() => {
        feedback.classList.remove("visible");
      }, 5000);
    }
    contactForm.reset();
  });
}

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#" && href.length > 1) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  });
});

// Animação suave ao scroll (fade in)
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Aplicar animação em cards e seções
document.querySelectorAll(".service-card, .plan-card, .case-card, .testimonial-card, .motivation-card, .insight-post, .gallery-card").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(el);
});

// Esconder botão flutuante quando chegar no footer
const floatingCta = document.querySelector(".floating-cta");
const siteFooter = document.querySelector(".site-footer");

if (floatingCta && siteFooter) {
  const footerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Footer está visível, esconder botão
          floatingCta.style.opacity = "0";
          floatingCta.style.pointerEvents = "none";
          floatingCta.style.transform = "translateY(20px)";
        } else {
          // Footer não está visível, mostrar botão
          floatingCta.style.opacity = "1";
          floatingCta.style.pointerEvents = "auto";
          floatingCta.style.transform = "";
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    }
  );

  // Adicionar transição suave
  floatingCta.style.transition = "opacity 0.3s ease, transform 0.3s ease, pointer-events 0.3s ease";

  footerObserver.observe(siteFooter);
}

