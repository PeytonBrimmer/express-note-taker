const express = require('express');
const api = require('./routes/api.js');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use(express.static('public'));
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
