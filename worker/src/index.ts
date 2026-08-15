import { createServer } from "node:http";

import { processBooking } from "./linework.js";
import type { WorkerTask } from "./types.js";

const port = Number(process.env.PORT ?? 8080);
const workerSecret = process.env.BOOKING_WORKER_SHARED_SECRET;

function sendJson(response: import("node:http").ServerResponse, status: number, body: unknown) {
  response.writeHead(status, { "Content-Type": "application/json" });
  response.end(JSON.stringify(body));
}

async function readBody(request: import("node:http").IncomingMessage) {
  const chunks: Buffer[] = [];
  for await (const chunk of request) {
    chunks.push(Buffer.from(chunk));
  }

  return JSON.parse(Buffer.concat(chunks).toString("utf8")) as WorkerTask;
}

const server = createServer(async (request, response) => {
  if (request.method === "GET" && request.url === "/healthz") {
    sendJson(response, 200, { ok: true });
    return;
  }

  if (request.method !== "POST" || request.url !== "/tasks/linework") {
    sendJson(response, 404, { error: "Not found" });
    return;
  }

  if (workerSecret && request.headers["x-booking-worker-secret"] !== workerSecret) {
    sendJson(response, 401, { error: "Unauthorized" });
    return;
  }

  try {
    const body = await readBody(request);
    if (!body.requestId) {
      sendJson(response, 400, { error: "requestId is required" });
      return;
    }

    await processBooking(body.requestId);
    sendJson(response, 200, { ok: true });
  } catch {
    console.error("booking_worker_failed");
    sendJson(response, 500, { error: "Temporary worker failure" });
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`booking_worker_listening:${port}`);
});
