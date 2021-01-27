export interface Repository<T, DTO> {
  create(dto: DTO): T | Promise<T>;
  save(dto: T): void;
  getAll(queryString?: any): T[] | Promise<T[]>;
  getById(id: string): T | Promise<T>;
  update(id: string, data: Partial<DTO> | DTO): void | T | Promise<T>;
  delete(id: string): void | T | Promise<T> | Promise<void>;
}
