import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken'

export interface AuthenticatedRequest extends Request {
    user?: any;
}

export function verifyToken(request: AuthenticatedRequest, response: Response, next: NextFunction) {
    try {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            response.status(StatusCodes.UNAUTHORIZED).send("Authorization header is missing");
        };

        const token: string = authHeader.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY as string, function (err: any, decodedToken: any) {
            if (err) {
                throw err;
            };
            request.user = {
                id: decodedToken.id
            };
            console.log("decodedToken", decodedToken);
        });
        next();
    } catch (error) {
        response.status(StatusCodes.UNAUTHORIZED).send("Please Login in again");
    };
};