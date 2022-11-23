import React from 'react'
const SECRET_KEY = process.env.SECRET_ZELTY_API_KEY;

const Home = () => {

  const fetchZeltyApi = () => {
    fetch('https://api.zelty.fr/2.7/customers', {             
      method: 'GET',  
      withCredentials: true,  
      crossorigin: true,  
      headers: {                
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SECRET_KEY}`
      }
    })
    .then((response) => {
      console.log(response.data);
    })
  }

  return (
    <section id="home">
      <div className="container">
        <button onClick={fetchZeltyApi}>Accueil</button>
        <a href="/mon-compte">Mon compte</a>
      </div>
    </section>
  )
}

export default Home