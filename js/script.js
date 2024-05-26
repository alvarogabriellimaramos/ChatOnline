const container = document.querySelector('.container');

const create__username = document.querySelector('.create__username');
const input__username = create__username.querySelector('input');

const send__messagem = document.querySelector('.send__messagem');
const input__send = send__messagem.querySelector('input');

const username = document.querySelector('.username');
const div__messagem = document.querySelector(".div__messagem");

let ws = new WebSocket('https://star-notch-barberry.glitch.me');

const colors = [
    "blue",
    "red",
    "pink",
    "chocolate",
    "orange",
    "yellow",
    "black",
    "purple"
];

ws.addEventListener('message',function(event) {
    const 
    const range = document.createRange();
    const fragment = range.createContextualFragment(event.data);

    div__messagem.appendChild(fragment);
})

const user = {
    username: '',
    color: "",
    id: ''
};


function RandomColor(colors) {
    const random = Math.floor(Math.random() * colors.length);
    return colors[random]; 
}
create__username.addEventListener('submit',event => {
    event.preventDefault();
    
    create__username.style.display = 'none';
    send__messagem.style.display = 'flex';

    user.username = input__username.value;
    user.color = RandomColor(colors);
    user.id = `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    localStorage.id = user.id;
    container.style.width= '800px';
    container.style.height = '100%';
    container.style.borderRadius = '0';
});


function CreateElement (input) {
    const div = document.createElement("div");

    const username = document.createElement('span');
    username.classList.add('username');
    username.style.color = user.color;
    username.textContent = user.username;

    const message = document.createElement('span');
    message.textContent = input.value;

    const id = document.createElement('span');
    id.classList.add('id');
    id.textContent = user.id;

    div.appendChild(username);
    div.appendChild(message);
    div.appendChild(id);

    return div.outerHTML
}

send__messagem.addEventListener('submit',event => {
    event.preventDefault();
    if (ws.readyState === WebSocket.OPEN) {
        div__messagem.style.display = 'block';
        ws.send(CreateElement(input__send));
        input__send.value = '';
    }

});

setTimeout(() => console.log(user),5000);