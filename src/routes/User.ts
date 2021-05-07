import { Router } from 'express';
import { createUser, getUser, loginUser } from '../controllers/userController';
import { authByToken } from '../middleware/auth';

const route = Router();

route.post('/login', async (req, res) => {

    try {
        const user = await loginUser(req.body)
        return res.status(200).json({user})
    } catch (error) {
        return res.status(422).json({
            errors: {body: ['Login failed', error.message]}
        })
    }
})

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

route.patch('/', async(req, res) => {

})

route.get('/', authByToken, async(req , res) => {
    console.log("xxxxxxxxxx=== ",(req as any).user);
    
    if((req as any).user) {
        const user = await getUser((req as any).user.email);
        return res.status(200).json({user})
    } else {
        return res.status(404).json({
            errors: { body: ['no such user found'] },
        })
    }
})


// GET /user      get current user
route.get('/getuser', authByToken, async (req, res) => {

    try {
      const user = await getUser((req as any).user.email)
      console.log("try user", user);
      
      if (!user) throw new Error('No such user found')
      return res.status(200).json({user})
    } catch (e) {
      return res.status(404).json({
        errors: { body: [ e.message ] }
      })
    }
  
  })

export const userRoute = route
