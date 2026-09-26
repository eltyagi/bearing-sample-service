# Architecture

The sample is intentionally small, but it separates HTTP, domain, and storage
responsibilities so repository-onboarding tools have meaningful boundaries to
discover.

## Request path

`GET /api/services/:slug` follows this path:

1. `src/app.ts` creates the Express application.
2. `src/middleware/request-id.ts` attaches a request ID.
3. `src/app.ts` mounts the service router at `/api/services`.
4. `src/routes/services.ts` registers `GET /:slug`.
5. `src/services/catalog-service.ts` validates and normalizes the slug.
6. `src/repositories/service-catalog.ts` reads the in-memory catalog.
7. `src/app.ts` converts typed domain errors into JSON responses.

`src/server.ts` is the process entry point. It loads runtime configuration
before binding the HTTP listener.

## Trust boundaries

- Route parameters are untrusted and validated before lookup.
- `CATALOG_ENV` and `PORT` are untrusted process configuration.
- The catalog is static in-memory sample data; there is no database or network
  dependency.
- Request IDs may be supplied by callers and are returned only as response
  metadata.
