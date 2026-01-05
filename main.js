// ============================================
// MAIN.JS - Shared functionality
// ============================================

// Wait for DOM and config to be ready
document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initFooter();
    
    // Page-specific initialization
    const page = document.body.dataset.page;
    if (page === 'home') initHomePage();
    if (page === 'work') initWorkPage();
    if (page === 'writing') initWritingPage();
    if (page === 'post') initPostPage();
});

// ============================================
// Navigation
// ============================================
function initNav() {
    const nav = document.querySelector('.site-nav');
    if (!nav) return;
    
    const navLinks = CONFIG.nav.map(item => {
        const external = item.external ? ' target="_blank" rel="noopener noreferrer"' : '';
        const current = window.location.pathname.endsWith(item.href) ? ' class="current"' : '';
        return `<a href="${item.href}"${external}${current}>${item.label}</a>`;
    }).join('');
    
    nav.innerHTML = `
        <div class="nav-container">
            <a href="index.html" class="nav-logo">${CONFIG.name}</a>
            <div class="nav-links">${navLinks}</div>
        </div>
    `;
}

// ============================================
// Footer
// ============================================
function initFooter() {
    const footer = document.querySelector('.site-footer');
    if (!footer) return;
    
    footer.innerHTML = `
        <div class="footer-container">
            <p>${CONFIG.footer}</p>
        </div>
    `;
}

// ============================================
// Home Page
// ============================================
function initHomePage() {
    // Set name and tagline
    const nameEl = document.querySelector('.hero-name');
    const taglineEl = document.querySelector('.hero-tagline');
    const introEl = document.querySelector('.hero-intro');
    
    if (nameEl) nameEl.textContent = CONFIG.name;
    if (taglineEl) taglineEl.textContent = CONFIG.tagline;
    if (introEl) introEl.textContent = CONFIG.intro;
    
    // Render reading list
    const readingGrid = document.querySelector('.reading-grid');
    if (readingGrid && CONFIG.reading) {
        readingGrid.innerHTML = CONFIG.reading.map(item => `
            <article class="reading-card">
                <span class="card-tag">${item.type}</span>
                <h3>${item.title}</h3>
                <p class="author">${item.author}</p>
                ${item.note ? `<p class="note">${item.note}</p>` : ''}
            </article>
        `).join('');
    }
    
    // Render contact links
    renderContactLinks();
}

// ============================================
// Work Page
// ============================================
function initWorkPage() {
    const workList = document.querySelector('.work-list');
    if (!workList || !CONFIG.work) return;
    
    workList.innerHTML = CONFIG.work.map(job => `
        <article class="work-card">
            <div class="work-header">
                <div>
                    <h3>${job.company}</h3>
                    <span class="work-role">${job.role}</span>
                </div>
                <span class="work-period">${job.period}</span>
            </div>
            <p class="work-description">${job.description}</p>
            <div class="work-tags">
                ${job.tags.map(tag => `<span>${tag}</span>`).join('')}
            </div>
        </article>
    `).join('');
    
    renderContactLinks();
}

// ============================================
// Writing Page - List all posts
// ============================================
async function initWritingPage() {
    const postsList = document.querySelector('.posts-list');
    if (!postsList) return;
    
    try {
        const response = await fetch('writing/posts.json');
        const posts = await response.json();
        
        // Filter to only published posts (default to true if not specified)
        const publishedPosts = posts.filter(post => post.published !== false);
        
        if (publishedPosts.length === 0) {
            postsList.innerHTML = `
                <div class="empty-state">
                    <p class="empty-title">Notes incoming</p>
                    <p class="empty-description">
                        I'll be sharing my learnings, questions, and discoveries as I work through 
                        database internals and build systems of my own.
                    </p>
                </div>
            `;
            return;
        }
        
        // Sort by date (newest first)
        publishedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        postsList.innerHTML = publishedPosts.map(post => `
            <article class="post-preview">
                <a href="writing.html?post=${post.slug}">
                    <time>${formatDate(post.date)}</time>
                    <h3>${post.title}</h3>
                    ${post.description ? `<p>${post.description}</p>` : ''}
                </a>
            </article>
        `).join('');
        
    } catch (e) {
        postsList.innerHTML = `
            <div class="empty-state">
                <p class="empty-title">Notes incoming</p>
                <p class="empty-description">
                    Writing coming soon. Check back later.
                </p>
            </div>
        `;
    }
}

// ============================================
// Single Post Page - Render markdown
// ============================================
async function initPostPage() {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('post');
    
    if (!slug) {
        // No post specified, show list
        initWritingPage();
        return;
    }
    
    const postContent = document.querySelector('.post-content');
    const postTitle = document.querySelector('.post-title');
    const postDate = document.querySelector('.post-date');
    const postsList = document.querySelector('.posts-list');
    
    // Hide list, show post
    if (postsList) postsList.style.display = 'none';
    
    try {
        // Get post metadata
        const metaResponse = await fetch('writing/posts.json');
        const posts = await metaResponse.json();
        const post = posts.find(p => p.slug === slug);
        
        if (!post) throw new Error('Post not found');
        
        // Update title and date
        if (postTitle) {
            postTitle.textContent = post.title;
            postTitle.style.display = 'block';
        }
        if (postDate) {
            postDate.textContent = formatDate(post.date);
            postDate.style.display = 'block';
        }
        
        // Fetch and render markdown
        const mdResponse = await fetch(`writing/${slug}.md`);
        const markdown = await mdResponse.text();
        
        if (postContent) {
            postContent.innerHTML = marked.parse(markdown);
            postContent.style.display = 'block';
            
            // Syntax highlighting if available
            if (typeof hljs !== 'undefined') {
                postContent.querySelectorAll('pre code').forEach(block => {
                    hljs.highlightElement(block);
                });
            }
        }
        
        // Update page title
        document.title = `${post.title} — ${CONFIG.name}`;
        
    } catch (e) {
        if (postContent) {
            postContent.innerHTML = `
                <div class="error-state">
                    <p>Post not found. <a href="writing.html">← Back to writing</a></p>
                </div>
            `;
            postContent.style.display = 'block';
        }
    }
}

// ============================================
// Contact Links
// ============================================
function renderContactLinks() {
    const contactLinks = document.querySelector('.contact-links');
    if (!contactLinks || !CONFIG.links) return;
    
    const icons = {
        github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`,
        linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
        twitter: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
        email: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg>`
    };
    
    const labels = {
        github: 'GitHub',
        linkedin: 'LinkedIn',
        twitter: 'Twitter',
        email: 'Email'
    };
    
    const links = Object.entries(CONFIG.links)
        .filter(([key, value]) => value) // Only show non-empty links
        .map(([key, value]) => {
            const href = key === 'email' ? `mailto:${value}` : value;
            const external = key !== 'email' ? ' target="_blank" rel="noopener noreferrer"' : '';
            return `
                <a href="${href}" class="contact-link"${external}>
                    ${icons[key] || ''}
                    <span>${labels[key]}</span>
                </a>
            `;
        }).join('');
    
    contactLinks.innerHTML = links;
}

// ============================================
// Utilities
// ============================================
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

