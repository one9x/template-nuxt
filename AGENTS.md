# Agent instructions

This repository is a **Nuxt** starter for [One9x Pages](https://one9x.com), a
static host. Everything below is specific to this repo; the general platform
docs are at <https://one9x.com/docs> and as markdown at
<https://one9x.com/llms.txt>.

## The one thing to know

| | |
| --- | --- |
| Build | `npm run build` |
| Output folder | `.output/public` |
| Needs `--spa` | no — never pass it |
| Live demo | <https://nuxt.one9x.app/> |

## Deploying

**Prefer the MCP server over the shell.** The One9x CLI is itself an MCP server —
`one9x mcp` speaks MCP over stdin/stdout — so a deploy is one tool call with no
shell glue. Register it once:

```sh
claude mcp add one9x -- one9x mcp
```

Then use the `release` tool with `dir: .output/public`, `site: <the site>`.

Without MCP, the same thing in the shell:

```sh
npm run build
one9x pages release ./.output/public --site <the site> --deploy
```

Leave `--deploy` off to stage instead: the release uploads and gets its own
preview URL at `v<n>--<site>.one9x.app`, and production keeps serving what it
serves now. `one9x pages deploy --site <site> --to v<n>` publishes it later, and
the same command with an earlier `v<n>` is how a rollback works.

**CI does this already.** `.github/workflows/deploy.yml` deploys on every push
once two settings exist (Settings → Secrets and variables → Actions): the
variable `ONE9X_SITE` and the secret `ONE9X_TOKEN`. Until `ONE9X_SITE` is set the
job is skipped, not failed. Prefer letting CI deploy over deploying by hand.

## Rules for this repo

- `npm run build` is wired to `nuxt generate`, NOT `nuxt build`. Plain `nuxt build` produces a server bundle that will not deploy. Do not 'fix' that script.
- The output is `.output/public`. The leading dot is on a PARENT of what gets uploaded, so the platform's dotfile skip does not touch it.
- A route reachable only by a form submit or a dynamic parameter is not crawled by `generate` and will 404 in production while working in dev. Add it to `nitro.prerender.routes` in `nuxt.config.ts`.
- Anything under `server/api/` needs a running Nitro server and is simply absent from a generated site. Nuxt does not fail the build over it.
- Never pass `--spa`.

## General

- The site name is a DNS label (lowercase letters, digits, hyphens) and becomes
  `<name>.one9x.app`. Create it before deploying: `one9x pages create <name>`. A
  release will not create one.
- Dot-paths are never uploaded — `.git`, `.env`, anything starting with a dot.
  `.well-known` is the one exception.
- `--exclude` globs are single-segment `path.Match`. `**` is not supported and
  matches nothing rather than erroring.
- Pages serves **paths, not routes**: `/about` is served `/about/index.html`. A
  build that wrote `about.html` instead 404s on every internal link while the
  homepage works.
- Re-deploying unchanged content is free and safe — the version id is a content
  hash, so an identical build produces an identical version and uploads nothing.
- Nothing here needs a server. If a change would require one, it is the wrong
  change for this repo.
