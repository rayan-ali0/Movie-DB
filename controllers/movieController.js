const movieModel = require("../models/movie")

module.exports = {

    get: async (req, res) => {
        try {
            const movies = await movieModel.find();
            res.status(200).json(movies);
        }
        catch (error) {
            res.status(404).json({ status: 404, error })
        }

    },

    getByOrder: async (req, res) => {
        let orderedMovies;
        try {
            req.params.order === "by-date" ?
                orderedMovies = await movieModel.find().sort({ year: 1 }) :
                req.params.order === "by-rating" ?
                    orderedMovies = await movieModel.find().sort({ rating: 1 }) :
                    req.params.order === "by-title" ?
                        orderedMovies = await movieModel.find().sort({ title: 1 }) :
                        res.status(400).json({ message: "Choose another option" });
            res.status(200).json({ status: 200, orderedMovies });

        }
        catch (error) {
            res.status(404).json({ error })
        }




    },
    getById: async (req, res) => {
        let id = req.params.ID;
        try {
            const movie = await movieModel.findById(id);
            if (!movie) {
                res.status(404).json({ status: 404, error: "movie not found" })
            }
            res.status(200).json(movie);
        }
        catch (error) {
            res.status(404).json({ status: 404, error })
        }

    },
    add: async (req, res) => {
        let { title, year, rating } = req.query;
        try {
            const newMovie = await movieModel.create({ title, year, rating });
            res.status(200).json(newMovie);
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },
    deleteById: async (req, res) => {
        try {
            let { ID } = req.params;
            const deletedMovie = await movieModel.findByIdAndDelete(ID);
            if (!deletedMovie) {
               return res.status(404).json({ status: 404, error: "Movie not found" })
            }
            let movies= await movieModel.find();
            return res.status(200).json({ status: 200, data: deletedMovie })
        }
        catch (error) {
           return res.json({ error: error.message })
        }

    },
    editById: async (req, res) => {
        let { ID } = req.params;
        let { title, year, rating } = req.query;
        try {
            const editedMovie = await movieModel.findByIdAndUpdate(ID, { title, year, rating }, { new: true });
            if (!editedMovie) {
                res.status(404).json({ status: 404, error: "Movie not found" })
            }
            res.status(200).json({ status: 200, data: editedMovie })
        }
        catch (error) {
            res.json({ error })
        }
    }



}
