const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args];

  const { yarg } = await import("../../../src/config/plugins/args.plugin");

  return yarg;
};

describe("args-plugins tests", () => {
  const originalArgv = process.argv;

  beforeEach(() => {
    process.argv = originalArgv;
    jest.resetModules();
  });

  test("should return default values", async () => {
    const yarg = await runCommand(["-b", "5"]);

    expect(yarg).toEqual(expect.objectContaining({ b: 5, l: 10, s: false }));
  });

  test("should return custom values", async () => {
    const yarg = await runCommand(["-b", "8", "-l", "15", "-s"]);

    expect(yarg).toEqual(expect.objectContaining({ b: 8, l: 15, s: true }));
  });
});
