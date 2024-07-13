import { readdir, stat, mkdir, exists } from "node:fs/promises";
import { Stats } from "node:fs";

class FileNotFoundError extends Error {};
class NotADirectoryError extends Error {};

async function resolveDestination(source: string, destination: string){
  let sourceFileName = source.split('/').slice(-1)[0];
  let destStat: Stats;
  let isDir: boolean;
  try{
    destStat = await stat(destination);
    isDir = destStat.isDirectory();
  } catch (err) {
    // console.log(`stat failed on ${destination} in resolveDestination.`);
    isDir = false;
  }

  if(isDir){
    return destination + (destination.slice(-1)[0] == '/' ? '' : '/') + sourceFileName;
  } else {
    return destination;
  }
}

async function copyFile(source: string, destination: string){
  if(!await exists(source)){
    throw new FileNotFoundError(`File "${source}" does not exist.`);
  }
  return await Bun.write(await resolveDestination(source, destination), Bun.file(source));
}

export async function copy(source: string, destination: string){
  if(!(await exists(source))){
    throw new FileNotFoundError(`File "${source}" does not exist.`);
  }
  let isDirSource = (await stat(source)).isDirectory();
  let isDirDestination = (await (stat(destination).catch(() => ({isDirectory: () => false})))).isDirectory();
  if(isDirSource) {
    source = source.slice(-1)[0] == '/' ? source : (source + '/');
    if(!isDirDestination){
      throw new NotADirectoryError(`"${destination}" is not a directory, but "${source}" is.`);
    }
    destination = destination.slice(-1)[0] == '/' ? destination : (destination + '/');

    let promises = await Promise.all((await readdir(source)).map(async (file): Promise<number> => {
      if((await stat(source + file)).isDirectory()){
        try{
          await mkdir(destination + file);
        } catch (err: any) {}
      }
      return await copy(source + file, destination + file);
    }));
    // console.log(`copied "${source}" to "${destination}".`);
    return promises.reduce(((col, cur) => ((col ? col : 0) + (cur ? cur : 0))), 0);
  } else {
    let result = await copyFile(source, destination);
    console.log(`copied "${source}" to "${destination}".`);
    return result;
  }
}
