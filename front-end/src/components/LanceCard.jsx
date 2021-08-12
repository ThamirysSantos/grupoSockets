import React, { useState, useEffect } from 'react';

import { Card, Button } from 'react-bootstrap';

import socket from '../utils/socket';
let test = 0; 
function LanceCard({ id, name, image, lances }) {
  const [currentLances, setCurrentLances] = useState(lances);

  const handleClick = () => {
    socket.emit('increaseLance', { id, name })
  }

  useEffect(() => {
    test++
    console.log(test);
    socket.on('refreshLance', (lances) => {
      lances._id === id && setCurrentLances(lances.lances)
    })
  }, [id])

  return (
    <Card>
      <Card.Img variant='top' style={{ width: '15vw', height: '15vh' }} src={image} />
      <Card.Title>
        {name}
      </Card.Title>
      <Card.Text>
        Valor: <span>{currentLances}</span>
      </Card.Text>
      <Button onClick={handleClick}>Dar Lance</Button>
    </Card>
  )
}

export default LanceCard;