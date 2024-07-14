import { getGitCommitHash, getTime, getVersion } from "./macro.ts" with {type: "macro"};
import { copy } from "./copy.ts";
import { parseArgs } from "util";

const HELP_MESSAGE = "usage: cpjs [-h|-help|-v|-version] <source> <destination>";

let args = parseArgs({
  options: { 
    h: {type: "boolean"},
    help: {type: "boolean"},
    v: {type: "boolean"},
    version: {type: "boolean"}
  },
  allowPositionals: true
}); 

if(args.values.h || args.values.help) {
  console.log(HELP_MESSAGE);
} else if (args.values.v || args.values.version){
  console.log(`  Build Version: ${getVersion()}\n  Commit Hash: ${getGitCommitHash()}  Build Time: ${getTime()}`);
} else {
  let source = args.positionals[0];
  let destination = args.positionals[1];
  if(source && destination){
    console.log(await copy('testIn', 'testOut'));
  } else {
    console.error(`both a source and a destination must be specified.`);
  }
}

