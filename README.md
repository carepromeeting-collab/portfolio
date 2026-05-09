# Portfolio – Mohammad Faizan Khan

This portfolio website is customized and managed by **Mohammad Faizan Khan** as a personal digital space to showcase work experience, projects, operational systems, technology interests, and creative ideas.

Built with modern web technologies for speed, scalability, and smooth user experience.

## Technologies Used

* [Next.js](https://nextjs.org?utm_source=chatgpt.com) — A powerful React framework for building modern, fast, and scalable web applications.
* [Tailwind CSS](https://tailwindcss.com?utm_source=chatgpt.com) — Utility-first CSS framework for building responsive and clean user interfaces.
* [TypeScript](https://www.typescriptlang.org?utm_source=chatgpt.com) — Typed JavaScript that improves code quality and developer productivity.
* [Framer Motion](https://www.framer.com/motion/?utm_source=chatgpt.com) — Animation library for creating smooth and interactive UI experiences.
* [Nodemailer](https://nodemailer.com/?utm_source=chatgpt.com) — Node.js email integration library used for contact forms and mail functionality.

## Open Source

This portfolio is open source and can be used as inspiration or a template for personal projects and portfolios. Feel free to customize, modify, and expand it according to your own creativity and requirements.

Contributions, suggestions, improvements, and pull requests are always welcome.

## Important Notes

1. Never upload your Nodemailer password or sensitive credentials publicly on GitHub.
2. Always use `.env` files for environment variables and secret keys.
3. Use Next.js API routes for mail handling to keep credentials secure on the server side.
4. Update Google site verification codes inside `/src/data/siteMetaData.mjs` with your own verification details.

## Theme Customization

The project includes customizable themes that can easily be modified through the `globals.css` and `theme-examples.css` files.

You can:

* Use existing pre-made themes
* Customize colors using CSS variables
* Create your own visual identity for the portfolio

### Notes

1. CSS variables only accept HSL values separated by spaces.
2. Animated logo colors may require manual hardcoding.

## Nodemailer Setup

### Create App Password

1. Open your Google Account settings
2. Navigate to `Security`
3. Enable `2-Step Verification`
4. Open `App Passwords`
5. Create a new app password for Nodemailer
6. Add credentials inside your `.env` file:

```env
NODEMAILER_USER=your-email@gmail.com
NODEMAILER_PASS=your-app-password
```

## SEO Features

* Automatic sitemap generation
* Automatic robots.txt generation
* Optimized routing structure for better indexing
* Dynamic routes excluded from sitemap generation
* Easy Google Search Console integration

## Development Setup

### Step 1 — Install Dependencies

```bash
pnpm install
```

### Step 2 — Run Development Server

```bash
pnpm dev
```

Then open:

```bash
http://localhost:3000
```

in your browser to view the portfolio locally.

---

## About Me

**Mohammad Faizan Khan**
Project Manager • Operations Coordinator • System Builder

Focused on building scalable operational systems, workforce management solutions, and technology-driven workflows across multiple industries in Saudi Arabia.

Portfolio: [khan.linux-aios.com](https://khan.linux-aios.com?utm_source=chatgpt.com)

---

## Credits

Original portfolio design and base project credit goes to the original creator and repository owner. Full respect and appreciation to the developer for making the project open source.
