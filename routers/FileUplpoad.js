const route = require('express').Router();
const fs = require('fs');

const multer = require('multer');
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads');
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + file.originalname);
	}
});

const upload = multer({ storage: storage });

route.post('/', upload.array('images', 12), (req, res) => {
	res.status(200).json({ 
        files: req.files.map(file => {
            return {...file, absolutePath: 'http://localhost:6868/' + file.path} 
        }) 
    });
});

route.post('/delete', (req, res) => {
	const {filepath} = req.body;
	console.log(typeof filepath);
	try {
		fs.unlink(filepath, function(error) {
			console.log(error);
		});
		return res.status(200).json({message: 'deleted success', success: true})
	} catch (e) {
		console.log(e);
		return res.status(200).json({message: 'deleted fail', success: false})
	}
});

module.exports = route;