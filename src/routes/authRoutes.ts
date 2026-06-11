// ============================================================
// 🎯 TODO 5: Rotas de autenticação
// ============================================================
import { Router, Request, Response } from "express";
// 🎯 TODO: import * as UserModel from "../models/userModel";

export const authRoutes = Router();

// 🎯 TODO 6: GET /login — renderizar "login" com flash
authRoutes.get("/login", (req: Request, res: Response) => {
  res.render("login", { flash: null });
});

// 🎯 TODO 7: GET /registro — renderizar "registro" com flash
authRoutes.get("/registro", (req: Request, res: Response) => {
  res.render("registro", { flash: null });
});

// 🎯 TODO 8: POST /registro
// Validar nome/email/senha (min 6 chars)
// UserModel.registrar(nome, email, senha)
// Se erro (email duplicado): flash + redirect /registro
// Se ok: flash "Conta criada!" + redirect /login
authRoutes.post("/registro", async (req: Request, res: Response) => {
  // TODO: implementar registro
  res.redirect("/registro");
});

// 🎯 TODO 9: POST /login
// UserModel.login(email, senha)
// Se null: flash "Email ou senha incorretos" + redirect /login
// Se ok: session.userId, session.userName, redirect /tarefas
authRoutes.post("/login", async (req: Request, res: Response) => {
  // TODO: implementar login
  res.redirect("/login");
});

// 🎯 TODO 10: GET /logout — req.session.destroy
authRoutes.get("/logout", (req: Request, res: Response) => {
  // TODO: destruir session
  res.redirect("/login");
});
