import { ServerApp } from "../src/presentation/server-app";

describe("app tests", () => {
  test("should call Server.run with values", async () => {
    const serverRunMock = jest.fn();

    ServerApp.run = serverRunMock;

    process.argv = ["node", "app.ts", "-b", "10", "-l", "20", "-s"];

    await import("../src/app");

    expect(serverRunMock).toHaveBeenCalledWith({
      base: 10,
      limit: 20,
      fileName: expect.any(String),
      showTable: true,
    });
  });
});
