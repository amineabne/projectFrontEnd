import React, { useState } from 'react';
import './VendreBillets.css';

function VendreBillets() {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolderName: '',
    expirationDate: '',
    cvv: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Vous pouvez gérer les données ici, par exemple, les envoyer à un serveur sécurisé.
    console.log('Données du formulaire :', formData);
  };

  return (
    <div>
      <h1>Formulaire de coordonnées bancaires</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="cardNumber">Numéro de carte :</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="cardHolderName">Nom du titulaire de la carte :</label>
          <input
            type="text"
            id="cardHolderName"
            name="cardHolderName"
            value={formData.cardHolderName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="expirationDate">Date d'expiration :</label>
          <input
            type="text"
            id="expirationDate"
            name="expirationDate"
            value={formData.expirationDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="cvv">CVV :</label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Valider</button>
      </form>
    </div>
  );
}

export default VendreBillets;
