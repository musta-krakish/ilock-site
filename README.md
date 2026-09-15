# iLOCK site

Astro site with a GitHub-backed Keystatic admin panel for the catalogue and FAQ.

## Local development

```bash
pnpm install
pnpm dev
```

The public site is available at `http://localhost:4321`. The admin panel is at
`http://127.0.0.1:4321/keystatic`.

## Keystatic admin and GitHub OAuth

The admin panel writes to the `musta-krakish/ilock-site` GitHub repository.
Only GitHub users with **Write** access to that repository can sign in and edit
content.

1. Run `pnpm dev` and open `/keystatic`.
2. Sign in with GitHub. On the first login Keystatic guides you through creating
   and installing a GitHub App for this repository.
3. The setup creates the values in `.env`. Do not commit that file.
4. Copy those values to the production host's `.env`, using
   [.env.example](.env.example) as the key list. Set `SITE_URL` to the public
   HTTPS address, for example `https://ilock.example.com`.
   `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` must be available during the production
   build as well as at runtime.
5. In the GitHub App settings, add the production callback URL
   `https://ilock.example.com/api/keystatic/github/oauth/callback` (you can
   keep the local URL created during setup), then rebuild and restart the app.

The panel contains:

- **Замки и сейфы** — product details, prices, options, three language versions
  of descriptions, image upload with a thumbnail, and a tidy per-model folder
  at `src/assets/images/locks/<model>/image.<extension>`.
- **FAQ — русский / қазақша / English** — separate, language-safe collections
  with question, answer, and display order.

Saving in the production panel commits the content and uploaded images to GitHub.
Rebuild and restart the container after pulling those changes on the server.

After saving an entry, the **Preview** button opens its current GitHub version
immediately. It does not wait for the production rebuild; refresh the preview
tab after each save. The preview itself is not indexed by search engines.

## Production: Docker and Caddy

Astro runs in a Node.js container because Keystatic's `/keystatic` and OAuth
routes need server-side rendering. Caddy terminates HTTPS and proxies requests
to the loopback-only port exposed by Docker.

1. On the server, copy `.env.example` to `.env` and fill in the values. Do not
   commit this file. `SITE_URL` must match the public Caddy domain.
2. Build and start the service:

   ```bash
   docker compose up -d --build
   ```

3. Add a site to the host Caddy configuration, then reload Caddy:

   ```caddyfile
   ilock.example.com {
       reverse_proxy 127.0.0.1:4321
   }
   ```

The application is bound to `127.0.0.1:4321`, so it is not publicly reachable
without Caddy. To use another local port, set `APP_PORT` in `.env`.
