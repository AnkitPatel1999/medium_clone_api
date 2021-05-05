import { getRepository } from "typeorm";
import { User } from "../entities/User";
import { sign } from "../utils/jwt";
import { hashPassword, matchPassword } from "../utils/password";
import { senitizeFields } from "../utils/security";

interface userdata {
    username: string,
    email: string,
    password: string,
}

interface loginData {
    email: string,
    password: string,
}

export async function createUser(data: userdata) : Promise<User> {
    
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

export async function loginUser(data: loginData) : Promise<User>{
    //create data validation
    if(!data.email) throw new Error("email is blank");
    if(!data.password) throw new Error("password is blank");

    const repo = getRepository(User);

    //check if email is exists
    const user = await repo.findOne(data.email)

    if(!user) throw new Error("No user with this email id");

    //check is password matches
    const password = await matchPassword(user.password!, data.password);

    if(!password) throw new Error("wrong password")

    user.token = await sign(user);
    return senitizeFields(user)

}