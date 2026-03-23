import { sendToSolarWinds } from "../config/solarwinds.js";

export const loggerMiddleware = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const log = {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      time: Date.now() - start
    };

    console.log(log);
    sendToSolarWinds(log);
  });

  next();
};