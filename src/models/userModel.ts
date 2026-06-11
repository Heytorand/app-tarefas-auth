// ============================================================
// 🎯 TODO 4: Model de Usuários com bcrypt
// ============================================================
// import { readFile, writeFile } from "fs/promises";
// import bcrypt from "bcrypt";
//
// interface User { id: number; nome: string; email: string; senha: string; }
// const ARQUIVO = "dados/usuarios.json";
// const SALT_ROUNDS = 10;
//
// Funções para criar:
//   carregar(): Promise<User[]>
//   salvar(users: User[]): Promise<void>
//   buscarPorEmail(email: string): Promise<User | undefined>
//   buscarPorId(id: number): Promise<User | undefined>
//   registrar(nome, email, senhaTexto): Promise<User>
//     → verificar email duplicado
//     → bcrypt.hash(senhaTexto, SALT_ROUNDS)
//     → salvar com hash
//   login(email, senhaTexto): Promise<User | null>
//     → buscar por email
//     → bcrypt.compare(senhaTexto, user.senha)
//     → retornar user se correto, null se errado
// ============================================================

