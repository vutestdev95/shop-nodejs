import express, { json } from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import { instanceDB } from "~/dbs/init.mongo";
import { checkConnectHelper } from "~/helpers/check.connect";

export const app = express();

//init middlewares
app.use(morgan("common"));
app.use(json());
app.use(helmet());
app.use(compression());

//init routers
app.get("/", (req, res, next) => {
  res.status(200).json({
    data: true,
    message: String("Hello World").repeat(1000000)
  });
});

//init DB
instanceDB
  .connectDataBase()
  .then(() => {
    console.log("Init Instance DB Success");
  })
  .catch((e) => {
    console.error(e);
  });
checkConnectHelper.checkOverLoad();

//handle errors
