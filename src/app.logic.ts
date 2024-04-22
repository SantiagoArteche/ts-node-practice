import { writeFileSync, mkdirSync } from "fs";
import { yarg } from "./config/plugins/args.plugin";

const base = yarg.b;
const xFive = (number: number) => number * base;
const header = `=======================
    Tabla del ${base}
=======================`;

const numbers = [];
for (let i = 0; i <= yarg.l; i++) {
  const products = `${base} x ${i} = ${xFive(i)}\n`;
  numbers.push(products);
}

const outputMsg = header + "\n" + numbers.join("");

if (yarg.s) console.log(outputMsg);

const outputPath = "outputs";

mkdirSync(outputPath, { recursive: true });
writeFileSync(`${outputPath}/tabla-${base}.txt`, outputMsg);
