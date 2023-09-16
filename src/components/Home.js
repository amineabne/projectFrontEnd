import React from 'react';
import { useSpring, animated, config } from 'react-spring';
import './Home.css';


const logout = () => {
  localStorage.clear();
  window.location.reload();
};

function Home() {
  const headerAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(-20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: config.default,
    delay: 200,
  });

  const cardAnimation = useSpring({
    from: { opacity: 0, transform: 'scale(0.8)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: config.stiff,
    delay: 400,
  });

  return (
    <div className="container">
      <animated.div className="header" style={headerAnimation}>
        <h1>Havefun Tickets</h1>
        <p>Découvrez nos offres spéciales !</p>
      
      </animated.div>

      <div className="content">
        <animated.div className="card" style={cardAnimation}>
          <div className="card-body">
            <h3>Revendez et achetez des vrais billets à un prix juste</h3>
            <p>Havefun Tickets travaille avec les organisateurs afin de sécuriser l'achat et la revente de billets.</p>
            <button onClick={logout}>Logout</button>
          </div>
        </animated.div>

        <div className="help">
          <p>Besoin d'aide ? Contactez-nous à support@havefuntickets.com</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
