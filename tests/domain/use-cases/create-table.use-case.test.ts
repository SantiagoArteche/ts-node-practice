import { CreateTable } from "../../../src/domain/use-cases/create-table.use-case";

describe("create-table-use-case tests", () => {
  test("should create table with default values", () => {
    const createTable = new CreateTable();

    const table = createTable.execute({ base: 2 });

    expect(createTable).toBeInstanceOf(CreateTable);

    expect(table).toContain("2 x 1 = 2");
    expect(table).toContain("2 x 10 = 20");
  });

  test("should create table with custom values", () => {
    const createTable = new CreateTable();
    const limit = 15;
    const base = 3;
    const table = createTable.execute({ base, limit });

    expect(createTable).toBeInstanceOf(CreateTable);

    expect(limit).toBeGreaterThan(1);
    expect(base).toBeGreaterThan(1);
    expect(table).toContain(`${base} x ${limit} = ${base * limit}`);
  });
});
