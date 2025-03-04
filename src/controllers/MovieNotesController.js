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

    async index(request, response) {
        const { title ,user_id, movie_tags } = request.query; 

        let  movieNotes; 

        if(movie_tags) {
            const filterMovieTags = movie_tags.split(',').map(tag => tag.trim());
            
            movieNotes = await knex("movie_tags")
                .select([
                    "movieNotes.id",
                    "movieNotes.title",
                    "movieNotes.user_id"
                ])
                .where("movieNotes.user_id", user_id)
                .where("movieNotes.title", `%${title}%`)
                .where("name", filterMovieTags)
                .innerJoin("movieNotes", "movieNotes.id", "movie_tags.movieNotes_id")
                .orderBy("movieNotes.title")
        } else {

            movieNotes = await knex("movieNotes")
            .where({ user_id })
            .whereLike("title", `%${title}%`)
            .orderBy("title");
        
        }

        const userTags = await knex("movie_tags").where({ user_id });
        const movieWithTags = movieNotes.map(note => {
            const movieNotesTags = userTags.filter(tag => tag.movieNotes_id);

            return {
                ...note,
                movieWithTags: movieNotesTags
            }
        }); 


        return response.json(movieWithTags);
    }
}

module.exports = MovieNotesController;