import { getRepository } from "typeorm";
import { User } from "../entities/User";
import { sign } from "../utils/jwt";
import { hashPassword } from "../utils/password";
import { senitizeFields } from "../utils/security";

interface userdata {
    username: string,
    email: string,
    password: string,
}
export async function createUser(data: userdata) {
    
    //check for data validation
    if(!data.username) throw new Error("username is blank")
    if(!data.email) throw new Error("email is blank")
    if(!data.password) throw new Error("password is blank")

    const repo = await getRepository(User)

    // Check if user exists
    const userExist = await repo.findOne(data.email)
  
    if (userExist) throw new Error("User with this email exists")
    
    //create user and send back
    try {
        const user = new User();
        user.username = data.username
        user.email = data.email
        user.password = await hashPassword(data.password)
        user.bio = 'null'

        await getRepository(User).insert(user);

        senitizeFields(user);
        user.token = await sign(user);

        return user;
    } catch( e ) {
        console.error(e);
        throw e;
        
    }
    
}