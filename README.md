# A Story Yet to Be Written

A small, illustrated storybook about a possibility. Five gentle chapters, books and wildflowers, a Python joke, and room for an honest answer. All illustrations are original SVGs. No external images, font requests, analytics, database, audio, or answer storage.

## Develop

Requires Node.js 22 or newer and npm. Use the existing checkout; a separate worktree is not needed.

```sh
npm ci
npm run dev
```

```sh
npm run build
npx playwright install chromium
npm test
npm run preview
```

The tests use the production build. On a Linux machine missing browser libraries, use `npx playwright install --with-deps chromium`. If a system Chromium is already installed, `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm test` uses it without a browser download. Browser tests cover the complete story, all responses, clipboard and its fallback, keyboard focus, accessibility, mobile layout, reduced motion, and asset errors. The phone profile emulates an iPhone viewport in Chromium; it is not a substitute for real Safari testing.

## Make it personal

Edit **`src/config/story.ts`**. Names, optional WhatsApp number, chapter text, discoveries, answer text, the two Easter eggs, and the six theme colors live together there. Empty names give a neutral dedication. The WhatsApp number must be international digits (for example `491701234567`); it is public information embedded in the site. Never put a token or other secret in this file.

The answer stays in React memory and disappears on refresh. Copy is explicit. If clipboard access is unavailable, a selectable text field appears. With a valid configured number, “Send my answer” opens WhatsApp with a draft; the visitor must send it herself. No answer is transmitted automatically. Returning to another chapter clears the choice. All three answer buttons stay available.

The visual theme uses the configured palette; some illustration and decorative shading colors are complementary fixed tones. Motion honors the system's reduced-motion preference. System serif, sans-serif, and monospace fonts keep the experience self-contained.

## GitHub Pages

This repository is the dedicated site repository: https://github.com/lolomie/python.

The original project brief is preserved in [`docs/BRIEF.md`](docs/BRIEF.md).

1. Push the project to `main`.
2. In **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source.
3. Run or wait for **Verify and deploy storybook** in Actions.
4. Open the URL reported by the successful deployment and check it on your phone.

The workflow installs from the lockfile, type-checks/builds, runs browser tests, and only then deploys. Pull requests run verification without deploying. Permissions are limited to source read for tests and Pages write/OIDC for deployment. Vite uses relative asset paths, so the same build works at `/python/` and at a domain root without a router or fallback configuration.

The expected default address after a successful Pages deployment is `https://lolomie.github.io/python/`. An expected address is not proof of publication; confirm the deployment and HTTP response first.

**Privacy:** a GitHub Pages URL is not access control. Anyone who obtains the URL can read the page, including the configured names/contact. The page requests `noindex`, but this does not guarantee privacy. Keep personal details appropriate for a public static page.
