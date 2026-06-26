// ============================================
// Modern Aesthetic Portfolio - Main JavaScript
// STANDARDIZED VERSION - Compatible with aesthetic-portfolio JSON structure
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

// ============================================
// Initialize Application
// ============================================
async function initializeApp() {
    try {
        // Load all data sections
        await Promise.all([
            loadSiteConfig(),
            loadNavigation(),
            loadHero(),
            loadAbout(),
            loadExperience(),
            loadPortfolio(),
            loadSkills(),
            loadEducation(),
            loadContact(),
            loadFooter()
        ]);

        // Initialize interactive features
        initializeNavigation();
        initializeScrollEffects();
        initializeBackToTop();
        initializeAnimations();

        console.log('Portfolio loaded successfully!');
    } catch (error) {
        console.error('Error initializing application:', error);
    }
}

// ============================================
// Load Site Configuration
// ============================================
async function loadSiteConfig() {
    try {
        const response = await fetch('data/site-config.json');
        const data = await response.json();

        document.title = data.title;
        document.querySelector('meta[name="description"]').setAttribute('content', data.description);
        document.querySelector('meta[name="keywords"]').setAttribute('content', data.keywords);
        document.querySelector('meta[name="author"]').setAttribute('content', data.author);
    } catch (error) {
        console.error('Error loading site config:', error);
    }
}

