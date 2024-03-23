import { Router } from 'express';
import { Container } from 'typedi';

const route = Router();

export default async (app) => {
    app.use('/group', route);

    route.get('/get/:groupid', async (req, res) => {
        const conn = Container.get('query');
        const result = await conn.query(`select * from families where gid = ${req.params.groupid}", req.params.groupid`);
        res.status(200).json(result[0]);
    });

    route.get('/list/:userid', async (req, res) => {
        const conn = Container.get('query');
        const result = await conn.query(`select * from families where gid in (select gid from groupmember where uid = "${req.params.userid}")`);
        const groups = [];
        console.log(result);
        for (let i = 0; i < result.length; i++) {
            groups.push({
                gid: result[i].gid,
                title: result[i].groupname,
                imageUri: result[i].profile
            });
        }
        res.status(200).json({groups});
    });
}