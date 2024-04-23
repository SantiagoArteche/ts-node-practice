import { CreateTable } from "../../src/domain/use-cases/create-table.use-case";
import { SaveFile } from "../../src/domain/use-cases/save-file.use-case";
import { ServerApp } from "../../src/presentation/server-app";
describe("server-app tests", () => {
  const options = {
    base: 5,
    limit: 10,
    showTable: false,
    fileDestination: "tests/test-destination",
    fileName: "test-filename",
  };

  test("should create ServerApp instance", () => {
    const serverApp = new ServerApp();

    expect(serverApp).toBeInstanceOf(ServerApp);
    expect(typeof ServerApp.run).toBe("function");
  });

  test("should run ServerApp with options", () => {
    const logSpy = jest.spyOn(console, "log");
    const createTableSpy = jest.spyOn(CreateTable.prototype, "execute");
    const saveFileSpy = jest.spyOn(SaveFile.prototype, "execute");

    ServerApp.run(options);

    expect(logSpy).toHaveBeenCalledTimes(2);
    expect(logSpy).toHaveBeenCalledWith("Server running...");
    expect(logSpy).toHaveBeenCalledWith("File Created!");

    expect(createTableSpy).toHaveBeenCalledTimes(1);
    expect(createTableSpy).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });

    expect(saveFileSpy).toHaveBeenCalledTimes(1);
    expect(saveFileSpy).toHaveBeenCalledWith({
      fileContent: expect.any(String),
      destination: options.fileDestination,
      fileName: options.fileName,
    });
  });

  test("should run ServerApp with custom values mocked", () => {
    const logMock = jest.fn();
    const logError = jest.fn();

    const createMock = jest.fn().mockReturnValue("1 x 5 = 5");
    const saveFileMock = jest.fn().mockReturnValue(true);

    console.log = logMock;
    console.error = logError;
    CreateTable.prototype.execute = createMock;
    SaveFile.prototype.execute = saveFileMock;

    ServerApp.run(options);

    expect(logMock).toHaveBeenCalledWith("Server running...");
    expect(logMock).toHaveBeenCalledWith("File Created!");
    expect(createMock).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });
    expect(saveFileMock).toHaveBeenCalledWith({
      destination: options.fileDestination,
      fileName: options.fileName,
      fileContent: expect.any(String),
    });
    expect(logError).not.toHaveBeenCalledWith();
  });
});
