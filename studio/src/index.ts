import { Hono } from "hono";
import { secureHeaders } from "hono/secure-headers";

import type { Env } from "./env";
import { runScheduled } from "./lib/bookings";
import { admin } from "./routes/admin";
import { client } from "./routes/client";
import { publicApi } from "./routes/public";
import { ICON_180_PNG, ICON_512_PNG } from "./views/icons";

const app = new Hono<{ Bindings: Env }>();

app.use("*", secureHeaders());
app.get("/", (c) => c.redirect("/admin"));
app.get("/health", (c) => c.json({ ok: true }));
app.route("/api", publicApi);
// Lets staff add the admin to their phone's home screen like an app.
app.get("/admin/manifest.webmanifest", (c) =>
  c.json(
    {
      name: "Infinity Studio",
      short_name: "Infinity",
      start_url: "/admin",
      scope: "/admin",
      display: "standalone",
      background_color: "#0b0b0c",
      theme_color: "#0b0b0c",
      icons: [
        { src: "/admin/icon-180.png", sizes: "180x180", type: "image/png" },
        { src: "/admin/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" },
      ],
    },
    200,
    { "Content-Type": "application/manifest+json" },
  ),
);
for (const [size, data] of [["180", ICON_180_PNG], ["512", ICON_512_PNG]] as const) {
  const bytes = Uint8Array.from(atob(data), (ch) => ch.charCodeAt(0));
  app.get(`/admin/icon-${size}.png`, (c) => c.body(bytes, 200, { "Content-Type": "image/png", "Cache-Control": "public, max-age=604800" }));
}
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
