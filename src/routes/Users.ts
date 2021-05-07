import { Router } from 'express';
import { createUser, loginUser } from '../controllers/userController';

const route = Router();

route.post('/users/login', async (req, res) => {

    try {
        const user = await loginUser(req.body.user)
        return res.status(200).json({user})
    } catch (error) {
        return res.status(422).json({
            errors: {body: ['Login failed', error.message]}
        })
    }
})

route.post('/users', async (req, res) => {
    try {
        const user = await createUser(req.body.user)
        return res.status(201).json({user});

    } catch (err) {
        return res.status(422).json({
            errors: { body: ['could not create user', err.message]}
        })
    }
});

export const usersRoute = route
