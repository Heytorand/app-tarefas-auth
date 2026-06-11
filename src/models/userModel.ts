import { readFile, writeFile } from "fs/promises";
import bcrypt from "bcrypt";

interface User {
  id: number;
  nome: string;
  email: string;
  senha: string;
}

const ARQUIVO = "dados/usuarios.json";
const SALT_ROUNDS = 10;

// carregar usuários
async function carregar(): Promise<User[]> {
  try {
    const data = await readFile(ARQUIVO, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// salvar usuários
async function salvar(users: User[]): Promise<void> {
  await writeFile(ARQUIVO, JSON.stringify(users, null, 2));
}

// buscar por email
async function buscarPorEmail(email: string): Promise<User | undefined> {
  const users = await carregar();
  return users.find(u => u.email === email);
}

// buscar por id
async function buscarPorId(id: number): Promise<User | undefined> {
  const users = await carregar();
  return users.find(u => u.id === id);
}

// registrar usuário
async function registrar(nome: string, email: string, senhaTexto: string): Promise<User> {
  const users = await carregar();

  const existe = users.find(u => u.email === email);
  if (existe) {
    throw new Error("Email já cadastrado");
  }

  const hash = await bcrypt.hash(senhaTexto, SALT_ROUNDS);

  const novoUser: User = {
    id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
    nome,
    email,
    senha: hash,
  };

  users.push(novoUser);
  await salvar(users);

  return novoUser;
}

// login
async function login(email: string, senhaTexto: string): Promise<User | null> {
  const users = await carregar();

  const user = users.find(u => u.email === email);
  if (!user) return null;

  const ok = await bcrypt.compare(senhaTexto, user.senha);
  if (!ok) return null;

  return user;
}

export const userModel = {
  carregar,
  salvar,
  buscarPorEmail,
  buscarPorId,
  registrar,
  login,
};