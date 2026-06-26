# Modern Aesthetic Portfolio Template

A beautifully designed, modern portfolio website template with a clean aesthetic and light theme. Built with vanilla HTML, CSS, and JavaScript, featuring a JSON-driven architecture for easy content management.

## Features

- **Modern Light Design**: Clean, minimalist aesthetic with soft pastel colors
- **JSON-Driven Content**: All content stored in JSON files for easy customization
- **Fully Responsive**: Mobile-first design that works on all devices
- **Smooth Animations**: Fade-in effects and smooth transitions
- **No Framework Required**: Pure vanilla JavaScript, HTML, and CSS
- **SEO Optimized**: Meta tags and semantic HTML for better search visibility
- **Easy to Customize**: Simple configuration through JSON files and CSS variables

## Design Highlights

- Light, airy color palette with soft pastels
- Modern typography (Inter + Space Grotesk)
- Card-based layouts with subtle shadows
- Gradient accents
- Smooth hover effects
- Progress bars for skills
- Clean, professional aesthetic

## Quick Start

### Prerequisites

- A modern web browser
- A text editor (VS Code, Sublime Text, etc.)
- Basic knowledge of HTML, CSS, and JavaScript (optional)

### Installation

1. **Clone or Download** this repository
2. **Open the project** in your text editor
3. **Customize your content** by editing the JSON files in the `data/` folder
4. **Open `index.html`** in your browser to view your portfolio

### Local Development

For the best development experience, use a local server:

**Option 1: Using Python**
```bash
# Python 3
python -m http.server 8000

# Then open http://localhost:8000
```

**Option 2: Using Node.js (http-server)**
```bash
npm install -g http-server
http-server
```

**Option 3: Using VS Code Live Server**
- Install the "Live Server" extension
- Right-click on `index.html` and select "Open with Live Server"

## Customization Guide

### 1. Update Site Information

Edit `data/site-config.json`:

```json
{
  "title": "Your Name - Your Title",
  "description": "Your portfolio description",
  "author": "Your Name",
  "keywords": "your, keywords, here"
}
```

### 2. Customize Navigation

Edit `data/navigation.json`:

```json
{
  "brand": {
    "name": "Your Name",
    "href": "#home"
  },
  "menuItems": [...]
}
```

### 3. Update Hero Section

Edit `data/hero.json` to personalize your landing page with your name, title, and social links.

### 4. Add Your Experience

Edit `data/experience.json` to add your work history with roles, companies, and achievements.

### 5. Showcase Your Work

Edit `data/portfolio.json` to add your projects with descriptions, tags, and links.

### 6. List Your Skills

Edit `data/skills.json` to organize your technical skills by category with proficiency levels.

### 7. Setup Contact Form

Edit `data/contact.json` to configure your contact information.

**Note**: To enable the contact form, sign up at [Formspree](https://formspree.io/) and replace the form action URL.

### 8. Customize Colors

Edit CSS variables in `assets/css/styles.css`:

```css
:root {
  --color-accent-pink: #FF6B9D;
  --color-accent-purple: #C084FC;
  --color-accent-blue: #60A5FA;
  /* ... more colors */
}
```

### 9. Update Footer

Edit `data/footer.json` to customize your footer content.

## Project Structure

```
modern-aesthetic-portfolio/
├── assets/
│   ├── css/
│   │   └── styles.css          # All styling
│   └── js/
│       └── main.js             # Core application logic
├── data/
│   ├── site-config.json        # SEO & meta tags
│   ├── navigation.json         # Navigation menu
│   ├── hero.json               # Hero section
│   ├── about.json              # About section
│   ├── experience.json         # Work experience
│   ├── skills.json             # Skills & technologies
│   ├── portfolio.json          # Projects showcase
│   ├── contact.json            # Contact information
│   └── footer.json             # Footer content
├── index.html                  # Main HTML file
├── package.json                # Project metadata
└── README.md                   # This file
```

## Deployment

### GitHub Pages

1. Push your code to a GitHub repository
2. Go to Settings → Pages
3. Select the main branch as the source
4. Your site will be available at `https://yourusername.github.io/repository-name`

### Netlify

1. Push your code to GitHub/GitLab
2. Go to [Netlify](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Click "Deploy site"

### Vercel

1. Push your code to GitHub/GitLab
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Click "Deploy"

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS variables, Grid, and Flexbox
- **JavaScript (ES6+)**: Vanilla JavaScript for interactivity
- **Font Awesome**: Icon library
- **Google Fonts**: Inter and Space Grotesk

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Performance

- Lightweight: ~45KB total (without images)
- Fast load times
- Optimized animations
- Mobile-first responsive design

## Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- High contrast colors for readability

## License

This project is open source and available under the [MIT License](LICENSE).

## Credits

- Design & Development: Modern Aesthetic Portfolio Team
- Icons: [Font Awesome](https://fontawesome.com/)
- Fonts: [Google Fonts](https://fonts.google.com/)

## Support

If you have any questions or need help customizing this template:

1. Check the documentation above
2. Review the JSON file comments (_instructions)
3. Open an issue on GitHub

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Made with care and attention to detail**

If you found this template helpful, please give it a star ⭐
