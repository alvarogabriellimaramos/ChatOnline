const container = document.querySelector('.container');

const create__username = document.querySelector('.create__username');
const input__username = create__username.querySelector('input');

const send__messagem = document.querySelector('.send__messagem');
const input__send = send__messagem.querySelector('input');

const username = document.querySelector('.username');
const div__messagem = document.querySelector(".div__messagem");
const div__open = document.querySelector('.div__open')
const ws = new WebSocket('https://star-notch-barberry.glitch.me');

const ids = [];

const colors = [
    "blue",
    "red",
    "pink",
    "chocolate",
    "orange",
    "darkgoldenrod",
    "black",
    "purple"
];

ws.addEventListener('message',function(event) {

    const message = JSON.parse(event.data);
    if (message.title) {
        console.log(message)
        return;
    }
    sessionStorage.id = message.id;
    const div = document.createElement("div");
    div.setAttribute('data-user-id', message.id);

    const username = document.createElement('span');
    username.classList.add('username');
    username.style.color = message.color;
    username.textContent = message.username;

    const content = document.createElement('span');
    content.textContent = message.content;

    div.appendChild(username);
    div.appendChild(content);
    
    if (message.id === user.id) {
        div.classList.add('right-message');
    }
    else{div.classList.add('left-message')};

    div__messagem.appendChild(div)
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
    if (input__username.length < 4) {
        alert('Digite um nome de usuario maior que 4 caracteres');
        return;
    };

    create__username.style.display = 'none';
    send__messagem.style.display = 'flex';

    user.username = input__username.value;
    user.color = RandomColor(colors);
    user.id = `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    div__messagem.style.display = 'block';

    localStorage.id = user.id;
    container.style.maxWidth = '800px';
    container.style.height = '100vh';
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

    div.appendChild(username);
    div.appendChild(message);
    div.setAttribute('data-user-id',user.id);
    return div.outerHTML
}


send__messagem.addEventListener('submit',event => {
    event.preventDefault();
    if (ws.readyState === WebSocket.OPEN) {

        const message = {
            id : user.id,
            username: user.username,
            color: user.color,
            content: input__send.value
        }
        ws.send(JSON.stringify(message));
        input__send.value = '';
    }

});

