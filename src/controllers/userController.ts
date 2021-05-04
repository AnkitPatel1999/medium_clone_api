import { getRepository } from "typeorm";
import { User } from "../entities/User";
import { hashPassword } from "../utils/password";
import { senitizeFields } from "../utils/security";

interface userdata {
    username: string,
    email: string,
    password: string,
}
export async function createUser(data: userdata) {

    if(!data.username) throw new Error("username is blank")
    if(!data.email) throw new Error("email is blank")
    if(!data.password) throw new Error("password is blank")

    console.log("dd  ",data);
    

    try {
        const user = new User();
        user.username = data.username
        user.email = data.email
        user.password = await hashPassword(data.password)
        user.bio = 'null'

        await getRepository(User).insert(user);

        senitizeFields(user);

        return user;
    } catch( e ) {
        console.error(e);
        throw e;
        
    }
}