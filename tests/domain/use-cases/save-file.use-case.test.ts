import { SaveFile } from "../../../src/domain/use-cases/save-file.use-case";
import fs from "fs";

describe("save-file-use-case tests", () => {
  afterEach(() => {
    const exist = fs.existsSync("outputs");

    if (exist) fs.rmSync("outputs", { recursive: true });

    const customExist = fs.existsSync("tests/outputs");

    if (customExist) fs.rmSync("tests/outputs", { recursive: true });
  });

  test("should save file with default values", () => {
    const saveFile = new SaveFile();

    const options = {
      fileContent: "test content",
      fileName: "testFile",
    };
    const newFile = saveFile.execute(options);

    expect(newFile).toBeTruthy();

    const checkFile = fs.existsSync("outputs/testFile.txt");

    const fileContent = fs.readFileSync("outputs/testFile.txt", {
      encoding: "utf-8",
    });

    expect(checkFile).toBeTruthy();
    expect(fileContent).toBeTruthy();
    expect(fileContent).toBe(options.fileContent);
  });

  test("should save file with custom values", () => {
    const saveFile = new SaveFile();

    const customOptions = {
      fileContent: "custom content",
      fileName: "customFile",
      destination: "./tests/outputs",
    };
    const customFile = saveFile.execute(customOptions);

    expect(customFile).toBeTruthy();

    const checkCustomFile = fs.existsSync("tests/outputs/customFile.txt");

    const customFileContent = fs.readFileSync("tests/outputs/customFile.txt", {
      encoding: "utf-8",
    });

    expect(checkCustomFile).toBeTruthy();
    expect(customFileContent).toBeTruthy();
    expect(customFileContent).toBe(customOptions.fileContent);
  });

  test("should return false if directory could not be created", () => {
    const saveFile = new SaveFile();
    const mkDirMock = jest.spyOn(fs, "mkdirSync").mockImplementation(() => {
      throw new Error("This is a custom error msg from testing");
    });

    const customOptions = {
      fileContent: "custom content",
      fileName: "customFile",
      destination: "./tests/outputs",
    };

    const result = saveFile.execute(customOptions);

    expect(result).toBe(false);

    mkDirMock.mockRestore();
  });

  test("should return false if file could not be created", () => {
    const saveFile = new SaveFile();
    const mkDirMock = jest.spyOn(fs, "writeFileSync").mockImplementation(() => {
      throw new Error("This is a custom error msg from testing");
    });

    const result = saveFile.execute({ fileContent: "hola" });

    expect(result).toBe(false);

    mkDirMock.mockRestore();
  });
});
