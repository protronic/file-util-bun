# file-util-bun

A collection of cli tools written in Typescript based on Bun. It is meant to be used in package.json scripts for simple deployment and maintenance tasks independent of OS. 
They are inspired by linux cli applications, but the behaviour is (in some cases) altered to fit the way I think they should behave.

# install

to install the package run:

```bash
bun install [--dev] file-util-bun
```

or 

```bash
npm install [--save-dev] file-util-bun
```

the package should work with both node and bun.

# usage

The following executables are available from within the package.json (if you want to use them in your terminal directly, you might have to install the package with global flag):

* `cpx` - copies files and folders
* `rmx` - removes files and folders
* `mkdirx` - creates empty folders
* `touchx` - creates new files or fills new files with piped input
* `catx` - prints the content of a file
* `scpx` - (disfunctional) copies files and folders to/from remote locations

additionally all the major functions, that the executables rely on, are exposed in the main module file (index.ts). So you are for example able to import the cp method, for use inside your code (function names are the same, but without the 'x' at the end):

```javascript
import { cp } from "file-util-bun";

cp("./test_file_1", "./test/test_file_1");
```

__scp is not functional yet. Bun doesn't support the required ssh2 package at the moment and I haven't found a satisfying solution.__

all applications support at least these commandline arguments:
`-h` | `-help` - to show a help message, explaining usage
`-v` | `-version` - to show the version and build information

# development

After cloning the repository, run:

```bash
bun install
```

to install required dependencies. Then you can run:

```bash
bun run build
```

or to build a specific tool by itself (cp in the example):

```bash
bun run build:cp
```

or to automatic builds after files have changed, use:

```bash
bun run watch
```


This project was created using `bun init` in bun v1.1.3. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
