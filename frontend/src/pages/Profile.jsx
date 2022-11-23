import React, { useState, useEffect } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { API_USER_URL } from '../utils/APIRoutes';
import { format } from 'fecha';
import Modal from '../components/profile/InfoModal';

const Profile = () => {

  const token = JSON.parse(localStorage.getItem("token"));
  
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    age: "",
    gender: "",
    createdAt: ""
  })
  const [showModal, setShowModal] = useState(false);

  const fetchCurrentUserInfo = () => {
    const config = {
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
        setData({
          ["firstname"]: response.data.firstname,
          ["lastname"]: response.data.lastname,
          ["email"]: response.data.email,
          ["age"]: response.data.age,
          ["gender"]: response.data.gender,
          ["createdAt"]: response.data.createdAt
        })
      })
      .catch((err) => {
        console.log(err);
      })
    }

    useEffect(() => {
      fetchCurrentUserInfo();
    }, []);

    
    // MODAL
    const toggleModal = () => {
      setShowModal(!showModal);
      console.log("modal is working");
    }
    // Close modal with Echap Key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setShowModal(false);
      }
    });
    
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
        <p>Bonjour {data.firstname}</p>

        <div className="tabs">
          <div className="delivery">
            <a href="/mes-commandes">Commander un repas</a>
          </div>
        </div>

        <div className="user-info d-flex">
          <div className="avatar">
            <img src="" alt="Avatar" />
          </div>
          <div className="bio">
            <div className="name">
              <span>{data.firstname ? data.firstname : "Prénom"}</span>
              <hr />
              <span>{data.lastname ? data.lastname : "Nom"}</span>
            </div>
            <div className="mail">
              <span>{data.email ? data.email : "Votre email"}</span>
            </div>
            <div className="age gender">
              <span>{data.age ? data.age : "Age"}</span>
              <hr />
              <span>{data.gender ? data.gender : "Sexe"}</span>
            </div>
            <div className="created">
              <span>Mamossien depuis {data.createdAt ? data.createdAt : "??/??/??"}</span>
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