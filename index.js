// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJNMbf2UYXiQOOwagkCRrNqeQs-D8tOos",
  authDomain: "portfolio-caf72.firebaseapp.com",
  databaseURL: "https://portfolio-caf72-default-rtdb.firebaseio.com",
  projectId: "portfolio-caf72",
  storageBucket: "portfolio-caf72.firebasestorage.app",
  messagingSenderId: "1087473340138",
  appId: "1:1087473340138:web:93f4e43206de99aab05193",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/v8/firebase.User
    var uid = user.uid;
    console.log("Signed in");
    // Select the header container
    const headerDiv = document.getElementById("header-container");

    // Modify the content of the header
    headerDiv.innerHTML = `
  <header>
  <nav class="main-nav">
    <ul>
      <li><a href="index.html">Home</a></li>
      <li><a href="skills.html">Skills</a></li>
      <li><a href="projects.html">Projects</a></li>
      <li><a href="contact.html">Contact</a></li>
      <li><a href="signout.html">Sign Out</a></li>
      <li><a href="test.html">Chat</a></li>
    </ul>
  </nav>
</header>
`;
  } else {
    console.log("Signed out");
    // Modify the content of the header
    headerDiv.innerHTML = `
  <header>
  <nav class="main-nav">
    <ul>
      <li><a href="index.html">Home</a></li>
      <li><a href="skills.html">Skills</a></li>
      <li><a href="projects.html">Projects</a></li>
      <li><a href="contact.html">Contact</a></li>
      <li><a href="signin.html">Sign In</a></li>
      <li><a href="test.html">Chat</a></li>
    </ul>
  </nav>
</header>
`;
  }
});
