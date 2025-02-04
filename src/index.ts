import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();
import express, { Application, NextFunction, Request, Response } from "express";
import { userRouter } from "./modules/user/router"
import { db } from "./dbconfig/db"
import { StatusCodes } from "http-status-codes/build/cjs";
import { userInfoToUserEntity } from "./modules/user/router/transformer";
import { UserManagement } from "./modules/user/business";

const app: Application = express();
const port: number = parseInt(process.env.PORT as string, 10) || 3000;
app.use(express.json());
app.use(cors());

app.use(function (req: Request, res: Response, next: NextFunction) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

db.$client.connect().then(() => {
    console.log("Database connected")
}).catch((error: any) => {
    console.log("Error on connectiong to Database")
});

const requestLogger = (
    request: Request,
    response: Response,
    next: NextFunction) => {

    console.log(`${request.method} url:: ${request.baseUrl}${request.url}`);
    next()
}

const errorLogger = (error: Error, request: Request, response: Response, next: NextFunction) => {
    console.log(`error on calling url:: ${request.baseUrl}${request.url}`);
}

app.use(requestLogger)

app.get(
    "/api",
    async (request: Request, response: Response) => {
        response.json({ info: "Welcome to Back-end" });
    }
);

app.post(
    '/login',
    async (request: Request, response: Response) => {
        try {
            let userInfo = request.body;
            let user = userInfoToUserEntity(userInfo);
            let userManagement = new UserManagement()
            let result = await userManagement.login(user);
            response.status(StatusCodes.OK).send(result)
        } catch (error) {
            response.status(StatusCodes.EXPECTATION_FAILED).send("unable to log in")
        }
    }
)

app.post(
    '/signin',
    async (request: Request, response: Response) => {
        try {
            let userInfo = request.body;
            let user = userInfoToUserEntity(userInfo);
            let userManagement = new UserManagement()
            let result = await userManagement.signUp(user);
            response.status(StatusCodes.OK).send(result)
        } catch (error) {
            response.status(StatusCodes.EXPECTATION_FAILED).send("unable to sign up")
        }
    }
)

app.use("/api/users", userRouter);

app.use(errorLogger);


try {
    app.listen(port, () => {
        console.log(`App is running on port http://localhost:${port}/`);
    });
} catch (error: any) {
    console.log(`Error occurred: ${error.message}`)
}
