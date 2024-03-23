import dotenv from 'dotenv';

dotenv.config();
export default {
    port: process.env.PORT,
    db: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    },
    jwtSecret: process.env.JWT_SECRET,
    jwtAlgorithm: process.env.JWT_ALGORITHM,
    api: {
        prefix: '/'
    }
}