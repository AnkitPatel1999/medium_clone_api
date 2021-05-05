import jwt from 'jsonwebtoken';
import { User } from '../entities/User';

const JWT_SECRET = "this is secret code";

export async function sign(user: User): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        jwt.sign({
            username: user.username,
            email: user.email
        },JWT_SECRET, (err, encoded) => {
            if(err) return reject(err)
            else resolve(encoded as string)
        })
    })     
}

export async function decode(token: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (err, decode) => {
            if(err) return reject(err)
            else return resolve(decode)
        })
    })
}