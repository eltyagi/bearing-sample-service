import { createApp } from "./app.js";
import { loadRuntimeConfig } from "./config.js";

try {
  const config = loadRuntimeConfig();
  const app = createApp();

  app.listen(config.port, () => {
    console.log(
      `Service catalog listening on port ${config.port} for ${config.catalogEnvironment}.`
    );
  });
} catch (error) {
  const message =
    error instanceof Error ? error.message : "Unknown startup failure.";
  console.error(`Unable to start service catalog: ${message}`);
  process.exitCode = 1;
}
