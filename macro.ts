import { version } from "./package.json"

export function getGitCommitHash() {
  const {stdout} = Bun.spawnSync({
    cmd: ["git", "rev-parse", "HEAD"],
    stdout: "pipe",
  });

  return stdout.toString();
}

export function getTime(){
  return (new Date()).toLocaleString();
}

export function getVersion(){
  return version;
}