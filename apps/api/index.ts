import Fastify from "fastify";
import cors from "@fastify/cors";
import { registerRoutes } from "./routes/waybills";

const app = Fastify({ logger: true });

async function start() {
  await app.register(cors, {
    origin: "*", // разрешит запросы со всех источников
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  });

  await registerRoutes(app);

  await app.listen({ port: 3000 });
  console.log("Mock API running on http://localhost:3000");
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
