import { createWriteStream } from "node:fs";
import { pipeline } from 'stream/promises'

export async function touch(target: string) {
  let stdin = Bun.stdin.writer();
  stdin.end();
  
  let file = createWriteStream(target);  
  try{
    return pipeline(process.stdin, file);
  } catch (err){
    // console.error(err);
  }
}
