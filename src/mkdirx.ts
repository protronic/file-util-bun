import { getArgs, handleDefaultArgs } from "./cli-template.ts";
import { makeDir } from "./mkdir.ts";

const HELP_MESSAGE = `
usage: mkdirx [-h(elp)|-v(ersion)] <target 1> <target 2> ... <target n>
  creates a directory/directories at target location. Targets parent directories will be created if necessary.
`;

let args = getArgs(true);
handleDefaultArgs(args, HELP_MESSAGE);

let targets = args.positionals;
if(targets.length == 0) {
  console.error("no target was specified.");
} else {
  await Promise.all(targets.map(makeDir));
}
