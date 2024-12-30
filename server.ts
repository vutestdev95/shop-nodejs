import { app } from "./src/app";
import { configDatabaseHelper } from "./src/configs/config.database";

const {
  app: { host }
} = configDatabaseHelper.getConfigByEnv();

const server = app.listen(host, () => {
  console.log(`E-commerce is start on ${host}`);
});

process.on("SIGINT", () => {
  console.log("Received SIGINT. Shutting down server...");
  server.close(() => {
    console.log("Server shut down. Exiting process.");
    process.exit(0);
  });
});
