import React from 'react'

const logout =()=>{
  localStorage.clear()
  window.location.reload()
}

function Home() {
  return (
    
    <div className="container">
      <div className="alert alert-info">
  Bienvenue sur Havefun Tickets. Découvrez nos offres spéciales !
</div>

  


    <div className="p-1 m-1 ">
         <div className="card">
         <div className="card-body">
          <h1>Havefun Tickets </h1>
         

            <h3>Revendez et achetez des vrais billets
à un prix juste
Havefun Tickets travaille avec les organisateurs afin de
 sécuriser l'achat et la revente de billets  </h3>
 <div>
            <h1>Home Page</h1>
            <button onClick={logout}>Logout</button>
        </div>

</div>

<div>
  <p>Besoin d'aide ? Contactez-nous à support@havefuntickets.com</p>
</div>



    </div>
   
    </div>
    </div>
  );
}

export default Home ;
