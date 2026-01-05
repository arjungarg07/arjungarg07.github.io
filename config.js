// ============================================
// SITE CONFIGURATION
// Edit this file to update your personal info
// ============================================

const CONFIG = {
    // Personal Info
    name: "Arjun Garg",
    tagline: "Curious about systems that think.",
    
    // Brief intro for the landing page (identity-first, not company-first)
    intro: `I think about how AI systems consume data — and how data systems can become smarter. 
            Drawn to distributed systems, database internals, and the craft of building 
            reliable infrastructure. Currently exploring what happens when LLMs become 
            first-class citizens in data pipelines.`,
    
    // Longer bio for about sections
    bio: `The question I keep coming back to: as AI agents become primary consumers of databases, 
          how do we redesign our systems to meet that? I'm interested in the bidirectional relationship — 
          making LLM workloads more efficient through systems thinking, and making data systems 
          more intelligent through LLMs.
          
          I spend my time reading database internals, questioning everything, and building systems 
          that let me test these ideas. Right now that happens at Proshort. Before that, ShareChat.`,

    // Social Links (update these with your actual URLs)
    links: {
        github: "https://github.com/arjungarg07",
        linkedin: "https://www.linkedin.com/in/arjungarg17/",
        twitter: "https://x.com/ArjunGarg07", // Leave empty to hide
        email: "arjun.garg.cse01@gmail.com"
    },

    // Currently Reading (shows on landing page)
    reading: [
        {
            title: "Designing Data-Intensive Applications",
            author: "Martin Kleppmann",
            type: "Book",
            note: "The systems thinking bible"
        },
        {
            title: "Database Internals",
            author: "Alex Petrov",
            type: "Book",
            note: "Storage engines and distributed systems"
        },
        // {
        //     title: "CMU 15-445",
        //     author: "Andy Pavlo",
        //     type: "Course",
        //     note: "Database systems from first principles"
        // }
    ],

    // Work Experience
    work: [
        {
            company: "Proshort",
            role: "Founding Engineer",
            period: "2024 - Present",
            description: `Building agent-first data infrastructure from the ground up. 
                         Designed multi-agent extraction pipelines processing 150K sales calls monthly. 
                         Implemented hybrid retrieval with semantic reranking, cutting LLM costs by 30x 
                         while improving accuracy. The challenge: optimizing for accuracy and reasoning depth, 
                         not just throughput.`,
            tags: ["Agent Infrastructure", "LLM Systems", "Data Pipelines"]
        },
        {
            company: "ShareChat - AI",
            role: "Software Engineer",
            period: "2023 - 2024",
            description: `Built data infrastructure for India's largest regional social platform — 
                         40M daily active users, 15 languages. Designed the "Golden Dataset," a unified 
                         fact table that became our single source of truth. Created data observability 
                         pipelines with automated sanity checks that caught quality issues at inference time.`,
            tags: ["Data Engineering", "Scale", "Observability"]
        }
    ],

    // Navigation items
    nav: [
        { label: "Work", href: "work.html" },
        { label: "Writing", href: "writing.html" },
        { label: "GitHub", href: "https://github.com/arjungarg07", external: true }
    ],

    // Footer text
    footer: ""
};

// Make config available globally
if (typeof window !== 'undefined') {
    window.CONFIG = CONFIG;
}

