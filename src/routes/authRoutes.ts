import { Router, Request, Response } from "express";
import { userModel } from "../models/userModel";

export const authRoutes = Router();

// GET /login
authRoutes.get("/login", (req: Request, res: Response) => {
  res.render("login", { flash: req.session.flash || null });
  req.session.flash = null;
});

// GET /registro
authRoutes.get("/registro", (req: Request, res: Response) => {
  res.render("registro", { flash: req.session.flash || null });
  req.session.flash = null;
});

// POST /registro
authRoutes.post("/registro", async (req: Request, res: Response) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha || senha.length < 6) {
    req.session.flash = "Preencha os campos corretamente (senha min 6)";
    return res.redirect("/registro");
  }

  try {
    await userModel.registrar(nome, email, senha);

    req.session.flash = "Conta criada com sucesso!";
    return res.redirect("/login");
  } catch (err: any) {
    req.session.flash = err.message || "Erro ao registrar";
    return res.redirect("/registro");
  }
});

// POST /login
authRoutes.post("/login", async (req: Request, res: Response) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    req.session.flash = "Preencha email e senha";
    return res.redirect("/login");
  }

  const user = await userModel.login(email, senha);

  if (!user) {
    req.session.flash = "Email ou senha incorretos";
    return res.redirect("/login");
  }

  req.session.userId = user.id;
  req.session.userName = user.nome;

  return res.redirect("/tarefas");
});

// GET /logout
authRoutes.get("/logout", (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});