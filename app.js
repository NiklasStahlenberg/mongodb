let express = require("express");
let bodyParser = require("body-parser");
let path = require("path");
let mongoose = require("mongoose");

//Anslutning till databas
mongoose.connect("mongodb+srv://dbStalbert:Apas2k22@mongotesting-etfg1.mongodb.net/test?retryWrites=true&w=majority", {dbName: 'myCV', useNewUrlParser: true, useUnifiedTopology: true});

// Läsa in schema
let Course = require("./models/courses");

//instans av express
let app = express();

//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//middlewear för connection
app.all('/*', function (req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
    next();
})

//Skapa en ny post till databas
app.post("/api/courses/add", function(req, res){
    //instans av courses
    let course = new Course();

    //objekt av course
    course.Coursecode = req.body.Coursecode;
    course.Coursename = req.body.Coursename;
    course.Progression = req.body.Progression;

    //Spara kurs
    course.save(function(error){
        if(error){
            res.send(error);
        }
    });
    //redirect till startsida
    res.redirect("/");

});



//Statisk sökväg
app.use(express.static(path.join(__dirname, 'public')));

//get courses
app.get("/api/courses", function(req, res) {    
    Course.find(function(err, Course){
        if(err){
            res.send(err);
        }

        res.json(Course);
    });
})

//get one course
app.get("/api/courses/:id", (req, res) => {
    //set itemId to the id in  the request
    let itemId = req.params.id; 
    
    //search for matching record in database
    Course.find({
        _id: itemId
    }, function(err, Course){
        if(err){
            res.send(err);
        }
        
        res.json(Course);
    });
    
});

//delete a course
app.delete("/api/courses/delete/:id", (req, res) => {
    let deleleteId = req.params.id;
    Course.deleteOne({
        _id: deleleteId
    }, function(err, Course){
        if(err){
            res.send(err);
        }

        res.json({ message: "Kurs med id " + deleleteId + " raderad."});
    });
    
});

//Port för anslutningen
let port = 3000;

//Starta server
app.listen(port, function(){
    console.log("Server lyssnar på port " + port);
})



