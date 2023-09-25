import React, { useState, useEffect } from 'react';
import './Tickets.css';

const authToken = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqdW5haWQudGFsYWF0MTk5MEBnbWFpbC5jb20iLCJpYXQiOjE2OTU2NjE2MDgsImV4cCI6MTY5NTc0ODAwOH0.yHdEM-YVraPdEw14mr6DWaXNPyT5eCrhcGRFPgoIlDI';

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
    const authenticationEndpoint = 'http://localhost:8080/tickets';

    fetch(authenticationEndpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authToken,
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
    setNewTicket({
      eventName: ticket.eventName,
      eventDate: ticket.eventDate,
      price: ticket.price,
      details: ticket.details,
      state: ticket.state,
    });
  };

  const handleDelete = (ticket) => {
    fetch(`http://localhost:8080/tickets/${ticket.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': authToken,
      },
    })
      .then(() => {
        const updatedTickets = tickets.filter((t) => t.id !== ticket.id);
        setTickets(updatedTickets);
        setEditingTicket(null);
      })
      .catch((error) => console.error('Erreur lors de la suppression du billet :', error));
  };

  const handleSave = (editedTicket) => {
    fetch(`http://localhost:8080/tickets/${editedTicket.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authToken,
      },
      body: JSON.stringify(newTicket),
    })
      .then(() => {
        const updatedTickets = tickets.map((t) => (t.id === editedTicket.id ? newTicket : t));
        setTickets(updatedTickets);
        setEditingTicket(null);
      })
      .catch((error) => console.error('Erreur lors de la mise à jour du billet :', error));
  };
  const handleAcheter = (ticket) => {
    // Use window.location.href to navigate to the "/AcheterBillets" URL
    window.location.href = '/AcheterBillets';
  };
  

  const handleInputChange = (e, ticket, field) => {
    const newValue = e.target.value;
    setNewTicket((prevNewTicket) => ({
      ...prevNewTicket,
      [field]: newValue,
    }));
  };

  const handleCreate = () => {
    fetch('http://localhost:8080/tickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authToken,
      },
      body: JSON.stringify(newTicket),
    })
      .then(() => {
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
            <th>Acheter des Billets</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>
                {editingTicket === ticket ? (
                  <input
                    type="text"
                    value={newTicket.eventName}
                    onChange={(e) => handleInputChange(e, ticket, 'eventName')}
                  />
                ) : (
                  ticket.eventName
                )}
              </td>
              <td>
                {editingTicket === ticket ? (
                  <input
                    type="text"
                    value={newTicket.eventDate}
                    onChange={(e) => handleInputChange(e, ticket, 'eventDate')}
                  />
                ) : (
                  new Date(ticket.eventDate).toLocaleDateString()
                )}
              </td>
              <td>
                {editingTicket === ticket ? (
                  <input
                    type="text"
                    value={newTicket.price}
                    onChange={(e) => handleInputChange(e, ticket, 'price')}
                  />
                ) : (
                  ticket.price
                )}
              </td>
              <td>
                {editingTicket === ticket ? (
                  <input
                    type="text"
                    value={newTicket.details}
                    onChange={(e) => handleInputChange(e, ticket, 'details')}
                  />
                ) : (
                  ticket.details
                )}
              </td>
              <td>
                {editingTicket === ticket ? (
                  <input
                    type="text"
                    value={newTicket.state}
                    onChange={(e) => handleInputChange(e, ticket, 'state')}
                  />
                ) : (
                  ticket.state
                )}
              </td>
              <td>
                {editingTicket === ticket ? (
                  <button onClick={() => handleSave(ticket)}>Enregistrer</button>
                ) : (
                  <>
                    <button onClick={() => handleEdit(ticket)}>Éditer</button>
                    <button onClick={() => handleDelete(ticket)}>Supprimer</button>
                    <button onClick={() => handleAcheter(ticket)}>Acheter des Billets</button>
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
