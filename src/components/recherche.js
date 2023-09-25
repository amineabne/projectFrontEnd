import React, { useState, useEffect } from 'react';
import'./recherche.css';

export default function Recherche() {
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  const handleSearch = () => {
    // Effectuez une requête GET à l'endpoint pour récupérer les billets avec des paramètres de filtre
    const fetchEndpoint = `http://localhost:8080/tickets?title=${searchTerm}&eventStartDate=${startDate}&eventEndDate=${endDate}&priceMin=${minPrice}&priceMax=${maxPrice}`;

    fetch(fetchEndpoint)
      .then((response) => {
        if (response.ok) {
          return response.json().then((data) => {
            // Stockez les résultats de la recherche dans l'état
            setSearchResults(data);
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
          <h3>Tickets</h3>
          <div className="form-group">
            <label htmlFor="search">Nom de l'événement</label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Entrez un terme de recherche"
            />
          </div>
          <div className="form-group">
            <label>Date de début</label>
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
            />
          </div>
          <div className="form-group">
            <label>Date de fin</label>
            <input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
            />
          </div>
          <div className="form-group">
            <label>Prix minimum</label>
            <input
              type="number"
              value={minPrice}
              onChange={handleMinPriceChange}
            />
          </div>
          <div className="form-group">
            <label>Prix maximum</label>
            <input
              type="number"
              value={maxPrice}
              onChange={handleMaxPriceChange}
            />
          </div>
          <button type="button" onClick={handleSearch} className="search-button">
            Rechercher
          </button>
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
