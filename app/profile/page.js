// app/profile/page.js
"use client"; // This component uses client-side hooks

import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { validateAddress } from "../utils/validateAddress";

const Profile = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState({
    name: "",
    lastName: "",
    birthDate: "",
    address: "",
    phone: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (session?.user) {
      // Assuming you have the user information in the session object
      // If you need to fetch additional user details from your backend,
      // you can do it here with a fetch request.

      setUser({
        name: session.user.name || "", // Getting the name from the session
        lastName: session.user.lastName || "", // Adjust according to your data structure
        birthDate: session.user.birthDate || "", // Adjust according to your data structure
        address: session.user.address || "", // Adjust according to your data structure
        phone: session.user.phone || "", // Adjust according to your data structure
      });
    }
  }, [session]);

  if (!session) {
    return (
      <div>
        <h1>Veuillez vous connecter</h1>
        <button onClick={() => signIn()}>Se connecter</button>
      </div>
    );
  }

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValidAddress = await validateAddress(user.address);
    if (!isValidAddress) {
      setMessage("L'adresse doit être située à moins de 50 km de Paris.");
      return;
    }

    try {
      await fetch("/api/user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      setMessage("Informations mises à jour avec succès !");
    } catch (error) {
      setMessage("Erreur lors de la mise à jour des informations.");
    }
  };

  return (
    <div>
      <h1>Profil Utilisateur</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom :</label>
          <input
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Prénom :</label>
          <input
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date de naissance :</label>
          <input
            name="birthDate"
            type="date"
            value={user.birthDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Adresse :</label>
          <input
            name="address"
            value={user.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Numéro de téléphone :</label>
          <input
            name="phone"
            type="tel"
            value={user.phone}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Enregistrer</button>
      </form>
      {message && <p>{message}</p>}
      <button onClick={() => signOut()}>Se déconnecter</button>
    </div>
  );
};

export default Profile;
