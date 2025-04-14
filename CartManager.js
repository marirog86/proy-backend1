const fs = require('fs');
const path = require('path');

const pathCart = path.join(__dirname, 'cart.json');

class CartManager {
    constructor() {
        this.carts = [];
        this.loadCarts();
    }

    loadCarts() {
        if (fs.existsSync(pathCart)) {
            const data = fs.readFileSync(pathCart, 'utf-8');
            this.carts = JSON.parse(data);
        } else {
            fs.writeFileSync(path, JSON.stringify([])); 
        }
    }

    saveCarts() {
        fs.writeFileSync(pathCart, JSON.stringify(this.carts, null, 2));
    }


    createCart() {
        const newCart = { id: this.carts.length + 1, products: [] };
        this.carts.push(newCart);
        this.saveCarts();
        return newCart;
    }

    getCartById(cid) {
        return this.carts.find(cart => cart.id === cid);
    }


    addProductToCart(cid, pid) {
        const cart = this.getCartById(cid);
        if (cart) {
            const productIndex = cart.products.findIndex(product => product.id === pid);
            if (productIndex !== -1) {
                cart.products[productIndex].quantity += 1; 
            } else {
                cart.products.push({ id: pid, quantity: 1 });
            }
            this.saveCarts();
        }
    }
}

module.exports = CartManager;