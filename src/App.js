import React, { useEffect } from "react";
import { db } from "./firebase"; // Import Firestore instance
import { collection, addDoc, getDocs } from "firebase/firestore";
import logo from './logo.svg';
import './App.css';

function App() {
  useEffect(() => {
    const testFirestore = async () => {
      try {
        // Add a sample document to Firestore
        const docRef = await addDoc(collection(db, "testCollection"), {
          name: "Test User",
          email: "testuser@example.com",
        });
        console.log("Document written with ID: ", docRef.id);

        // Fetch documents from Firestore
        const querySnapshot = await getDocs(collection(db, "testCollection"));
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };

    testFirestore();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Firebase is connected! Check the console for Firestore data.</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
