import { getArgs, handleDefaultArgs } from "./cli-template.ts";
import { remove } from "./rm.ts";

const HELP_MESSAGE = "usage: rmx [-h(elp)|-(version)|-r(ecursive)] <target>";

let args = getArgs(true, {recursive: {type: "boolean", short: "r"}});
handleDefaultArgs(args, HELP_MESSAGE);

let targets = args.positionals;
let recursive = Boolean(args.values.recursive || false);
if(targets.length == 0) {
  console.error("no target was specified.");
} else {
  await Promise.all(targets.map(target => remove(target, recursive)));
}
