// entities/waybill/routes.ts
import { FastifyInstance } from "fastify";
import { waybillStore } from "./store";
import { Waybill } from "./model";

export async function waybillRoutes(app: FastifyInstance) {
  app.get("/waybills", async () => waybillStore.findAll());

  app.get<{ Params: { id: string } }>("/waybills/:id", async (req, reply) => {
    const item = waybillStore.findById(req.params.id);
    if (!item) {
      reply.code(404);
      return { message: "Waybill not found" };
    }
    return item;
  });

  app.post<{ Body: Omit<Waybill, "id"> }>("/waybills", async (req, reply) => {
    const created = waybillStore.create(req.body);
    reply.code(201);
    return created;
  });

  app.put<{
    Params: { id: string };
    Body: Partial<Omit<Waybill, "id">>;
  }>("/waybills/:id", async (req, reply) => {
    const updated = waybillStore.update(req.params.id, req.body);
    if (!updated) {
      reply.code(404);
      return { message: "Waybill not found" };
    }
    return updated;
  });

  app.delete<{ Params: { id: string } }>(
    "/waybills/:id",
    async (req, reply) => {
      const ok = waybillStore.delete(req.params.id);
      if (!ok) {
        reply.code(404);
        return { message: "Waybill not found" };
      }
      reply.code(204).send();
    },
  );
}
