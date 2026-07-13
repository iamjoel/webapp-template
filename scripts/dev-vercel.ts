import { spawn } from "node:child_process";

const pnpmCommand = process.platform === "win32" ? "pnpm.cmd" : "pnpm";
const nodeOptions = [process.env.NODE_OPTIONS, "--conditions=development"]
  .filter(Boolean)
  .join(" ");

const child = spawn(pnpmCommand, ["exec", "vercel", "dev", "-L", ...process.argv.slice(2)], {
  env: {
    ...process.env,
    NODE_OPTIONS: nodeOptions,
  },
  shell: process.platform === "win32",
  stdio: "inherit",
});

child.on("error", (error) => {
  console.error(`Failed to start Vercel development mode: ${error.message}`);
  process.exitCode = 1;
});

child.on("exit", (code) => {
  process.exitCode = code ?? 1;
});
