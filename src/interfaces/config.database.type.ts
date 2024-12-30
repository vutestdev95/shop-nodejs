export interface IConfigByEnvironment {
  app: {
    host: string;
  };
  database: {
    userName: string;
    userPassword: string;
    dataBaseName: string;
  };
}

export interface ConfigHelper {
  getConfigByEnv: () => IConfigByEnvironment;
}

export enum envType {
  PRODUCTION = "prod",
  DEV = "dev"
}
