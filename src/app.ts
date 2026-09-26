import express, {
  type ErrorRequestHandler,
  type Express,
  type Request,
  type Response
} from "express";

import {
  InvalidServiceSlugError,
  ServiceNotFoundError
} from "./errors.js";
import { attachRequestId } from "./middleware/request-id.js";
import servicesRouter from "./routes/services.js";

export function createApp(): Express {
  const app = express();

  app.use(express.json());
  app.use(attachRequestId);
  app.get("/health", (_request: Request, response: Response) => {
    response.json({ status: "ok" });
  });
  app.use("/api/services", servicesRouter);

  const handleError: ErrorRequestHandler = (
    error,
    _request,
    response,
    next
  ) => {
    if (error instanceof InvalidServiceSlugError) {
      response.status(400).json({ error: error.message });
      return;
    }
    if (error instanceof ServiceNotFoundError) {
      response.status(404).json({ error: error.message });
      return;
    }
    next(error);
  };

  app.use(handleError);
  return app;
}
