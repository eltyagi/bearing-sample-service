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

The published repository contains these canonical test cases:

| Issue | Expected result | Reason |
| --- | --- | --- |
| [#1 Correct the stale bootstrap command](https://github.com/eltyagi/bearing-sample-service/issues/1) | Recommended | Focused documentation change with acceptance criteria and validation |
| [#2 Add a health endpoint request test](https://github.com/eltyagi/bearing-sample-service/issues/2) | Recommended | Focused test-only change with explicit validation |
| [#3 Refactor catalog storage](https://github.com/eltyagi/bearing-sample-service/issues/3) | Review | Broad scope, unclear test plan, and unresolved dependencies |
| [#4 Add authentication and authorization](https://github.com/eltyagi/bearing-sample-service/issues/4) | Excluded | Authentication and security-sensitive scope |
| [#5 Deploy to production](https://github.com/eltyagi/bearing-sample-service/issues/5) | Excluded | Production-critical deployment scope |

The expected ordering is based on the issue content and repository signals,
not fixed timestamps or hard-coded scores.

## Verified baseline

Bearing's current analyzers should report:

- Repository identity `eltyagi/bearing-sample-service`
- Application component from the root `package.json`
- Source root `src` and test root `test`
- CI workflow and CODEOWNERS components
- An Express startup flow in `src/app.ts`
- A high-confidence mounted route flow for `GET /api/services/:slug`
- npm setup plans for install, build, lint, and test

The startup flow may explicitly note that the listener is started in another
file. The mounted route flow may note that dynamic middleware and handler calls
cannot be fully resolved statically.

## Suggested prompt

> Use Bearing to onboard me to this repository. Map the service and one request
> flow with evidence, validate the setup safely, identify onboarding drift,
> and rank open issues for a first contribution.
