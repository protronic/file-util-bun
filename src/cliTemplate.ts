import { getGitCommitHash, getTime, getVersion } from "./macro.ts" with {type: "macro"};
import { parseArgs } from "util";

type Arguments = {values: {[x: string]: string | boolean | undefined}; positionals: string[] | []};
type ArgumentOptions = {[key: string]: {type: "string" | "boolean", short?: string}};

export function getArgs(allowPositionals: boolean, additionalOptions?: ArgumentOptions){
  let options: ArgumentOptions = { 
    help: {type: "boolean", short: "h"},
    version: {type: "boolean", short: "v"}
  }
  if(additionalOptions) Reflect.ownKeys(additionalOptions).forEach((key) => {options[key.toString()] = additionalOptions[key.toString()]});
  let args = parseArgs({
    options: options,
    allowPositionals: allowPositionals
  });
  return args;
}

export function handleDefaultArgs(args: Arguments, helpMessage: string){
  if(args.values.help) {
    console.log(helpMessage);
    process.exit();
  } else if (args.values.version){
    console.log(`  Build Version: ${getVersion()}\n  Commit Hash: ${getGitCommitHash()}  Build Time: ${getTime()}`);
    process.exit();
  }
}

