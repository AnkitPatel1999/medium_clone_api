import { Router } from "express";
import { createArticle, deleteArticle,  getAllArticles, getArticleBySlug, updateArticle ,getSlugById } from "../controllers/articleController";
import { authByToken } from "../middleware/auth";

const route = Router();

//route.param('slug', getSlugById)

//GET /api/articles     list(all) article
route.get('/articles' , async (req, res) => {
    try {
        const articles = await getAllArticles();
        return res.status(201).json({ articles })
        
    } catch (e) {
        return res.status(422).json({
            errors: { body:['article not available', e.message]}
        })
    }
})

//GET /api/articles/feed    list articles
route.get('/feed', authByToken, async (req, res) => {

})

//GET /api/articles/:slug   get a simple article
route.get('/articles/:slug', async (req, res) => {
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
route.patch('/articles/:slug' , authByToken, async (req, res) => {
    console.log("auth user xxxxxxxxxxxxxxxxxxxxxxxxxxx = > ",(req as any).user.email);
    
    try {
        const updatedArticle = await updateArticle(req.params.slug, req.body.article)
        return res.status(201).json({ updatedArticle })
    } catch (e) {
        return res.status(422).json({
            errors: { body:['article updation unsuccessful', e.message]}
        })
    }
})

//DELETE /api/articles/:slug    delete an article
route.delete('/articles/:slug', authByToken, async (req, res) => {
    try {
        const deletedArticle = await deleteArticle(req.params.slug);
        return res.status(200).json("Deletion successful");
    } catch (e) {
        return res.status(422).json({
            errors: { body:['article deletion unsuccessful', e.message]}
        })
    }
})


export const articleRoute = route;