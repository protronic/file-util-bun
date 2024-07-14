import { mkdir } from "node:fs/promises";

export async function makeDir(target: string) {
  return mkdir(target, {recursive: true});
}