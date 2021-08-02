const dbport = process.env.ARCUSDBIP || '127.0.0.1';
const dbname = process.env.ARCUSDBNAME || 'testdb';

module.exports = {
    url: `mongodb://${dbport}/${dbname}`,
    user: '',
    pass: ''
}