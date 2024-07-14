import { readFile, stat } from "node:fs/promises";
import { Client } from "node-scp";

export interface Security{
  password?: string,
  privateKeyPath?: string,
  privateKeyContent?: Buffer,
  passphrase?: string
}

export async function scp(source: string, destination: string, host: string, port: number, username: string, auth: Security){
  let config: any = {
    host: host,
    port: port,
    username: username
  }
  
  // if(!auth.password && !auth.privateKeyContent && !auth.privateKeyPath) throw new ScpError("no way to authenticate.");

  if(auth.password) {
    config.password = auth.password;
  }
  else if(auth.privateKeyContent) {
    config.privateKey = auth.privateKeyContent;
  }
  else if (auth.privateKeyPath) {
    let pkContent = await readFile(auth.privateKeyPath);
    config.privateKey = pkContent;
    // console.log(pkContent.toString("ascii"));
  }

  if(auth.passphrase) config.passphrase = auth.passphrase;
  
  try {
    let client = await Client(config);
    
    try {    
      if((await stat(source)).isDirectory()){
        await client.uploadDir(source, destination);
      } else {
        await client.uploadFile(source, destination);
      }
    } catch (err) {
      console.error(err);
    } finally {
      client.close();
    }
  } catch (err) {
    console.error(err);
  }
} 

