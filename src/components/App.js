import React, { useState } from 'react';
import './style.css';

export default function App() {
  const [termo, setTermo] = useState('');

  const handleChange = (event) => {
    const valor = event.target.value;
    setTermo(valor);
    console.log(valor);
  };

  return (
    <div className="page">
      <div className="panel">
        <h1>Exibir uma lista de...</h1>

        <div className="input-wrap">
          <span className="search-icon">⌕</span>
          <input
            type="text"
            value={termo}
            onChange={handleChange}
            placeholder="Digite algo que deseja ver..."
            aria-label="Busca"
          />
        </div>

        <button type="button">OK</button>
      </div>
    </div>
  );
}