import express from "express";
// 🎯 TODO 2: import session from "express-session";
import { authRoutes } from "./routes/authRoutes";
import { tarefaRoutes } from "./routes/tarefaRoutes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🎯 TODO 3: app.use(session({ secret, resave, saveUninitialized, cookie }));

app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(express.static("public"));

app.use(authRoutes);
app.use(tarefaRoutes);

app.listen(3000, () => console.log("✅ App Tarefas rodando em http://localhost:3000"));
