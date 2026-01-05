# Personal Website

A minimal, multi-page personal website with markdown-based writing. No frameworks, no build step.

## Quick Start

1. Edit `config.js` with your info
2. Push to GitHub
3. Enable GitHub Pages
4. Done

## File Structure

```
├── index.html          # Landing page
├── work.html           # Experience page
├── writing.html        # Blog/notes listing
├── style.css           # All styling
├── config.js           # ← Edit this! All your personal info
├── main.js             # Shared functionality
├── writing/
│   ├── posts.json      # List of posts (add new entries here)
│   └── *.md            # Your markdown posts
└── README.md
```

## Configuration

Everything you need to customize is in `config.js`:

```javascript
const CONFIG = {
    name: "Your Name",
    tagline: "Your tagline",
    intro: "Brief intro for landing page",
    bio: "Longer bio for about sections",
    
    links: {
        github: "https://github.com/you",
        linkedin: "https://linkedin.com/in/you",
        twitter: "",  // Leave empty to hide
        email: "you@example.com"
    },
    
    reading: [...],  // Currently reading list
    work: [...],     // Work experience
    nav: [...],      // Navigation items
    footer: "..."    // Footer text
};
```

## Adding a New Post

1. Create a markdown file in `writing/` folder:
   ```
   writing/my-new-post.md
   ```

2. Add an entry to `writing/posts.json`:
   ```json
   {
       "slug": "my-new-post",
       "title": "My New Post Title",
       "date": "2026-01-15",
       "description": "Optional short description"
   }
   ```

3. Push to GitHub. Done.

The markdown will be rendered automatically when someone visits the post.

## Deploy to GitHub Pages

### Option A: username.github.io (Recommended)

1. Create repo named `yourusername.github.io`
2. Push this code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/USERNAME/USERNAME.github.io.git
   git push -u origin main
   ```
3. Live at `https://USERNAME.github.io` in ~1 minute

### Option B: Any repo name

1. Create repo with any name
2. Push code
3. Go to Settings → Pages → Source: `main` branch, `/root`
4. Live at `https://USERNAME.github.io/repo-name`

## Local Development

Just open `index.html` in your browser. No server needed for basic viewing.

For the writing page (which fetches markdown), run a local server:

```bash
# Python
python -m http.server 8000

# Node
npx serve
```

Then visit `http://localhost:8000`

## Customization

### Colors

Edit CSS variables in `style.css`:

```css
:root {
    --color-accent: #4F46E5;  /* Change accent color */
    --color-bg: #FAFAFA;      /* Background */
    --color-text: #111111;    /* Text color */
}
```

### Typography

Fonts are loaded from Google Fonts. To change:
1. Update the `<link>` in each HTML file
2. Update `--font-sans` in `style.css`

---

Built from scratch. No templates, no frameworks.
