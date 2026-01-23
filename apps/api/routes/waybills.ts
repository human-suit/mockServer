import { FastifyInstance } from "fastify";
import { waybillStore } from "../entities/waybill/store";
import { Waybill } from "../entities/waybill/model";

export async function registerRoutes(app: FastifyInstance) {
  // GET /waybills — получить все
  app.get("/waybills", async () => {
    return waybillStore.findAll();
  });

  // GET /waybills/:id — получить по id
  app.get<{ Params: { id: string } }>(
    "/waybills/:id",
    async (request, reply) => {
      const item = waybillStore.findById(request.params.id);

      if (!item) {
        reply.code(404);
        return { message: "Waybill not found" };
      }

      return item;
    },
  );

  // POST /waybills — создать
  app.post<{ Body: Omit<Waybill, "id"> }>(
    "/waybills",
    async (request, reply) => {
      const created = waybillStore.create(request.body);
      reply.code(201);
      return created;
    },
  );

  // PUT /waybills/:id — обновить
  app.put<{
    Params: { id: string };
    Body: Partial<Omit<Waybill, "id">>;
  }>("/waybills/:id", async (request, reply) => {
    const updated = waybillStore.update(request.params.id, request.body);

    if (!updated) {
      reply.code(404);
      return { message: "Waybill not found" };
    }

    return updated;
  });

  // DELETE /waybills/:id — удалить
  app.delete<{ Params: { id: string } }>(
    "/waybills/:id",
    async (request, reply) => {
      const ok = waybillStore.delete(request.params.id);

      if (!ok) {
        reply.code(404);
        return { message: "Waybill not found" };
      }

      reply.code(204);
    },
  );
}
