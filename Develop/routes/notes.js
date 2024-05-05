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
//Are tile and text provided?
    if (!title || !text) {
        console.error('Title and text are required')
    }

    if (title && text) {
        const newNote = {
            id: uuidv4(),
            title,
            text
        };

         readAndAppend(newNote, 'C:/Users/sambo/bootcamp/ExpressNoteTaker/Develop/db/db.json')
            res.json('Note aded successfully')   
            
    } else {
        console.err('Error ading note', err)
       } 
})

module.exports = router;