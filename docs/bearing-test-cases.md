# Bearing test cases

This repository intentionally contains onboarding signals for the Bearing
Copilot plugin. Keep the service behavior deterministic and do not “fix” these
signals unless a test scenario explicitly calls for it.

## Repository map

Expected discoveries:

- One Node.js application from `package.json`
- `src` and `test` roots
- The CI workflow under `.github/workflows`
- CODEOWNERS review-routing evidence
- README and architecture documentation

## Runtime flow

Bearing should find the Express application in `src/app.ts`, the
`/api/services` router mount, and `GET /:slug` in
`src/routes/services.ts`. Static analysis may leave service-layer calls as an
explicit unresolved question.

## Setup

- `npm ci`, typecheck, lint, test, and build should pass.
- `npm run bootstrap` appears in README but is not a manifest script. Bearing
  must not execute commands copied from documentation.
- `npm start` and `npm run dev` should fail clearly when `CATALOG_ENV` is
  absent.
- `CATALOG_ENV=development npm run dev` should start successfully.

## First-task ranking

The published repository contains focused documentation and test issues,
broader ambiguous work, and issues involving authentication and production
deployment. Bearing should recommend focused work and exclude high-risk work.

## Suggested prompt

> Use Bearing to onboard me to this repository. Map the service and one request
> flow with evidence, validate the setup safely, identify onboarding drift,
> and rank open issues for a first contribution.
