import { app } from "./src/app";

const PORT = 3055;

const server = app.listen(PORT, () => {
  console.log(`E-commerce is start on ${PORT}`);
});

process.on("SIGINT", () => {
  console.log("Received SIGINT. Shutting down server...");
  server.close(() => {
    console.log("Server shut down. Exiting process.");
    process.exit(0);
  });
});
