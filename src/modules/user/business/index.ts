import { User } from "../entity";
import { UserPersistor } from "../data/persistor";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export class UserManagement {

    async signUp(user: User) {
        return new Promise(async (resolve, reject) => {
            try {
                let existingUser = await this.userByEmail(user.email);
                if (existingUser.id) {
                    return reject("Email Exists");
                } else {
                    let encryptPassword = await bcrypt.hash(user.password, 10)
                    user.password = encryptPassword
                    let userPersistor = new UserPersistor();
                    let persistedUser = await userPersistor.persistUser(user);
                    persistedUser = await this.userById(persistedUser.id);
                    let token = await this.generateToken(persistedUser);
                    return resolve({ user: persistedUser, token: token })
                }
            } catch (error) {
                reject(error)
            }
        })
    }

    async login(user: User) {
        return new Promise(async (resolve, reject) => {
            try {
                let existingUser = await this.userByEmail(user.email);
                if (existingUser) {
                    let isPasswordMatch = bcrypt.compareSync(user.password, existingUser.password);
                    if (!isPasswordMatch) {
                        return reject("Invalid Password");
                    };
                    let token = await this.generateToken(existingUser)
                    return resolve({ user: existingUser, token: token })
                } else {
                    return reject("Email not found");
                }
            } catch (error) {
                reject(error)
            }
        })
    }
    async users() {
        return new Promise(async (resolve, reject) => {
            try {
                let userPersistor = new UserPersistor();
                let users = await userPersistor.users();
                if (users.length > 0) {
                    for await (const user of users) {
                        user.profilePic = `https://picsum.photos/seed/${user.id}/200/300`
                    }
                }
                resolve(users)
            } catch (error) {
                reject(error)
            }
        });
    }

    async userById(id: string): Promise<User> {
        return new Promise(async (resolve, reject) => {
            try {
                let userPersistor = new UserPersistor();
                let user = await userPersistor.userById(id);
                user.profilePic = `https://picsum.photos/seed/${id}/200/300`
                resolve(user)
            } catch (error) {
                reject(error);
            }
        })
    }

    async userByEmail(email: string): Promise<User> {
        return new Promise(async (resolve, reject) => {
            try {
                let userPersistor = new UserPersistor();
                let user = await userPersistor.userByEmail(email);
                if (user?.id) {
                    user.profilePic = `https://picsum.photos/seed/${user.id}/200/300`
                    resolve(user)
                } else {
                    resolve(user)
                }
            } catch (error) {
                reject(error);
            }
        })
    }

    async persistUser(user: User): Promise<User> {
        return new Promise(async (resolve, reject) => {
            try {
                let userPersistor = new UserPersistor();
                if (user.password) {
                    user.password = await bcrypt.hash(user.password, 10);
                }
                let persistedUser = await userPersistor.persistUser(user);
                persistedUser = await this.userById(persistedUser.id);
                resolve(persistedUser)
            } catch (error) {
                reject(error);
            }
        })
    }

    async updateUserById(id: string, user: User) {
        return new Promise(async (resolve, reject) => {
            try {
                let userPersistor = new UserPersistor();
                if (user.password) {
                    user.password = await bcrypt.hash(user.password, 10);
                }
                let persistedUser = await userPersistor.updateUserById(user, id);
                persistedUser = await this.userById(id);
                resolve(persistedUser)
            } catch (error) {
                reject(error);
            }
        })
    }

    async deleteUserById(id: string) {
        return new Promise(async (resolve, reject) => {
            try {
                let userPersistor = new UserPersistor();
                await userPersistor.deleteUserById(id);
                resolve(true)
            } catch (error) {
                reject(error);
            }
        })
    }

    async generateToken(user: User): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                let token = jwt.sign(
                    { id: user.id, email: user.email, role: user.role }, process.env.SECRET_KEY, { expiresIn: "8h" }
                );
                resolve(token);
            } catch (error) {
                reject(error);
            };
        });
    };
}