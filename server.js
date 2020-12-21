var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var pgp = require('pg-promise')();


let dbConfig = {
	host: 'localhost',
	port: 5432,
	database: 'final_db', 
	user: 'postgres',  
	password: 'postgres' 
};

const isProduction = process.env.NODE_ENV === 'production';
dbConfig = isProduction ? process.env.DATABASE_URL : dbConfig;
let db = pgp(dbConfig);




app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));


app.get('/', function(req, res) {
	res.render('pages/main',{ 
		local_css:"final.css", 
		my_title:"Home"
	});
});

app.get('/main', function(req, res) {
	res.render('pages/main',{
		local_css:"final.css",
		my_title:"Home"
	});
});

app.get('/reviews', function(req, res) {
	var query = 'select * from reviews;';
	db.any(query)
		.then(function(rows) {
			res.render('pages/reviews',{
				local_css:"final.css",
				my_title: "Book Reviews",
				reviews: rows
			})
		})
		.catch(err => {
			req.flash('error', err);
			res.render('pages/reviews', {
				local_css:"final.css",
				title: 'Book Reviews',
				reviews: '',
			})
		});
});

app.post('/main/add_review', function(req, res) {
	var title = req.body.book_title;
	var review = req.body.input_review;
	var insert = `INSERT INTO reviews(book_title, review) values('${title}','${review}');`;
	var select = 'select * from reviews;';
	db.task('get-everything', task => {
        return task.batch([
            task.any(insert),
            task.any(select)
        ]);
    })
	.then(info => {
		res.render('pages/reviews',{
			local_css:"final.css",
			my_title: "Home",
			reviews: info[1]
		})
	})
	.catch(err => {
		req.flash('error', err);
		res.render('pages/main', {
			local_css:"final.css",
			title: 'Home',
			reviews: ''
		})
	});
});


const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
	console.log(`Express running → PORT ${server.address().port}`);
});
