import { FastifyInstance } from "fastify";
import { waybillRoutes } from "./entities/waybill/routes";

export async function registerRoutes(app: FastifyInstance) {
  await app.register(waybillRoutes);
}
