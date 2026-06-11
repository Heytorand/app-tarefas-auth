// ✅ PRONTO — Model de Tarefas (não precisa alterar)
import { readFile, writeFile } from "fs/promises";

export interface Tarefa {
  id: number;
  userId: number;
  texto: string;
  concluida: boolean;
  criadaEm: string;
}

const ARQUIVO = "dados/tarefas.json";

async function carregar(): Promise<Tarefa[]> {
  try { return JSON.parse(await readFile(ARQUIVO, "utf-8")); }
  catch { await writeFile(ARQUIVO, "[]"); return []; }
}
async function salvar(t: Tarefa[]): Promise<void> {
  await writeFile(ARQUIVO, JSON.stringify(t, null, 2));
}

export async function listarPorUsuario(userId: number): Promise<Tarefa[]> {
  return (await carregar()).filter(t => t.userId === userId);
}

export async function adicionar(userId: number, texto: string): Promise<Tarefa> {
  const todas = await carregar();
  const nova: Tarefa = {
    id: (todas.at(-1)?.id ?? 0) + 1,
    userId, texto: texto.trim(), concluida: false,
    criadaEm: new Date().toLocaleDateString("pt-BR"),
  };
  todas.push(nova);
  await salvar(todas);
  return nova;
}

export async function concluir(id: number, userId: number): Promise<boolean> {
  const todas = await carregar();
  const t = todas.find(t => t.id === id && t.userId === userId);
  if (!t) return false;
  t.concluida = !t.concluida;
  await salvar(todas);
  return true;
}

export async function remover(id: number, userId: number): Promise<boolean> {
  const todas = await carregar();
  const i = todas.findIndex(t => t.id === id && t.userId === userId);
  if (i === -1) return false;
  todas.splice(i, 1);
  await salvar(todas);
  return true;
}
