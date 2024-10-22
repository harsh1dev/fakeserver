const express = require('express');
const { v4: uuidv4 } = require('uuid');


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


function generateAlphaId() {
    return uuidv4()
        .replace(/[0-9-]/g, '')
        .slice(0, 8)
        .toLowerCase();
}


const db = {};

app.post('/data', (req, res) => {
    const { data } = req.body;
    const id = generateAlphaId();
    db[id] = data;
    res.json({ "url": id });
});

app.get('/db/:id', (req, res) => {
    const id = req.params.id;
    if (id === "adminHarsh") {
        return res.json(db);
    }
    return res.json({ message: 'Access Denied' });
});



app.get('/url/:id', (req, res) => {
    const id = req.params.id;
    if (id) {
        if (db[id]) {
            return res.json(db[id]);
        }
        return res.json({ message: 'Invalid Url' });
    }
    return res.json({ message: 'Invalid Url' });
});



app.listen(PORT, () => console.log('listening on PORT', PORT));