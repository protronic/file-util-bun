import { getArgs, handleDefaultArgs } from "./cli-template.ts";
import { touch } from "./touch.ts";

const HELP_MESSAGE = `
usage: touchx [-h(elp)|-v(ersion)] <target 1> <target 2> ... <target n>
  creates a file/files at target location. You can pipe content with pipe operator (|) if necessary.
`;

let args = getArgs(true);
handleDefaultArgs(args, HELP_MESSAGE);

let targets = args.positionals;
if(targets.length == 0) {
  console.error("no target was specified.");
} else {
  await Promise.all(targets.map(touch));
}
