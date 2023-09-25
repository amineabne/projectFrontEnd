import React from 'react';
import './Home.css';

const Home = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Havefun Tickets</h1>
        <p>Découvrez nos offres spéciales !</p>
      </div>

      <div className="home-card">
        <div className="card-body">
          <h3>Revendez et achetez des vrais billets à un prix juste</h3>
          <p>Havefun Tickets travaille avec les organisateurs afin de sécuriser l'achat et la revente de billets.</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="home-help">
        <p>Besoin d'aide ? Contactez-nous à <a href="mailto:support@havefuntickets.com">support@havefuntickets.com</a></p>
      </div>
    </div>
  );
};

export default Home;
