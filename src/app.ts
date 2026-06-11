import express from "express";
import session from "express-session";

import { authRoutes } from "./routes/authRoutes";
import { tarefaRoutes } from "./routes/tarefaRoutes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// session config
app.use(
  session({
    secret: "segredo-super-seguro",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // true apenas em HTTPS
      httpOnly: true,
      maxAge: 1000 * 60 * 60, // 1 hora
    },
  })
);

app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(express.static("public"));

app.use(authRoutes);
app.use(tarefaRoutes);

app.listen(3000, () =>
  console.log("✅ App Tarefas rodando em http://localhost:3000")
);