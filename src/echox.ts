import { getArgs, handleDefaultArgs, readPipeInput } from "./cli-template.ts";
import { echo } from "./echo.ts";

const HELP_MESSAGE = `usage: echox [-h(elp)|-v(ersion)|-s(eparator) <string>] <input 1> <input 2> ... <input n>
  Inputs are printed back with line breaks seperated. Input can also be piped in.`;

let args = getArgs(true, {separator: {type: "string", short: "s"}});

handleDefaultArgs(args, HELP_MESSAGE);

let pipeInput: string = await readPipeInput();
let inputs: string[] = args.positionals;
let separator: string | undefined = args.values.separator?.toString();

if(pipeInput) inputs.unshift(pipeInput);

let result = echo(inputs, separator);
await Bun.write(Bun.stdout, result);

