import React, { useState, useEffect } from 'react';

function Tickets() {
  
  const [tickets, setTickets] = useState([]);


  useEffect(() => {
    // URL de l'endpoint
    const authenticationEndpoint = 'http://localhost:8080/tickets';

    //Utilisation de fetch pour envoyer la requête 'GET' 
    fetch(authenticationEndpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqdW5haWQudGFsYWF0MTk5MEBnbWFpbC5jb20iLCJpYXQiOjE2OTUxMTgyMjAsImV4cCI6MTY5NTIwNDYyMH0.OToOG0PYx0eNlZYsq_2jxnCLftGWW1_oHMa78UAxLCE'
      },
    })
      .then((response) => {
        console.log("ok") ;
        
        if (response.ok) {
          console.log("ok")
          return response.json().then((data) => {
            const { token } = data;
            localStorage.setItem('jwtToken', token);
            
          console.log("ok")
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

  return (

      <div>
        <h1> Tickets available </h1>
        <ul>
          {tickets.map((ticket) => (
            <li key={ticket.id}>
              <strong>Event Name:</strong> {ticket.eventName}<br />
              <strong>Event Date:</strong> {new Date(ticket.eventDate).toLocaleDateString()}<br />
              <strong>Price:</strong> {ticket.price}<br />
              <strong>Details:</strong> {ticket.details}<br />
              <strong>State:</strong> {ticket.state}<br />
            </li>
          ))}
        </ul>
      </div>
    );
}


//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleSearch = () => {
//     // Effectuez une requête GET à l'endpoint pour récupérer les billets
//     const fetchEndpoint = 'http://localhost:8080/users/tickets';

//     fetch(fetchEndpoint)
//       .then((response) => {
//         if (response.ok) {
//           return response.json().then((data) => {
//             // Stockez les résultats de la recherche dans l'état
//             setSearchResults(data.billets); // Assurez-vous que les billets sont correctement extraits de la réponse.
//             setErrorMessage('');
//           });
//         } else {
//           throw new Error('Erreur lors de la recherche');
//         }
//       })
//       .catch((error) => {
//         console.error('Erreur :', error.message);
//         setSearchResults([]);
//         setErrorMessage('Une erreur s\'est produite lors de la recherche');
//       });
//   };

//   return (
//     <div className="p-1 m-1">
//       <div className="card">
//         <div className="card-body">
//           <h3>Billets</h3>
//           <div className="form-group">
//             <label htmlFor="search">Rechercher des billets :</label>
//             <input
//               type="text"
//               id="search"
//               value={searchTerm}
//               onChange={handleSearchChange}
//               placeholder="Entrez un terme de recherche"
//             />
//             <button type="button" onClick={handleSearch} className="search-button">
//               Rechercher
//             </button>
//           </div>
//           {errorMessage && <div className="error-message">{errorMessage}</div>}
//         </div>
//         {/* Affichez les résultats de la recherche */}
//         {searchResults.length > 0 && (
//           <div className="search-results">
//             <h3>Résultats de la recherche :</h3>
//             <ul>
//               {searchResults.map((result) => (
//                 <li key={result.id}>{result.title}</li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
//  }
export default Tickets ;
