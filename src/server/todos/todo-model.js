/**
 * Created by nahuelcabrera on 05/04/17.
 */
//Import the mongoose module
const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const TodoSchema = new Schema(
    {
        label: String,
        complete: Boolean
    }
);


module.exports = mongoose.model('Todo', TodoSchema);