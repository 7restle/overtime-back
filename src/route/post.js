import { Router } from 'express';
import { Container } from 'typedi';

const route = Router();

export default async (app) => {
    app.use('/post', route);

    route.get('/get/:postid', async (req, res) => {
        const conn = Container.get('query');
        const result = await conn.query(`select * from posts where id = ${req.params.postid};`);
        console.log(result);
        res.status(200).json(result);
    });

    route.post('/list/:group', async (req, res) => {
        const conn = Container.get('query');
        if (req.body.pointtime == 0) {
            req.body.pointtime = new Date().getTime();
        }
        const result = await conn.query(`select * from posts where gid = ${req.params.group} and date < ${req.body.pointtime} order by date desc limit ${req.body.count};`);
        console.log(result);
        const posts = [];
        for (let i = 0; i < result.length; i++) {
            posts.push({
                imagepath: result[i].picture,
                text: result[i].body,
            });
        }
        if (posts.length > 0) {
            req.body.pointtime = result[posts.length - 1].date;
        }
        res.status(200).json({
            posts: posts,
            pointtime: req.body.pointtime
        });
    });

    route.get('timeline/:group', (req, res) => {
        const conn = Container.get('query');
        const result = conn.query(`select date from posts where gid = ${req.params.group} order by date desc`);
        const timeline = [];
        for (let i = 0; i < result.length; i++) {
            timeline.push(result[i].date);
        }
        res.status(200).json({timeline: timeline});
    });
}
