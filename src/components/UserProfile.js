import React, { useState, useEffect } from 'react';
import Rating from './Rating';

function UserProfile() {
  const [userTickets, setUserTickets] = useState([]);
  
  const handleRateTicket = (ticketId, newRating) => {
    // Envoyer une requête POST pour enregistrer la note du ticket
    fetch(`http://localhost:8080/${ticketId}/rate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer VOTRE_TOKEN_D_AUTHENTIFICATION',
      },
      body: JSON.stringify({ rating: newRating }),
    })
      .then((response) => {
        if (response.ok) {
          console.log(`Ticket ${ticketId} noté avec succès !`);
        } else {
          console.error(`Erreur lors de la notation du ticket ${ticketId}`);
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la requête de notation :', error);
      });
  };

  useEffect(() => {
    // Envoyer une requête GET pour récupérer l'historique des achats/ventes de l'utilisateur
    fetch('http://localhost:8080/users/tickets', {
      method: 'GET',
      headers: {
        'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqdW5haWQudGFsYWF0MTk5MEBnbWFpbC5jb20iLCJpYXQiOjE2OTU2NjE2MDgsImV4cCI6MTY5NTc0ODAwOH0.yHdEM-YVraPdEw14mr6DWaXNPyT5eCrhcGRFPgoIlDI', // Assurez-vous d'ajouter le token d'authentification ici
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Erreur lors de la récupération de l\'historique');
        }
      })
      .then((data) => {
        setUserTickets(data);
      })
      .catch((error) => {
        console.error('Erreur :', error.message);
      });
  }, []);

  return (
    <div>
      <h1>Historique des Achats/Ventes</h1>
      <table>
        <thead>
          <tr>
            <th>ID du Billet</th>
            <th>Nom de l'Événement</th>
            <th>Date de l'Événement</th>
            <th>Prix</th>
            <th>Type (Achat/Vente)</th>
            <th>Noter</th> 
          </tr>
        </thead>
        <tbody>
          {userTickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.id}</td>
              <td>{ticket.eventName}</td>
              <td>{new Date(ticket.eventDate).toLocaleDateString()}</td>
              <td>{ticket.price}</td>
              <td>{ticket.type}</td>
              <td>
                <Rating onRate={(newRating) => handleRateTicket(ticket.id, newRating)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserProfile;
