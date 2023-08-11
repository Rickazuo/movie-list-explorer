const movieTags = `
CREATE TABLE IF NOT EXISTS movie_tags (
    id INTEGER,
    node_id INTEGER,
    user_id INTEGER,
    name VARCHAR,
    FOREIGN KEY (id) REFERENCES movies_notes(id) ON DELETE CASCADE
    FOREIGN KEY (note_id) REFERENCES movies_notes(id) ON DELETE CASCADE
    FOREIGN KEY (user_id) REFERENCES movies_notes(user_id) ON DELETE CASCADE
)
`;

module.exports = movieTags;