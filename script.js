function $(selector, parent=document) {
    const elements = parent.querySelectorAll(selector);
    return elements.length > 1 ? elements : elements[0];
}
const bc = new BroadcastChannel('chat');
const form = $('form');
const input = $('input', form);
const chat = $('#chat');

function addMSG(msg, role='sender') {
    const div = document.createElement('div');
    div.classList.add(role);
    div.textContent = msg;
    chat.appendChild(div);
    div.scrollIntoView();
}

function addMSGView(msg, role='sender') {
    if (!document.startViewTransition) {
        addMSG(msg, role);
        return;
    }
    
    document.startViewTransition(() => addMSG(msg, role))
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = input.value;
    input.value = "";
    if (!msg) return;
    bc.postMessage(msg);
    addMSG(msg);
});

bc.addEventListener('message', (e) => {
    addMSGView(e.data, 'reciever');
});