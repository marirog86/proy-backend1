const ProductManager = require('./ProductManager.js');
const CartManager = require('./CartManager.js');


const productManager = new ProductManager();
const cartManager = new CartManager();

productManager.addProduct( {
    "id": 1,
    "title": "Remera Azul",
    "description": "Remera manga corta",
    "code": "WURJFD",
    "price": 500,
    "stock": 8,
    "category": "Remeras"
    });

productManager.addProduct({ "id": 2,
    "title": "Pantalon Negro",
    "description": "Pantalon jean negro",
    "code": "KFNJGJ",
    "price": 1000,
    "stock": 5,
    "category": "Pantalones"
    });

productManager.addProduct({ "id": 3,
    "title": "Zapatillas",
    "description": "Zapatillas",
    "code": "SLPDGN",
    "price": 1500,
    "stock": 6,
    "category": "Zapatillas"
    });

const product = productManager.getProductById(3);
console.log('Producto con ID 3:', product);


console.log('Productos:', productManager.getProducts());

productManager.deleteProduct(1);
console.log('Productos después de eliminar el ID 1:', productManager.getProducts());


productManager.updateProduct(2, { price: 1300 });
console.log('Producto actualizado con ID 2:', productManager.getProductById(2));


const cart = cartManager.createCart();
console.log('Nuevo carrito creado:', cart);


cartManager.addProductToCart(cart.id, 3);
cartManager.addProductToCart(cart.id, 2);
cartManager.addProductToCart(cart.id, 3); 
console.log('Carrito con productos:', cartManager.getCartById(cart.id));