import {
  ConfigHelper,
  envType,
  IConfigByEnvironment
} from "~/interfaces/config.database.type";
import "dotenv/config";

class ConfigDatabaseHelper implements ConfigHelper {
  private static instance: ConfigDatabaseHelper;
  private config: IConfigByEnvironment | null;
  private readonly envTyp: envType;
  private productionConfig: IConfigByEnvironment = {
    app: {
      host: process.env.PROD_HOST ?? "3066"
    },
    database: {
      dataBaseName: process.env.PROD_DATABASE_NAME ?? "",
      userName: process.env.PROD_USER_NAME ?? "",
      userPassword: process.env.PROD_USER_PASSWORD ?? ""
    }
  };
  private devConfig: IConfigByEnvironment = {
    app: {
      host: process.env.DEV_HOST ?? "3055"
    },
    database: {
      dataBaseName: process.env.DEV_DATABASE_NAME ?? "",
      userName: process.env.DEV_USER_NAME ?? "",
      userPassword: process.env.DEV_USER_PASSWORD ?? ""
    }
  };

  constructor() {
    this.config = null;
    this.envTyp = (process.env.APP_ENVIRONMENT as envType) || envType.DEV;
  }

  static getConfigDatabaseHelperInstance(): ConfigDatabaseHelper {
    if (!this.instance) {
      this.instance = new ConfigDatabaseHelper();
      return new ConfigDatabaseHelper();
    }
    return this.instance;
  }

  public getConfigByEnv(): IConfigByEnvironment {
    if (this.config) return this.config;
    switch (this.envTyp) {
      case envType.DEV:
        this.config = this.devConfig;
        break;
      case envType.PRODUCTION:
        this.config = this.productionConfig;
        break;
      default:
        throw new Error(`Unknown environment type: ${this.envTyp}`);
    }
    return this.config;
  }
}

export const configDatabaseHelper =
  ConfigDatabaseHelper.getConfigDatabaseHelperInstance();
