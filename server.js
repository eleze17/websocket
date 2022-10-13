const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'));
const serv = require('http').Server(app)
const io = require('socket.io')(serv)


const productos = []

app.use(express.static('public'));

io.on('connection', socket => {
    console.log('Nuevo cliente conectado!');
    
    socket.emit('productos', productos);

    socket.on('producto', data => {
        productos.push({socketid: socket.id, producto: data})
        io.sockets.emit('productos', productos); 
    });  
});




app.get('/',(req,res)=>{
     req.console.log(req)   
     productos.push(req)
     res.render(app)

    

    const muestraprods = () => {
       let theTemplateScript = $("#example-template").html();
       let  theTemplate = Handlebars.compile(theTemplateScript);
       let  context = productos.splice
       let  theCompiledHtml = theTemplate(context);
       $(document.body).append(theCompiledHtml);
      }
    muestraprods();  
})



const PORT = 8080
const server = serv.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))
