const express = require('express');

const projectsRouter = require('./projects/projects-router.js');
const actionsRouter = require('./actions/actions-router.js')
const server = express();
server.use(express.json());
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
    res.send(`<h2>project api i guess</h2>`);
  });

server.use((err, req, res, next)=> { // eslint-disable-line
    console.log('said nope');
    res.status(err.status || 500).json({
      message: err.message,
    });
  });

module.exports = server;