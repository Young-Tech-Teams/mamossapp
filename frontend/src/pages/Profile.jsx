import React from 'react'
import { API_BASE_URL } from '../utils/APIRoutes'

const Profile = () => {

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

          
          <div className="consign">
            <h2>Mes consignes en cours</h2>
          </div>
        </div>

      </div>

    </section>
  )
}

export default Profile