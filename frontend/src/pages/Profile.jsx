import React, { useState } from 'react'
import Modal from '../components/profile/InfoModal';
import MyInfos from '../components/profile/Infos';
import MyAddress from '../components/profile/Address';
import MyPayments from '../components/profile/Payment';

const Profile = () => {

  const [showModal, setShowModal] = useState(false);

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
        <MyInfos />

          <div className="allergies">
            <span>Allergies</span>
          </div>

          <button className="btn btn-modal" onClick={toggleModal}>
            Modifier mes informations
          </button>

          <div className="body">
            <div className="plats">
              <h2>Plats favoris</h2>
            </div>
            <div className="addresses">
              <h2>Mes addresses</h2>
              <MyAddress />
            </div>
            <div className="payment">
              <h2>Mes moyens de paiements</h2>
              <MyPayments />
            </div>
          </div>
        </div>

    </section>
  )
}

export default Profile