import { Router, Request, Response } from "express";
import * as TarefaModel from "../models/tarefaModel";

export const tarefaRoutes = Router();

// GET /tarefas
tarefaRoutes.get("/tarefas", async (req: Request, res: Response) => {
  if (!req.session.userId) {
    req.session.flash = "Você precisa estar logado";
    return res.redirect("/login");
  }

  const tarefas = await TarefaModel.listarPorUsuario(req.session.userId);

  res.render("tarefas", {
    nome: req.session.userName,
    tarefas,
    flash: req.session.flash || null,
  });

  req.session.flash = null;
});

// POST /tarefas
tarefaRoutes.post("/tarefas", async (req: Request, res: Response) => {
  if (!req.session.userId) {
    req.session.flash = "Faça login primeiro";
    return res.redirect("/login");
  }

  const { texto } = req.body;

  if (!texto || texto.trim() === "") {
    req.session.flash = "Digite uma tarefa válida";
    return res.redirect("/tarefas");
  }

  await TarefaModel.adicionar(req.session.userId, texto);

  req.session.flash = "Tarefa adicionada!";
  return res.redirect("/tarefas");
});

// POST /tarefas/:id/concluir
tarefaRoutes.post("/tarefas/:id/concluir", async (req: Request, res: Response) => {
  if (!req.session.userId) {
    req.session.flash = "Faça login primeiro";
    return res.redirect("/login");
  }

  const id = Number(req.params.id);

  await TarefaModel.concluir(id, req.session.userId);

  return res.redirect("/tarefas");
});

// POST /tarefas/:id/remover
tarefaRoutes.post("/tarefas/:id/remover", async (req: Request, res: Response) => {
  if (!req.session.userId) {
    req.session.flash = "Faça login primeiro";
    return res.redirect("/login");
  }

  const id = Number(req.params.id);

  await TarefaModel.remover(id, req.session.userId);

  req.session.flash = "Tarefa removida!";
  return res.redirect("/tarefas");
});