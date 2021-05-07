import { Router } from "express";
import { createArticle, getArticleBySlug } from "../controllers/articleController";
import { authByToken } from "../middleware/auth";

const route = Router();

//route.param('slug', getSlugById)

//GET /api/articles     list article
route.get('/' , async (req, res) => {

})

//GET /api/articles/feed    list articles
route.get('/feed', authByToken, async (req, res) => {

})

//GET /api/articles/:slug   get a simple article
route.get('/:slug', async (req, res) => {
    try {
        const article = await getArticleBySlug(req.params.slug)    
        return res.status(201).json({ article})
    } catch (e) {
        return res.status(422).json({
            errors: { body:['article not present with this slug', e.message]}
        })
    }
})

//POST /api/articles    create an article
route.post('/articles' , authByToken, async (req, res) => {
    try {
        const article = await createArticle(req.body.article, (req as any).user.email)
        return res.status(201).json({ article})
    } catch (e) {
        return res.status(422).json({
            errors: { body:['could not create article', e.message]}
        })
    }
})

//PATCH /api/articles/:slug     update an article
route.patch('/:slug' , authByToken, async (req, res) => {

})

//DELETE /api/articles/:slug    delete an article
route.delete('/:slug', async (req, res) => {

})


export const articleRoute = route;