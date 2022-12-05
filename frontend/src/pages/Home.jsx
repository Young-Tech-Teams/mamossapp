import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Home = () => {
  return (
    <section id="home">
      <div className="container">
        <button>Accueil</button>
        <a href="/mon-compte">Mon compte</a>
      </div>
    </section>
  )
}

export default Home