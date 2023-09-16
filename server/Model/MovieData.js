const mongoose = require('mongoose');

const MovieDataSchema = mongoose.Schema({
    Title: {
        type: String
    },
    Year: {
        type: String
    },
    imdbID: {
        type: String
    },
    Type: {
        type: String
    },
    Poster: {
        type: String
    }
})

const MovieData = mongoose.model('MovieData', MovieDataSchema);

module.exports = MovieData;