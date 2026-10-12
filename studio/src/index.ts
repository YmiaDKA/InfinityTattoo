import { Hono } from "hono";
import { secureHeaders } from "hono/secure-headers";

import type { Env } from "./env";
import { runScheduled } from "./lib/bookings";
import { admin } from "./routes/admin";
import { client } from "./routes/client";
import { publicApi } from "./routes/public";

const app = new Hono<{ Bindings: Env }>();

app.use("*", secureHeaders());
app.get("/", (c) => c.redirect("/admin"));
app.get("/health", (c) => c.json({ ok: true }));
app.route("/api", publicApi);
app.route("/admin", admin);
app.route("/", client);

app.onError((error, c) => {
  console.error(error);
  return c.text("Noe gikk galt. Prøv igjen.", 500);
});

export default {
  fetch: app.fetch,
  // Hourly: release unpaid deposit holds, send reminders, expire old payment links.
  async scheduled(_controller: ScheduledController, env: Env, ctx: ExecutionContext) {
    ctx.waitUntil(runScheduled(env));
  },
} satisfies ExportedHandler<Env>;
