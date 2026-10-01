import homepage from "./index.html";

const backend = process.env.BACKEND_URL ?? "http://127.0.0.1:3000";

const server = Bun.serve({
  hostname: process.env.HOST ?? "127.0.0.1",
  port: Number(process.env.PORT ?? 8080),
  routes: {
    "/": homepage,
    // Pass API requests on to the backend, so the browser only ever talks to this server.
    "/api/*": (request) => {
      const url = new URL(request.url);
      return fetch(new URL(url.pathname + url.search, backend), request).catch(
        () => Response.json({ error: "UNAVAILABLE" }, { status: 503 }),
      );
    },
  },
});

console.log(`Frontend listening on ${server.url}`);
