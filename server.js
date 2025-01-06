const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const config = require("./config.json");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(config.MONGODB_URI, {
});

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
});

const Contact = mongoose.model('Contact', contactSchema);

app.get('/api/contacts', async (req, res) => {
    const contacts = await Contact.find();
    res.json(contacts);
});

app.post('/api/contacts', async (req, res) => {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
});

app.put('/api/contacts/:id', async (req, res) => {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.json(contact);
});

app.delete('/api/contacts/:id', async (req, res) => {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});