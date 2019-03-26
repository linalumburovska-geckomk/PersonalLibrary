const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const booksSchema = new Schema({
    title: String,
    comments: [String]
});


const ModelClass = mongoose.model('booksSchema', booksSchema);

module.exports = ModelClass;