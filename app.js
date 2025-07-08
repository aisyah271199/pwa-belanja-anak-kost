// Mendaftarkan Service Worker agar mendukung offline
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('✅ Service Worker terdaftar!', reg))
    .catch(err => console.log('❌ Service Worker gagal:', err));
}

// Data belanja bulanan (dummy)
const items = [
  { name: "Beras 5kg", price: "Rp 70.000" },
  { name: "Mie Instan 1 Dus", price: "Rp 45.000" },
  { name: "Telur 1 Kg", price: "Rp 30.000" },
  { name: "Sabun Mandi", price: "Rp 10.000" },
  { name: "Pasta Gigi", price: "Rp 12.000" }
];

// Tampilkan item belanja di halaman
const shoppingList = document.getElementById('shopping-list');
items.forEach(item => {
  const div = document.createElement('div');
  div.className = 'item';
  div.innerHTML = <h3>${item.name}</h3><p>${item.price}</p>;
  shoppingList.appendChild(div);
});

// Contoh simpan data ke IndexedDB (opsional)
if ('indexedDB' in window) {
  let request = indexedDB.open('ShoppingDB', 1);

  // Buat store kalau pertama kali
  request.onupgradeneeded = e => {
    let db = e.target.result;
    db.createObjectStore('items', { keyPath: 'name' });
  };

  // Simpan data ke database
  request.onsuccess = e => {
    let db = e.target.result;
    let tx = db.transaction('items', 'readwrite');
    let store = tx.objectStore('items');
    items.forEach(item => store.put(item));
    tx.oncomplete = () => db.close();
  };
}