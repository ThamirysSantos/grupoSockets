import React, { useState, useEffect } from 'react';

import { CardDeck } from 'react-bootstrap';

import LanceCard from '../components/LanceCard';
import socket from '../utils/socket';
const MAX_VALUE = 100

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [chosen, setChosen] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:3001/lances')
      .then(response => response.json())
      .then(langs => {
        setLanguages(langs)
        setIsLoading(false)
        const chosenLang = langs.find(lan => lan.votes >= MAX_VALUE)
        setChosen(chosenLang)
      });
    socket.on('finish', (lang) => setChosen(lang))

  }, []);

  if (isLoading) return <h2>Carregando...</h2>

  return (
    <div>
      <h1> Escolha sua linguagem preferir</h1>
      {chosen && <LanceCard
        id={chosen._id}
        key={chosen._id}
        name={chosen.name}
        image={chosen.image}
        votes={chosen.votes}
      />}
      {!chosen && <CardDeck style={{ display: 'flex' }}>
        {languages.map(
          ({ _id, image, name, votes }) => (
            <LanceCard
              id={_id}
              key={_id}
              name={name}
              image={image}
              votes={votes}
            />
          )
        )}
      </CardDeck>}
    </div>
  )
}

export default Home;
