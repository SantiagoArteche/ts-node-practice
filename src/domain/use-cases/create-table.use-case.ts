export interface CreateTableUseCase {
  execute: (options: CreateTableOptions) => string;
}

export interface CreateTableOptions {
  base: number;
  limit?: number;
}

export class CreateTable implements CreateTableUseCase {
  execute({ base, limit = 10 }: CreateTableOptions) {
    let outputMsg = "";
    for (let i = 0; i <= limit; i++) {
      outputMsg += `${base} x ${i} = ${i * base}\n`;
    }

    return outputMsg;
  }
}
