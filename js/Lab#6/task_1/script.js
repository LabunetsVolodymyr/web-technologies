'use strict';

let products = [
    { id: '1', name: 'Гра престолів.Пісня льоду й полум`я', price: 1050, category: 'Книги', image: 'https://bookstory.com.ua/content/images/23/696x600l80mc0/knyha-hra-prestoliv.-dzhordzh-r.r.-martin-23802664745730.webp', createdAt: '2026-03-25T10:00:00.000Z', updatedAt: '2026-03-25T10:00:00.000Z' },
    { id: '2', name: 'Настільна гра "Мафія За кадром"', price: 249, category: 'Іграшки та ігри', image: 'https://planeta-igr.com/image/data/goods/93888.jpg', createdAt: '2026-02-22T10:00:00.000Z', updatedAt: '2026-02-27T10:00:00.000Z' },
    { id: '3', name: 'Навушники вкладиші бездротові TWS HiFuture', price: 1299, category: 'Гаджети', image: 'https://kvshop.com.ua/users/products/532/532431/big/hifuture-flexclip-black-flexclip-black.webp', createdAt: '2026-03-28T14:30:00.000Z', updatedAt: '2026-03-29T09:15:00.000Z' },
    { id: '4', name: 'Маленький принц', price: 180, category: 'Книги', image: 'https://www.whales-tales.com/cdn/shop/files/rn-image_picker_lib_temp_7c4c114a-7bfd-4ca3-ae49-7972a2c792e0.jpg?v=1749760198', createdAt: '2026-03-28T14:30:00.000Z', updatedAt: '2026-03-29T09:15:00.000Z' },
    { id: '5', name: 'Іграшка Беззубик 40 см приборкати дракона Toothless', price: 389, category: 'Іграшки та ігри', image: 'https://content2.rozetka.com.ua/goods/images/big/559856084.jpg', createdAt: '2026-03-30T08:00:00.000Z', updatedAt: '2026-03-30T08:00:00.000Z' },
    { id: '6', name: 'Зовнішній портативний акумулятор Baseus Star Lord Digital Display 30000mAh 22.5W', price: 1399, category: 'Гаджети', image: 'https://smarttel.ua/content/images/15/536x536l50nn0/55519754989949.jpg', createdAt: '2026-03-30T08:00:00.000Z', updatedAt: '2026-03-30T08:00:00.000Z' }
];

let currentFilter = 'Всі';
let currentSort = 'default';
let editingProductId = null;

const addProduct = (list, item) => [...list, item];
const updateProduct = (list, id, data) => list.map(p => p.id === id ? { ...p, ...data } : p);
const deleteProduct = (list, id) => list.filter(p => p.id !== id);
const filterProducts = (list, cat) => cat === 'Всі' ? list : list.filter(p => p.category === cat);
const calculateTotal = (list) => list.reduce((sum, p) => sum + Number(p.price), 0);
const getCategories = (list) => ['Всі', ...new Set(list.map(p => p.category))];
const formatPrice = (price) => new Intl.NumberFormat('uk-UA', { style: 'currency', currency: 'UAH' }).format(price);

const sortProducts = (list, sortBy) => {
    const sortFns = {
        price: (a, b) => a.price - b.price,
        dateCreated: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        dateUpdated: (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    };
    return sortFns[sortBy] ? [...list].sort(sortFns[sortBy]) : list;
};

const els = {
    list: document.getElementById('product-list'),
    total: document.getElementById('total-price'),
    filters: document.getElementById('filter-container'),
    sorts: document.getElementById('sort-container'),
    modal: document.getElementById('product-modal'),
    form: document.getElementById('product-form'),
    title: document.getElementById('modal-title'),
    snackbar: document.getElementById('snackbar')
};

const createCardHTML = (p) => `
    <div class="product-card fade-in">
        <img src="${p.image}" alt="${p.name}">
        <div class="card-content">
            <small>ID: ${p.id}</small>
            <h3>${p.name}</h3>
            <p class="category">${p.category}</p>
            <p class="price">${formatPrice(p.price)}</p>
            <div class="actions">
                <button class="edit-btn" data-id="${p.id}">Редагувати</button>
                <button class="delete-btn" data-id="${p.id}">Видалити</button>
            </div>
        </div>
    </div>`;

const renderProducts = () => {
    const displayList = sortProducts(filterProducts(products, currentFilter), currentSort);

    els.list.innerHTML = displayList.length
        ? displayList.map(createCardHTML).join('')
        : '<p class="empty-message">Наразі список товарів пустий. Додайте новий товар.</p>';

    els.total.textContent = `Загальна вартість: ${formatPrice(calculateTotal(displayList))}`;
};

const renderFilters = () => {
    els.filters.innerHTML = getCategories(products).map(cat =>
        `<button class="${cat === currentFilter ? 'active' : ''}" data-category="${cat}">${cat}</button>`
    ).join('');
};

const updateUI = () => { renderFilters(); renderProducts(); };

const toggleModal = (product = null) => {
    els.form.reset();
    editingProductId = product ? product.id : null;
    els.title.textContent = product ? 'Редагувати товар' : 'Додати новий товар';

    els.form.image.required = !product;
    els.form.image.placeholder = product ? '(залиште пустим для старого фото)' : 'https://...';

    if (product) {
        ['name', 'price', 'category'].forEach(key => els.form[key].value = product[key]);
    }
    els.modal.classList.toggle('show');
};

const showSnackbar = (msg) => {
    els.snackbar.textContent = msg;
    els.snackbar.classList.add('show');
    setTimeout(() => els.snackbar.classList.remove('show'), 3000);
};

els.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const now = new Date().toISOString();
    const { name, price, category, image } = els.form;

    const formData = {
        name: name.value,
        price: Number(price.value),
        category: category.value,
        image: image.value.trim() || (editingProductId ? products.find(p => p.id === editingProductId).image : '')
    };

    if (editingProductId) {
        products = updateProduct(products, editingProductId, { ...formData, updatedAt: now });
        showSnackbar(`Успішно оновлено: ${formData.name}`);
    } else {
        products = addProduct(products, { id: Date.now().toString(), ...formData, createdAt: now, updatedAt: now });
        showSnackbar('Товар успішно додано!');
    }

    updateUI();
    toggleModal();
});

els.list.addEventListener('click', (e) => {
    const id = e.target.dataset.id;
    if (e.target.classList.contains('delete-btn')) {
        products = deleteProduct(products, id);
        updateUI();
        showSnackbar('Товар успішно видалено зі списку');
    }
    if (e.target.classList.contains('edit-btn')) {
        toggleModal(products.find(p => p.id === id));
    }
});

els.filters.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        currentFilter = e.target.dataset.category;
        updateUI();
    }
});

els.sorts.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        currentSort = e.target.dataset.sort;
        renderProducts();
    }
});

document.getElementById('reset-filter-btn').addEventListener('click', () => { currentFilter = 'Всі'; updateUI(); });
document.getElementById('reset-sort-btn').addEventListener('click', () => { currentSort = 'default'; renderProducts(); });
document.getElementById('open-modal-btn').addEventListener('click', () => toggleModal());
document.getElementById('close-modal-btn').addEventListener('click', () => toggleModal());
window.addEventListener('click', (e) => e.target === els.modal && toggleModal());

document.addEventListener('DOMContentLoaded', updateUI);