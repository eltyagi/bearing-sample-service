export interface ServiceCatalogEntry {
  slug: string;
  displayName: string;
  owner: string;
  tier: "critical" | "standard";
}

const ENTRIES: ServiceCatalogEntry[] = [
  {
    slug: "billing-api",
    displayName: "Billing API",
    owner: "payments-platform",
    tier: "critical"
  },
  {
    slug: "developer-portal",
    displayName: "Developer Portal",
    owner: "developer-experience",
    tier: "standard"
  }
];

export class ServiceCatalogRepository {
  readonly #entries = new Map(ENTRIES.map((entry) => [entry.slug, entry]));

  findBySlug(slug: string): ServiceCatalogEntry | undefined {
    return this.#entries.get(slug);
  }
}
