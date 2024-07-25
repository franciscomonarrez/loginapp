<<<<<<< HEAD
# loginapp
=======
# Firebase Authentication Integration

## Overview
This project is a simple React application that demonstrates user registration and authentication using Firebase. Users can register for a new account, log in with their credentials, log out, and delete their accounts. Error messages are displayed clearly to help users understand what went wrong during the authentication process.

## Features
- User registration with email and password.
- User login with email and password.
- Clear error messages for registration and login.
- Users can log out.
- Users can delete their accounts.
- Simple and appealing user interface.

## Prerequisites
Before you begin, ensure you have met the following requirements:
- You have installed Node.js and npm.
- You have a Firebase project set up with the necessary configurations for authentication.

## Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/franciscomonarrez/loginapp.git
   cd ai-login
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install React Router:**
   ```bash
   npm install react-router-dom@6
   ```

4. **Install Firebase:**
   ```bash
   npm install firebase
   ```

5. **Install other necessary packages:**
   ```bash
   npm install @emotion/react @emotion/styled @mui/material @mui/icons-material
   ```

## Firebase Configuration
Before running the application, you need to set up your own Firebase project and replace the Firebase configuration in the code with your own credentials.

### Steps to set up Firebase:
1. **Go to the [Firebase Console](https://console.firebase.google.com/).**

2. **Create a new project:**
   - Click on "Add project" and follow the prompts to create a new Firebase project.

3. **Enable Email/Password authentication:**
   - In the Firebase Console, select your project.
   - Go to the "Authentication" section.
   - Click on the "Sign-in method" tab.
   - Enable "Email/Password" and click "Save."

4. **Initialize Firestore:**
   - In the Firebase Console, select your project.
   - Go to the "Firestore Database" section.
   - Click "Create database" and follow the prompts to set up Firestore.

5. **Get Firebase Configuration:**
   - In the Firebase Console, go to the "Project settings" by clicking on the gear icon next to "Project Overview."
   - Scroll down to the "Your apps" section and select "Web."
   - Copy the Firebase configuration object from this section.

6. **Update Firebase Configuration in Code:**
   - Open `src/firebaseConfig.js`.
   - Replace the placeholder values in `firebaseConfig` with your own Firebase configuration.

### Example Firebase Configuration (Replace with your own):
```javascript
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, deleteUser } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const registerUser = async (email, password) => {
  try {
    if (password.length < 6) {
      throw new Error("Password should be at least 6 characters long.");
    }
    await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      email: auth.currentUser.email,
      createdAt: new Date(),
    });
    return "User registered successfully!";
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      throw new Error("This email is already registered.");
    }
    throw new Error(error.message);
  }
};

const loginUser = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = `/success?email=${encodeURIComponent(email)}`;
  } catch (error) {
    throw new Error(error.message);
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

const deleteUserAccount = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      await deleteUser(user);
      alert("User account deleted successfully!");
      window.location.href = "/";
    } else {
      throw new Error("No user is currently signed in.");
    }
  } catch (error) {
    console.error("Error during account deletion:", error.message);
    alert(`Error: ${error.message}`);
  }
};

export { auth, db, registerUser, loginUser, logoutUser, deleteUserAccount };
```

## Running the Application
1. **Start the development server:**
   ```bash
   npm start
   ```
   The application will be accessible at [http://localhost:3000](http://localhost:3000).

## Available Scripts
In the project directory, you can run:

### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`
Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm test`
Launches the test runner in the interactive watch mode.
>>>>>>> a2f88d0 (Reinitialize repository and add all files)
