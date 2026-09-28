import express from "express";
import db from "./database/db.js";
import usersRouter from "./routes/usersRouter.js"

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.use("/users", usersRouter);

app.listen(3000, () => {
    console.log("server running port: http://localhost:3000")
})