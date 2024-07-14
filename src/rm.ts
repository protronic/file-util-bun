import { rm, rmdir, stat } from "node:fs/promises";

export async function remove(target: string, recursive: boolean) {
  try {
    await rm(target, {recursive: recursive, force: true});
  } catch(err) {
    console.error(err);
  }
}
