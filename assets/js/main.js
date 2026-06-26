// ============================================================
//  Tirth Laheri — Portfolio · data-driven renderer (vanilla JS)
// ============================================================

document.documentElement.classList.add('js');
document.addEventListener('DOMContentLoaded', init);

async function init() {
    await Promise.all([
        loadSiteConfig(),
        loadNavigation(),
        loadHero(),
        loadAbout(),
        loadExperience(),
        loadProjects(),
        loadSkills(),
        loadEducation(),
        loadPublications(),
        loadContact(),
        loadFooter(),
    ]);

    initNavigation();
    initScrollEffects();
    initBackToTop();
    initReveal();
}

const $ = (id) => document.getElementById(id);
async function getJSON(path) {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`${path} → ${res.status}`);
    return res.json();
}

// ---------- Site config ----------
async function loadSiteConfig() {
    try {
        const d = await getJSON('data/site-config.json');
        if (d.title) document.title = d.title;
        const set = (sel, v) => { const el = document.querySelector(sel); if (el && v) el.setAttribute('content', v); };
        set('meta[name="description"]', d.description);
        set('meta[name="keywords"]', d.keywords);
        set('meta[name="author"]', d.author);
    } catch (e) { console.error(e); }
}

// ---------- Navigation ----------
async function loadNavigation() {
    try {
        const d = await getJSON('data/navigation.json');
        if (d.brand?.name) $('nav-brand-name').textContent = d.brand.name;
        $('nav-menu').innerHTML = (d.menuItems || []).map(i =>
            `<li><a href="${i.href}" class="nav-link">${i.text}</a></li>`).join('');
    } catch (e) { console.error(e); }
}

// ---------- Hero ----------
async function loadHero() {
    try {
        const d = await getJSON('data/hero.json');

        $('hero-meta').innerHTML = (d.meta || []).map(m =>
            `<span><i class="${m.icon}"></i>${m.text}</span>`).join('');

        const portrait = $('hero-portrait-img');
        if (portrait && d.portrait) { portrait.src = d.portrait; portrait.alt = `${d.name} ${d.accent || ''}`.trim(); }

        $('hero-eyebrow').textContent = d.eyebrow || '';
        $('hero-name').innerHTML = d.accent
            ? `${d.name} <span class="accent">${d.accent}</span>`
            : (d.name || '');
        $('hero-role').innerHTML = (d.role || []).join('<span class="sep">/</span>');
        $('hero-summary').textContent = d.summary || '';

        $('hero-cta').innerHTML = (d.cta || []).map(b =>
            `<a href="${b.href}" class="btn btn-${b.type || 'ghost'}"${b.download ? ' download' : ''}${b.external ? ' target="_blank" rel="noopener"' : ''}>${b.icon ? `<i class="${b.icon}"></i>` : ''}${b.text}</a>`).join('');

        $('hero-social').innerHTML = (d.social || []).map(s =>
            `<a href="${s.url}" target="_blank" rel="noopener" class="social-link" aria-label="${s.platform}"><i class="${s.icon}"></i></a>`).join('');

        $('hero-stats').innerHTML = (d.stats || []).map(s =>
            `<div class="stat-item"><span class="stat-number">${s.number}</span><span class="stat-label">${s.label}</span></div>`).join('');
    } catch (e) { console.error(e); }
}

// ---------- About ----------
async function loadAbout() {
    try {
        const d = await getJSON('data/about.json');
        if (d.sectionTitle) $('about-title').textContent = d.sectionTitle;
        $('about-text').innerHTML = (d.content || []).map(p => `<p>${p}</p>`).join('');
        $('about-highlights').innerHTML = (d.highlights || []).map(h =>
            `<div class="highlight-card"><i class="${h.icon}"></i><h3>${h.title}</h3><p>${h.description}</p></div>`).join('');
    } catch (e) { console.error(e); }
}

// ---------- Experience ----------
async function loadExperience() {
    try {
        const d = await getJSON('data/experience.json');
        if (d.sectionTitle) $('experience-title').textContent = d.sectionTitle;
        $('experience-list').innerHTML = (d.experiences || []).map(x => `
            <article class="exp-item reveal">
                <div class="exp-meta">
                    <p class="exp-period">${x.period}${x.location ? `<span class="exp-loc">${x.location}</span>` : ''}</p>
                </div>
                <div class="exp-body">
                    <h3 class="exp-role">${x.role}</h3>
                    <p class="exp-company">${x.company}</p>
                    <ul class="exp-bullets">${(x.bullets || []).map(b => `<li>${b}</li>`).join('')}</ul>
                </div>
            </article>`).join('');
    } catch (e) { console.error(e); }
}

// ---------- Projects ----------
async function loadProjects() {
    try {
        const d = await getJSON('data/projects.json');
        if (d.sectionTitle) $('projects-title').textContent = d.sectionTitle;
        $('projects-grid').innerHTML = (d.projects || []).map(p => {
            const links = p.links || {};
            const linkHTML = [
                links.github && `<a href="${links.github}" target="_blank" rel="noopener" class="project-link"><i class="fab fa-github"></i> Code</a>`,
                links.demo && `<a href="${links.demo}" target="_blank" rel="noopener" class="project-link"><i class="fas fa-arrow-up-right-from-square"></i> Demo</a>`,
                links.paper && `<a href="${links.paper}" target="_blank" rel="noopener" class="project-link"><i class="fas fa-file-lines"></i> Paper</a>`,
            ].filter(Boolean).join('');
            return `
            <article class="project-card reveal">
                <div class="project-top">
                    <i class="project-icon ${p.icon || 'fas fa-cube'}"></i>
                    <span class="project-date">${p.date || ''}</span>
                </div>
                <h3 class="project-title">${p.title}</h3>
                <p class="project-desc">${p.description}</p>
                <div class="project-tags">${(p.technologies || []).map(t => `<span class="tag">${t}</span>`).join('')}</div>
                ${linkHTML ? `<div class="project-links">${linkHTML}</div>` : ''}
            </article>`;
        }).join('');
    } catch (e) { console.error(e); }
}

