export default class Query {
    constructor(connection) {
        this.connection = connection;
    }
    async query(sql) {
        console.log('Query: ', sql);
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                }
                console.log('Result: ', result);
                resolve(result);
            });
        });
    }
}