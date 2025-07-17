const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const computers = require('./data/computers');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    console.log('Body:', req.body);
  }
  next();
});

const USERS_FILE = path.join(__dirname, 'data', 'users.json');
const COMPUTERS_FILE = path.join(__dirname, 'data', 'computers.json')

app.post('/api/login', (req, res) => {
  const {username, password } = req.body;

  const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.json({ success: true, message: 'Login successful!', user: {id: user.id, username: user.username}})
    console.log(user)
  } else {
    res.status(401).json({success: false, message: 'Invalid credentials'});
  }
})


app.get('/api/computers', (req, res) => {
  try {
    const data = fs.readFileSync(COMPUTERS_FILE, 'utf8');
    const computers = JSON.parse(data);
    res.json(computers)
  } catch {
    res.status(500).json({message: 'Failed to load computers'})
  }
})

app.post('/api/computers', (req, res) => {
  const newComputer = req.body;

  try {
    const data = fs.readFileSync(COMPUTERS_FILE, 'utf8');
    const computers = JSON.parse(data);

    const newId = Date.now();
    const computerToAdd = {id: newId, ...newComputer};

    computers.push(computerToAdd);

    fs.writeFileSync(COMPUTERS_FILE, JSON.stringify(computers, null, 2));
    res.status(201).json(computerToAdd)

  } catch(error) {
    res.status(500).json({message: 'Failed to save computer'})
  }
})


app.listen(PORT, () => {
  console.log(`Server radi na http://localhost:${PORT}`);
});
