import { User } from "../../entity"

export function userInfoToUserEntity(userInfo: any) {
    let user = new User(null, null, null, null, null, null)
    if (userInfo.id) {
        user.id = userInfo.id
    }
    if (userInfo.name) {
        user.name = userInfo.name
    }
    if (userInfo.email) {
        user.email = userInfo.email
    }
    if (userInfo.role) {
        user.role = userInfo.role
    }
    if (userInfo.password) {
        user.password = userInfo.password
    }
    if (userInfo.created_at) {
        user.created_at = userInfo.created_at
    }
    return user
}
