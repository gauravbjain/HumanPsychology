# Psychology Across the World

An interactive guide to human psychology: **prominent ideas**, the **people** who shaped them, and **how they connect** — from traditions around the globe.

## What’s inside

- **Small sections**: Each theory is a short, scannable card (summary + “Read more” for key points).
- **Global scope**: Western (Freud, Jung, Skinner, Maslow, Beck, Bandura, Milgram, etc.), Eastern (Buddhist psychology, Yoga, Confucianism), African (Ubuntu, Fanon), Latin American (Liberation Psychology), and Indigenous holistic perspectives.
- **Connections**: Every card links to related ideas; the **Explore connections** view shows how one idea ties to others (incoming and outgoing).
- **Filter by tradition**: Browse by region (Western, Eastern, African, Latin American, Indigenous).

## Run locally

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (e.g. http://localhost:5173).

## Build

```bash
npm run build
```

Output is in `dist/`.

---

## Hosting on a public site

The app is a **static site** (HTML, CSS, JS in `dist/` after build). You can host it for free on any of these:

### Option 1: Vercel (recommended)

1. Push your code to **GitHub** (create a repo and push).
2. Go to [vercel.com](https://vercel.com), sign in with GitHub.
3. Click **Add New… → Project**, import your repo.
4. Leave **Build Command** as `npm run build` and **Output Directory** as `dist`.
5. Click **Deploy**. You’ll get a URL like `your-project.vercel.app`.

The repo already includes `vercel.json` so routes like `/idea/freud` and `/map` work (SPA fallback).

### Option 2: Netlify

1. Push your code to **GitHub**.
2. Go to [netlify.com](https://netlify.com), sign in with GitHub.
3. **Add new site → Import an existing project** → choose your repo.
4. Netlify will use the repo’s `netlify.toml` (build command and SPA redirects are already set).
5. Click **Deploy**. You’ll get a URL like `random-name.netlify.app`.

You can change the site name under **Domain settings**.

### Option 3: GitHub Pages

1. In your repo, go to **Settings → Pages**.
2. Under **Source**, choose **GitHub Actions** (or **Actions** tab → “Deploy static content to GitHub Pages” workflow).
3. In your project, set the base path in `vite.config.js`:

   ```js
   export default defineConfig({
     plugins: [react()],
     base: '/your-repo-name/',   // e.g. '/psychology-edu/'
   })
   ```

4. In `main.jsx`, give `BrowserRouter` a `basename` so routing works on GitHub Pages:

   ```jsx
   <BrowserRouter basename="/your-repo-name">
     <App />
   </BrowserRouter>
   ```

5. After build, **copy `index.html` to `404.html`** so refreshing on `/idea/freud` (or any route) still loads the app. You can add a script in `package.json`:

   ```json
   "scripts": {
     "build": "vite build",
     "build:gh": "vite build && cp dist/index.html dist/404.html"
   }
   ```

   Then use `npm run build:gh` when deploying to GitHub Pages.

6. Use a GitHub Action to build and deploy (e.g. “Deploy static content to GitHub Pages” or a custom workflow that runs `npm run build:gh` and uploads `dist/`).

Your site will be at `https://<username>.github.io/<repo-name>/`.

### Option 4: Cloudflare Pages

1. Push to **GitHub**, then go to [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Select your repo. Set **Build command**: `npm run build`, **Build output directory**: `dist`.
3. Under **Settings → Builds & deployments**, add a **Redirect rule**: URL match `*`, type **Rewrite**, destination `/index.html` (so client-side routes work).
4. Deploy. You’ll get a URL like `your-project.pages.dev`.

---

**Summary:** Easiest is **Vercel** or **Netlify**: connect the repo and deploy. No extra config. For **GitHub Pages**, you need `base`, `basename`, and the `index.html` → `404.html` copy so all routes work.
