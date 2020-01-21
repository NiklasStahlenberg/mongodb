/* schema för kurser */
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let courseSchema = new Schema({
    Coursecode: String,
    Coursename: String,
    Progression: String
});

module.exports = mongoose.model("Courses", courseSchema);