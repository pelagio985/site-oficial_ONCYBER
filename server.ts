import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { requireAuth, AuthRequest } from "./src/middleware/auth.ts";
import { getOrCreateUser } from "./src/db/users.ts";
import {
  getServiceBookings,
  createServiceBooking,
  deleteServiceBooking,
  createWorkspaceAction,
  getWorkspaceActions
} from "./src/db/helpers.ts";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parser middleware
  app.use(express.json());

  // API Route - Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // API Route - Sync User state
  app.post("/api/auth/sync", requireAuth, async (req: AuthRequest, res) => {
    try {
      const uid = req.user?.uid;
      const email = req.user?.email;
      if (!uid || !email) {
        return res.status(400).json({ error: "UID ou Email ausente no token de autenticação." });
      }

      const user = await getOrCreateUser(uid, email);
      res.json({ status: "success", user });
    } catch (error: any) {
      console.error("Erro no sync do usuário:", error);
      res.status(500).json({ error: error.message || "Erro interno do servidor." });
    }
  });

  // API Routes - IT Service Bookings
  app.get("/api/bookings", requireAuth, async (req: AuthRequest, res) => {
    try {
      const uid = req.user?.uid;
      if (!uid) return res.status(401).json({ error: "Não autorizado" });

      const bookings = await getServiceBookings(uid);
      res.json(bookings);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/bookings", requireAuth, async (req: AuthRequest, res) => {
    try {
      const uid = req.user?.uid;
      const { serviceName, scheduledAt, details } = req.body;
      if (!uid) return res.status(401).json({ error: "Não autorizado" });
      if (!serviceName || !scheduledAt) {
        return res.status(400).json({ error: "Os campos serviceName e scheduledAt são obrigatórios." });
      }

      const booking = await createServiceBooking(uid, serviceName, scheduledAt, details);
      // Auto-log this action
      await createWorkspaceAction(uid, "Booking", `Agendou o serviço '${serviceName}' para ${scheduledAt}`);

      res.status(201).json(booking);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.delete("/api/bookings/:id", requireAuth, async (req: AuthRequest, res) => {
    try {
      const uid = req.user?.uid;
      const bookingId = parseInt(req.params.id);
      if (!uid) return res.status(401).json({ error: "Não autorizado" });
      if (isNaN(bookingId)) {
        return res.status(400).json({ error: "ID de agendamento inválido." });
      }

      const deleted = await deleteServiceBooking(bookingId, uid);
      if (!deleted) {
        return res.status(404).json({ error: "Agendamento não encontrado ou não pertence ao usuário." });
      }

      // Auto-log this deletion
      await createWorkspaceAction(uid, "Booking", `Cancelou o agendamento do serviço ID #${bookingId}`);

      res.json({ success: true, deleted });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // API Routes - Workspace Actions Log
  app.get("/api/logs", requireAuth, async (req: AuthRequest, res) => {
    try {
      const uid = req.user?.uid;
      if (!uid) return res.status(401).json({ error: "Não autorizado" });

      const logs = await getWorkspaceActions(uid);
      res.json(logs);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/logs", requireAuth, async (req: AuthRequest, res) => {
    try {
      const uid = req.user?.uid;
      const { actionType, description } = req.body;
      if (!uid) return res.status(401).json({ error: "Não autorizado" });
      if (!actionType || !description) {
        return res.status(400).json({ error: "Campos actionType e description obrigatórios." });
      }

      const log = await createWorkspaceAction(uid, actionType, description);
      res.status(201).json(log);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[ONCYBER Server] Executando em http://localhost:${PORT}`);
  });
}

startServer();
