// to search by id in mongo db
const ObjectID = require('mongodb').ObjectID;


var manageNotes = function(app, db) {
	//get all collections
	app.get('/notes',(req, res) => {
		//Get all documents from db
		db.collection('notes').find().toArray((err, notes) => {
			if(notes) {
				res.send(notes);
			} else {
				res.send(false);
			}
		});
	});
	// add a new a note
	app.post('/notes',(req, res) => {
		//form an object to add in db
		const note = {title: req.body.title, text: req.body.text, author: req.body.author};
		db.collection('notes').insert(note, (err, result) => {
			if(err) {
				res.send({'error':'An error has occurred'});
			} else {
				res.send(result.ops[0]);
			}
		});
	});

	// get an exact document from collection
	app.get('/notes/:id',(req, res) => {
		const details = {'_id': new ObjectID(req.params.id)};
		db.collection('notes').findOne(details, (err,item) => {
			if(err) {
				res.send({'error': 'An error has occured'});
			} else {
				res.send(item);
			}
		});
	});
	// update the note
	app.put('/notes/:id',(req, res) => {
		const details = {'_id': new ObjectID(req.params.id)};
		const note = {title: req.body.title, text: req.body.text, author: req.body.author};
		db.collection('notes').update(details, note, (err, result) => {
			if(err) {
				res.send({'error': 'An error has occurred'});
			} else {
				res.send(note);
			}
		});
	});
	// delete the note
	app.delete('/notes/:id',(req, res) => {
		const details = {'_id': new ObjectID(req.params.id)};
		db.collection('notes').remove(details, (err,item) => {
			if(err) {
				res.send({'error': 'An error has occured'});
			} else {
				res.send('Note '+req.params.id+' deleted!');
			}
		});
	});
}

//export manageNotes module
module.exports = manageNotes;