// ============================================
// Load Navigation
// ============================================
async function loadNavigation() {
    try {
        const response = await fetch('data/navigation.json');
        const data = await response.json();

        const brandElement = document.getElementById('nav-brand');
        if (brandElement) {
            brandElement.textContent = data.brand.name;
            brandElement.href = data.brand.href;
        }

        const navMenu = document.getElementById('nav-menu');
        if (navMenu && data.menuItems) {
            navMenu.innerHTML = data.menuItems.map(item => `
                <li><a href="${item.href}" class="nav-link">${item.text}</a></li>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading navigation:', error);
    }
}

// ============================================
// Load Hero Section
// ============================================
async function loadHero() {
    try {
        const response = await fetch('data/hero.json');
        const data = await response.json();

        document.getElementById('hero-greeting').textContent = data.greeting;
        document.getElementById('hero-name').textContent = data.name;
        document.getElementById('hero-title').textContent = data.title;

        // Support both new "summary" and old "subtitle"/"description"
        const summary = data.summary || data.subtitle || '';
        const description = data.description || '';
        document.getElementById('hero-subtitle').textContent = summary;
        if (document.getElementById('hero-description')) {
            document.getElementById('hero-description').textContent = description || summary;
        }

        // CTA buttons - support both new nested structure and old flat array
        const ctaContainer = document.getElementById('hero-cta');
        if (ctaContainer && data.cta) {
            const buttons = data.cta.buttons || data.cta;
            ctaContainer.innerHTML = buttons.map(button => `
                <a href="${button.href}" class="btn btn-${button.type}">${button.text}</a>
            `).join('');
        }

        // Social links
        const socialContainer = document.getElementById('hero-social');
        if (socialContainer && data.socialLinks) {
            socialContainer.innerHTML = data.socialLinks.map(link => `
                <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="${link.platform}">
                    <i class="${link.icon}"></i>
                </a>
            `).join('');
        }

        // Stats/Highlights - support both new "highlights" and old "stats"
        const statsContainer = document.getElementById('hero-stats');
        if (statsContainer) {
            const items = data.highlights || data.stats || [];
            statsContainer.innerHTML = items.map(item => {
                // Support both formats: {icon, text} and {number, label}
                if (item.icon && item.text) {
                    return `
                        <div class="stat-item">
                            <i class="${item.icon}"></i>
                            <span class="stat-label">${item.text}</span>
                        </div>
                    `;
                } else {
                    return `
                        <div class="stat-item">
                            <span class="stat-number">${item.number}</span>
                            <span class="stat-label">${item.label}</span>
                        </div>
                    `;
                }
            }).join('');
        }
    } catch (error) {
        console.error('Error loading hero section:', error);
    }
}

// ============================================
// Load About Section
// ============================================
async function loadAbout() {
    try {
        const response = await fetch('data/about.json');
        const data = await response.json();

        document.getElementById('about-title').textContent = data.sectionTitle;

        // About text
        const textContainer = document.getElementById('about-text');
        if (textContainer && data.content) {
            textContainer.innerHTML = data.content.map(paragraph => `
                <p>${paragraph}</p>
            `).join('');
        }

        // Highlights
        const highlightsContainer = document.getElementById('about-highlights');
        if (highlightsContainer && data.highlights) {
            highlightsContainer.innerHTML = data.highlights.map(highlight => `
                <div class="highlight-card">
                    <i class="${highlight.icon}"></i>
                    <h3>${highlight.title}</h3>
                    <p>${highlight.description}</p>
                </div>
            `).join('');
        }

        // Resume button
        const resumeContainer = document.getElementById('about-resume');
        if (resumeContainer && data.resume) {
            resumeContainer.innerHTML = `
                <a href="${data.resume.href}" download class="btn btn-primary">${data.resume.text}</a>
            `;
        }
    } catch (error) {
        console.error('Error loading about section:', error);
    }
}

// ============================================
// Load Experience Section
// ============================================
async function loadExperience() {
    try {
        const response = await fetch('data/experience.json');
        const data = await response.json();

        document.getElementById('experience-title').textContent = data.sectionTitle;

        const gridContainer = document.getElementById('experience-grid');
        if (gridContainer && data.experiences) {
            gridContainer.innerHTML = data.experiences.map(exp => {
                // Support both new "title" and old "role"
                const title = exp.title || exp.role || '';
                // Support both new "responsibilities" and old "achievements"
                const responsibilities = exp.responsibilities || exp.achievements || [];

                return `
                    <div class="experience-card">
                        <div class="experience-header">
                            <h3 class="experience-role">${title}</h3>
                            <p class="experience-company">${exp.company} ${exp.location ? `• ${exp.location}` : ''}</p>
                            <p class="experience-period">${exp.period}</p>
                        </div>
                        <p class="experience-description">${exp.description}</p>
                        ${responsibilities.length > 0 ? `
                            <ul class="experience-achievements">
                                ${responsibilities.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                        ` : ''}
                    </div>
                `;
            }).join('');
        }
    } catch (error) {
        console.error('Error loading experience section:', error);
    }
}

// ============================================
// Load Portfolio Section
// ============================================
async function loadPortfolio() {
    try {
        // Try new filename first, fallback to old filename
        let response;
        try {
            response = await fetch('data/projects.json');
        } catch {
            response = await fetch('data/portfolio.json');
        }
        const data = await response.json();

        document.getElementById('portfolio-title').textContent = data.sectionTitle;
        if (document.getElementById('portfolio-subtitle')) {
            document.getElementById('portfolio-subtitle').textContent = data.subtitle || '';
        }

        const gridContainer = document.getElementById('portfolio-grid');
        if (gridContainer && data.projects) {
            gridContainer.innerHTML = data.projects.map(project => {
                // Support both "technologies" (new) and "tags" (old)
                const tech = project.technologies || project.tags || [];

                return `
                    <div class="portfolio-card">
                        <div class="portfolio-image" style="background-image: url('${project.image}');">
                            ${project.icon ? `<div class="portfolio-icon"><i class="${project.icon}"></i></div>` : ''}
                        </div>
                        <div class="portfolio-content">
                            <p class="portfolio-category">${project.category}</p>
                            <h3 class="portfolio-title">${project.title}</h3>
                            <p class="portfolio-description">${project.description}</p>
                            ${tech.length > 0 ? `
                                <div class="portfolio-tags">
                                    ${tech.map(tag => `<span class="tag">${tag}</span>`).join('')}
                                </div>
                            ` : ''}
                            ${project.links ? `
                                <div class="portfolio-links">
                                    ${project.links.live ? `
                                        <a href="${project.links.live}" target="_blank" rel="noopener noreferrer" class="portfolio-link">
                                            <i class="fas fa-external-link-alt"></i> Live Demo
                                        </a>
                                    ` : ''}
                                    ${project.links.github ? `
                                        <a href="${project.links.github}" target="_blank" rel="noopener noreferrer" class="portfolio-link">
                                            <i class="fab fa-github"></i> Code
                                        </a>
                                    ` : ''}
                                    ${project.links.case_study ? `
                                        <a href="${project.links.case_study}" class="portfolio-link">
                                            <i class="fas fa-book"></i> Case Study
                                        </a>
                                    ` : ''}
                                    ${project.links.prototype ? `
                                        <a href="${project.links.prototype}" target="_blank" rel="noopener noreferrer" class="portfolio-link">
                                            <i class="fas fa-desktop"></i> Prototype
                                        </a>
                                    ` : ''}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `;
            }).join('');
        }
    } catch (error) {
        console.error('Error loading portfolio section:', error);
    }
}

