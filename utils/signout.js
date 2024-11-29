// Sign out the user when the page loads
window.onload = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("User signed out successfully");
      // Redirect to a different page, e.g., login page
      window.location.href = "index.html"; // Modify the page to redirect
    })
    .catch((error) => {
      console.error("Error signing out: ", error);
    });
};
