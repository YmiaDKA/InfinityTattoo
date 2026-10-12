import { Hono } from "hono";
import { secureHeaders } from "hono/secure-headers";

import type { Env } from "./env";
import { admin } from "./routes/admin";
import { publicApi } from "./routes/public";

const app = new Hono<{ Bindings: Env }>();

app.use("*", secureHeaders());
app.get("/", (c) => c.redirect("/admin"));
app.get("/health", (c) => c.json({ ok: true }));
app.route("/api", publicApi);
app.route("/admin", admin);

app.onError((error, c) => {
  console.error(error);
  return c.text("Noe gikk galt. Prøv igjen.", 500);
});

export default app;
