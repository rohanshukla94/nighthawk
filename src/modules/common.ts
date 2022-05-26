export abstract class CrudRepository<T, U> {
    abstract index(): Promise<T[]>;
    abstract store(entity: T): Promise<T>;
    abstract show(id: U): Promise<T | null>;
  //   abstract delete(id: ID): Promise<void>;
  }