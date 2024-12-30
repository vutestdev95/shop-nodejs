export interface IDatabase {
  connectDataBase(): Promise<void>;
}
