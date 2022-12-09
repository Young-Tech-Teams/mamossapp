import React, { useState } from 'react'
import Modal from '../components/profile/InfoModal';
import MyInfos from '../components/profile/Infos';
import MyAddress from '../components/profile/Address';
import MyPayments from '../components/profile/Payment';

const Profile = () => {

  const [isClient, setIsClient] = useState(false);
  const [isLivreur, setIsLivreur] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false)

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
    
    
  return (
    <section id="profile">
      <div className="container">
        {showInfoModal ? (
          <>
            <Modal setShowInfoModal={setShowInfoModal} />
          </>
          ) : <></>
        }
        {!showInfoModal && showAddressModal ? (
          <>
            <Modal setShowAddressModal={setShowAddressModal} />
          </>
          ) : <></>
        }
        {showPaymentModal ? (
          <>
            <Modal setShowPaymentModal={setShowPaymentModal} />
          </>
          ) : <></>
        }
        <h2>Mon compte</h2>
        <MyInfos />

          <div className="allergies">
            <span>Allergies</span>
          </div>

          <button className="btn btn-modal" onClick={toggleInfoModal}>
            Modifier mes informations
          </button>

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
        </div>

    </section>
  )
}

export default Profile