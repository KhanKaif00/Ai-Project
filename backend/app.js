import express from 'express';
import morgan from 'morgan';
import connect from "./db/db.js"
import userRoutes from './routes/user.routes.js'

const app = express();

connect();


app.use(morgan('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.use('/users',userRoutes)


export default app;