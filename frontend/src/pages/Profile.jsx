import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom"; 
import axios from 'axios';
import { API_USER_URL } from '../utils/APIRoutes';
import Modal from '../components/client/InfoModal';
import MyInfos from '../components/client/Infos';
import MyAddress from '../components/client/Address';
import MyPayments from '../components/client/Payment';
import AdminPanel from '../components/admin/adminPanel';

const Profile = () => {

  const token = JSON.parse(localStorage.getItem("token"));
  const location = useLocation();
  const [isClient, setIsClient] = useState(false);
  const [isLivreur, setIsLivreur] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  // Check if user is client
  const checkIfClient = async() => {
    const response = await axios.get(`${API_USER_URL}client`, {
      headers: {
        "x-access-token": token
      },
    });
    setIsClient(response.data)
  }

  // Check if user is livreur
  const checkIfLivreur = async() => {
    const response = await axios.get(`${API_USER_URL}livreur`, {
      headers: {
        "x-access-token": token
      },
    });
    setIsLivreur(response.data);
  }

    // Check if user is admin
    const checkIfAdmin = async() => {
      const response = await axios.get(`${API_USER_URL}admin`, {
        headers: {
          "x-access-token": token
        },
      });
      setIsAdmin(response.data);
    }
  
  // Info modal
  const toggleInfoModal = () => {
    setShowInfoModal(!showInfoModal);
    console.log("info modal is working");
  }
  // Close modal with Echap Key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setShowInfoModal(false);
    }
  });

  // Address modal
  const toggleAddressModal = () => {
    setShowAddressModal(!showAddressModal);
    console.log("address modal is working");
  }
  // Close modal with Echap Key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setShowAddressModal(false);
    }
  });
  
  // Address modal
  const togglePaymentModal = () => {
    setShowPaymentModal(!showPaymentModal);
    console.log("modal is working");
  }
  // Close modal with Echap Key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setShowPaymentModal(false);
    }
  });

  useEffect(() => {
    if (token) {
      checkIfClient();
      setIsLoggedIn(true);
    } else {
      setIsClient(false);
      setIsLoggedIn(false);
    }
  }, [location, token]);

  useEffect(() => {
    if (token) {
      checkIfLivreur();
      setIsLoggedIn(true);
    } else {
      setIsLivreur(false);
      setIsLoggedIn(false);
    }
  }, [location, token]);

  useEffect(() => {
    if (token) {
      checkIfAdmin();
      setIsLoggedIn(true);
    } else {
      setIsAdmin(false);
      setIsLoggedIn(false);
    }
  }, [location, token]);


  return (
    <section id="profile">
      <div className="container">
        {showInfoModal && (
          <>
            <Modal setShowInfoModal={setShowInfoModal} />
          </>
          ) 
        }
        {!showInfoModal && showAddressModal && (
          <>
            <Modal setShowAddressModal={setShowAddressModal} />
          </>
          ) 
        }
        {showPaymentModal && (
          <>
            <Modal setShowPaymentModal={setShowPaymentModal} />
          </>
          )
        }
        <h2>Mon compte</h2>
        <MyInfos />

          <div className="allergies">
            <span>Allergies</span>
          </div>

          <button className="btn btn-modal" onClick={toggleInfoModal}>
            Modifier mes informations
          </button>

          {isClient && (
            <div className="body">
              <div className="plats">
                <h2>Plats favoris</h2>
              </div>
              <div className="addresses">
                <h2>Mes addresses</h2>
                <MyAddress />
                <button className="btn btn-modal" onClick={toggleAddressModal}>
                  Modifier mon addresse
                </button>
              </div>
              <div className="payment">
                <h2>Mes moyens de paiements</h2>
                <MyPayments />
                <button className="btn btn-modal" onClick={togglePaymentModal}></button>
              </div>
            </div>
            
          )}
          
          {isLivreur && (
          <div className="body">
            <div className="plats">
              <h2>Commandes en cours</h2>
              <span>#642</span> <span>Prénom NOM</span> <span>15:43</span> <span>CODE</span>
              <hr />
              <span>#642</span> <span>Prénom NOM</span> <span>15:43</span> <span>CODE</span>
              <hr />
              <span>#642</span> <span>Prénom NOM</span> <span>15:43</span> <span>CODE</span>
              <hr />
              <span>#642</span> <span>Prénom NOM</span> <span>15:43</span> <span>CODE</span>
            </div>
            <div className="addresses">
              <h2>Commandes</h2>
              <span>#642</span> <span>Prénom NOM</span> <span>15:43</span> <span>CODE</span>
              <hr />
              <span>#642</span> <span>Prénom NOM</span> <span>15:43</span> <span>CODE</span>
              <hr />
              <span>#642</span> <span>Prénom NOM</span> <span>15:43</span> <span>CODE</span>
              <hr />
              <span>#642</span> <span>Prénom NOM</span> <span>15:43</span> <span>CODE</span>
              <hr />
              <button className="btn btn-modal" onClick={toggleAddressModal}>
                Voir plus de commandes
              </button>
            </div>
          </div>

          )}

          {isAdmin && (
            <div className="body">
              <div className="plats">
                <AdminPanel />
              </div>
            </div>
          )}

        </div>
    </section>
  )
}

export default Profile