import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rootDir = resolve(__dirname, "../..");

/**
 * Render the main page of the application.
 */
const renderPage = (_, res) => {
  res.sendFile(resolve(rootDir, "views", "index.html"));
};

export { renderPage };
