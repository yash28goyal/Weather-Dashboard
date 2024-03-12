const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.getElementById("send_btn");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const body1 = document.getElementsByClassName("body")[0];
const chatbotCloseBtn = document.querySelector(".close-btn");

let userMessage;

const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message,className)=>{
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat",className);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-icons">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("P").textContent =  message;
    return chatLi;   
}

const generateResponse = (incomingChatLi)=>{
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p");

    const requestOptions = {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${API_KEY}`
        },
        body : JSON.stringify({
            model : "gpt-3.5-turbo",
            messages : [{role:"user",content: userMessage}]
        })
    }
    fetch(API_URL,requestOptions).then(res=> res.json()).then(data=>{
        console.log(data);
        // messageElement.textContent = data.choices[0].message.content;
    }).catch((err)=>{
        messageElement.classList.add("error");
        messageElement.textContent = "Oops! Something went wrong. Please try again";
    }).finally(()=>chatbox.scrollTo(0,chatbox.scrollHeight));
}

const handleChat = () =>{
    userMessage = chatInput.value.trim();
    if(!userMessage) return;
    chatInput.value = "";
    chatInput.computedStyleMap.height = `${inputInitHeight}px`

    chatbox.appendChild(createChatLi(userMessage,"outgoing"));
    chatbox.scrollTo(0,chatbox.scrollHeight);
    
    setTimeout(()=>{
        const incomingChatLi = createChatLi("Thinking...","incoming"); 
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0,chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    },600);
}

chatInput.addEventListener("input",()=>{
    chatInput.computedStyleMap.height = `${inputInitHeight}px`
    chatInput.computedStyleMap.height = `${chatInput.scrollHeight}px`
})
chatInput.addEventListener("keydown",(e)=>{
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth>800){
        e.preventDefault();
        handleChat();
    }
})

sendChatBtn.addEventListener("click",handleChat);
chatbotToggler.addEventListener("click",()=>{
    body1.classList.toggle("show-chatbot")
});
chatbotCloseBtn.addEventListener("click",()=>{
    body1.classList.remove("show-chatbot")
});