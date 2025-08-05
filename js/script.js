// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const body = document.body;

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    body.classList.toggle('no-scroll');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    body.classList.remove('no-scroll');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});



// Form submission handling for contact form
const contactForm = document.querySelector('.contatti-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const nome = formData.get('nome');
        const email = formData.get('email');
        const telefono = formData.get('telefono');
        const messaggio = formData.get('messaggio');
        
        // Basic validation
        if (!nome || !email || !messaggio) {
            alert('Per favore compila tutti i campi obbligatori.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Per favore inserisci un indirizzo email valido.');
            return;
        }
        
        // Create email content
        const emailSubject = 'Nuovo Messaggio dal Sito Web';
        const emailBody = `
Nuovo messaggio ricevuto:

NOME: ${nome}
EMAIL: ${email}
TELEFONO: ${telefono || 'Non fornito'}

MESSAGGIO:
${messaggio}

---
Messaggio inviato dal sito web.
        `;
        
        // Create mailto link
        const mailtoLink = `mailto:mariorossi.mr.rossi@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        
        // Show confirmation and open email client
        const conferma = confirm('Messaggio preparato!\n\nVuoi aprire il client email per inviare il messaggio?');
        
        if (conferma) {
            window.open(mailtoLink);
        }
        
        // Reset form
        this.reset();
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        } else {
            // Ripristina lo stato iniziale quando esce dal viewport
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.prodotto-single, .contatto-item, .valore');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add loading animation to images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
});

// Add hover effects for product image
document.querySelectorAll('.prodotto-image-large img').forEach(img => {
    img.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
    });
    
    img.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Add click effect to buttons
document.querySelectorAll('button, .cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    button, .cta-button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add scroll to top functionality
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: linear-gradient(45deg, #d4af37, #ff6b35);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add hover effect to scroll to top button
scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.transform = 'translateY(-2px)';
    scrollToTopBtn.style.boxShadow = '0 6px 20px rgba(212, 175, 55, 0.4)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.transform = 'translateY(0)';
    scrollToTopBtn.style.boxShadow = '0 4px 15px rgba(212, 175, 55, 0.3)';
});

// Observer per evitare la sovrapposizione con il footer
const footer = document.querySelector('footer');
if (footer) {
    const footerObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Il footer è visibile, sposta il pulsante più in alto
                const footerHeight = footer.offsetHeight;
                scrollToTopBtn.style.bottom = `${footerHeight + 20}px`;
            } else {
                // Il footer non è visibile, riporta il pulsante alla posizione originale
                scrollToTopBtn.style.bottom = '20px';
            }
        });
    }, { threshold: 0.1 });

    footerObserver.observe(footer);
}


// Set minimum date for date picker to today
document.addEventListener('DOMContentLoaded', () => {
    const dataRitiroInput = document.getElementById('data-ritiro');
    if (dataRitiroInput) {
        const today = new Date().toISOString().split('T')[0];
        dataRitiroInput.min = today;
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const prezzoSingolo = 12;
    const selectQuantita = document.getElementById('quantita');
    const prezzoTotale = document.getElementById('prezzo-totale');

    function aggiornaTotale() {
        const quantita = parseInt(selectQuantita.value, 10);
        if (!isNaN(quantita) && quantita > 0) {
            prezzoTotale.textContent = `Totale: CHF ${prezzoSingolo * quantita}`;
        } else {
            prezzoTotale.textContent = '';
        }
    }

    if (selectQuantita) {
        selectQuantita.addEventListener('change', aggiornaTotale);
    }
    aggiornaTotale();
});

console.log('Miele Artigianale - Sito web caricato con successo! 🍯');