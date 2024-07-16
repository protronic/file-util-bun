import { getArgs, handleDefaultArgs } from "./cli-template.ts";
import { cat } from "./cat.ts";

const HELP_MESSAGE = "usage: catx [-h(elp)|-v(ersion)] <target>";

let args = getArgs(true);

handleDefaultArgs(args, HELP_MESSAGE);

let target = args.positionals[0];
if (target){
  let result = await cat(target);
  Bun.stdout.writer().write(result);
} else {
  console.error("no target.");
}