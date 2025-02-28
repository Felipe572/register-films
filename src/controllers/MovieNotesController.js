const knex = require("../database/knex");

class MovieNotesController {
    async  create(request, response) {
        const { title, description, rating } = request.body;
        const { user_id } = request.params;

        const [movieNotes_id] = await knex("movieNotes").insert({
            title,
            description,
            rating,
            user_id
        });

        response.json()

    }

    async show(request, response) {
        const { id } = request.params;

        const movieNotes = await knex("movieNotes").where({ id }).first();

        return response.json(movieNotes)
    }

    async delete(request, response) {
        const { id } = request.params;

        await knex("movieNotes").where({ id }).delete();

        return response.json();

    }
}

module.exports = MovieNotesController;