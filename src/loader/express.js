import express from 'express';
import cors from 'cors';
import config from '../../config/index.js';
import routes from '../route/index.js';

export default ({ app }) => {
    app.enable('trust proxy');

    app.use(cors());

    app.use(express.json());

    app.use(config.api.prefix, routes(app));

    app.use('/resource', express.static('/etc/overtime'));

    app.use((req, res, next) => {
        const error = new Error('Not Found');
        error['status'] = 404;
        next(error);
    });

    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
          errors: {
            message: err.message
          }
        });
    });
}