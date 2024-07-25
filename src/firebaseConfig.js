import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, deleteUser } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore"; // Import Firestore functions

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASCdfpBCXKRCVGaVPYL5pBNOx1gXavfmk",
  authDomain: "login-integration-de591.firebaseapp.com",
  projectId: "login-integration-de591",
  storageBucket: "login-integration-de591.appspot.com",
  messagingSenderId: "26574553563",
  appId: "1:26574553563:web:853ec34ddd451cbba7e7fe",
  measurementId: "G-QCELV0B8WH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const errorMessages = {
  "auth/email-already-in-use": "This email is already registered.",
  "auth/invalid-email": "The email address is not valid.",
  "auth/operation-not-allowed": "Email/password accounts are not enabled.",
  "auth/weak-password": "The password is too weak. It should be at least 6 characters long.",
  "auth/user-disabled": "This user has been disabled.",
  "auth/user-not-found": "No user found with this email.",
  "auth/wrong-password": "The password is incorrect.",
  "auth/invalid-credential": "The credential is invalid."
};

const registerUser = async (email, password) => {
  try {
    if (password.length < 6) {
      throw new Error("Password should be at least 6 characters long.");
    }
    await createUserWithEmailAndPassword(auth, email, password);
    // Store user data in Firestore
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      email: auth.currentUser.email,
      createdAt: new Date(),
    });

    return "User registered successfully!";
  } catch (error) {
    const errorMessage = errorMessages[error.code] || error.message;
    throw new Error(errorMessage);
  }
};

const loginUser = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    // Redirect to the success page
    window.location.href = `/success?email=${encodeURIComponent(email)}`;
  } catch (error) {
    const errorMessage = errorMessages[error.code] || error.message;
    throw new Error(errorMessage);
  }
};

const logoutUser = async () => {
  try {
    await signOut(auth);
    alert("User logged out successfully!");
    window.location.href = "/";
  } catch (error) {
    console.error("Error during logout:", error.message);
    alert(`Error: ${error.message}`);
  }
};

const deleteAccount = async () => {
  const user = auth.currentUser;
  if (user) {
    try {
      await deleteUser(user);
      alert("Your account has been deleted.");
      window.location.href = "/register"; // Redirect to the register page after account deletion
    } catch (error) {
      console.error("Error deleting account:", error.message);
      alert(`Error: ${error.message}`);
    }
  } else {
    alert("No user is currently logged in.");
  }
};

export { auth, db, registerUser, loginUser, logoutUser, deleteAccount };