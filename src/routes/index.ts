import { Application, Express, Request, Response } from "express";
import { brandRoute } from "./brand.route";
import { categoryRoute } from "./category.route";
import { initialsRoute } from "./initials.route";
import { metaRoute } from "./metadata.route";
import { newsRoute } from "./news.route";
import { postRoute } from "./post.route";
import { productRoute } from "./product.route";
import { ratingRoute } from "./rating.route";
import { reviewRoute } from "./review.route";
import { siteMapRoute } from "./sitemap.route";
import { specKeyRoute } from "./spec.key.route";
import { specTypeRoute } from "./spec.type.route";
import { specificationRoute } from "./specification.route";
import { userRoute } from "./user.route";

const userUrl = `/api/users`;
const categoryUrl = `/api/categories`;
const brandUrl = `/api/brands`;
const postUrl = `/api/posts`;
const productUrl = `/api/products`;
const ratingUrl = `/api/ratings`;
const reviewUrl = `/api/reviews`;
const specKeyUrl = `/api/specification-keys`;
const specTypeUrl = `/api/specification-types`;
const newsUrl = `/api/news`;
const specificationUrl = "/api/specifications";
const metaUrl = "/api/meta-datas";
const tagUrl = "/api/tags";
const intialsUrl = "/api/intials";

export default (app: Application) => {
  app.use(userUrl, userRoute);
  app.use(brandUrl, brandRoute);
  app.use(categoryUrl, categoryRoute);
  app.use(postUrl, postRoute);
  app.use(productUrl, productRoute);
  app.use(ratingUrl, ratingRoute);
  app.use(reviewUrl, reviewRoute);
  app.use(specKeyUrl, specKeyRoute);
  app.use(specTypeUrl, specTypeRoute);
  app.use(newsUrl, newsRoute);
  app.use(specificationUrl, specificationRoute);
  app.use(metaUrl, metaRoute);
  app.use(intialsUrl, initialsRoute);
  app.use(`/api/sitemap`, siteMapRoute);

  app.get("/", (req: Request, resp: Response) => {
    resp.sendStatus(200);
  });

  app.get("/healthCheck", (req: Request, resp: Response) => {
    resp.sendStatus(200);
  });
};
