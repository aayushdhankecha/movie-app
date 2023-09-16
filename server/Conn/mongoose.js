const mongoose = require('mongoose');

const Mongo = async () => {
    const URL='mongodb+srv://aayushdhankecha:Aayush@cluster0.blrzywc.mongodb.net/movie-app?retryWrites=true&w=majority'
    mongoose.set('strictQuery', true);
    await mongoose.connect(URL)
        .then(() => console.log("done..."))
        .catch((err) => console.log(err));
}

module.exports = Mongo;