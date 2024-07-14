import { getArgs, handleDefaultArgs } from "./cliTemplate.ts";
import { copy } from "./copy.ts";

const HELP_MESSAGE = "usage: cpx [-h(elp)|-v(ersion)] <source> <destination>";

// let args = parseArgs({
//   options: { 
//     help: {type: "boolean", short: "h"},
//     version: {type: "boolean", short: "v"}
//   },
//   allowPositionals: true
// }); 

let args = getArgs(true);

handleDefaultArgs(args, HELP_MESSAGE);

let source = args.positionals[0];
let destination = args.positionals[1];
if(source && destination){
  await copy(source, destination);
} else {
  console.error(`both a source and a destination must be specified.`);
}


// if(args.values.help) {
//   console.log(HELP_MESSAGE);
// } else if (args.values.version){
//   console.log(`  Build Version: ${getVersion()}\n  Commit Hash: ${getGitCommitHash()}  Build Time: ${getTime()}`);
// } else {
// }

