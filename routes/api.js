const notes = require('express').Router();
const {readAndAppend, readAndDelete, fs } = require('../helpers/utils.js');
const { v4: uuid } = require('uuid');
const db = require('../db/db.json');
notes.get('/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        }
        res.json(JSON.parse(data));
    }
    );
}
);
notes.get('/notes/:id', (req, res)  => {
    const noteId = req.params.id;
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        }
        const parsedData = JSON.parse(data);
        const foundNote = parsedData.find(note => note.id === noteId);
        res.json(foundNote);
    }
    );
});
notes.post('/notes', async (req, res) => {
    try {
        const { title, text } = req.body;
        if (req.body) {
            const newNote = {
                title,
                text,
                id: uuid()
            };
        await readAndAppend(newNote, './db/db.json');
            res.json('Note added');
        } else {
            res.error('Error in adding note');
        }
    }
    catch (err) {
        console.log(err);
    }
});
notes.delete('/notes/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await readAndDelete(id, './db/db.json');
        res.json('Note deleted');
    }
    catch (err) {
        console.log(err);
    }
});
module.exports = notes;
