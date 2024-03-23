import express from 'express';
import { Router } from 'express';
import { Container } from 'typedi';
import multer from 'multer';
import fs from 'fs';

const route = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/etc/overtime'); //파일 저장 경로
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); //파일 이름
    }
})

const upload = multer({ storage : storage, limits: { fileSize: 100 * 1024 * 1024 } })

export default async (app) => {
    app.use('/upload', route);

    route.post('/:group', upload.single('img'), async (req, res) => {
        const file = req.file;
        if (!file) {
            res.status(400).send('No file uploaded.');
            return;
        }
        const conn = Container.get('query');
        const result = await conn.query(`insert into posts (gid, uid, picture, body, date) values (${req.params.group}, "test", "/etc/overtime/${file.filename}", "${req.body.text}", ${new Date().getTime()});`);
        console.log(result);
        res.status(201).json(file);
    });
}