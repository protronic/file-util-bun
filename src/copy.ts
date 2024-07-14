import { FileNotFoundError, NotADirectoryError } from "./error.ts";
import { readdir, stat, mkdir, exists } from "node:fs/promises";
import { Stats } from "node:fs";
import path from "path";

async function resolveDestination(source: string, destination: string){
  let destStat: Stats;
  let isDir: boolean;
  try{
    destStat = await stat(destination);
    isDir = destStat.isDirectory();
  } catch (err) {
    isDir = false;
  }
  
  if(isDir){
    return path.join(destination, path.basename(source))
  } else {
    return destination;
  }
}

async function copyFile(source: string, destination: string){
  if(!await exists(source)){
    throw new FileNotFoundError(`File "${source}" does not exist.`);
  }
  return Bun.write(await resolveDestination(source, destination), Bun.file(source), {createPath: true});
}

export async function copy(source: string, destination: string){
  if(!(await exists(source))){
    throw new FileNotFoundError(`File "${source}" does not exist.`);
  }
  let isDirSource = (await stat(source)).isDirectory();
  if(isDirSource) {
    let isDirDestination = (await (stat(destination).catch(() => ({isDirectory: () => false})))).isDirectory();
    // source = source.slice(-1)[0] == '/' ? source : (source + '/');
    if(!isDirDestination){
      throw new NotADirectoryError(`"${destination}" is not a directory, but "${source}" is.`);
    }
    let promises = await Promise.all((await readdir(source)).map(async (file): Promise<number> => {
      return await copy(path.join(source, file), path.join(destination, file));
    }));
    return promises.reduce(((col, cur) => ((col ? col : 0) + (cur ? cur : 0))), 0);
  } else {
    let result = await copyFile(source, destination);
    console.log(`copied "${source}" to "${destination}".`);
    return result;
  }
}

// copy("testIn/test1 copy 2", "testOut");