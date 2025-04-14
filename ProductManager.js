const fs = require('fs');
const path = require('path');

const pathProductos = path.join(__dirname, 'productos.json');

class ProductManager {
    constructor() {
        this.products = [];
        this.loadProducts();
    }

    loadProducts() {
        if (fs.existsSync(pathProductos)) {
            const data = fs.readFileSync(pathProductos,'utf-8');
            this.products = JSON.parse(data);
        } else {
            fs.writeFileSync(pathProductos, JSON.stringify([])); 
        }
    }

    saveProducts() {
        fs.writeFileSync(path, JSON.stringify(this.products));
    }

    getProducts() {
        return this.products;
    }

    getProductById(pid) {
        return this.products.find(product => product.id === pid);
    }

    addProduct(product) {
        this.products.push(product);
        this.saveProducts();
    }

    updateProduct(pid, updateFields) {
        const index = this.products.findIndex(product => product.id === pid);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updateFields };
            this.saveProducts();
        }
    }

    deleteProduct(pid) {
        const index = this.products.findIndex(product => product.id === pid);
        if (index !== -1) {
            this.products.splice(index, 1);
            this.saveProducts();
        }
    }
}

module.exports = ProductManager;