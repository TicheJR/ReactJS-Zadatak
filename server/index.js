const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const computers = require('./data/computers');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const USERS_FILE = path.join(__dirname, 'data', 'users.json');

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
      res.json(computers)
});


app.listen(PORT, () => {
  console.log(`Server radi na http://localhost:${PORT}`);
});
