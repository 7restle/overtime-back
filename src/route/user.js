import { Router } from 'express';
import { Container } from 'typedi';

const route = Router();

export default ({ app }) => {
    app.use('/user', route);
    
    route.get('/:userid', (req, res) => {
        const conn = Container.get('query');
        const result = conn.query(`select * from users where id = "${req.params.userid}"`);
    });
}