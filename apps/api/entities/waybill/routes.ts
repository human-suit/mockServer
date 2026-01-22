import { FastifyInstance } from "fastify";
import { waybillStore } from "./store";
import { Waybill } from "./model";

export async function waybillRoutes(app: FastifyInstance) {
  // GET /waybills
  app.get("/waybills", async () => {
    return waybillStore.findAll();
  });

  // GET /waybills/:id
  app.get<{ Params: { id: string } }>("/waybills/:id", async (req, reply) => {
    const id = Number(req.params.id);
    const item = waybillStore.findById(id);
    if (!item) {
      reply.code(404);
      return { message: "Waybill not found" };
    }
    return item;
  });

  // POST /waybills
  app.post<{ Body: Omit<Waybill, "id"> }>("/waybills", async (req, reply) => {
    const created = waybillStore.create(req.body);
    reply.code(201);
    return created;
  });

  // PUT /waybills/:id
  app.put<{
    Params: { id: string };
    Body: Partial<Omit<Waybill, "id">>;
  }>("/waybills/:id", async (req, reply) => {
    const id = Number(req.params.id);
    const updated = waybillStore.update(id, req.body);
    if (!updated) {
      reply.code(404);
      return { message: "Waybill not found" };
    }
    return updated;
  });

  // DELETE /waybills/:id
  app.delete<{ Params: { id: string } }>(
    "/waybills/:id",
    async (req, reply) => {
      const id = Number(req.params.id);
      const ok = waybillStore.delete(id);
      if (!ok) {
        reply.code(404);
        return { message: "Waybill not found" };
      }
      reply.code(204);
    },
  );
}
