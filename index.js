const name = prompt('What is your name?');
const chat = document.getElementById('chat');
const input = document.getElementById('input');
const sendBtn = document.getElementById('send');

const ws = new WebSocket('ws//localhost:8000')