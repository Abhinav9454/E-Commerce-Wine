**Wine App — Production Checklist & Local Testing**

Overview

- This project is a simple static website intended to demonstrate an e-commerce front-end.
- The following checklist and steps help prepare the site for production deployment.

Quick local test

- From the project root run a simple HTTP server (Python 3):

```bash
python -m http.server 8000
```

- Then open http://localhost:8000/index.html in your browser.

Production checklist (recommended)

1. HTTPS: Serve the site over HTTPS (use a CDN or host with automatic TLS like Netlify, Vercel, GitHub Pages + Cloudflare).
2. CDN: Serve static assets (CSS/JS/images) via a CDN for reduced latency and caching.
3. Minification: Minify page CSS files in `css/` plus `css/base.css`, and JS files (`js/cart.js`) and use sourcemaps for debugging.
4. Image optimization: Compress images (use WebP where possible) and generate multiple sizes for responsive delivery.
5. Caching headers: Configure cache-control headers for static assets and short caching for HTML.
6. Accessibility: Run Lighthouse accessibility audit and fix issues (alt text, semantic markup).
7. SEO: Ensure page meta tags and canonical links are correct for the final deployment URL.
8. Analytics: Add analytics/tracking if desired (ensure privacy compliance).
9. Security headers: Configure CSP, HSTS, X-Frame-Options as appropriate on the server.
10. CI/CD: Add automated builds that run tests and deploy to hosting provider.

Files added/updated

- `index.html` — premium storefront homepage using page-specific CSS and shared JS data.
- `css/base.css` — shared design system used by all page CSS files.
- `css/*.css` — page-level stylesheets for home, shop, about, contact, cart, login, and reserve.
- `html/product.html` — dynamic product detail page rendered from shared catalog data.
- `html/checkout.html` and `html/success.html` — frontend checkout flow and order confirmation shell.
- `js/catalog.js` — shared storefront catalog data for dynamic rendering.
- `js/cart.js` — cart persistence and checkout shell behaviors.
- `js/site.js` — shared rendering, filtering, animation, and toast UI logic.

Next steps I can do for you (pick any):

- Minify and bundle CSS/JS and add a simple build step (npm + terser/postcss).
- Add responsive image srcset and recommend image sizes.
- Add a basic service worker for offline caching.
- Connect cart, checkout, and forms to a real backend or CMS.

If you want me to proceed with any of the above, tell me which one to do next.
