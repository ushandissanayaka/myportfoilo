import fs from "fs";
import path from "path";

const root = process.cwd();
const source = path.join(root, "portfolio-frontend", "dist");
const target = path.join(root, "dist");

fs.rmSync(target, { recursive: true, force: true });
fs.cpSync(source, target, { recursive: true });
