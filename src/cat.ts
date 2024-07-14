import { readFile, exists } from "node:fs/promises";
import { FileNotFoundError } from "./error";

export async function read (target: string){
  if(!await exists(target)){
    throw new FileNotFoundError(`File "${target}" does not exist.`);
  }  
  return readFile(target);
}