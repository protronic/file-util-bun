import { EOL } from "os"

export function echo(inputs: string[], separator?: string){
  return inputs.join(separator || EOL);
}
