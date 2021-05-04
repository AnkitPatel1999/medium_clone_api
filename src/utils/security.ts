import { User } from "../entities/User";

export function senitizeFields(user: User) {
    if(user.password) delete user.password
    return user

}