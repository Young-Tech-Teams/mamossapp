import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Home = () => {

  const token = JSON.parse(localStorage.getItem("token"));
  const [data, setData] = useState({
    fname: "",
    name: "",
    mail: "",
    phone: "",
  })

  const fetchZeltyApi = () => {
    const config = {
      method: 'get',
      url: 'https://api.zelty.fr/2.7/',
      headers: {
        "Access-Control-Allow-Origin": "*",
        'Authorization': 'Bearer NzQ4Mzo1+O+N9JTGVjOiA3H1sA3iPJY7ow=='
      }
    }
    axios.defaults.withCredentials = true;

    axios(config)
    .then((response) => {
       console.log(response);
       console.log("It worked!");
      //  setData({
      //     ["fname"]: response.data.fname,
      //     ["name"]: response.data.name,
      //     ["mail"]: response.data.mail,
      //     ["phone"]: response.data.phone,
      //  })
    })
    .catch((err) => {
       console.log(err);
    })
 }

 useEffect(() => {
  fetchZeltyApi();
 }, []);

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