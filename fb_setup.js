/**************************************************************/
// fb_initialise()
// Initialize firebase, connect to the Firebase project.
// 
// Find the config data in the Firebase console. Cog wheel > Project Settings > General > Your Apps > SDK setup and configuration > Config
//
// Input:  n/a
// Return: n/a
/**************************************************************/
const firebaseConfig = {
  apiKey: "AIzaSyD-zPhYs6t9fGghJrWYlJNd_Kl7MohUK5c",
  authDomain: "rea-sevicke-jones-12comp.firebaseapp.com",
  databaseURL: "https://rea-sevicke-jones-12comp-default-rtdb.firebaseio.com",
  projectId: "rea-sevicke-jones-12comp",
  storageBucket: "rea-sevicke-jones-12comp.firebasestorage.app",
  messagingSenderId: "401505880913",
  appId: "1:401505880913:web:3ce4f923667b2201bee170"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // This log prints the firebase object to the console to show that it is working.
  // As soon as you have the script working, delete this log.
  console.log("Firebase initialize finished:");
  console.log(firebase);
