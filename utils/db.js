//SECTION - Comment Form
var currentUser;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log("Currently signed in user:", user);
    currentUser = user.email;
  } else {
    window.location.href = "signin.html"; // Modify the page to redirect
  }
});

// DOM Elements
const chatWindow = document.getElementById("chat-window");
const chatForm = document.getElementById("chat-form");
const messageInput = document.getElementById("message");

// Add message to the database
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = currentUser;
  const message = messageInput.value.trim();

  if (message) {
    database.ref("messages").push({
      email,
      message,
      timestamp: Date.now(),
    });
    messageInput.value = ""; // Clear input
  }
});

// Listen for new messages
database.ref("messages").on("child_added", (snapshot) => {
  const { email, message, timestamp } = snapshot.val();

  const date = new Date(timestamp);
  const readableTimestamp = date.toLocaleString();

  // Create a new message div
  const msgDiv = document.createElement("div");
  const msgHeading = document.createElement("div");
  const msgContent = document.createElement("div");

  // Set the text content
  msgHeading.textContent = `${email}: ${readableTimestamp}`;
  msgContent.textContent = `${message}`;

  msgDiv.className = "chat-message";
  msgHeading.className = "chat-heading";
  msgContent.className = "chat-content";

  // Append the message to the chat window
  chatWindow.appendChild(msgDiv);
  msgDiv.appendChild(msgHeading);
  msgDiv.appendChild(msgContent);

  // Auto-scroll
  chatWindow.scrollTop = chatWindow.scrollHeight;
});
//!SECTION - Comment Form
