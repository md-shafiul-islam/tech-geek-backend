import { DataSource } from "typeorm";
import { dbConnectionOption } from ".";

const AppDataSource = new DataSource(dbConnectionOption());

AppDataSource.initialize()
  .then(() => {
    console.log("DB Connection ");
  })
  .catch((err) => {
    console.log("Connection Error, ", err);
  });

export { AppDataSource };