// ---------- Skills ----------
async function loadSkills() {
    try {
        const d = await getJSON('data/skills.json');
        if (d.sectionTitle) $('skills-title').textContent = d.sectionTitle;
        $('skills-grid').innerHTML = (d.groups || []).map(g => `
            <div class="skill-group reveal">
                <div class="skill-group-head"><i class="${g.icon}"></i><h3 class="skill-group-name">${g.name}</h3></div>
                <div class="skill-pills">${(g.items || []).map(s => `<span class="pill">${s}</span>`).join('')}</div>
            </div>`).join('');
    } catch (e) { console.error(e); }
}

// ---------- Education + Certifications ----------
async function loadEducation() {
    try {
        const d = await getJSON('data/education.json');
        if (d.sectionTitle) $('education-title').textContent = d.sectionTitle;
        $('education-list').innerHTML = (d.education || []).map(e => `
            <article class="edu-item reveal">
                <div class="edu-main">
                    <h3 class="edu-degree">${e.degree}</h3>
                    <p class="edu-school">${e.school}</p>
                    ${e.coursework ? `<p class="edu-course"><span>Relevant Coursework</span>${e.coursework}</p>` : ''}
                </div>
                <div class="edu-side">
                    ${e.gpa ? `<div class="edu-gpa">${e.gpa}</div>` : ''}
                    <div class="edu-period">${e.period || ''}</div>
                    ${e.location ? `<span class="edu-loc">${e.location}</span>` : ''}
                </div>
            </article>`).join('');

        if (d.certsTitle) $('certs-title').textContent = d.certsTitle;
        $('certs-grid').innerHTML = (d.certifications || []).map(c => `
            <div class="cert-item reveal"><p class="cert-name">${c.name}</p><p class="cert-issuer">${c.issuer}</p></div>`).join('');
    } catch (e) { console.error(e); }
}

// ---------- Publications ----------
async function loadPublications() {
    try {
        const d = await getJSON('data/publications.json');
        if (d.sectionTitle) $('publications-title').textContent = d.sectionTitle;
        $('publications-list').innerHTML = (d.publications || []).map(p => `
            <li class="pub-item reveal">
                <div class="pub-body">
                    <h3 class="pub-title">${p.title}</h3>
                    <p class="pub-venue">${p.venue}</p>
                    <p class="pub-desc">${p.description}</p>
                    ${p.link ? `<a href="${p.link}" target="_blank" rel="noopener" class="pub-link"><i class="fas fa-arrow-up-right-from-square"></i> View publication</a>` : ''}
                </div>
                <span class="pub-year">${p.year}</span>
            </li>`).join('');
    } catch (e) { console.error(e); }
}

// ---------- Contact ----------
async function loadContact() {
    try {
        const d = await getJSON('data/contact.json');
        if (d.sectionTitle) $('contact-title').textContent = d.sectionTitle;
        $('contact-lede').textContent = d.lede || '';
        const mail = $('contact-mail');
        mail.textContent = d.email || '';
        mail.href = `mailto:${d.email}`;
        $('contact-links').innerHTML = (d.links || []).map(l =>
            `<a href="${l.url}"${l.external !== false ? ' target="_blank" rel="noopener"' : ''} class="contact-link"><i class="${l.icon}"></i>${l.label}</a>`).join('');
    } catch (e) { console.error(e); }
}

// ---------- Footer ----------
async function loadFooter() {
    try {
        const d = await getJSON('data/footer.json');
        $('footer-text').textContent = d.text || '';
        $('footer-copyright').textContent = d.copyright || '';
        $('footer-social').innerHTML = (d.social || []).map(s =>
            `<a href="${s.url}" target="_blank" rel="noopener" class="social-link" aria-label="${s.platform}"><i class="${s.icon}"></i></a>`).join('');
    } catch (e) { console.error(e); }
}

// ============================================================
//  Interactions
// ============================================================
function initNavigation() {
    const toggle = $('nav-toggle');
    const menu = $('nav-menu');
    toggle?.addEventListener('click', () => { menu.classList.toggle('active'); toggle.classList.toggle('active'); });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
            }
            menu.classList.remove('active');
            toggle.classList.remove('active');
        });
    });
}

function initScrollEffects() {
    const navbar = $('navbar');
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id], header[id]');

    const onScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
        let current = '';
        sections.forEach(s => {
            if (window.scrollY >= s.offsetTop - 120) current = s.id;
        });
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${current}`));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

function initBackToTop() {
    const btn = $('back-to-top');
    window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 360), { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('in')); return; }
    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                entry.target.style.transitionDelay = `${Math.min(i * 60, 240)}ms`;
                entry.target.classList.add('in');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });
    els.forEach(el => io.observe(el));
}
