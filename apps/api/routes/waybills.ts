import { FastifyInstance } from "fastify";
import { waybillSeed } from "../entities/waybill/seed";
import { Waybill } from "../entities/waybill/model";

let waybills: Waybill[] = [...waybillSeed];

export function registerRoutes(app: FastifyInstance) {
  // GET /waybills — получить все
  app.get("/waybills", async () => {
    return waybills;
  });

  // POST /waybills — создать
  app.post<{ Body: Omit<Waybill, "id"> }>(
    "/waybills",
    async (request, reply) => {
      const newWaybill: Waybill = {
        id: waybills.length ? waybills[waybills.length - 1].id + 1 : 1,
        ...request.body,
      };
      waybills.push(newWaybill);
      return newWaybill;
    },
  );

  // PUT /waybills/:id — обновить
  app.put<{ Params: { id: string }; Body: Partial<Omit<Waybill, "id">> }>(
    "/waybills/:id",
    async (request, reply) => {
      const id = Number(request.params.id);
      const index = waybills.findIndex((w) => w.id === id);
      if (index === -1) {
        return reply.status(404).send({ message: "Waybill not found" });
      }
      waybills[index] = { ...waybills[index], ...request.body };
      return waybills[index];
    },
  );

  // DELETE /waybills/:id — удалить
  app.delete<{ Params: { id: string } }>(
    "/waybills/:id",
    async (request, reply) => {
      const id = Number(request.params.id);
      const exists = waybills.some((w) => w.id === id);
      if (!exists) {
        return reply.status(404).send({ message: "Waybill not found" });
      }
      waybills = waybills.filter((w) => w.id !== id);
      return { success: true };
    },
  );
}
