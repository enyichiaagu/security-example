import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import express from 'express';
import helmet from 'helmet';

const PORT = 3000;

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
};

const app = express();

app.use(helmet());

function checkLoggedIn(req, res, next) {
  const isLoggedIn = true; // TODO

  if (!isLoggedIn) {
    res.status(401).json({
      error: 'You must log in!',
    });
  }
  next();
}

app.get('/auth/google', (req, res) => {});

app.get('/auth/google/callback', (req, res) => {});

app.get('/auth/logout', (req, res) => {});

app.get('/secret', checkLoggedIn, (req, res) => {
  return res.send('Your personal secret value is 42!');
});

app.get('/', (req, res) => {
  return res.sendFile(path.join(import.meta.dirname, 'public', 'index.html'));
});

https
  .createServer(
    {
      key: fs.readFileSync('key.pem'),
      cert: fs.readFileSync('cert.pem'),
    },
    app
  )
  .listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
