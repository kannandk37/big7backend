import { Request, Response, Router } from "express";
import { StatusCodes } from 'http-status-codes';
import { verifyToken } from "../../utils"
import { AuthenticatedRequest } from "../../utils"
import { UserManagement } from "../business"
import { userInfoToUserEntity } from "../router/transformer"

export const userRouter = Router();

userRouter.get(
    '/',
    verifyToken,
    async (request: AuthenticatedRequest, response: Response) => {
        try {
            let userManagement = new UserManagement();
            let users = await userManagement.users();
            let res = {
                data: users,
                message: "Users retrieved successfully."
            }
            response.status(StatusCodes.OK).send(res);
        } catch (error) {
            response.status(StatusCodes.EXPECTATION_FAILED).send("Error on fetching Users")
        }
    }
);

userRouter.post(
    '/',
    verifyToken,
    async (request: AuthenticatedRequest, response: Response) => {
        try {
            let userInfo = request.body
            let user = userInfoToUserEntity(userInfo)
            let userManagement = new UserManagement();
            let persistedUser = await userManagement.persistUser(user);
            let res = {
                data: persistedUser,
                message: "User created successfully"
            }
            response.status(StatusCodes.CREATED).send(res);
        } catch (error) {
            response.status(StatusCodes.EXPECTATION_FAILED).send("Error on creating Users")
        }
    }
);

userRouter.put(
    '/:id',
    verifyToken,
    async (request: AuthenticatedRequest, response: Response) => {
        try {
            let userInfo = request.body
            let id = request.params.id

            let user = userInfoToUserEntity(userInfo)
            let userManagement = new UserManagement();
            await userManagement.updateUserById(id, user);
            let updatedUser = await userManagement.userById(id);
            let res = {
                data: updatedUser,
                message: "User information updated successfully"
            }
            response.status(StatusCodes.OK).send(res);
        } catch (error) {
            response.status(StatusCodes.EXPECTATION_FAILED).send("Error on updating Users")
        }
    }
);

userRouter.delete(
    '/:id',
    verifyToken,
    async (request: AuthenticatedRequest, response: Response) => {
        try {
            let userManagement = new UserManagement();
            let id = request.params.id
            await userManagement.deleteUserById(id)
            response.status(StatusCodes.OK).send("User deleted successfully");
        } catch (error) {
            response.status(StatusCodes.EXPECTATION_FAILED).send("Error on fetching Users")
        }
    }
);

userRouter.get(
    '/:id',
    verifyToken,
    async (request: AuthenticatedRequest, response: Response) => {
        try {
            let id = request.params.id
            let userManagement = new UserManagement();
            let user = await userManagement.userById(id);
            let res = {
                data: user,
                message: "User retrieved successfully"
            }
            response.status(StatusCodes.OK).send(res);
        } catch (error) {
            response.status(StatusCodes.EXPECTATION_FAILED).send("Error on fetching Users")
        }
    }
);