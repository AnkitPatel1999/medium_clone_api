import { Router } from 'express';
import { getUser, updateUserDetails } from '../controllers/userController';
import { authByToken } from '../middleware/auth';

const route = Router();

route.patch('/', authByToken, async(req, res) => {
          
  try {
    const updatedUser = await updateUserDetails(req.body.user, (req as any).user.email)
    return res.status(201).json({ updatedUser })
  } catch (e) {
    return res.status(404).json({
      errors: { body: [ e.message ] }
    })
  }
})

// GET /user      get current user
route.get('/', authByToken, async (req, res) => {

    try {
      const user = await getUser((req as any).user.email)
      
      if (!user) throw new Error('No such user found')
      return res.status(200).json({user})
    } catch (e) {
      return res.status(404).json({
        errors: { body: [ e.message ] }
      })
    }
  
  })

export const userRoute = route
