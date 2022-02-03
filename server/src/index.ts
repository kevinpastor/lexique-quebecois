import * as express from "express";
import { Request, Response, json } from "express"
import * as morgan from "morgan"

const app = express();
const port: number = 8080;

app.use(morgan("dev"))
    .use(json());

app.get("/api/v1/", (_, res): void => {
    res.send("Hello World!");
});

app.get("/api/v1/definitions/:label", (_: Request, res: Response): void => {
    res.send({
        id: "bjhabhiuadhbiu",
        label: "Gyu",
        definition: "Bon/beau. Peut être utiliser comme adjectif pour de la bouffe qui goûte bonne, ou pour une belle personne.",
        example: "Le poulet était tellement gyu!",
        author: "Kevin",
        timestamp: "2 février 2022" as any
    });
});

app.listen(port, (): void => {
    console.log(`Example app listening on port ${port}`);
});
