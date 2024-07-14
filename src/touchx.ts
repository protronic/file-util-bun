import { getGitCommitHash, getTime, getVersion } from "./macro.ts" with {type: "macro"};
import { touch } from "./touch.ts";
import { parseArgs } from "util";

const HELP_MESSAGE = `
usage: touchx [-h(elp)|-v(ersion)] <target 1> <target 2> ... <target n>
  creates a file/files at target location. You can pipe content with pipe operator (|) if necessary.
`;

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
  let targets = args.positionals;
  if(targets.length == 0) {
    console.error("no target was specified.");
  } else {
    await Promise.all(targets.map(touch));
  }
}
