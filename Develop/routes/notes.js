const router = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../help/fsUtils.js');
const { v4: uuidv4 } = require('uuid');

console.log(readFromFile);

//get route to fetch notes
router.get('/', (req, res) => {
    //had to change to abloslute filepath.  Unsure why it wouldnt' work before?
    readFromFile('C:/Users/sambo/bootcamp/ExpressNoteTaker/Develop/db/db.json')
    .then((data) => res.json(JSON.parse(data)))
    .catch((err) => {
        console.error('Error reading file', err);
    });
})

//post request to add new note
router.post('/', (req, res) =>{
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            id: uuidv4(),
            title,
            text
        };

        readAndAppend(newNote, 'C:/Users/sambo/bootcamp/ExpressNoteTaker/Develop/db/db.json')
            .then(() =>{
                res.json('Note aded successfully');
            })
            .catch((err) => {
                console.err('Error ading note', err)
            })
    }
})

//delete request to delete by id
router.delete('/:id', (req, res) =>{
    const noteId = req.params.id;

    //reading db.json
    readFromFile('C:/Users/sambo/bootcamp/ExpressNoteTaker/Develop/db/db.json')
    .then((data) => {
        const notes = JSON.parse(data);
        const updatedNotes = notes.filter((note) => note.id !== noteId);

        if(notes.length === updatedNotes.length) {
            console.err('Note not found');
        }else {
            writeToFile('C:/Users/sambo/bootcamp/ExpressNoteTaker/Develop/db/db.json', updatedNotes)
            .then(() => {
                console.log('Note deleted')
            })
            .catch((err) =>{
                console.err('Error deleting note')
            })
        };
    });
});

module.exports = router;