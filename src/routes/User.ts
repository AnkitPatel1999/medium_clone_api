import { Router } from 'express';
import { createUser } from '../controllers/userController';

const route = Router();

route.post('/user', async (req, res) => {
    try {
        const user = await createUser({
            username: req.body.username,
            email: req.body.email,
            password : req.body.password
        })
        return res.status(201).json({user});

    } catch (err) {
        return res.status(422).json({
            errors: { body: ['could not create user', err.message]}
        })
        
    }
});


export const userRoute = route
