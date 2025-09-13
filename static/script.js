const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatContainer = document.getElementById("chat-container");
const newChatBtn = document.getElementById("new-chat-btn");

// Show welcome message on load
window.addEventListener("DOMContentLoaded", () => {
  const welcome = document.createElement("div");
  welcome.classList.add("message", "bot");
  welcome.innerText = "👋 Hello! I'm your Health Assistant. How can I help you today?";
  chatContainer.appendChild(welcome);
});

// Send message
function sendMessage() {
  const userText = userInput.value.trim();
  if (!userText) return;

  const userMessage = document.createElement("div");
  userMessage.classList.add("message", "user");
  userMessage.innerText = userText;
  chatContainer.appendChild(userMessage);
  userInput.value = "";
  chatContainer.scrollTop = chatContainer.scrollHeight;

  const loading = document.createElement("div");
  loading.classList.add("message", "bot");
  loading.innerText = "⏳ Thinking...";
  chatContainer.appendChild(loading);

  fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userText }),
  })
    .then((res) => res.json())
    .then((data) => {
      chatContainer.removeChild(loading);
      const botMessage = document.createElement("div");
      botMessage.classList.add("message", "bot");
      botMessage.innerText = data.reply;
      chatContainer.appendChild(botMessage);
      chatContainer.scrollTop = chatContainer.scrollHeight;
    })
    .catch((error) => {
      chatContainer.removeChild(loading);
      const errorMessage = document.createElement("div");
      errorMessage.classList.add("message", "bot");
      errorMessage.innerText = "❌ Something went wrong.";
      chatContainer.appendChild(errorMessage);
    });
}

// Send on button click
sendBtn.addEventListener("click", sendMessage);

// Send on Enter key
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

// Handle New Chat
newChatBtn.addEventListener("click", () => {
  chatContainer.innerHTML = "";

  userInput.value = "";
  userInput.placeholder = "Ask a health question...";
  userInput.focus();

  const welcome = document.createElement("div");
  welcome.classList.add("message", "bot");
  welcome.innerText = "👋 Hello! I'm your Health Assistant. How can I help you today?";
  chatContainer.appendChild(welcome);
});
