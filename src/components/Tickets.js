import React, { useState, useEffect } from 'react';
import './Tickets.css';
const authToken = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqdW5haWQudGFsYWF0MTk5MEBnbWFpbC5jb20iLCJpYXQiOjE2OTUxMTgyMjAsImV4cCI6MTY5NTIwNDYyMH0.OToOG0PYx0eNlZYsq_2jxnCLftGWW1_oHMa78UAxLCE';
function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [editingTicket, setEditingTicket] = useState(null);
  const [newTicket, setNewTicket] = useState({
    eventName: '',
    eventDate: '',
    price: '',
    details: '',
    state: '',
  });

  useEffect(() => {
    // URL de l'endpoint
    const authenticationEndpoint = 'http://localhost:8080/tickets';

    // Token d'authentification
    const authToken = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqdW5haWQudGFsYWF0MTk5MEBnbWFpbC5jb20iLCJpYXQiOjE2OTUxMTgyMjAsImV4cCI6MTY5NTIwNDYyMH0.OToOG0PYx0eNlZYsq_2jxnCLftGWW1_oHMa78UAxLCE';

    // Utilisation de fetch pour envoyer la requête 'GET' avec le token d'authentification
    fetch(authenticationEndpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authToken, // Ajoutez le token ici
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json().then((data) => {
            setTickets(data);
          });
        } else {
          throw new Error('Erreur lors de la récupération des billets');
        }
      })
      .catch((error) => {
        console.error('Erreur :', error.message);
      });
  }, []);

  const handleEdit = (ticket) => {
    setEditingTicket(ticket);
  };

  const handleDelete = (ticket) => {
    // Envoyer une requête DELETE à l'API pour supprimer le billet
    fetch(`http://localhost:8080/tickets/${ticket.id}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Après la suppression réussie, mettre à jour l'état local "tickets" en excluant le billet supprimé
        const updatedTickets = tickets.filter((t) => t.id !== ticket.id);
        setTickets(updatedTickets);
        setEditingTicket(null);
      })
      .catch((error) => console.error('Erreur lors de la suppression du billet :', error));
  };

  const handleSave = (editedTicket) => {
    // Envoyer une requête PUT à l'API pour mettre à jour le billet avec les données modifiées
    fetch(`http://localhost:8080/tickets/${editedTicket.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authToken, // N'oubliez pas d'ajouter le token ici aussi
      },
      body: JSON.stringify(editedTicket),
    })
      .then(() => {
        // Après la mise à jour réussie, mettre à jour l'état local "tickets" avec la nouvelle version du billet
        const updatedTickets = tickets.map((t) => (t.id === editedTicket.id ? editedTicket : t));
        setTickets(updatedTickets);
        setEditingTicket(null);
      })
      .catch((error) => console.error('Erreur lors de la mise à jour du billet :', error));
  };

  const handleCreate = () => {
    // Envoyer une requête POST à l'API pour créer un nouveau billet en utilisant les données de "newTicket"
    fetch('http://localhost:8080/tickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authToken, // Ajoutez le token ici
      },
      body: JSON.stringify(newTicket),
    })
      .then(() => {
        // Après la création réussie, mettre à jour l'état local "tickets" en ajoutant le nouveau billet
        fetch('http://localhost:8080/tickets')
          .then((response) => response.json())
          .then((data) => {
            setTickets(data);
            setNewTicket({
              eventName: '',
              eventDate: '',
              price: '',
              details: '',
              state: '',
            });
          })
          .catch((error) =>
            console.error('Erreur lors du chargement des billets après la création :', error)
          );
      })
      .catch((error) => console.error('Erreur lors de la création du billet :', error));
  };

  return (
    <div>
      <h1>Tickets disponibles</h1>
      <button onClick={handleCreate}>Créer un nouveau billet</button>
      <table>
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Event Date</th>
            <th>Price</th>
            <th>Details</th>
            <th>State</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.eventName}</td>
              <td>{new Date(ticket.eventDate).toLocaleDateString()}</td>
              <td>{ticket.price}</td>
              <td>{ticket.details}</td>
              <td>{ticket.state}</td>
              <td>
                {editingTicket === ticket ? (
                  <button onClick={() => handleSave(ticket)}>Enregistrer</button>
                ) : (
                  <>
                    <button onClick={() => handleEdit(ticket)}>Éditer</button>
                    <button onClick={() => handleDelete(ticket)}>Supprimer</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tickets;
