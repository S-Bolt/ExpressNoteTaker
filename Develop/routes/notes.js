const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

//get route to fetch notes
router.get('/', (req, res) => {
    readFromFile('./db.json')
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

        readAndAppend(newNote, './db.json')
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

})

module.exports = router;