import React, { useState } from 'react';
import './AcheterBillets.css';

function AcheterBillets() {
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    cardHolder: '',
    expirationDate: '',
    cvv: '',
  });

  const handleCardInfoChange = (e) => {
    const { name, value } = e.target;
    setCardInfo((prevCardInfo) => ({
      ...prevCardInfo,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Envoyer les données de la carte bancaire via une requête POST
    fetch(`http://localhost:8080/ticket/id/buy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cardInfo),
    })
      .then((response) => {
        if (response.ok) {
         
          console.log('Billets achetés avec succès!');
        } else {
          
          console.error('Erreur lors de l\'achat des billets');
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la requête d\'achat :', error);
      });
  };

  return (
    <div>
      <h1>Acheter des Billets</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="cardNumber" className="form-label">Numéro de Carte</label>
          <input
            type="text"
            className="form-control"
            id="cardNumber"
            name="cardNumber"
            value={cardInfo.cardNumber}
            onChange={handleCardInfoChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cardHolder" className="form-label">Titulaire de la Carte</label>
          <input
            type="text"
            className="form-control"
            id="cardHolder"
            name="cardHolder"
            value={cardInfo.cardHolder}
            onChange={handleCardInfoChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="expirationDate" className="form-label">Date d'Expiration</label>
          <input
            type="text"
            className="form-control"
            id="expirationDate"
            name="expirationDate"
            value={cardInfo.expirationDate}
            onChange={handleCardInfoChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cvv" className="form-label">CVV</label>
          <input
            type="text"
            className="form-control"
            id="cvv"
            name="cvv"
            value={cardInfo.cvv}
            onChange={handleCardInfoChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Acheter</button>
      </form>
    </div>
  );
}

export default AcheterBillets;
