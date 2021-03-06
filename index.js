const name = prompt('What is your name?');
const chat = document.getElementById('chat');
const input = document.getElementById('input');
const sendBtn = document.getElementById('send');

const ws = new WebSocket('ws://localhost:8000');

ws.onmessage = function (msg) {
    const message = JSON.parse(msg.data);

    addMessage(message.author, message.date, message.text);
}


function addMessage(author, date, text, isMyMessage) {
    const msg = `
     <div class="message ${isMyMessage ? 'message-right ' : ''} d-flex flex-column">
        <div class="message-author">${author}</div>
        <div class="message-text">${text}</div>
        <div class="date">${date}</div>
    </div>
    `;

    chat.innerHTML = chat.innerHTML + msg;
}

sendBtn.onclick = function () {
    const text = input.value;
    const date = new Date().toLocaleTimeString();

    addMessage(name, date, text, true);
    input.value = '';

    const msg = {
        author: name,
        date: date,
        text: text,
    }

    ws.send(JSON.stringify(msg))
}