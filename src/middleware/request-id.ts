import { randomUUID } from "node:crypto";

import type { NextFunction, Request, Response } from "express";

export function attachRequestId(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const requestId = request.header("x-request-id")?.trim() || randomUUID();
  response.setHeader("x-request-id", requestId);
  next();
}
