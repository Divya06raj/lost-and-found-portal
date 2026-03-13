let items = JSON.parse(localStorage.getItem('lostFoundItems')) || [];
let currentFilter = 'all';

const form = document.getElementById('itemForm');
const itemsList = document.getElementById('itemsList');
const filterBtns = document.querySelectorAll('.filter-btn');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newItem = {
        id: Date.now(),
        type: document.getElementById('itemType').value,
        name: document.getElementById('itemName').value,
        location: document.getElementById('location').value,
        description: document.getElementById('description').value,
        contactName: document.getElementById('contactName').value,
        contactEmail: document.getElementById('contactEmail').value,
        contactPhone: document.getElementById('contactPhone').value,
        date: new Date().toLocaleDateString()
    };
    
    items.unshift(newItem);
    localStorage.setItem('lostFoundItems', JSON.stringify(items));
    
    form.reset();
    displayItems();
    alert('Item posted successfully!');
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        displayItems();
    });
});

function displayItems() {
    const filteredItems = currentFilter === 'all' 
        ? items 
        : items.filter(item => item.type === currentFilter);
    
    if (filteredItems.length === 0) {
        itemsList.innerHTML = '<p class="no-items">No items found</p>';
        return;
    }
    
    itemsList.innerHTML = filteredItems.map(item => `
        <div class="item-card ${item.type}">
            <div class="item-header">
                <span class="item-badge ${item.type}">${item.type.toUpperCase()}</span>
                <span class="item-date">${item.date}</span>
            </div>
            <h3>${item.name}</h3>
            <p><strong>📍 Location:</strong> ${item.location}</p>
            <p><strong>📝 Description:</strong> ${item.description}</p>
            <div class="contact-info">
                <h4>Contact Information:</h4>
                <p><strong>Name:</strong> ${item.contactName}</p>
                <p><strong>Email:</strong> <a href="mailto:${item.contactEmail}">${item.contactEmail}</a></p>
                <p><strong>Phone:</strong> <a href="tel:${item.contactPhone}">${item.contactPhone}</a></p>
            </div>
            <button class="delete-btn" onclick="deleteItem(${item.id})">Delete</button>
        </div>
    `).join('');
}

function deleteItem(id) {
    if (confirm('Are you sure you want to delete this item?')) {
        items = items.filter(item => item.id !== id);
        localStorage.setItem('lostFoundItems', JSON.stringify(items));
        displayItems();
    }
}

displayItems();
