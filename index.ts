import { copy } from "./copy.ts";
import { parseArgs } from "util";

const HELP_MESSAGE = "usage: jscopy <source> <destination>";

let args = parseArgs({
  options: { 
    h: {type: "boolean"}
  },
  allowPositionals: true
});

if(args.values.h) {
  console.log(HELP_MESSAGE);
} else {
  let source = args.positionals[0];
  let destination = args.positionals[1];
  console.log(`source path: ${source}`);
  console.log(`destination path: ${destination}`);
  if(source && destination){
    console.log(await copy('testIn', 'testOut'));
  }
}

