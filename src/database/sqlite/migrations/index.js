const sqliteConnection = require('../../sqlite')

const createUsers = require('./createUsers');
const movieNotes = require('./movieNotes')

async function migrationsRun(){
    const schemas = [
        createUsers,
        movieNotes
    ].join(';\n');

    sqliteConnection()
    .then(db => db.exec(schemas))
    .catch(error => console.error(error));
}

module.exports = migrationsRun;