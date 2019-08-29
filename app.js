let express = require('express');
let bodyParser = require('body-parser');
let app = express();

let db = [];

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static('images'));
app.use(express.static('css'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', function (req, res) {
    res.render('index.html');
});

app.get('/addtasks', function (req, res) {
    res.render('addtasks.html', {tasks: db.length}); 
});

app.post('/newtask', function (req, res) {
    let params = req.body;
    let newTask = {
        name: params.taskname,
        due: params.taskdue,
        description: params.taskdesc
    };

    db.push(newTask); 
    res.render('addtasks.html', {tasks: db.length}); 
});

app.get('/listtasks', function (req, res) {
    res.render('listtasks.html', {taskdb:db});
});

app.listen(8080);


