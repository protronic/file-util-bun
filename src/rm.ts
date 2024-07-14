import { rm, rmdir, stat } from "node:fs/promises";

// async function removeFile(target: string){

// }

// async function removeDir(target: string, recursive: boolean){
  
// }

export async function remove(target: string, recursive: boolean) {
  // try{
  //   if((await stat(target)).isDirectory()){
  //     return await removeDir(target, recursive);
  //   } else {
  //     return await removeFile(target);
  //   }
  // } catch(err) {
  //   console.error(err);
  // }
  try {
    await rm(target, {recursive: recursive, force: true});
  } catch(err) {
    console.error(err);
  }
}
