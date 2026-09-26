export class ConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConfigurationError";
  }
}

export class InvalidServiceSlugError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidServiceSlugError";
  }
}

export class ServiceNotFoundError extends Error {
  constructor(slug: string) {
    super(`No catalog entry exists for service "${slug}".`);
    this.name = "ServiceNotFoundError";
  }
}
