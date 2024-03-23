import express from 'express';
import mysql from 'mysql';
import config from '../../config/index.js';
import expressloader from './express.js';
import dependencyInjector from './dependencyInjector.js';

export default async ({ expressApp }) => {
    const connection = mysql.createConnection({
      host: config.db.host,
      user: config.db.user,
      password: config.db.password,
      database: config.db.database,
    });
    console.log('Database Intialized');

    dependencyInjector({connection});
    console.log('Dependency Injector Intialized');

    expressloader({app: expressApp});
    console.log('Express Intialized');
}
