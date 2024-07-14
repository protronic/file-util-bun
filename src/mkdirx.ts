import { getGitCommitHash, getTime, getVersion } from "./macro.ts" with {type: "macro"};
import { makeDir } from "./mkdir.ts";
import { parseArgs } from "util";

const HELP_MESSAGE = "usage: rmjs [-h|-help|-v|-version|-r|-recursive] <target>";

let args = parseArgs({
  options: { 
    help: {type: "boolean", short: "h"},
    version: {type: "boolean", short: "v"},
  },
  allowPositionals: true
}); 

if(args.values.help) {
  console.log(HELP_MESSAGE);
} else if (args.values.version){
  console.log(`  Build Version: ${getVersion()}\n  Commit Hash: ${getGitCommitHash()}  Build Time: ${getTime()}`);
} else {
  let target = args.positionals[0];
  if(!target) {
    console.error("no target was specified.");
  } else {
    await makeDir(target);
  }
}