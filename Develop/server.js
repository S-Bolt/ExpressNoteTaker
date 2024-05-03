const express = require('express');
const fs = require('fs');
const notesRoutes = require('./routes/notes')

const PORT = 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

//notes route
app.use('/api/notes', notesRoutes )

//start server
app.listen(PORT, () => {
    console.log('Server is up and running')
})