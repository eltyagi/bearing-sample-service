import { ConfigurationError } from "./errors.js";

const CATALOG_ENVIRONMENTS = [
  "development",
  "staging",
  "production"
] as const;

export type CatalogEnvironment = (typeof CATALOG_ENVIRONMENTS)[number];

export interface RuntimeConfig {
  catalogEnvironment: CatalogEnvironment;
  port: number;
}

function parsePort(value: string | undefined): number {
  const port = Number.parseInt(value ?? "3000", 10);
  if (!Number.isInteger(port) || port < 1 || port > 65_535) {
    throw new ConfigurationError(
      "PORT must be an integer between 1 and 65535."
    );
  }
  return port;
}

export function loadRuntimeConfig(
  environment: NodeJS.ProcessEnv = process.env
): RuntimeConfig {
  const catalogEnvironment = environment.CATALOG_ENV?.trim();
  if (
    !catalogEnvironment ||
    !CATALOG_ENVIRONMENTS.includes(catalogEnvironment as CatalogEnvironment)
  ) {
    throw new ConfigurationError(
      "CATALOG_ENV is required and must be development, staging, or production. Copy .env.example or set the variable before starting the service."
    );
  }

  return {
    catalogEnvironment: catalogEnvironment as CatalogEnvironment,
    port: parsePort(environment.PORT)
  };
}
