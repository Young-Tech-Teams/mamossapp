import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { API_BASE_URL, API_AUTH_URL } from '../utils/APIRoutes'

const Profile = () => {

  const location = useLocation();
  // const url = location.pathname.split("/");

  const token = JSON.parse(localStorage.getItem("token"));
  
  const [values, setValues] = useState({
    email: "",
    password: "",
    status: "",
  })

  const fetchCurrentUser = () => {
    var config = {
      method: 'get',
      url: `${API_BASE_URL}/user-infos`,
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    }

    axios.defaults.withCredentials = true;

    axios(config)
      .then((response) => {
      })
      .catch((error) => {
        console.log(error);
      })
    }
    
    useEffect(() => {
      fetchCurrentUser();
    }, []);
    
    const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
  }

  
  // Tests
  const fname = "John";
  const lname = "Doe";
  const email = "john@doe.fr";
  const age = 29;
  const gender = "Male";
  const created = "Mamossien depuis 25/05/22";

  return (
    <section id="profile">
      <div className="container">
        <h2>Mon compte</h2>
        <p>Bonjour {fname} </p>

        <div className="tabs">
          <div className="delivery">
            <span>Livraison</span>
          </div>
          <div className="takeout">
            <span>À emporter</span>
          </div>
        </div>

        <div className="user-info">
          <div className="avatar">
            <img src="" alt="Avatar" />
          </div>
          <div className="info">
            <div className="name">
              <span>{fname}</span>
              <span>{lname}</span>
            </div>
            <div className="mail">
              <span>{email}</span>
            </div>
            <div className="age gender">
              <span>{age}</span>
              <span>{gender}</span>
            </div>
            <div className="created">
              <span>{created}</span>
            </div>
          </div>

          <div className="allergies">
            <span>Allergies</span>
          </div>
        </div>

        <div className="body">

          <div className="plats">
            <h2>Plats favoris</h2>
          </div>

          <div className="addresses">
            <h2>Mes addresses</h2>
          </div>

          <div className="history">
            <h2>Mon historique de commandes</h2>
          </div>

          <div className="payment">
            <h2>Mes moyens de paiements</h2>
          </div>

          <div className="consign">
            <h2>Mes consignes en cours</h2>
          </div>
          
        </div>

        <a href="/mes-commandes">Mes commandes</a>

      </div>

    </section>
  )
}

export default Profile