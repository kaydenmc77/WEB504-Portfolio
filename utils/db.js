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
  const key = snapshot.key; // Unique database key for the message
  const { email, message, timestamp } = snapshot.val();

  const date = new Date(timestamp);
  const readableTimestamp = date.toLocaleString();

  // Create a new message div
  const msgDiv = document.createElement("div");
  const msg = document.createElement("div");
  const msgBtns = document.createElement("div");
  const msgHeading = document.createElement("div");
  const msgContent = document.createElement("div");

  // Set the text content
  msgHeading.textContent = `${email}: ${readableTimestamp}`;
  msgContent.textContent = `${message}`;

  msgDiv.className = "chat-message";
  msgDiv.setAttribute("data-key", key); // Add data-key for real-time updates
  msg.className = "message-box";
  msgBtns.className = "message-buttons";
  msgHeading.className = "chat-heading";
  msgContent.className = "chat-content";

  // Append the message to the chat window
  chatWindow.appendChild(msgDiv);
  msgDiv.appendChild(msg);
  msg.appendChild(msgHeading);
  msg.appendChild(msgContent);
  msgDiv.appendChild(msgBtns);

  // Add edit and delete buttons only for the current user's messages
  if (email === currentUser) {
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    editButton.textContent = "Edit";
    deleteButton.textContent = "Delete";

    editButton.className = "edit-button";
    deleteButton.className = "delete-button";

    // Edit functionality
    editButton.addEventListener("click", () => {
      const newMessage = prompt("Edit your message:", message);
      if (newMessage !== null && newMessage.trim() !== "") {
        database.ref(`messages/${key}`).update({
          message: newMessage.trim(),
        });
      }
    });
    // Delete functionality
    deleteButton.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete this message?")) {
        database.ref(`messages/${key}`).remove();
      }
    });
    msgBtns.appendChild(editButton);
    msgBtns.appendChild(deleteButton);
  }
  // Auto-scroll
  chatWindow.scrollTop = chatWindow.scrollHeight;
});

// Update message in real time
database.ref("messages").on("child_changed", (snapshot) => {
  const key = snapshot.key;
  const { message } = snapshot.val();

  // Find the corresponding message div by its data-key
  const msgDiv = document.querySelector(`[data-key="${key}"]`);
  if (msgDiv) {
    const msgContent = msgDiv.querySelector(".chat-content");
    msgContent.textContent = message;
  }
});

// Remove message in real time
database.ref("messages").on("child_removed", (snapshot) => {
  const key = snapshot.key;

  // Find and remove the message div by its data-key
  const msgDiv = document.querySelector(`[data-key="${key}"]`);
  if (msgDiv) {
    msgDiv.remove();
  }
});
