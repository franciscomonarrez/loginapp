import React from 'react';
import './styles.css'; // Import the CSS file
import { deleteAccount } from './firebaseConfig'; // Import deleteAccount function

const SuccessPage = () => {
  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      await deleteAccount();
    }
  };

  return (
    <div className="container">
      <h2 className="success">Congratulations, you logged in!</h2>
      <p>
        <a href="/login" onClick={() => alert("You have been logged out.")}>Log out</a>
      </p>
      <button onClick={handleDeleteAccount} className="delete-button">Delete Account</button>
    </div>
  );
};

export default SuccessPage;