import React, { useState } from 'react';

export default function Recherche() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    // Effectuez une requête GET à l'endpoint pour récupérer les billets
    const fetchEndpoint = 'http://localhost:8080/users/tickets';

    fetch(fetchEndpoint)
      .then((response) => {
        if (response.ok) {
          return response.json().then((data) => {
            // Stockez les résultats de la recherche dans l'état
            setSearchResults(data.billets); // Assurez-vous que les billets sont correctement extraits de la réponse.
            setErrorMessage('');
          });
        } else {
          throw new Error('Erreur lors de la recherche');
        }
      })
      .catch((error) => {
        console.error('Erreur :', error.message);
        setSearchResults([]);
        setErrorMessage('Une erreur s\'est produite lors de la recherche');
      });
  };

  return (
    <div className="p-1 m-1">
      <div className="card">
        <div className="card-body">
          <h3>  Tickets </h3>
          <div className="form-group">
            <label htmlFor="search"> find your ticket </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Entrez un terme de recherche"
            />
            <button type="button" onClick={handleSearch} className="search-button">
              Find now 
            </button>
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
        {/* Affichez les résultats de la recherche */}
        {searchResults.length > 0 && (
          <div className="search-results">
            <h3>Résultats de la recherche :</h3>
            <ul>
              {searchResults.map((result) => (
                <li key={result.id}>{result.title}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
