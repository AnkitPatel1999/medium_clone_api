import express from 'express';
import { createConnection } from 'typeorm';
import { Article } from './entities/Article';
import { User } from './entities/User';
import { userRoute } from './routes/User';

const app = express();
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.use('/api', userRoute)

async function start() {
    await createConnection({
        type: 'postgres',
        username: 'conduit',
        password: 'conduit',
        database: 'conduit',
        entities: [ Article, User ],
        synchronize: true,
        dropSchema: true, // it create new db(old one delete) every time we start server
        logging: true,
        logger: 'advanced-console'
    })
    app.listen(3232, () => {
        console.log('Server started on http://localhost:3232');
    })
}
start();

