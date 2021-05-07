import { NextFunction, Request, Response } from "express";
import { decode } from "../utils/jwt";


export async function authByToken(req: Request, res: Response, next: NextFunction) {
   
    //check is Authorization header exists
    const authHeader = req.header('Authorization')?.split(' ')    
    console.log("auth header == ",authHeader);
    
    if(!authHeader) return res.status(401).json({
        errors: { body: ['Authorization failed']}
    })

    //check is authorization type is token
    if(authHeader[0] != 'Token') return res.status(401).json({
        errors: { body: ['Authorization failed', 'Token mising']}
    })

    //check if token isvalid
    
    const token = authHeader[1];
    try {
        const user = await decode(token);
        if(!user) throw new Error("No user found in token");
        (res as any).user = user
        console.log("user ======= ", (res as any).user);
        
        return next();
    } catch (e) {
        return res.status(401).json({
            errors: { body: ['Authorization failed', e.message]}
        })
    }
}