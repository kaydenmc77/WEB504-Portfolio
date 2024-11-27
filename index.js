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
const database = firebase.database();

// DOM Elements
const chatWindow = document.getElementById("chat-window");
const chatForm = document.getElementById("chat-form");
const usernameInput = document.getElementById("username");
const messageInput = document.getElementById("message");

// Add message to the database
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = usernameInput.value.trim();
  const message = messageInput.value.trim();

  if (username && message) {
    database.ref("messages").push({
      username,
      message,
      timestamp: Date.now(),
    });
    messageInput.value = ""; // Clear input
  }
});

// Listen for new messages
database.ref("messages").on("child_added", (snapshot) => {
  const { username, message, timestamp } = snapshot.val();

  const date = new Date(timestamp);
  const readableTimestamp = date.toLocaleString();

  // Create a new message div
  const msgDiv = document.createElement("div");
  const msgHeading = document.createElement("div");
  const msgContent = document.createElement("div");

  // Set the text content
  msgHeading.textContent = `${username}: ${readableTimestamp}`;
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
