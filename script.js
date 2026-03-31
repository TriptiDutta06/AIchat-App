const API_KEY = "AIzaSyAsH4mBBBMgSO_sbcDosV0L-slbV377Mps";
// Use the new 2026 stable endpoint
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${API_KEY}`;
const chatHistory = document.getElementById("chat-history");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Function to add a message to the screen
function addMessage(text, role) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", role === "user" ? "user-message" : "ai-message");
    messageDiv.innerText = text;
    chatHistory.appendChild(messageDiv);
    
    // Auto-scroll to the bottom
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

// Function to call the Gemini API
async function getAIResponse(prompt) {
    addMessage("Thinking...", "ai"); // Temporary loading state
    const lastMessage = chatHistory.lastChild;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await response.json();
        const aiText = data.candidates[0].content.parts[0].text;
        
        // Replace "Thinking..." with the actual response
        lastMessage.innerText = aiText;

    } catch (error) {
        lastMessage.innerText = "Error: Could not connect to the AI. Check your API key.";
        console.error(error);
    }
}

// Event Listener for the button
sendBtn.addEventListener("click", () => {
    const text = userInput.value.trim();
    if (text) {
        addMessage(text, "user");
        userInput.value = ""; // Clear input
        getAIResponse(text);
    }
});

// Allow pressing "Enter" to send
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendBtn.click();
});