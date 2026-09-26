import {
  InvalidServiceSlugError,
  ServiceNotFoundError
} from "../errors.js";
import {
  ServiceCatalogRepository,
  type ServiceCatalogEntry
} from "../repositories/service-catalog.js";

const VALID_SLUG = /^[a-z][a-z0-9-]{1,49}$/;

export class CatalogService {
  constructor(
    private readonly repository: ServiceCatalogRepository =
      new ServiceCatalogRepository()
  ) {}

  getService(rawSlug: string): ServiceCatalogEntry {
    const slug = rawSlug.trim().toLowerCase();
    if (!VALID_SLUG.test(slug)) {
      throw new InvalidServiceSlugError(
        "Service slugs must contain 2-50 lowercase letters, numbers, or hyphens."
      );
    }

    const entry = this.repository.findBySlug(slug);
    if (!entry) {
      throw new ServiceNotFoundError(slug);
    }
    return entry;
  }
}
