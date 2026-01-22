import Fastify from "fastify";

const server = Fastify({ logger: true });

// Простейший endpoint для проверки
server.get("/health", async (request, reply) => {
  return { status: "ok", timestamp: Date.now() };
});

const start = async () => {
  try {
    await server.listen({ port: 3000 });
    console.log("API запущен на http://localhost:3000");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
