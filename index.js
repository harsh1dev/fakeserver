const express = require('express');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');


const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));


function generateAlphaId() {
    return uuidv4()
        .replace(/[0-9-]/g, '')
        .slice(0, 8)
        .toLowerCase();
}

function formatJSON(jsonString) {
    try {
        const parsed = JSON.parse(jsonString);
        const formatted = JSON.stringify(parsed, null, 2);
        return formatted;
    } catch (error) {
        return null;
    }
}

const db = {};


app.post('/data', (req, res) => {
    const { data } = req.body;
    // const formatedData = formatJSON(data);
    // if (formatedData === null) {
    //     return res.status(400).json({ error: 'Invalid JSON data' });
    // }
    const id = generateAlphaId();
    db[id] = data;
    return res.json({ "url": id });
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