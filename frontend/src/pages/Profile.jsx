import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom"; 
import axios from 'axios';
import { API_USER_URL } from '../utils/APIRoutes';
import MyAddress from '../components/profile/Address';
import MyPayments from '../components/profile/Payment';
import AdminPanel from '../components/admin/adminPanel';
import LivreurPanel from '../components/livreur/livreurPanel';
import ClientPanel from '../components/client/clientPanel';
import MyInfos from '../components/profile/Infos';
import Modal from '../components/profile/InfoModal';

const Profile = () => {

  const token = JSON.parse(localStorage.getItem("token"));
  const location = useLocation();
  const [isClient, setIsClient] = useState(false);
  const [isLivreur, setIsLivreur] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

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

  return (
    <section id="profile">
      <div className="container">
        {isLoggedIn && (
          <>
            {showInfoModal && (
                  <>
                    <Modal setShowInfoModal={setShowInfoModal} />
                  </>
                  ) 
            }
            <h2 className="text-center mb-sm">Mon compte</h2>
            <MyInfos />
            <button className="btn btn-modal mb-md  " onClick={toggleInfoModal}>
              Modifier mes informations
            </button>
          </>
        )}

          {isClient && (
            <div className="body">
              <div className="client">
                <ClientPanel />
              </div>
            </div>
            
          )}
          
          {isLivreur && (
          <div className="body">
            <div className="livreur">
              <LivreurPanel />
            </div>
          </div>

          )}

          {isAdmin && (
            <div className="body">
              <div className="admin">
                <AdminPanel />
              </div>
            </div>
          )}

        </div>
    </section>
  )
}

export default Profile