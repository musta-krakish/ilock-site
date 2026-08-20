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
4. Copy those values to the production host's environment variables, using
   [.env.example](.env.example) as the key list. `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`
   must be available during the production build as well as at runtime.
5. In the GitHub App settings, add the production callback URL
   `https://ilock-site.vercel.app/api/keystatic/github/oauth/callback` (you can
   keep the local URL created during setup), then redeploy.

The panel contains:

- **Замки и сейфы** — product details, prices, options, three language versions
  of descriptions, and image upload to `src/assets/images/locks`.
- **FAQ — русский / қазақша / English** — separate, language-safe collections
  with question, answer, and display order.

Saving in the production panel commits the content and uploaded images to GitHub.
Your normal GitHub deployment then publishes those changes.

## Deploy to Vercel

Keystatic's `/keystatic` and OAuth API routes are deployed as Vercel serverless
functions; public pages remain statically generated. In Vercel open **Project
Settings → Environment Variables**, add the four values from `.env.example` for
the Production environment, then redeploy the `master` branch.

```bash
pnpm build
```

Vercel detects the Astro build automatically. If you later connect `ilock.kz`,
change the callback URL in the GitHub App and the `site` setting in
`astro.config.mjs` to that domain.
