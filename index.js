require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// connect mongoDB
mongoose
	.connect(process.env.MONGO_DB, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false
	})
	.then((res) => {
		console.log('connected to MongoDB cluster');
	})
	.catch((error) => {
		console.log(error)
		console.log('can not connect database');
	});

// express config
const express = require('express');
const app = express();
const port = process.env.PORT || 6868;

// config third party moudules
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));

app.use('/seller', require('./routers/SellerRouter'));
app.use('/customer', require('./routers/CustomerRouter'));
app.use('/product', require('./routers/ProductRouter'));
app.use('/rating', require('./routers/RatingRouter'));
app.use('/like', require('./routers/LikeRouter'));
app.use('/order', require('./routers/OrderRouter'));
app.use('/comment', require('./routers/CommentRouter'));
app.use('/upload', require('./routers/FileUplpoad'))

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With', 'Content-Type', 'Accept', 'Authorization');
	if (req.method === 'OPTIONS') {
		req.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next();
});

app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});