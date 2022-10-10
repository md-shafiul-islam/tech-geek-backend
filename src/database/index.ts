import { DataSourceOptions } from "typeorm";

export const dbConnectionOption = ():DataSourceOptions => {
  // console.log("__dirname, ", __dirname + "/../model/*{.js,.ts}");
  return {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "njha9dd3mal0ma8g",
    password: "01725^*^)@(Sa",
    database: "tech_geek",
    logging: false,
    synchronize: true,
    entities: [__dirname + "/../model/*{.js,.ts}"],
  };
};


