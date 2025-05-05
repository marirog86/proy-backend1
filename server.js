const express = require('express');
const { Server } = require('socket.io');
const path = require('path');
const handlebars = require('express-handlebars');
const http = require('http');
const ProductManager = require('./ProductManager'); 

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const productManager = new ProductManager();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configurar Handlebars
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Rutas
app.get('/', (req, res) => {
    const products = productManager.getProducts();
    res.render('home', { products });
});

app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
});

// Socket.io
io.on('connection', socket => {
    console.log('Cliente conectado');

    // Enviar productos al conectar
    socket.emit('productList', productManager.getProducts());

    // Crear producto
    socket.on('addProduct', data => {
        productManager.addProduct(data);
        io.emit('productList', productManager.getProducts()); 
    });

    // Eliminar producto
    socket.on('deleteProduct', id => {
        productManager.deleteProduct(id);
        io.emit('productList', productManager.getProducts());
    });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
