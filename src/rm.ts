import { rm } from "node:fs/promises";

export async function remove(target: string, recursive: boolean) {
  try {
    return rm(target, {recursive: recursive, force: true});
  } catch(err) {
    console.error(err);
  }
}
