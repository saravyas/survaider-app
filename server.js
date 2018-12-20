import express from "express";
import bodyParser from "body-parser";
import router from "./routes";
import logger from "morgan";
import path from "path";

const app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/users", router);
app.use(express.static(path.join(__dirname, "modules")));

app.listen(8080);
