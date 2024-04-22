import yargs from "yargs";

export const yarg = yargs(process.argv)
  .option("b", {
    alias: "base",
    type: "number",
    demandOption: "true",
    describe: "Multiplication table base",
  })
  .option("l", {
    alias: "limit",
    type: "number",
    default: 10,
    describe: "Multiplication table limit",
  })
  .option("s", {
    alias: "show",
    type: "boolean",
    default: false,
    describe: "Show multiplication table",
  })
  .check((argv, options) => {
    if (argv.b < 1) throw new Error("Base must be greater than 0");
    if (argv.l < 1) throw new Error("Limit must be greater than 0");

    return true;
  })
  .parseSync();
