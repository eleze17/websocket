let socket = io.connect(); 

socket.on('productos', function(prods) { 
    console.log(prods);
    document.querySelector('p').innerHTML = prods.map( prod => `SocketId: ${prod.socketid} -> productos: ${prod.nombre}  ${prod.marca}  ${prod.precio }`).join('<br>')
});

const input = document.querySelector('input')

document.getElementById('enviar').addEventListener('click', () => {
socket.emit('productos', input.value); 
})