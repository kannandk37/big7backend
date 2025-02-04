import { User } from "../../entity";

export function usersEntityToUsersRecord(usersEntity: User[]) {
    let users = usersEntity.map((user, index) => {
        let userModel = new User(null, null, null, null, null, null)
        userModel.id = user.id
        return userModel
    })
    return users
}

export function userRecordsToUserEntities(userRecords: any[]) {
    let users: User[] = [];
    userRecords.forEach(element => {
        let user = userRecordToUserEntity(element)
        users.push(user)
    });
    return users
}

export function userRecordToUserEntity(userRecord: any) {
    let user = new User(null, null, null, null, null, null)
    if (userRecord.id) {
        user.id = userRecord.id
    }
    if (userRecord.name) {
        user.name = userRecord.name
    }
    if (userRecord.email) {
        user.email = userRecord.email
    }
    if (userRecord.role) {
        user.role = userRecord.role
    }
    if (userRecord.password) {
        user.password = userRecord.password
    }
    if (userRecord.created_at) {
        user.created_at = userRecord.created_at
    }
    return user
}