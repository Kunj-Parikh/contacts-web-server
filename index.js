let contacts = [
    { id: 1, name: "John Doe", email: "john@example.com"},
    { id: 2, name: "Jane Smith", email: "jane@example.com"},
    { id: 3, name: "Bob Johnson", email: "bob@example.com"},
];

const express = require("express");
const cors = require("cors");
const port = 3001;

const app = express();

app.use(express.json());
app.use(cors({origin: "http://localhost:5173"}));

app.get('/api/contacts', (req, res) => {
    res.json(contacts);
});

app.get('/api/info', (req, res) => {
    res.send(`<p>Contacts Web Server</p><br><p>${contacts.length}</p>`)
});

app.get('/api/contacts/:id', (req, res) => {
    let foundContact = contacts.find(contact => contact.id == req.params.id);
    if(foundContact) res.json(foundContact);
    else res.status(404).json({err: "Invalid contact ID"});
});

app.delete('/api/contacts/:id', (req, res) => {
    let foundContact = contacts.find(contact => contact.id == req.params.id);
    if(foundContact) {
        contacts = contacts.filter(contact => contact.id != req.params.id);
        res.status(204).json({content: "Deleted"});
    }
    else {
        res.status(404).json({err: "Contact not found"});
    }
});

app.post('/api/contacts', (req, res) => {
    const {name, email} = req.body;
    if(!name) {
        res.status(400).json({err: "No name given"});
        return;
    }
    else if(!email) {
        res.status(400).json({err: "No email given"});
        return;
    }
    else {
        const foundEmail = contacts.find(contact => contact.email === email);
        if(foundEmail) {
            return res.status(409).json({err: "Email already exists"});
        }
        else {
            const uniqueId = parseInt(Date.now()*Math.random());
            const postContact = {
                id: uniqueId,
                name,
                email,
            };
            contacts.push(postContact);
            return res.status(201).json(postContact);
        }
    }
});

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});