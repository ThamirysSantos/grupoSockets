const express = require('express');
const http = require('http');
const app = express();
const cors = require('cors');
const LancesController = require('./controller/Lances');
const ioVotes = require('./socket/lances');

const httpServer = http.createServer(app);

const PORT = 3001;

app.use(cors());

const io = require('socket.io')(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    method: ['GET', 'POST']
  }
});

ioVotes(io);


app.use('/lances', LancesController);

app.get('/', (req, res) => res.send('Hello World!'));

httpServer.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
