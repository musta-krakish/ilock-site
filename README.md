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

The CI build generates the catalogue and product images. It serialises native
image processing and caps the Node.js heap at 1536 MiB by default. Give the
self-hosted runner at least 2 GB of RAM available to Docker.

## CI/CD: build on the self-hosted runner and deploy by SSH

The workflow in `.github/workflows/deploy.yml` builds the Docker image on the
self-hosted Linux runner, uploads a compressed image archive to the production
host with SCP, imports it there, then runs `docker compose up --no-build`.
It runs on pushes to `master` and may also be started manually from GitHub
Actions.

Before the first run, create these repository **Variables**:

- `SITE_URL` — public HTTPS URL, e.g. `https://ilock.example.com`;
- `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` — GitHub App slug;
- `BUILD_MAX_OLD_SPACE_SIZE` — optional; CI defaults to `4096` MiB (the
  `ubuntu-kirpich` runner has 24 GB RAM).

And these repository **Secrets**:

- `DEPLOY_HOST`, `DEPLOY_PORT` (optional; defaults to `22`), `DEPLOY_USER`;
- `DEPLOY_PATH` — absolute directory containing `docker-compose.yml` and the
  production `.env`, e.g. `/opt/ilock-site`;
- `DEPLOY_PASSWORD` — SSH password for that Linux deployment user;

On the production server, prepare `DEPLOY_PATH` once: place the current
`docker-compose.yml` there, create the real `.env` with Keystatic secrets and
ensure the deployment user can run Docker without `sudo`. The workflow does
not transfer `.env` or secrets.
