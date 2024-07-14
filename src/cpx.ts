import { getGitCommitHash, getTime, getVersion } from "./macro.ts" with {type: "macro"};
import { copy } from "./copy.ts";
import { parseArgs } from "util";

const HELP_MESSAGE = "usage: cpx [-h(elp)|-v(ersion)] <source> <destination>";

let args = parseArgs({
  options: { 
    help: {type: "boolean", short: "h"},
    version: {type: "boolean", short: "v"}
  },
  allowPositionals: true
}); 

if(args.values.help) {
  console.log(HELP_MESSAGE);
} else if (args.values.version){
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

