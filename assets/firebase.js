// Firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getDatabase, push, ref } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBT5-wcSXWIRdaDlmlBvqpq2dT511p7au0",
  authDomain: "babargeefashion1982.firebaseapp.com",
  databaseURL: "https://babargeefashion1982-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "babargeefashion1982",
  storageBucket: "babargeefashion1982.firebasestorage.app",
  messagingSenderId: "19641210742",
  appId: "1:19641210742:web:e7c959c1e955107cf2cc57",
  measurementId: "G-BJ9S0MZS4W"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementsByName("name")[0].value;
  const email = document.getElementsByName("email")[0].value;
  const phone = document.getElementsByName("phone")[0].value;
  const type = document.getElementsByName("type")[0].value;
  const message = document.getElementsByName("message")[0].value;

  push(ref(db, "contactMessages/"), {
    name,
    email,
    phone,
    type,
    message,
    date: new Date().toString()
  })
    .then(() => {
      alert("Your message has been sent successfully!");
      document.getElementById("contactForm").reset();
    })
    .catch(() => {
      alert("Error sending message. Please try again.");
    });
});
