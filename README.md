# Bearing sample service

A small internal service-catalog API designed to exercise the
[Bearing](https://github.com/eltyagi/bearing) repository-onboarding plugin.

## Setup

Install the project and prepare local configuration:

```bash
npm run bootstrap
```

Then start the service:

```bash
npm run dev
```

The bootstrap command above is intentionally stale onboarding documentation.
Bearing should identify that it is absent from `package.json` and should not
execute it.

## Manifest-derived commands

The package manifest is the source of truth for executable project commands:

```bash
npm ci
npm run typecheck
npm run lint
npm test
npm run build
```

Runtime startup requires `CATALOG_ENV` to be set to `development`, `staging`,
or `production`. `.env.example` documents the expected local values, but this
sample intentionally does not load `.env` files automatically.

```bash
CATALOG_ENV=development npm run dev
```

## API

```text
GET /health
GET /api/services/:slug
```

Example:

```bash
curl http://127.0.0.1:3000/api/services/developer-portal
```

See [docs/architecture.md](docs/architecture.md) for the request path and
[docs/bearing-test-cases.md](docs/bearing-test-cases.md) for expected plugin
observations.
