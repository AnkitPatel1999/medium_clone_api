import { getRepository } from "typeorm";
import { Article } from "../entities/Article";
import { User } from "../entities/User";
import { senitizeFields } from "../utils/security";
import { slugify } from "../utils/stringutil";

interface ArticleData {
    title: string,
    description: string,
    body: string,
    tagList: string,
    author
}

interface ArticleUpdateData {
    slug: string
    title: string,
    description: string,
    body: string,
    tagList: string,
    author
}

export async function getSlugById(req, res, next, id) {
    const article = getRepository(Article);
    const slugData = await article.findOne(req.params.slug)
        .then((article) => {
            console.log("thisis ok======== ",article);
            req.article = slugData;
        })
        console.log("slugData ok======== ",article);

    next()
    
}

export async function createArticle(data: ArticleData, email: string): Promise<Article> {
    
    //data validation
    if(!data.title) throw new Error("title is blank")
    if(!data.description) throw new Error("description is blank")
    if(!data.body) throw new Error("body is blank")

    const articleRepo = getRepository(Article);
    const userRepo = getRepository(User);

    try {
        //Find out the author object
        const user = await userRepo.findOne(email);
        if(!user) throw new Error("No user")

        const article = await articleRepo.save(new Article(
            slugify(data.title),
            data.title,
            data.description,
            data.body,
            senitizeFields(user)
        ))

        return article;
        
    } catch (e) {
        throw e  
    }

}
 
export async function deleteArticle(slug: string) {
    const article = getRepository(Article);
    
    const articleExists = await article.findOne(slug);
    if(!articleExists) throw new Error("not deleted");

    const deletedArticle = await article.delete(slug)
    
    return deletedArticle;
    
}

export async function updateArticle(slug: string , data: ArticleUpdateData) {

    try {
        //Find out the author object

        const article = await getRepository(Article).findOne(slug);

        console.log("requested user xxxxxxxxxxxxxxxxxxxxxxxxxxx = > ",article);
    
        // data.slug = slugify(data.title)
        // getRepository(Article).merge(article!, data)
        // const result = getRepository(Article).save(article!);        
        //return result

        

        
    } catch (e) {
        throw e  
    }
}

export async function getAllArticles(){
   
    const article = await getRepository(Article)
    .createQueryBuilder("article").getMany();    
    return article
}

export async function getFeedArticles(email: string): Promise<Article[]> {
    return new Promise<Article[]>((resolve, reject) => {

    })
}

export async function getArticleBySlug(slug: string) {
    const article = getRepository(Article);
    console.log("article ",article);

    const slugData = await article.findOne(slug);

    console.log("slugData ",slugData);
    
    if(!slugData) throw new Error("Not such article available")

    return slugData;
        
}
