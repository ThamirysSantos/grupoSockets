const LancesModel = require('../model/Lances');
const MAX_VALUE = 100;

function ioLances(io) {
  io.on('connection', (socket) => {
    socket.on('increaseLances', async(data) => {
      console.log('socket.listeners():', socket.listeners('increaseLances')[0])
      await LancesModel.increaseLances(data.id)
      const lance = await LancesModel.getById(data.id);
      if(lance.lances >= MAX_VALUE) {
        return io.emit('finish', lance); // aqui enviava undefined
      } 
        io.emit('refreshLances', lance);

    })
  })
}

module.exports = ioLances;
