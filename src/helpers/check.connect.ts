import mongoose from "mongoose";
import { IHelper } from "~/interfaces/helper.type";
import * as os from "node:os";

const _InterValCheckOverLoad = 5000;

export class CheckConnectHelper implements IHelper {
  private static instance: CheckConnectHelper;
  private intervalId: NodeJS.Timeout | null = null;

  static getInstance(): CheckConnectHelper {
    if (!CheckConnectHelper.instance) {
      CheckConnectHelper.instance = new CheckConnectHelper();
    }
    return CheckConnectHelper.instance;
  }

  public countConnection(): number {
    return mongoose.connections.length;
  }

  public checkOverLoad(): void {
    if (this.intervalId) return;
    this.intervalId = setInterval(() => {
      const connection = this.countConnection();
      const numCores = os.cpus().length;
      const memoryUsage = process.memoryUsage.rss();
      const maxConnections = numCores * 5;
      console.log(`Total memory usage: ${memoryUsage / 1024 / 1024} MB`);
      console.log(`Number of connections: ${connection}`);
      if (connection > maxConnections) {
        console.warn(`Connection overload detected: ${this.countConnection()}`);
      }
    }, _InterValCheckOverLoad);
  }
}

export const checkConnectHelper = CheckConnectHelper.getInstance();
