import { getGitCommitHash, getTime, getVersion } from "./macro.ts" with {type: "macro"};
import { scp, type Security } from "./scp.ts";
import { parseArgs } from "util";
import { homedir } from "os";
import path from "path";
import { read } from "read";

const HELP_MESSAGE = `usage: scpjs [-h|-help|-v|-version|-k <path/to/privatekey>|-p <port>|-a|-s] <source> <username>@<host>:<destination>
  -help |
  -h -- shows this message
  -version |
  -v -- shows version and build information
  -p -- if not used, 22 is assumed
  -a -- ask for password to authenticate
  -s -- ask for private key passphrase 
  -k -- if neither this nor -p is used, a default key location is assumed (~/.ssh/id_rsa)

if destination includes whitespaces, the whole <username>@<host>:<destination> string needs to be quoted.
`;

let args = parseArgs({
  options: { 
    // h: {type: "boolean"},
    help: {type: "boolean", short: "h"},
    // v: {type: "boolean"},
    version: {type: "boolean", short: "v"},
    p: {type: "string"},
    a: {type: "boolean"},
    s: {type: "boolean"},
    k: {type: "string"},
  },
  allowPositionals: true
}); 

if(args.values.help) {
  console.log(HELP_MESSAGE);
} else if (args.values.version){
  console.log(`  Build Version: ${getVersion()}\n  Commit Hash: ${getGitCommitHash()}  Build Time: ${getTime()}`);
} else {
  let source = args.positionals[0];
  let [username, hostDestination] = args.positionals[1].split('@');
  let [host, destination] = hostDestination.split(':');
  let port = 22;

  if (args.values.p){
    port = Number.parseInt(args.values.p);
  }

  let auth: Security = {};

  if(args.values.a){
    auth.password = (await read({prompt: "password: ", silent: true, replace: '*'})).toString();
  } else if (args.values.k){
    auth.privateKeyPath = args.values.k;
  } else {
    auth.privateKeyPath = path.join(homedir(), '.ssh/id_rsa');
  }
  await scp(source, destination, host, port, username, auth);
}