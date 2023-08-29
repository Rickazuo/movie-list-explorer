const sqliteConnection = require("../database/sqlite");
const AppError = require("../utils/AppError");

class MovieNotesController {
    async create(request, response){
        const {title, description, rating, user_id} = request.body

        const database = await sqliteConnection();
        const checkUserQuery = "SELECT * FROM movie_notes WHERE user_id = ? AND title = ?"
        const checkMoviesRegistered = await database.get(checkUserQuery, [user_id, title])

        if(checkMoviesRegistered){
            throw new AppError("Movie has already been registered")
        }

        await database.run("INSERT INTO movie_notes (title, description, rating, user_id) VALUES (?, ?, ?, ?)",[title, description, rating, user_id])
    
        return response.status(201).json();
    }


    async update(request, response) {
        const {title, description, rating} = request.body
        const {id} = request.params

        const database = await sqliteConnection();
        const movieNotes = await database.get("SELECT * FROM movie_notes WHERE id = (?)", [id])

        if(!movieNotes) {
            throw new AppError("The movie notes could not be found")
        }

        movieNotes.title = title ?? movieNotes.title
        movieNotes.description = description ?? movieNotes.description
        movieNotes.rating = rating ?? movieNotes.rating

        await database.run(`
        UPDATE movie_notes SET
        title = ?,
        description = ?,
        rating = ?,
        update_at = DATETIME('now')
        WHERE id = ?`,
        [movieNotes.title, movieNotes.description, movieNotes.rating, movieNotes]
        )

        return response.status(201).json()
    }
}

module.exports = MovieNotesController