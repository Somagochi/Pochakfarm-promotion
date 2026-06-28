import { spawn } from "node:child_process";

const children = new Set();

function run(name, command, args, options = {}) {
  const child = spawn(command, args, {
    cwd: process.cwd(),
    env: { ...process.env, ...options.env },
    stdio: ["inherit", "pipe", "pipe"],
    windowsHide: false,
  });

  children.add(child);

  child.stdout.on("data", (chunk) => {
    process.stdout.write(`[${name}] ${chunk}`);
  });

  child.stderr.on("data", (chunk) => {
    process.stderr.write(`[${name}] ${chunk}`);
  });

  child.on("exit", (code, signal) => {
    children.delete(child);
    if (code !== 0 && signal !== "SIGTERM") {
      process.stderr.write(
        `[${name}] exited with ${signal || `code ${code}`}\n`,
      );
      shutdown(code || 1);
    }
  });

  return child;
}

function shutdown(code = 0) {
  for (const child of children) {
    child.kill();
  }
  process.exit(code);
}

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));

run("api", process.execPath, ["server/index.mjs"], {
  env: { PORT: process.env.PORT || "4173" },
});

run("vite", process.execPath, [
  "node_modules/vite/bin/vite.js",
  "--host",
  "127.0.0.1",
  "--port",
  "5173",
]);
