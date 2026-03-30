const catalog = new Map();
const orders = new Set();
const editHistory = new WeakMap();
const promoItems = new WeakSet();

let productIdCounter = 1;

function addOrUpdateProduct(name, price, stock) {
    let existingId = null;
    for (let [id, prod] of catalog) {
        if (prod.name === name) {
            existingId = id;
            break; }
    }
    if (existingId) {
        const product = catalog.get(existingId);
        product.price = price;
        product.stock = stock;
        editHistory.set(product, new Date().toLocaleString());
    } else {
        const newProduct = { name, price, stock };
        const id = productIdCounter++;
        catalog.set(id, newProduct);
        editHistory.set(newProduct, "Створено: " + new Date().toLocaleString());

        if (Math.random() > 0.5) promoItems.add(newProduct);
    }
    render();
}

function deleteProduct(id) {
    catalog.delete(id);
    render();
}

function uiSearch() {
    const query = document.getElementById('searchName').value.toLowerCase();
    render(query);
}

function placeOrder(id) {
    const product = catalog.get(id);
    if (product && product.stock > 0) {
        product.stock--;
        const orderId = `ORD-${id}-${Date.now()}`;
        orders.add(orderId);
        render();
    } else {
        alert("Товар закінчився!");
    }
}

function render(filter = "") {
    const list = document.getElementById('catalogList');
    list.innerHTML = '';

    catalog.forEach((product, id) => {
        if (!product.name.toLowerCase().includes(filter)) return;

        const isPromo = promoItems.has(product);
        const lastEdit = editHistory.get(product) || "Немає даних";

        const card = document.createElement('div');
        card.className = `product-card ${isPromo ? 'promo' : ''}`;
        card.innerHTML = `
            <div>
                <strong>${product.name}</strong> (ID: ${id}) ${isPromo ? 'Promo ' : ''}<br>
                Ціна: ${product.price} грн | Склад: ${product.stock}<br>
                <small style="color: #999">Змінено: ${lastEdit}</small>
            </div>
            <div>
                <button class="btn-order" onclick="placeOrder(${id})">Замовити</button>
                <button class="btn-del" onclick="deleteProduct(${id})">Видалити</button>
            </div>
        `;
        list.appendChild(card);
    });

    document.getElementById('orderLog').innerText = Array.from(orders).join(' | ');
}


function uiAddProduct() {
    const name = document.getElementById('pName').value;
    const price = Number(document.getElementById('pPrice').value);
    const stock = Number(document.getElementById('pStock').value);

    if (name && price >= 0) {
        addOrUpdateProduct(name, price, stock);
        document.getElementById('pName').value = '';
        document.getElementById('pPrice').value = '';
        document.getElementById('pStock').value = '';
    }
}