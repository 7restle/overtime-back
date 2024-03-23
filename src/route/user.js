import { Router } from 'express';
import { Container } from 'typedi';

const route = Router();

export default ({ app }) => {
    app.use('/user', route);
    
    route.get('/', (req, res) => {
        const conn = Container.get('query');
        const result = conn.query("select * from users where uid = {0}",
        req.params.uid);
    });
}