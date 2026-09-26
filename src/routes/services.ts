import { Router, type Request, type Response } from "express";

import { CatalogService } from "../services/catalog-service.js";

const catalogService = new CatalogService();
const servicesRouter = Router();

servicesRouter.get("/:slug", (request: Request<{ slug: string }>, response: Response) => {
  const service = catalogService.getService(request.params.slug);
  response.json({ service });
});

export default servicesRouter;
