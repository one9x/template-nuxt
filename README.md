# Nuxt on One9x Pages

A minimal Nuxt starter, wired to deploy to [One9x Pages](https://one9x.com)
on every push. **Use this template** to start from it, or read it as a reference
for an app you already have.

```sh
npx nuxt generate
one9x pages release ./.output/public --site mysite --deploy
```

No `--spa`: the build writes a real HTML file per route, so an unmatched path
genuinely is a 404 and says so.

## Turn on the deploy workflow

`.github/workflows/deploy.yml` is already here. It needs two settings, both
under **Settings → Secrets and variables → Actions**:

| | Name | Value |
| --- | --- | --- |
| Variable | `ONE9X_SITE` | the site to deploy to |
| Secret | `ONE9X_TOKEN` | `one9x tokens create "github actions"` |

Create the site first:

```sh
one9x pages create mysite
```

Until `ONE9X_SITE` exists the job is **skipped**, not failed — a fresh copy of
this template should not open with a red X.

Once both are set: a pull request stages a release and comments the preview
URL, and a push to `main` publishes.

## Local development

```sh
npm install
npm run dev
```

## generate, not build

`npm run build` is wired to `nuxt generate` in this template on purpose. Plain
`nuxt build` produces a **server** bundle that needs Node running — it will not
deploy as static files.

Anything under `server/api/` needs that server too, and is simply absent from a
generated site. Nuxt does not fail the build over it.

## Docs

- [Nuxt on One9x Pages](https://one9x.com/docs/frameworks/nuxt) — the
  build command, the output folder, and the gotchas for this framework
- [All frameworks](https://one9x.com/docs/frameworks)
- [GitHub Actions](https://one9x.com/docs/github-actions)

## License

MIT
