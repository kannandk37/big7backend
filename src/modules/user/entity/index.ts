
export class User {
    id?: string
    name: string
    email: string
    created_at: Date
    role: string
    password: string
    profilePic: string

    constructor(name: string, email: string, created_at: Date, role: string, password: string, profilePic?: string) {
        this.name = name
        this.email = email
        this.role = role
        this.password = password
        this.created_at = created_at
        this.profilePic = profilePic
    }
}