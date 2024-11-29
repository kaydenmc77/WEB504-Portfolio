//SECTION - Account Form
// DOM Elements
const accountForm = document.getElementById("accountform");
const emailInput = document.getElementById("emailinput");
const passwordInput = document.getElementById("passwordinput");

// Add message to the authentication list
accountForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      window.location.href = "index.html"; // Modify the page to redirect
      // ...
    })
    .catch((error) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          window.location.href = "index.html"; // Modify the page to redirect
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
        });
    });
});
//!SECTION - Account Form
