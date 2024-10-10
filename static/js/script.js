document.addEventListener('DOMContentLoaded', () => {
    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Hero section animations
    gsap.from('.hero h1', { opacity: 0, y: 50, duration: 1, delay: 0.5 });
    gsap.from('.hero .subtitle', { opacity: 0, y: 50, duration: 1, delay: 0.7 });
    gsap.from('.hero .cta-button', { opacity: 0, y: 50, duration: 1, delay: 0.9 });

    // Feature section animations
    gsap.utils.toArray('.feature').forEach((feature, index) => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: feature,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });

        tl.from(feature.querySelector('h2'), { opacity: 0, x: index % 2 === 0 ? -50 : 50, duration: 0.8 })
          .from(feature.querySelector('p'), { opacity: 0, y: 50, duration: 0.8 }, '-=0.4')
          .from(feature.querySelectorAll('.feature-list li'), { opacity: 0, x: index % 2 === 0 ? -50 : 50, stagger: 0.2, duration: 0.8 }, '-=0.4')
          .from(feature.querySelector('.feature-icon'), { opacity: 0, scale: 0.8, duration: 1 }, '-=0.8');
    });

    // Contact form animations
    gsap.from('#contact h2', {
        scrollTrigger: {
            trigger: '#contact',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 0.8
    });

    gsap.from('#contact form > *', {
        scrollTrigger: {
            trigger: '#contact form',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 20,
        stagger: 0.2,
        duration: 0.8
    });

    // Logo and G image animations
    const logoContainer = document.querySelector('.logo-container');
    const logoText = document.querySelector('.logo-text');
    const gImage = document.querySelector('.g-image');

    // Make logo clickable to reload page
    const logoLink = document.querySelector('.logo-link');
    logoLink.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default link behavior
        window.location.reload(); // Reload the page
    });

    // G image slide down animation
    logoText.addEventListener('mouseenter', () => {
        gsap.to(gImage, { top: 'calc(100% + 10px)', opacity: 1, duration: 0.3, ease: 'power2.out' });
    });

    logoText.addEventListener('mouseleave', () => {
        gsap.to(gImage, { top: '100%', opacity: 0, duration: 0.3, ease: 'power2.in' });
    });

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        console.log('Form submitted:', { name, email, message });

        contactForm.reset();

        // Animate form submission
        gsap.to(contactForm, {
            opacity: 0,
            y: -20,
            duration: 0.5,
            onComplete: () => {
                const thankYouMessage = document.createElement('p');
                thankYouMessage.textContent = 'Спасибо за ваше сообщение. Мы свяжемся с вами в ближайшее время!';
                thankYouMessage.style.opacity = '0';
                contactForm.parentNode.insertBefore(thankYouMessage, contactForm);
                
                gsap.to(thankYouMessage, {
                    opacity: 1,
                    y: 20,
                    duration: 0.5
                });

                setTimeout(() => {
                    gsap.to(thankYouMessage, {
                        opacity: 0,
                        y: -20,
                        duration: 0.5,
                        onComplete: () => {
                            thankYouMessage.remove();
                            contactForm.style.opacity = '1';
                            contactForm.style.transform = 'translateY(0)';
                        }
                    });
                }, 3000);
            }
        });
    });
});