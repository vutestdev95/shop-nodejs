import mongoose from "mongoose";
import { IDatabase } from "~/interfaces/database.type";
import { checkConnectHelper } from "~/helpers/check.connect";
import { configDatabaseHelper } from "~/configs/config.database";

const {
  database: { userPassword, userName, dataBaseName }
} = configDatabaseHelper.getConfigByEnv();

const url = `mongodb+srv://${userName}:${userPassword}@shopdev-master.flagu.mongodb.net/?retryWrites=true&w=majority&appName=${dataBaseName}`;

export class DataBase implements IDatabase {
  private static instance: DataBase;
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  static getInstance(url: string): DataBase {
    if (!DataBase.instance) {
      DataBase.instance = new DataBase(url);
    }
    return DataBase.instance;
  }

  async connectDataBase(): Promise<void> {
    await mongoose
      .connect(this.url, {
        maxPoolSize: 50
      })
      .then(() => {
        console.log(
          `Connect to database success !!! ${checkConnectHelper.countConnection()}`
        );
      })
      .catch((e) => console.error(e));
  }
}

export const instanceDB = DataBase.getInstance(url);
