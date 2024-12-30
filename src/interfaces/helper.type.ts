interface DBHelper {
  countConnection: () => number;
  checkOverLoad: () => void;
}

export type IHelper = DBHelper;
