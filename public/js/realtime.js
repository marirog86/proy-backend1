const socket = io();

const form = document.getElementById('productForm');
const list = document.getElementById('productList');

form.addEventListener('submit', e => {
  e.preventDefault();
  const data = {
    title: form.title.value,
    price: Number(form.price.value),
  };
  socket.emit('addProduct', data);
  form.reset();
});

socket.on('productList', products => {
  list.innerHTML = '';
  products.forEach(p => {
    const li = document.createElement('li');
    li.textContent = `${p.title} - $${p.price}`;
    const btn = document.createElement('button');
    btn.textContent = 'Eliminar';
    btn.onclick = () => socket.emit('deleteProduct', p.id);
    li.appendChild(btn);
    list.appendChild(li);
  });
});
