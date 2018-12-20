import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";

const app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(8080);
