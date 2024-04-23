import { yarg } from "./config/plugins/args.plugin";
import { ServerApp } from "./presentation/server-app";

(async () => {
  await main();
  console.log("Fin de programa");
})();

async function main() {
  const { b: base, l: limit, s } = yarg;
  ServerApp.run({ base, limit, showTable: s, fileName: `table-${base}` });
}
