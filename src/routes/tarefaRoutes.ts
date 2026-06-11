// ============================================================
// 🎯 TODO 11: Rotas de tarefas (PROTEGIDAS!)
// ============================================================
import { Router, Request, Response } from "express";
import * as TarefaModel from "../models/tarefaModel";

export const tarefaRoutes = Router();

// 🎯 TODO 12: GET /tarefas — Listar tarefas do usuário logado
// Se !session.userId: flash + redirect /login
// TarefaModel.listarPorUsuario(session.userId)
// Renderizar "tarefas" com { nome, tarefas, flash }
tarefaRoutes.get("/tarefas", async (req: Request, res: Response) => {
  // TODO: verificar login + listar tarefas
  res.redirect("/login");
});

// 🎯 TODO 13: POST /tarefas — Adicionar tarefa
// Validar texto não vazio
// TarefaModel.adicionar(session.userId, texto)
// Flash "Tarefa adicionada!"
tarefaRoutes.post("/tarefas", async (req: Request, res: Response) => {
  // TODO: adicionar tarefa
  res.redirect("/tarefas");
});

// 🎯 TODO 14: POST /tarefas/:id/concluir — Toggle concluída
tarefaRoutes.post("/tarefas/:id/concluir", async (req: Request, res: Response) => {
  // TODO: concluir/desconcluir tarefa
  res.redirect("/tarefas");
});

// 🎯 TODO 15: POST /tarefas/:id/remover — Remover tarefa
tarefaRoutes.post("/tarefas/:id/remover", async (req: Request, res: Response) => {
  // TODO: remover tarefa
  res.redirect("/tarefas");
});