// ============================================
// Load Skills Section
// ============================================
async function loadSkills() {
    try {
        const response = await fetch('data/skills.json');
        const data = await response.json();

        document.getElementById('skills-title').textContent = data.sectionTitle;
        document.getElementById('skills-subtitle').textContent = data.subtitle;

        const categoriesContainer = document.getElementById('skills-categories');
        if (categoriesContainer && data.categories) {
            categoriesContainer.innerHTML = data.categories.map(category => `
                <div class="skill-category">
                    <div class="skill-category-header">
                        <i class="${category.icon}"></i>
                        <h3 class="skill-category-name">${category.name}</h3>
                    </div>
                    ${category.skills.map(skill => `
                        <div class="skill-item">
                            <div class="skill-info">
                                <span class="skill-name">${skill.name}</span>
                                <span class="skill-level-text">${skill.level}%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-bar-fill" style="width: ${skill.level}%"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading skills section:', error);
    }
}

// ============================================
// Load Education Section (STANDARDIZED)
// ============================================
async function loadEducation() {
    try {
        const response = await fetch('data/education.json');
        const data = await response.json();
        // Education section - may not be displayed in this template
        console.log('Education data loaded:', data);
    } catch (error) {
        console.error('Error loading education:', error);
    }
}

// ============================================
// Load Contact Section
// ============================================
async function loadContact() {
    try {
        const response = await fetch('data/contact.json');
        const data = await response.json();

        document.getElementById('contact-title').textContent = data.sectionTitle;
        document.getElementById('contact-subtitle').textContent = data.subtitle;

        // Contact info
        const contactInfoContainer = document.getElementById('contact-info');
        if (contactInfoContainer && data.contactInfo) {
            contactInfoContainer.innerHTML = data.contactInfo.map(info => `
                <div class="contact-info-item">
                    <i class="${info.icon}"></i>
                    <div class="contact-info-content">
                        <h4>${info.label}</h4>
                        <p>${info.value}</p>
                    </div>
                </div>
            `).join('');
        }

        // Contact form
        const contactForm = document.getElementById('contact-form');
        if (contactForm && data.form) {
            contactForm.action = data.form.action;
            contactForm.method = data.form.method;

            contactForm.innerHTML = data.form.fields.map(field => `
                <div class="form-group">
                    <label for="${field.name}">${field.label}</label>
                    ${field.type === 'textarea' ? `
                        <textarea
                            id="${field.name}"
                            name="${field.name}"
                            placeholder="${field.placeholder}"
                            ${field.required ? 'required' : ''}
                            rows="${field.rows || 5}"
                        ></textarea>
                    ` : `
                        <input
                            type="${field.type}"
                            id="${field.name}"
                            name="${field.name}"
                            placeholder="${field.placeholder}"
                            ${field.required ? 'required' : ''}
                        />
                    `}
                </div>
            `).join('') + `
                <button type="submit" class="form-submit">${data.form.submitText}</button>
                <div class="form-message"></div>
            `;

            // Handle form submission
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const formMessage = contactForm.querySelector('.form-message');
                const submitButton = contactForm.querySelector('.form-submit');

                try {
                    submitButton.disabled = true;
                    submitButton.textContent = 'Sending...';

                    const formData = new FormData(contactForm);
                    const response = await fetch(contactForm.action, {
                        method: contactForm.method,
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });

                    if (response.ok) {
                        formMessage.textContent = data.form.successMessage;
                        formMessage.className = 'form-message success';
                        formMessage.style.display = 'block';
                        contactForm.reset();
                    } else {
                        throw new Error('Form submission failed');
                    }
                } catch (error) {
                    formMessage.textContent = data.form.errorMessage;
                    formMessage.className = 'form-message error';
                    formMessage.style.display = 'block';
                } finally {
                    submitButton.disabled = false;
                    submitButton.textContent = data.form.submitText;
                }
            });
        }

        // Social media
        const socialContainer = document.getElementById('contact-social');
        if (socialContainer && data.socialMedia) {
            socialContainer.innerHTML = data.socialMedia.map(social => `
                <a href="${social.url}" target="_blank" rel="noopener noreferrer" class="contact-social-item">
                    <i class="${social.icon}"></i>
                    <span>${social.username}</span>
                </a>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading contact section:', error);
    }
}

// ============================================
// Load Footer
// ============================================
async function loadFooter() {
    try {
        const response = await fetch('data/footer.json');
        const data = await response.json();

        document.getElementById('footer-text').textContent = data.text;
        document.getElementById('footer-copyright').textContent = data.copyright;

        // Footer social links
        const footerSocial = document.getElementById('footer-social');
        if (footerSocial && data.socialLinks) {
            footerSocial.innerHTML = data.socialLinks.map(link => `
                <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="${link.platform}">
                    <i class="${link.icon}"></i>
                </a>
            `).join('');
        }

        // Footer links
        const footerLinks = document.getElementById('footer-links');
        if (footerLinks && data.links) {
            footerLinks.innerHTML = data.links.map(link => `
                <a href="${link.href}">${link.text}</a>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading footer:', error);
    }
}

// ============================================
// Initialize Navigation
// ============================================
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Smooth scroll to sections
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// Initialize Scroll Effects
// ============================================
function initializeScrollEffects() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Navbar scroll effect
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link highlighting
        const sections = document.querySelectorAll('section[id]');
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

// ============================================
// Initialize Back to Top Button
// ============================================
function initializeBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');

    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ============================================
// Initialize Animations
// ============================================
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.section, .experience-card, .portfolio-card, .skill-category');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}
