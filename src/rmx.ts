import { getGitCommitHash, getTime, getVersion } from "./macro.ts" with {type: "macro"};
import { remove } from "./rm.ts";
import { parseArgs } from "util";

const HELP_MESSAGE = "usage: rmjs [-h|-help|-v|-version|-r|-recursive] <target>";

let args = parseArgs({
  options: { 
    help: {type: "boolean", short: "h"},
    version: {type: "boolean", short: "v"},
    recursive: {type: "boolean", short: "r"}
  },
  allowPositionals: true
}); 

if(args.values.help) {
  console.log(HELP_MESSAGE);
} else if (args.values.version){
  console.log(`  Build Version: ${getVersion()}\n  Commit Hash: ${getGitCommitHash()}  Build Time: ${getTime()}`);
} else {
  let target = args.positionals[0];
  let recursive = args.values.recursive || false;
  console.log({target, recursive})
  if(!target) {
    console.error("no target was specified.");
  } else {
    await remove(target, recursive);
  }
}