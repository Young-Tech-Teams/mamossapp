import React, { useState, useEffect } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { API_USER_URL } from '../utils/APIRoutes';
import Modal from '../components/profile/InfoModal';

const Profile = () => {

  const token = JSON.parse(localStorage.getItem("token"));
  
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [showModal, setShowModal] = useState(false);

  // MODAL
  const toggleModal = () => {
    setShowModal(!showModal);
    console.log("modal is working");
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setShowModal(false);
    }
  });

  const fetchCurrentUserInfo = () => {
    var config = {
      method: 'get',
      url: `${API_USER_URL}infos`,
      headers: localStorage.getItem("token") ? {
        "Access-Control-Allow-Origin": "*",
        "x-access-token": token,
      } : {
        "Access-Control-Allow-Origin": "*",
      }
    }

    axios.defaults.withCredentials = true;

    axios(config)
      .then((response) => {
        console.log(response);
        console.log("It worked!");
        setFirstname(response.data.firstname);
        setLastname(response.data.lastname);
        setEmail(response.data.email);
        setAge(response.data.age);
        setGender(response.data.gender);
      })
      .catch((err) => {
        console.log(err);
      })
    }
    
    useEffect(() => {
      fetchCurrentUserInfo();
    }, []);
    
  

  return (
    <section id="profile">
      <div className="container">
        {showModal ? (
          <>
            <Modal setShowModal={setShowModal} />
          </>
          ) : <></>
        }
        <h2>Mon compte</h2>
        <p>Bonjour {firstname}</p>

        <div className="tabs">
          <div className="delivery">
            <a href="/mes-commandes">Commander un repas</a>
          </div>
        </div>

        <div className="user-info d-flex">
          <div className="avatar">
            <img src="" alt="Avatar" />
          </div>
          <div className="info">
            <div className="name">
              <span>Prénom: {firstname}</span>
              <hr />
              <span>Nom: {lastname}</span>
            </div>
            <div className="mail">
              <span>Email: {email}</span>
            </div>
            <div className="age gender">
              <span>Age: {age}</span>
              <hr />
              <span>Genre: {gender}</span>
            </div>
            <div className="created">
              <span>Mamossien depuis</span>
            </div>
          </div>

          <div className="allergies">
            <span>Allergies</span>
          </div>

          <button
            className="btn btn-modal"
            onClick={toggleModal}
          >
            Modifier mes informations
          </button>
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

      </div>

    </section>
  )
}

export default Profile