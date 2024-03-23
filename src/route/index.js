import express, { Router } from 'express';
import auth from './auth.js';
import user from './user.js';
import post from './post.js';
import group from './group.js';

export default () => {
    const app = Router();

    post(app);
    group(app);
    return app;
}