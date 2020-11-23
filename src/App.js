import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min );
}
const emojis = {
  1:  '🤯',
  2:  '🥶',
  3:  '😡',
  5:  '🥳',
  5:  '😘',
  6:  '👾',
  7:  '🤓',
  8:  '😂',
  9:  '🤠',
  10: '🤖',
};



function App() {
  
  const [ repositories, setRepositories ] = useState([]);

  useEffect( () => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  },[]);

  async function handleAddRepository() {
    const random = getRandomNumber(0, 9);

    const response = await api.post('repositories', {
      title: `repositorio: ${emojis[random]}`,
      url: 'https://github.com/mateus-brites/2-Deafio-React',
      techs: ['ReactJS', 'React Native']
    });

    const repositorie = response.data;

    setRepositories([...repositories, repositorie]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const newRepositorie = repositories.filter(idRepository => idRepository.id !== id);
    setRepositories(newRepositorie);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
           <li key={repository.id}>
           { repository.title }
 
           <button onClick={() => handleRemoveRepository(repository.id)}>
             Remover
           </button>
         </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
