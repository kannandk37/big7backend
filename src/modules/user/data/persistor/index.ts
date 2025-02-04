import { userRecordsToUserEntities, userRecordToUserEntity } from '../transformer';
import { User } from "../../entity";
import { db } from '../../../../dbconfig/db';
import { users } from '../schema'
import { eq } from "drizzle-orm";

export class UserPersistor {

    async users(): Promise<User[]> {
        return new Promise(async (resolve, reject) => {
            try {
                let userRecords = await db.select().from(users);
                let usersList = userRecordsToUserEntities(userRecords)
                resolve(usersList)
            } catch (error) {
                reject(error)
            }
        })
    }

    async userById(id: string): Promise<User> {
        return new Promise(async (resolve, reject) => {
            try {
                let userRecord = await db.select().from(users).where(eq(users.id, id));
                let updatedUser = userRecordToUserEntity(userRecord[0])
                resolve(updatedUser);
            } catch (error) {
                reject(error)
            }
        })
    }

    async userByEmail(email: string): Promise<User> {
        return new Promise(async (resolve, reject) => {
            try {
                let userRecord = await db.select().from(users).where(eq(users.email, email));
                if (userRecord[0]) {
                    let updatedUser = userRecordToUserEntity(userRecord[0])
                    resolve(updatedUser);
                } else {
                    let updatedUser = userRecordToUserEntity({})
                    resolve(updatedUser);
                }
            } catch (error) {
                reject(error)
            }
        })
    }

    async persistUser(user: User): Promise<User> {
        return new Promise(async (resolve, reject) => {
            try {
                let userRecord = await db.insert(users).values({ name: user.name, email: user.email, role: user.role, password: user.password }).returning();
                let persistedUser = userRecordToUserEntity(userRecord[0])
                resolve(persistedUser);
            } catch (error) {
                reject(error)
            }
        })
    }

    async updateUserById(user: User, id: string) {
        return new Promise(async (resolve, reject) => {
            try {
                let updates: { name?: string, email?: string, role?: string, password?: string } = {};
                if (user.name) {
                    updates.name = user.name
                }
                if (user.email) {
                    updates.email = user.email
                }
                if (user.role) {
                    updates.role = user.role
                }
                if (user.password) {
                    updates.password = user.password
                }
                await db.update(users).set(updates).where(eq(users.id, id)).returning();
                resolve(true);
            } catch (error) {
                reject(error)
            }
        })
    }

    async deleteUserById(id: string) {
        return new Promise(async (resolve, reject) => {
            try {
                await db.delete(users).where(eq(users.id, id));
                resolve(true);
            } catch (error) {
                reject(error)
            }
        })
    }
}